export interface ISecurityProvider {
    name(): string;
    canSee(key: string): boolean;
    canInteract(key: string): boolean;
}

let securityProvider: ISecurityProvider = {
    name() {
        return 'Default Security';
    },
    canSee(key: string) {
        return false;
    },
    canInteract(key: string) {
        return false;
    }
};

export function getSecurityProvider() {
    return securityProvider;
}

export function setSecurityProvider(provider: ISecurityProvider) {
    securityProvider = provider;
}

export enum PermissionLevel {
    None = 0,
    Read = 1,
    All = 2
}

export interface SecurityNetItem {
    Key: string;
    Level: PermissionLevel;
}

export class SecurityNetProvider implements ISecurityProvider {

    constructor(private items: SecurityNetItem[]) {
    }

    name() {
        return 'Security.Net';
    }

    canSee(key: string) {
        return this.items && this.items.some(i => i.Key === key && i.Level !== PermissionLevel.None);
    }

    canInteract(key: string) {
        return this.items && this.items.some(i => i.Key === key && i.Level === PermissionLevel.All);
    }
}
