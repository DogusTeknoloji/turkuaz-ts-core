export enum CurrencyTypes {
  TRY = 'TRY',
  USD = 'USD',
  AUD = 'AUD',
  DKK = 'DKK',
  EUR = 'EUR',
  GBP = 'GBP',
  CHF = 'CHF',
  SEK = 'SEK',
  CAD = 'CAD',
  KWD = 'KWD',
  NOK = 'NOK',
  SAR = 'SAR',
  JPY = 'JPY',
  BGN = 'BGN',
  RON = 'RON',
  RUB = 'RUB',
  IRR = 'IRR',
  CNY = 'CNY',
  PKR = 'PKR',
}

export const numberFormats = {
  'en-US': { currency: { style: 'currency', currency: 'USD' } },
  'ja-JP': { currency: { style: 'currency', currency: 'JPY', currencyDisplay: 'symbol' } },
  'tr-TR': { currency: { style: 'currency', currency: 'TRY', currencyDisplay: 'symbol' } },
  'de-DE': { currency: { style: 'currency', currency: 'EUR', currencyDisplay: 'symbol' } },
  'en-AU': { currency: { style: 'currency', currency: 'AUD', currencyDisplay: 'symbol' } },
  'da-DK': { currency: { style: 'currency', currency: 'DKK', currencyDisplay: 'symbol' } },
};
