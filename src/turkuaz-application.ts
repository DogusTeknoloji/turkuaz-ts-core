import VueI18n from "vue-i18n";

export interface ITurkuazApplication {
    [key: string]: any;

    i18n: VueI18n | null;
}