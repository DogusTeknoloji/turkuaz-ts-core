import Vue from 'vue';
import { Inject, Component } from 'vue-property-decorator';
import { TurkuazMessageService } from '../turkuaz-message-service';
import { UserMessageType, TranslateResult } from '..';

@Component
export class TurkuazMessageServiceMixin extends Vue {

  @Inject({ default: () => new TurkuazMessageService() })
  public messageService!: TurkuazMessageService;

  public setMessage(
    type: UserMessageType,
    subject: string | TranslateResult,
    message?: string | TranslateResult,
    errorData?: any,
  ) {
    this.messageService.setMessage(type, subject, message, errorData);
  }
}
