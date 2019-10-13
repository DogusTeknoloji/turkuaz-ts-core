import Vue from 'vue';
import { UserMessageType, TranslateResult, IUserMessage, IToastMessageManager } from '.';
import _ from 'lodash';

export class TurkuazMessageService extends Vue {
  public toast: IToastMessageManager = { show: false, timeout: 5000, message: null, color: 'success' };
  public userMessages: IUserMessage[] = new Array<IUserMessage>();

  public setMessage(
    type: UserMessageType,
    subject: string | TranslateResult,
    message?: string | TranslateResult,
    errorData?: any,
  ) {
    const m: IUserMessage = {
      fireTime: new Date(),
      type,
      subject: (_.isString(subject) ? subject : subject.toString()),
      message: _.isNil(message) ? undefined : (_.isString(message) ? message : message.toString()),
      errorData,
    };
    this.userMessages.unshift(m);
    this.toast.color = this.getColor(type);
    this.toast.message = m;
    this.toast.show = true;
  }

  public getColor(type?: UserMessageType | null): string {
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
  
  public getIcon(type?: UserMessageType | null): string {
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
