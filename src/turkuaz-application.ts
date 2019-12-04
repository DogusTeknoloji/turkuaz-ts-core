import Vue from "vue";
import VueI18n from "vue-i18n";
import { TurkuazLocalizationService, TurkuazQueueService, TurkuazMessageService } from ".";

export interface ITurkuazApplication {
    [key: string]: any;

    i18n: VueI18n | null;
    bus: Vue | null;
    localizationService: TurkuazLocalizationService | null;
    queueService: TurkuazQueueService | null;
    messageService: TurkuazMessageService | null;
}
