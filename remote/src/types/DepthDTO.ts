export type Value = number[];

export type DepthDTO = {
  lastUpdateId: number,
  bids: Value[],
  asks: Value[],
};