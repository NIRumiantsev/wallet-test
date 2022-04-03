import {
  makeAutoObservable,
  toJS,
} from 'mobx';
import { DepthDTO } from 'types';

class BinanceStore {
  private _depth: DepthDTO | null = null

  constructor() {
    makeAutoObservable(this);
  }

  set depth(depthData: DepthDTO | null) {
    this._depth = depthData;
  }

  get depth() {
    return toJS(this._depth);
  }
}

export { BinanceStore };
