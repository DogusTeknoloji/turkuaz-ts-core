import _Vue from 'vue';
import * as DebugConsole from './turkuaz-debug-console';
import * as LocalStorage from './local-storage';
import * as StandartValidations from './standart-validations';
import * as Culture from './culture';
export {
  DebugConsole,
  LocalStorage,
  StandartValidations,
  TurkuazApplication,
  Culture,
};

export { ITurkuazApplication } from './turkuaz-application';
import TurkuazApplication from './turkuaz-application-instance';
import VueI18n from 'vue-i18n';
import { Bus } from './bus';
import TurkuazCorePluginOptions from './turkuaz-core-plugin-options';
export { CurrencyTypes, numberFormats } from './currency-types';

export { defaultLightTheme } from './color';

export { LocalizableString } from './localizable-string';

export { TurkuazListItem } from './turkuaz-list-item';
export * from './turkuaz-types';

export { TurkuazLocalizationService } from './turkuaz-localization-service';
export { TurkuazQueueService } from './turkuaz-queue-service';

export {
  TurkuazQueueServiceMixin,
  TurkuazLocalizationServiceMixin,
  TurkuazEmitInputMixin,
} from './mixins';

export * from './kebab-case';
export * from './moment-setup';
export { IKeyValuePair } from './key-value-pair';
export { IKeyTextPair } from './key-text-pair';

export * from './security';

export { addResource } from './resources';
export { Languages } from './languages';

export { RootState } from './stores';

export { Bus } from './bus';

export { TimeSpan } from './time-span';

export function TurkuazCorePlugin(
  Vue: typeof _Vue,
  options: TurkuazCorePluginOptions,
) {
  TurkuazApplication.bus = new Bus();
  TurkuazApplication.i18n = options.i18n;
}

declare module 'vue/types/vue' {
  interface Vue {
    $translate: (value: string) => string;
  }
}

declare module 'vue/types/vue' {
  interface VueConstructor {
    $configs: any;
    i18n: VueI18n;
  }
}
