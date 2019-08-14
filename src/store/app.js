import { observable, action } from 'mobx';
import { dark, light } from '../theme';

export default class appStore {
  @observable
  showTips = true;

  @observable
  darkMode = true;

  @observable
  colors = dark;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  setShowTips = value => {
    this.showTips = value;
  };

  @action
  changeTheme = value => {
    this.colors = this.darkMode ? light : dark;
    this.darkMode = value;
  };
}

export const app = new appStore();
