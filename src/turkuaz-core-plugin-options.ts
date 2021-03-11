import VueI18n from 'vue-i18n';
import { UserOptions } from './user-options';

export default interface TurkuazCorePluginOptions<T extends UserOptions> {
  i18n: VueI18n,
  userOptions: T,
}