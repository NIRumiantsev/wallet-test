const BINANCE_URL = 'https://api.binance.com/api/v3';
const BINANCE_WS = 'wss://stream.binance.com:9443/ws'

export const BINANCE_DEPTH_WS = (symbol: string) => `${BINANCE_WS}/${symbol}@depth`

export const BINANCE_DEPTH_URL = (symbol: string, limit?: number) => `${BINANCE_URL}/depth?symbol=${symbol}&limit=${limit || 500}`;
