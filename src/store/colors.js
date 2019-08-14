import { observable, action, computed } from 'mobx';

export default class colorStore {
  @observable colors = {
    primary: '#1d1d1d',
    secondary: '#5d5d5d',
    dropdown: '#27b80d',
    background: '#1d1d1d',
    error: '#ffcc00',
    errorText: '#D8000C',
    text: '#fff',
  };
  @observable darkMode = true;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }
  @action
  test = value => {
    this.darkMode = value;
    this.colors.secondary = 'white';
  };
}

export const colorss = new colorStore();
