import VueI18n from "vue-i18n";
import { IDTApplication } from "./dt-application";

class DTApplication implements IDTApplication {
    [key: string]: any;

    public i18n: VueI18n | null = null;

}

export default new DTApplication();