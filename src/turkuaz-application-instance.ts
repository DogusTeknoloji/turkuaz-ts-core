import VueI18n from "vue-i18n";
import { ITurkuazApplication } from "./turkuaz-application";

class TurkuazApplication implements ITurkuazApplication {
    [key: string]: any;

    public i18n: VueI18n | null = null;

}

export default new TurkuazApplication();