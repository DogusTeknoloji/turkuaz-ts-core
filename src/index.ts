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
export { CurrencyTypes } from './currency-types';

export { LocalizableString } from './localizable-string';

export { TurkuazListItem } from './turkuaz-list-item';
export * from './turkuaz-types';

export { TurkuazLocalizationService } from './turkuaz-localization-service';
export { TurkuazQueueService } from './turkuaz-queue-service';
export { TurkuazMessageService } from './turkuaz-message-service';

export {
  TurkuazQueueServiceMixin,
  TurkuazLocalizationServiceMixin,
  TurkuazEmitInputMixin,
  TurkuazMessageServiceMixin,
} from './mixins';

export * from './kebab-case';
export * from './moment-setup';
export { IKeyValuePair } from './key-value-pair';
export { IKeyTextPair } from './key-text-pair';

export * from './security';

export { addResource } from './resources';
export { Languages } from './languages';

export { RootState } from './stores';

declare module 'vue/types/vnode' {
  export interface VNodeData {
    model?: {
      callback: (v: any) => void;
      expression: string;
      value: any;
    };
  }
}
