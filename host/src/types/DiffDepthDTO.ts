type Value = number[];

export type DiffDepthDTO = {
  e: string, // Event type
  E: number, // Event time
  s: string, // Symbol
  U: number, // First update ID in event
  u: number, // Final update ID in event
  b: Value[], // Bids to be updated
  a: Value[], // Asks to be updated
};