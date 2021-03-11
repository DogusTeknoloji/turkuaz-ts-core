import Vue from 'vue';
import VueI18n from 'vue-i18n';
import {
  TurkuazLocalizationService,
  TurkuazQueueService,
  TurkuazMessageService,
  Bus,
} from '.';
import { UserOptions } from './user-options';

export interface ITurkuazApplication<T extends UserOptions> {
  [key: string]: any;

  i18n: VueI18n | null;
  bus: Bus<T> | null;
  localizationService: TurkuazLocalizationService | null;
  queueService: TurkuazQueueService | null;
  messageService: TurkuazMessageService | null;
}
