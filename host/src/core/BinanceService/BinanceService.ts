import { BinanceStore } from 'stores';
import { ApiService } from 'core';
import { DepthDTO, DiffDepthDTO } from 'types';
import { BINANCE_DEPTH_URL, BINANCE_DEPTH_WS } from './urls';

class BinanceService {
  private _store: BinanceStore
  private _api: ApiService
  private _ws?: WebSocket

  constructor(store: BinanceStore, api: ApiService) {
    this._store = store
    this._api = api
  }

  async getDepth(symbol: string, limit?: number) {
    this._store.depth = await this._api.get(BINANCE_DEPTH_URL(symbol, limit));
  }

  openDepthWS(symbol: string) {
    this._ws = new WebSocket(BINANCE_DEPTH_WS(symbol));
    this._ws.onmessage = (event) => {
      const depthDiffData: DiffDepthDTO = JSON.parse(event.data);
      const currentDepthData: DepthDTO | null = this._store.depth;
      if (currentDepthData && depthDiffData.u > currentDepthData.lastUpdateId) {
        const newDepthData = { ...currentDepthData };
        depthDiffData.b.forEach((bid) => {
          if (bid[1] > 0) {
            newDepthData.bids = [bid, ...newDepthData.bids];
            newDepthData.bids.splice(newDepthData.bids.length - 1);
          }
        });
        depthDiffData.a.forEach((ask) => {
          if (ask[1] > 0) {
            newDepthData.asks = [ask, ...newDepthData.asks];
            newDepthData.asks.splice(newDepthData.asks.length - 1);
          }
        });
        this._store.depth = newDepthData;
      }
    };
  }
}

export { BinanceService };
