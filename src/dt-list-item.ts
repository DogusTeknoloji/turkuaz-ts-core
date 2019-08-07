import { ODataQuery } from 'yuya.ts.odata-client';
import { ODataResponse } from './dt-types';
import { DTQueueService } from './dt-queue-service';
import { TranslateResult } from 'vue-i18n';
import { LocalizableString } from './localizable-string';

export class DTListItem<T = string> {
  public static fillByOData: (
    resultRef: DTListItem[],
    queueService: DTQueueService,
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

DTListItem.fillByOData = (
  refResult: DTListItem[],
  queueService: DTQueueService,
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
    .then((response: ODataResponse<DTListItem>) => {
      if (response.value) {
        refResult.length = 0;
        response.value.forEach((item: any) => refResult.push({
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
