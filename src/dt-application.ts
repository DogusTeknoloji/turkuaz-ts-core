import VueI18n from "vue-i18n";

export interface IDTApplication {
    [key: string]: any;

    i18n: VueI18n | null;
}