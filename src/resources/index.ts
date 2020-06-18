import { Languages } from '../languages';
import { TurkuazApplication } from '..';
import tr from './tr';
import en from './en';

addResource(Languages.Turkish, tr);
addResource(Languages.Turkish, en);

export function addResource(lang: Languages, jsonResource: Record<string, any>) {
  if (!!TurkuazApplication.i18n) {
    TurkuazApplication.i18n!.messages[lang] = { ...jsonResource }
  }
}
