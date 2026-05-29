import WebSocket from "ws";

const SYMBOLS = ["btcusdt", "ethusdt", "solusdt", "xrpusdt", "xlmusdt"];

const stream = SYMBOLS.map((s) => `${s}@trade`).join("/");

const WS_URL = `${process.env.BINANCE_WS_BASE}${stream}`;

const priceCache = {};

let ws;

function connect() {
  ws = new WebSocket(WS_URL);

  ws.on("open", () => {
    console.log("Binance WS connected");
  });

  ws.on("message", (data) => {
    try {
      const parsed = JSON.parse(data);

      const trade = parsed.data;

      const symbol = trade.s;
      const price = parseFloat(trade.p);

      priceCache[symbol] = price;
    } catch (error) {
      console.error("WS parse error", error.message);
    }
  });

  ws.on("close", () => {
    console.log("WS closed, reconnecting...");
    setTimeout(connect, 2000);
  });

  ws.on("error", (error) => {
    console.error("WS error:", error.message);
    ws.close();
  });
}

export function startMarketWS() {
  connect();
}

export function getPrices() {
  return priceCache;
}

export function getPrice(symbol) {
  return priceCache[symbol] || null;
}

const subscribers = new Set();

export function addSubscriber(res, symbols = null) {
  const client = { res, symbols };
  subscribers.add(client);

  res.on("close", () => {
    subscribers.delete(client);
  });
}

function broadcast() {
  for (const { res, symbols } of subscribers) {
    if (!symbols && !symbols.length) continue;

    const payload = {};
    for (const s of symbols) {
      if (priceCache[s]) payload[s] = priceCache[s];
    }

    res.write(`data: ${JSON.stringify(payload)}\n\n`);
  }
}

setInterval(broadcast, 1000);

// setInterval(() => {
//   console.clear();
//   console.log("📊 LIVE PRICES\n");

//   Object.entries(priceCache).forEach(([symbol, price]) => {
//     console.log(`${symbol}: ${price}`);
//   });
// }, 2000);
