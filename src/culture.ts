import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { isNumber, isDate } from 'lodash';

declare module 'vue/types/vue' {
  interface Vue {
    $translate: (value: string) => string;
  }
}

Vue.use(VueI18n);

import { setMomentLanguage } from './moment-setup';
import axios from 'axios';
import moment from 'moment';

import DTApplication from './turkuaz-application-instance';
import { CurrencyTypes } from './currency-types';

function returnDateWithFormat(value: any, format: string): string {
  if (!value) { return String(); }
  if (isDate(value)) {
    const v: Date = value;
    return moment(v).format(format);
  }
  return String();
}

export function setI18nLanguage(lang: string): string {
  DTApplication.i18n!.locale = lang;
  axios.defaults.headers.common['Accept-Language'] = lang;
  document.querySelector('html')!.setAttribute('lang', lang);
  setMomentLanguage(DTApplication.i18n!);
  return lang;
}

export function translate(value?: string | null): string {
  if(value === undefined || value === null) { return String(); }
  return DTApplication.i18n!.t(value).toString();
}
Vue.prototype.$translate = translate;

export function translateArray(value: any[]): string[] {
  return value.map((v) => DTApplication.i18n!.t(v).toString());
}

export function numberFormatter(value: any): string {
  if (!value) { return String(); }
  if (isNumber(value)) {
    const v: number = value;
    return v.toLocaleString(DTApplication.i18n!.locale);
  }
  return value.toString();
}

export function dateFormatter(value: any) {
  returnDateWithFormat(value, 'L');
}

export function dateTimeFormatter(value: any) {
  returnDateWithFormat(value, 'L LTS');
}

export function yesNoFormatter(value: any): string {
  return value 
    ? DTApplication.i18n!.t('trkz.yes').toString() 
    : DTApplication.i18n!.t('trkz.no').toString();
}

export function onOffFormatter(value: any): string {
  return value 
    ? DTApplication.i18n!.t('trkz.on').toString() 
    : DTApplication.i18n!.t('trkz.off').toString();
}

export function currencyFormatter(value: number, currency: CurrencyTypes): string {
  return DTApplication.i18n!.n(value, 'currency', getCultureName(currency));
}

function getCultureName(currency: CurrencyTypes): string {
  switch (currency) {
    case CurrencyTypes.TRY:
      return 'tr-TR';
    case CurrencyTypes.USD:
      return 'en-US';
    default:
      return 'tr-TR';
  }
}

Vue.filter('translate', translate);
Vue.filter('translateArray', translateArray);
Vue.filter('number', numberFormatter);
Vue.filter('date', dateFormatter);
Vue.filter('datetime', dateTimeFormatter);
Vue.filter('yesNo', yesNoFormatter);
Vue.filter('onOff', onOffFormatter);

