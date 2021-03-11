import VueI18n from 'vue-i18n';
import {
  ITurkuazApplication,
  TurkuazLocalizationService,
  TurkuazQueueService,
  TurkuazMessageService,
  Bus,
} from '.';
import { UserOptions } from './user-options';

class TurkuazApplication<T extends UserOptions>
  implements ITurkuazApplication<T> {
  [key: string]: any;

  public i18n: VueI18n | null = null;
  public bus: Bus<T> | null = null;
  public localizationService: TurkuazLocalizationService | null = null;
  public queueService: TurkuazQueueService | null = null;
  public messageService: TurkuazMessageService | null = null;
}

export default new TurkuazApplication<any>();
