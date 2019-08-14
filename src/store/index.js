import { average } from './average';
import { app } from './app';
import AsyncStorage from '@react-native-community/async-storage';
import { AsyncTrunk, ignore } from 'mobx-sync';
import { observable } from 'mobx';

class rootStore {
  @ignore storeLoaded = false;

  @observable
  average = average;
  @observable
  app = app;
}

export const store = new rootStore();

const trunk = new AsyncTrunk(store, {
  storage: AsyncStorage,
  storageKey: '__Stalksta_Store__',
  delay: 1e3,
});

trunk.init().then(() => {
  store.storeLoaded = true;
});
