import VueI18n from 'vue-i18n';
import {
  TurkuazLocalizationService,
  TurkuazQueueService,
  Bus,
} from '.';

export interface ITurkuazApplication {
  [key: string]: any;

  i18n: VueI18n | null;
  bus: Bus | null;
  localizationService: TurkuazLocalizationService | null;
  queueService: TurkuazQueueService | null;
}
