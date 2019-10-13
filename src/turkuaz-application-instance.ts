import Vue from "vue";
import VueI18n from "vue-i18n";
import { ITurkuazApplication, TurkuazLocalizationService, TurkuazQueueService, TurkuazMessageService } from ".";

class TurkuazApplication implements ITurkuazApplication {
    [key: string]: any;

    public i18n: VueI18n | null = null;
    public bus: Vue | null = null;
    public localizationService: TurkuazLocalizationService | null = null;
    public queueService: TurkuazQueueService | null = null;
    public messageService: TurkuazMessageService | null = null;
}

export default new TurkuazApplication();