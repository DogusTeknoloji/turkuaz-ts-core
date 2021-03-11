import _ from 'lodash';
import { LocalStorage } from '.';

const userOptionsName = 'UserOptions';
export class UserOptions {
  protected isDarkInternal: boolean | null = null;
  protected localeInternal: string | null = null;

  constructor() {
    this.loadFromLocalStorage();
  }

  public get isDark(): boolean {
    return _.isNil(this.isDarkInternal) ? false : this.isDarkInternal;
  }

  public set isDark(value: boolean) {
    this.isDarkInternal = value;
    this.saveFromLocalStorage();
  }

  public get locale(): string {
    return _.isNil(this.localeInternal) ? 'tr' : this.localeInternal;
  }

  public set locale(value: string) {
    this.localeInternal = value;
    this.saveFromLocalStorage();
  }

  protected getOptions() {
    return {
      isDark: this.isDarkInternal,
      locale: this.localeInternal,
    } as UserOptions;
  }

  protected loadFromLocalStorage() {
    let options = this.getOptions();
    if (LocalStorage.isSupported && LocalStorage.hasItem(userOptionsName)) {
      options = {
        ...options,
        ...(JSON.parse(localStorage.getItem(userOptionsName) || '')),
      };
    } else {
      options = {
        ...options,
        isDark: false,
        locale: 'tr',
      } as UserOptions;
    }
    if (options.isDark !== this.isDarkInternal) {
      this.isDarkInternal = options.isDark;
    }
    if (options.locale !== this.localeInternal) {
      this.localeInternal = options.locale;
    }
  }

  protected saveFromLocalStorage() {
    if (LocalStorage.isSupported) {
      localStorage.setItem(userOptionsName, JSON.stringify(this.getOptions()));
    }
  }
}