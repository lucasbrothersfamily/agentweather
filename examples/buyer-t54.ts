// Buy one AgentWeather report on XRPL mainnet with t54's x402-xrpl SDK.
// usage: BUYER_SEED=s... npx tsx examples/buyer-t54.ts [route]
// Safety: pays only XRP on xrpl:0, only to the AgentWeather wallet, never more than MAX_DROPS.
import { x402Fetch, decodePaymentResponseHeader } from "x402-xrpl";
import { Wallet } from "xrpl";

const PAY_TO = "rnFHPGmgTLSg7hjzfr8wiHaTdTh3PijrZZ";
const route = process.argv[2] ?? "/v1/agent-weather/current";
const url = `https://api.agentweather.io${route}`;
const MAX_DROPS = process.env.MAX_DROPS ?? "20000"; // 0.02 XRP cap
const wallet = Wallet.fromSeed(process.env.BUYER_SEED!); // your own wallet; never commit a seed

const fetchPaid = x402Fetch({
  wallet, network: "xrpl:0", wsUrl: process.env.XRPL_WS ?? "wss://xrplcluster.com",
  invoiceBinding: "invoice_id", maxValue: MAX_DROPS, maxFeeDrops: "100",
  paymentRequirementsSelector: (accepts: any[]) => {
    const r = accepts.find((a) => a.asset === "XRP" && a.network === "xrpl:0" && a.payTo === PAY_TO);
    if (!r) throw new Error("no XRP mainnet option to the AgentWeather wallet");
    return r;
  },
});

const resp = await fetchPaid(url);
const pr = resp.headers.get("PAYMENT-RESPONSE");
console.log("status", resp.status);
if (pr) console.log("payment", decodePaymentResponseHeader(pr));
console.log(JSON.stringify(await resp.json().catch(() => null), null, 2));
