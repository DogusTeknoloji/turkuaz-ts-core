import _ from 'lodash';
import DTApplication from './turkuaz-application-instance';

export function required(v?: any | null): string | true {
  return !!v || DTApplication.i18n!.t('trkz.validationMessages.required').toString();
}

export function multiSelectRequired(v?: any[] | any | null): string | true {
  return (!!v && _.isArray(v) && !!v.length) || DTApplication.i18n!.t('trkz.validationMessages.required').toString();
}

export function minFrom(anotherFieldName: string, anotherFieldValue: () => any): ((v: any) => string | true) {
  return (v: any) => {
    v = !!v ? Number(v) : v;
    if (!!v && !isNaN(v)) {
      const av = Number(anotherFieldValue());
      if (!!av && !isNaN(av)) {
        return (v < av) || DTApplication.i18n!.t('trkz.validationMessages.minFrom', [anotherFieldName]).toString();
      } else { return true; }
    } else { return true; }
  };
}

export function minFromValue(anotherFieldValue: number): ((v: any) => string | true) {
  return (v: any) => {
    v = !!v ? Number(v) : v;
    if (!!v && !isNaN(v)) {
      return v < anotherFieldValue
        || DTApplication.i18n!.t('trkz.validationMessages.minFrom', [anotherFieldValue]).toString();
    } else { return true; }
  };
}

export function maxFrom(anotherFieldName: string, anotherFieldValue: () => any): ((v: any) => string | true) {
  return (v: any) => {
    v = v ? Number(v) : v;
    if (v && !isNaN(v)) {
      const av = Number(anotherFieldValue());
      if (av && !isNaN(av)) {
        return v > av
          || DTApplication.i18n!.t('trkz.validationMessages.maxFrom', [anotherFieldName]).toString();
      } else { return true; }
    } else { return true; }
  };
}

export function maxFromValue(anotherFieldValue: number): ((v: any) => string | true) {
  return (v: any) => {
    v = !!v ? Number(v) : v;
    if (!!v && !isNaN(v)) {
      return v > anotherFieldValue
        || DTApplication.i18n!.t('trkz.validationMessages.maxFrom', [anotherFieldValue]).toString();
    } else { return true; }
  };
}
