export enum ErrorSeverity {
  Low = 0,
  Medium = 1,
  High = 2,
  Fatal = 3,
}

export interface IError {
  code?: string;
  message?: string;
  target?: string;
  errors?: IError[];
  severity?: ErrorSeverity;
}

export interface IResult<T = never> {
  error?: IError;
  success?: boolean;
  value?: T;
}

export interface IErrorDto {
  errorCode?: string;
  errorMessage?: string;
  errorDetail?: string;
}

export interface IBaseDto<TKey> {
  id?: TKey;
  createdDate?: Date | null;
  createdUserId?: number | null;
  modifiedDate?: Date | null;
  modifiedUserId?: number | null;
}

export interface IOutputDto {
  isSuccessful?: boolean;
  error?: IErrorDto;
}

export interface ODataResponse<T = never> {
  value: T[];
}

export enum UserMessageType {
  Success,
  Error,
  Warn,
  Info,
  Debug,
}

export interface IUserMessage {
  type: UserMessageType;
  subject: string;
  message?: string;
  fireTime: Date;
  errorData?: any;
}

export interface IToastMessageManager {
  show: boolean;
  timeout: number;
  color: string;
  message?: IUserMessage | null;
}


export type LocaleMessage = string | LocaleMessageObject | LocaleMessageArray;
export interface LocaleMessageObject { [key: string]: LocaleMessage; }
export interface LocaleMessageArray { [index: number]: LocaleMessage; }
export interface LocaleMessages { [key: string]: LocaleMessageObject; }
export type TranslateResult = string | LocaleMessages;