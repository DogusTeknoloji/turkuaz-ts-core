import VueI18n from 'vue-i18n';

// moment import
import * as moment from 'moment';
import 'moment/locale/tr';

export function setMomentLanguage(i18n: VueI18n) {
  if (i18n.locale === 'tr') {
    // moment localization
    // import(/* webpackChunkName: "lang-tr" */ './moment-setup-tr').then(() => { moment.locale('tr'); });
    moment.locale('tr');
  } else if (i18n.locale === 'en') {
    // moment localization
    moment.locale('en');
  }
}
