import { HttpResponse, ODataQuery } from 'yuya.ts.odata-client';
import { ODataResponse } from './turkuaz-types';
import { TurkuazQueueService } from './turkuaz-queue-service';
import { TranslateResult } from 'vue-i18n';
import { LocalizableString } from './localizable-string';

export class TurkuazListItem<T = string> {
  public static fillByOData: (
    resultRef: TurkuazListItem[],
    queueService: TurkuazQueueService,
    serviceName: string,
    valueFieldName: string,
    textFieldName: string,
    sortExpression: string,
    filterExpression?: string,
    cb?: () => void) => void;
  public text: string | TranslateResult | LocalizableString;
  public value: T;
  constructor(text: string | TranslateResult | LocalizableString, value: T) {
    this.text = text;
    this.value = value;
  }
}

TurkuazListItem.fillByOData = (
  refResult: TurkuazListItem[],
  queueService: TurkuazQueueService,
  serviceName: string,
  valueFieldName: string,
  textFieldName: string,
  sortExpression: string,
  filterExpression: string = String(),
  cb?: () => void) => {
  const callId = queueService.add();
  const query = new ODataQuery(serviceName)
    .select([valueFieldName, textFieldName].join(','))
    .orderBy(sortExpression);

  if (filterExpression) {
    query.filter(filterExpression);
  }

  query.q()
    .then((response: HttpResponse<ODataResponse<TurkuazListItem>>) => {
      if (response.data.value) {
        refResult.length = 0;
        response.data.value.forEach((item: any) => refResult.push({
          value: item[valueFieldName],
          text: item[textFieldName],
        }));

        if (cb) {
          cb();
        }
      } else {
        // TODO: What should i do, if response from service is empty
      }
    })
    .catch((e: Error) => {
      // TODO:
      alert(e.message);
    })
    .finally(() => queueService.remove(callId));
};
