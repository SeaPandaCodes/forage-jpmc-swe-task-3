import { ServerRespond } from "./DataStreamer";

export interface Row {
  price_abc: number;
  price_def: number;
  ratio: number;
  timestamp: Date;
  upper_bound: number;
  lower_bound: number;
  trigger_alert: number | undefined;
}

export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]) {
    const stockABC = serverResponds[0];
    const stockEFG = serverResponds[1];
    const priceABC = (stockABC.top_ask.price + stockABC.top_bid.price) / 2;
    const priceEFG = (stockEFG.top_ask.price + stockEFG.top_bid.price) / 2;
    const ratio = priceABC / priceEFG;
    const upperBound = 1 + 0.05;
    const lowerBound = 1 - 0.05;

    return {
      price_abc: priceABC,
      price_def: priceEFG,
      ratio: ratio,
      timestamp:
        stockABC.timestamp > stockEFG.timestamp
          ? stockABC.timestamp
          : stockEFG.timestamp,
      upper_bound: upperBound,
      lower_bound: lowerBound,
      trigger_alert:
        ratio > upperBound || ratio < lowerBound ? ratio : undefined,
    };
  }
}
