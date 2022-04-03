import {
  BinanceStore
} from 'stores';
import {
  BinanceService,
  ApiService,
} from '.';

export class ServiceContainer {
  private _apiService?: ApiService
  private _binanceStore?: BinanceStore
  private _binanceService?: BinanceService

  get apiService() {
    if (!this._apiService) {
      this._apiService = new ApiService();
    }
    return this._apiService;
  }

  get binanceStore() {
    if (!this._binanceStore) {
      this._binanceStore = new BinanceStore();
    }
    return this._binanceStore;
  }

  get binanceService() {
    if (!this._binanceService) {
      this._binanceService = new BinanceService(this.binanceStore, this.apiService);
    }
    return this._binanceService;
  }
}

export const serviceContainer = new ServiceContainer();
