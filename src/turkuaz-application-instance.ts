import VueI18n from 'vue-i18n';
import {
  ITurkuazApplication,
  TurkuazLocalizationService,
  TurkuazQueueService,
  Bus,
} from '.';

class TurkuazApplication
  implements ITurkuazApplication {
  [key: string]: any;

  public i18n: VueI18n | null = null;
  public bus: Bus | null = null;
  public localizationService: TurkuazLocalizationService | null = null;
  public queueService: TurkuazQueueService | null = null;
}

const turkuazApplication: TurkuazApplication = new TurkuazApplication();

export default turkuazApplication;
