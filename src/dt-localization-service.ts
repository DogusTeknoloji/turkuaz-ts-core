import DTApplication from './dt-application-instance';

export class DTLocalizationService {
  public translate: (key: string, ...params: any[]) => string = (key, ...params) => DTApplication.i18n!.t(key, params).toString();
}
