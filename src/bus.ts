import * as _ from 'lodash';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { Component, Watch } from 'vue-property-decorator';
import { TurkuazApplication } from '.';
import { TurkuazLocalizationService } from './turkuaz-localization-service';
import { TurkuazQueueService } from './turkuaz-queue-service';
import {
    IToastMessageManager,
    IUserMessage,
    UserMessageType,
} from './turkuaz-types';
import { IUserOptions, UserOptions } from './user-options';
import { error } from './turkuaz-debug-console';

@Component
export class Bus extends Vue {
    public queueService = new TurkuazQueueService();
    public localizationService = new TurkuazLocalizationService();

    public pageTitle: string = 'TurkuazGO';
    private toast = {
        show: false,
        timeout: 5000,
        message: null,
    } as IToastMessageManager;

    public get toastMessage() {
        return this.toast;
    }

    public userMessages: IUserMessage[] = new Array<IUserMessage>();
    public userOptions: IUserOptions = new UserOptions();

    private created() {
        this.setPageTitle();

        TurkuazApplication.localizationService = this.localizationService;
        TurkuazApplication.queueService = this.queueService;
    }

    @Watch('pageTitle')
    private onPageTitleChanged() {
        this.setPageTitle();
    }

    private setPageTitle() {
        const en = _.isNil(Vue.$configs) ? '' : Vue.$configs.ENVIRONMENT_NAME;
        if (!_.isNil(en) && !_.isEmpty(en)) {
            document.title = `${en} : ${this.pageTitle} / ${Vue.i18n.t('pageTitle')}`;
        } else {
            document.title = `${this.pageTitle} / ${Vue.i18n.t('pageTitle')}`;
        }
    }

    public setMessage(
        type: UserMessageType,
        subject: string | VueI18n.TranslateResult,
        message?: string | VueI18n.TranslateResult,
        errorData?: any,
    ) {

        let errorMessage = undefined;

        if (!_.isNil(errorData) && !_.isNil(errorData.error)) {
            if (errorData!.error!.response!.data!.error && errorData.error.response.data.error.message) {
                errorMessage = errorData.error.response.data.error.message;
            } else if (errorData!.error!.response!.data && errorData.error.response.data.InnerException) {
                errorMessage = errorData.error.response.data.InnerException.Message;
            } else if (errorData!.error!.response!.data && errorData.error.response.data.Message) {
                errorMessage = errorData.error.response.data.Message;
            }
        }

        if(!_.isNil(errorData) && !_.isNil(errorData.response) && !_.isNil(errorData.response.data) 
            && !_.isEmpty(errorData.response.data.Message)){
            errorMessage = errorData.response.data.Message;
        }

        const m: IUserMessage = {
            fireTime: new Date(),
            type,
            subject: _.isString(subject) ? subject : subject.toString(),
            message: _.isUndefined(errorMessage) ? message!.toString() : errorMessage,
            errorData,
        };
        this.userMessages.unshift(m);
        this.toast.color = this.getColor(type);
        this.toast.message = m;
        this.toast.show = true;
    }

    public getColor(type?: UserMessageType | null): string {
        if (type === undefined || type === null) {
            return 'background';
        }
        switch (type) {
            case UserMessageType.Success:
                return 'success';
            case UserMessageType.Error:
                return 'error';
            case UserMessageType.Info:
                return 'info';
            case UserMessageType.Warn:
                return 'warning';
            case UserMessageType.Debug:
                return 'accent';
            default:
                return 'background';
        }
    }
    public getIcon(type?: UserMessageType | null): string {
        if (type === undefined || type === null) {
            return '';
        }
        switch (type) {
            case UserMessageType.Success:
                return 'check_circle';
            case UserMessageType.Error:
                return 'warning';
            case UserMessageType.Info:
                return 'info';
            case UserMessageType.Warn:
                return 'priority_high';
            case UserMessageType.Debug:
                return 'play_arrow';
            default:
                return 'background';
        }
    }
}
