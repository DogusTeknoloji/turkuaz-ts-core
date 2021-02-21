import _ from 'lodash';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { Watch } from 'vue-property-decorator';
import { LocalStorage, TurkuazApplication } from '.';
import { TurkuazLocalizationService } from './turkuaz-localization-service';
import { TurkuazMessageService } from './turkuaz-message-service';
import { TurkuazQueueService } from './turkuaz-queue-service';
import { IToastMessageManager, IUserMessage, UserMessageType, UserOptions } from './turkuaz-types';

const userOptionsName = 'UserOptions';

export class Bus<T extends UserOptions> extends Vue {
  private queueService = new TurkuazQueueService();
  private localizationService = new TurkuazLocalizationService();
  private messageService = new TurkuazMessageService();

  public pageTitle: string = 'TurkuazGO';
  private toast = {
    show: false,
    timeout: 5000,
    message: null,
  } as IToastMessageManager;
  public userMessages: IUserMessage[] = new Array<IUserMessage>();

  private _userOptions: T = new UserOptions() as T;
  public get userOptions(): T {
    return this._userOptions;
  }
  public set userOptions(v: T) {
    this._userOptions = v;
    this.saveToLocalStorage();
  }

  private created() {
    this.loadUserOptionsFromLocalStorage();
    this.setPageTitle();

    // TODO@HakanA: Bunları eklemeye gerek olmayabilir
    TurkuazApplication.localizationService = this.localizationService;
    TurkuazApplication.queueService = this.queueService;
    TurkuazApplication.messageService = this.messageService;
  }

  private loadUserOptionsFromLocalStorage() {
    let options: T;
    if (LocalStorage.isSupported && LocalStorage.hasItem(userOptionsName)) {
      options = {
        ...JSON.parse(localStorage.getItem(userOptionsName) || ''),
      };
    } else {
      options = new UserOptions() as T;
    }
    this.userOptions = options;
  }

  private saveToLocalStorage() {
    if (LocalStorage.isSupported) {
      localStorage.setItem(userOptionsName, JSON.stringify(this.userOptions));
    }
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
    const m: IUserMessage = {
      fireTime: new Date(),
      type,
      subject: (_.isString(subject) ? subject : subject.toString()),
      message: _.isNil(message) ? undefined :  message.toString(),
      errorData,
    };
    this.userMessages.unshift(m);
    this.toast.color = this.getColor(type);
    this.toast.message = m;
    this.toast.show = true;
  }

  private getColor(type?: UserMessageType | null): string {
    if (type === undefined || type === null) { return 'background'; }
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
  private getIcon(type?: UserMessageType | null): string {
    if (type === undefined || type === null) { return ''; }
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
