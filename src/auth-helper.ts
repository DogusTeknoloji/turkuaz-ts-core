import Vue from 'vue';
import { SecurityNetItem, PermissionLevel, SecurityNetProvider, setSecurityProvider } from './security';
import * as Oidc from 'oidc-client';
import Router, { RawLocation, Route, RouteConfig } from 'vue-router';
import Axios from 'axios';

export interface OidcClientSettings {
    authority?: string;
    client_id?: string;
    response_type?: string;
    scope?: string;
    redirect_uri?: string;
    post_logout_redirect_uri?: string;
    popup_post_logout_redirect_uri?: string;
    prompt?: string;
    display?: string;
    max_age?: number;
    ui_locales?: string;
    acr_values?: string;
    filterProtocolClaims?: boolean;
}

export interface IAppSettings {
    applicationName: string;
    setSecurityItems: boolean;
    setUserRoles: boolean;
}

export class AuthHelper {

    public static oidcConfig: OidcClientSettings;
    public static appSettings: IAppSettings;
    public static userManager: Oidc.UserManager = new Oidc.UserManager(AuthHelper.oidcConfig);
    public static authToken: string;
    public static isHeaderTokenSet: boolean;
    public static byPassRoutePermissionCheck: boolean = true;
    public static userService: any;

    public constructor(settings: OidcClientSettings, appSettings: IAppSettings, userService: any) {
        AuthHelper.oidcConfig = settings;
        AuthHelper.appSettings = appSettings;
        AuthHelper.userManager = new Oidc.UserManager(AuthHelper.oidcConfig);
        AuthHelper.userService = userService;
    }

    public onAuthenticate: ((userInfo: Oidc.User) => void) | null = null;

    public static get usersRolesKey(): string {
        return 'usersRoles' + '-' + this.appSettings.applicationName;
    }

    public static get usersSecurityItemsKey(): string {
        return 'usersSecurityItems' + '-' + this.appSettings.applicationName;
    }

    public beforeEach(router: Router, to: Route, from: Route, next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void) {
        let loginCallback = to.query['login_callback'] === 'true';
        let logoutCallback = to.query['logout_callback'] === 'true';

        let p = this.checkAuth(router, loginCallback, logoutCallback);
        p.then(res => {
            if (res) {
                if (AuthHelper.appSettings.setSecurityItems === true) {
                    let pr = AuthHelper.setSecurityItemsOfUserAndCheck(router, to);
                    pr.then(p => {
                        if (p) {
                            this.createEvent('usersSecurityItemsIsSet');
                            next();
                        }
                    });
                    pr.catch(e => {
                        next(false);
                    });
                }
                else {
                    this.createEvent('usersSecurityItemsIsSet');
                    next();
                }
            }
            else {
                next(false);
            }
        });

        p.catch(e => {
            next(false);
        });
    }

    checkAuth(router: any, loginCallback: boolean, logoutCallback: boolean) {
        let self = this;
        return new Promise((resolve, reject) => {
            if (loginCallback) {
                AuthHelper.userManager.signinRedirectCallback().then(function () {
                    AuthHelper.userManager.getUser().then(function (user) {
                        if (user) {
                            let returnUrl = AuthHelper.getAndClearReturnUrl();
                            if (returnUrl) {
                                window.location.href = returnUrl;
                                resolve(false);
                                return;
                            }
                        }
                    });
                    resolve(false);
                }).catch(function (e) {
                    console.error(e);
                    reject(e);
                });
            }
            else if (logoutCallback) {
                AuthHelper.removeLocalSessionItemsOfUser();
                let url = '';
                if (window.location.href.indexOf('#') >= 0) {
                    url = window.location.href.split('#')[0];
                }
                else {
                    url = window.location.href.split('?')[0];
                }
                window.location.href = url;
            }
            else {
                AuthHelper.userManager.getUser().then(function (user) {
                    if (!user) {
                        // user not authenticated
                        AuthHelper.setReturnUrl();
                        AuthHelper.userManager.signinRedirect();
                        resolve(false);
                    }
                    else {
                        // user authenticated
                        if (self.onAuthenticate) self.onAuthenticate(user);
                        if (!AuthHelper.isHeaderTokenSet) {
                            AuthHelper.authToken = user.access_token;
                            AuthHelper.setAuthHeader();
                            AuthHelper.isHeaderTokenSet = true;
                            if (AuthHelper.appSettings.setUserRoles === true) {
                                AuthHelper.getUserRoles();
                            }
                        }
                        resolve(true);
                    }
                });
            }
        });
    }

    static navigate(router: any, path: string, params?: { [key: string]: any }, completed?: Function, aborted?: Function) {
        let s = [];
        if (params) {
            for (let p in params) {
                s.push(`${p}=${params[p]}`);
            }

            path += '?' + s.join('&');
        }
        router.push(path, completed, aborted);
    }

    static setSecurityItemsOfUserAndCheck(router: Router, to: Route) {
        return new Promise((resolve, reject) => {
            if (to.path === '/unauthorized') {
                resolve(true);
                return;
            }

            let usersSecurityItemsJson = sessionStorage.getItem(this.usersSecurityItemsKey);
            if (!usersSecurityItemsJson) {
                let p = AuthHelper.userService.GetCurrentUserSecurityInfo();
                p.then((r: any) => {
                    if (r) {
                        sessionStorage.setItem(this.usersSecurityItemsKey, btoa(JSON.stringify(r)));
                        this.checkRoutePermission(resolve, router, to, r);
                    }
                    resolve(true);
                }, (error: Error) => {
                    resolve(false);
                    throw error;
                });
            }
            else {
                this.checkRoutePermission(resolve, router, to, JSON.parse(atob(usersSecurityItemsJson)));
            }
        });
    }

    static checkRoutePermission(resolve: any, router: Router, to: Route, usersSecurityItems: SecurityNetItem[]) {
        let allowed = false;
        for (let i = 0; i < usersSecurityItems.length; i++) {
            let x = usersSecurityItems[i];
            if (x.Key === to.path && (x.Level === PermissionLevel.All || x.Level === PermissionLevel.Read)) {
                allowed = true;
                break;
            }
        }

        if (!this.byPassRoutePermissionCheck && !allowed) {
            this.navigate(router, '/unauthorized');
            resolve(false);
            return;
        }
        this.setPagePermissions(resolve, to);
    }

    static setPagePermissions(resolve: any, to: Route) {
        let p = AuthHelper.userService.GetCurrentUserPageSecurityInfo(to.path);
        p.then((r: any) => {
            if (r) {
                setSecurityProvider(new SecurityNetProvider(r));
                resolve(true);
            }
        }, (error: Error) => {
            resolve(false);
            throw error;
        });
    }

    static removeLocalSessionItemsOfUser() {
        sessionStorage.removeItem(this.usersSecurityItemsKey);
        sessionStorage.removeItem(this.usersRolesKey);
    }

    static getUserRoles() {
        return new Promise((resolve, reject) => {
            let userRolesJson = sessionStorage.getItem(this.usersRolesKey);
            if (userRolesJson) {
                resolve(JSON.parse(atob(userRolesJson)));
            }
            else {
                let p = AuthHelper.userService.GetCurrentUserRoleInfo();
                p.then((r: any) => {
                    sessionStorage.setItem(this.usersRolesKey, btoa(JSON.stringify(r)));
                    resolve(r);
                }, (error: Error) => {
                    resolve(null);
                    throw error;
                });
            }
        });
    }

    static setReturnUrl() {
        let url = window.location.href;
        let returnUrl = sessionStorage.getItem('returnUrl');
        if (!returnUrl)
            sessionStorage.setItem('returnUrl', url);
    }

    static getAndClearReturnUrl() {
        let returnUrl = sessionStorage.getItem('returnUrl');
        if (returnUrl) {
            sessionStorage.removeItem('returnUrl');
        }
        return returnUrl;
    }

    static setAuthHeader() {
        //    // XMLHttpRequest
        //    let o = XMLHttpRequest.prototype.open;
        //    XMLHttpRequest.prototype.open = function () {
        //        let res = o.apply(this, arguments);

        //        // Skip SignalR negotiate requests. SignaR is using own authentication header.
        //        if (arguments.length < 1 || arguments[1].indexOf('/negotiate') < 0) {
        //            this.setRequestHeader('Authorization', 'bearer ' + AuthHelper.authToken);
        //        }
        //        //

        //        let rsc = this.onreadystatechange;
        //        if (rsc) {
        //            this.onreadystatechange = function () {
        //                if (this.readyState === 4 && this.status === 401) {
        //                    AuthHelper.userManager.signinRedirect();
        //                }
        //                if (this.readyState === 4 && this.status === 403) {
        //                    let url = this.responseURL.split('?')[0];
        //                    let error = 'Bu iþlemi yapmaya yetkiniz yok. Ýþlem Url: ' + url;
        //                    console.log(error);
        //                    this.createEvent('UnauthorizedAccess');
        //                    throw error;
        //                }
        //                return rsc.apply(this, arguments);
        //            };
        //        }
        //        else {
        //            this.onreadystatechange = function () {
        //                if (this.readyState === 4 && this.status === 401) {
        //                    AuthHelper.userManager.signinRedirect();
        //                }
        //                if (this.readyState === 4 && this.status === 403) {
        //                    let url = this.responseURL.split('?')[0];
        //                    let error = 'Bu iþlemi yapmaya yetkiniz yok. Ýþlem Url: ' + url;
        //                    console.log(error);
        //                    this.createEvent('UnauthorizedAccess');
        //                    throw error;
        //                }
        //            };
        //        }
        //        return res;
        //    };
        Axios.defaults.headers.Authorization = 'bearer ' + AuthHelper.authToken;
    }

    createEvent(eventName: any) {
        let event = document.createEvent('Event');
        event.initEvent(eventName, true, true);
        document.dispatchEvent(event);
    }
}