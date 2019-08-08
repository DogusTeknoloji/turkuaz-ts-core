import TurkuazApplication from './turkuaz-application-instance';

export class TurkuazLocalizationService {
  public translate: (key: string, ...params: any[]) => string = (key, ...params) => TurkuazApplication.i18n!.t(key, params).toString();
}
