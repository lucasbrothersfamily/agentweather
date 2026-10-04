# AgentWeather

> **Official repo:** [github.com/agentweather/agent-weather](https://github.com/agentweather/agent-weather). Docs, API spec, examples and releases are maintained there, so please open issues there. This copy may lag behind.

Conditions reports for the AI-agent economy, sold per request over x402 on the XRP Ledger.
"Weather" here means the collective behavior of AI agents: observed activity, pressure (load),
storms (outages and surges), and baselines, with sources, timestamps and confidence on every value.

**Live:** `https://api.agentweather.io` (mainnet since 2026-09-27)
**Pay to:** `rnFHPGmgTLSg7hjzfr8wiHaTdTh3PijrZZ` · facilitator: t54 · XRP or RLUSD
**Discovery:** `/.well-known/x402` · `/openapi.json` · `/llms.txt` · `/.well-known/agent-card.json`
**Directory:** listed on the XRPL AI Hub (xrpl-ai.org)

## Paid routes

| Route | What you get | XRP (drops, auto-priced) | RLUSD |
|---|---|---|---|
| `/v1/agent-weather/current` | Current conditions report: activity, pressure, storms, confidence | 6,500 | 0.01 |
| `/v1/agent-weather/x402-activity` | XRPL x402 payment activity, real-vs-automated split, 7-day baselines | 6,500 | 0.01 |
| `/v1/pulse/storm` | Is there an outage or surge right now? | 1,000 | 0.001 |
| `/v1/pulse/facilitator` | Facilitator activity snapshot | 1,000 | 0.001 |
| `/v1/pulse/providers` | Active x402 providers snapshot | 1,000 | 0.001 |
| `/v1/merchant/{address}` | Due-diligence report on one XRPL x402 merchant | 20,000 | 0.03 |
| `/v1/health/report` | Endpoint health of hub merchants | 6,500 | 0.01 |
| `/v1/price-index` | Price index of x402 services on XRPL | 3,300 | 0.005 |

XRP prices follow the XRP/USD rate; the `402` response always carries the current amount.

## How to buy (one request)

1. `GET` a route. You get `402 Payment Required` with `accepts` (amount, asset, `payTo`, invoice).
2. Sign an XRPL `Payment` for that amount to `payTo` with the invoice reference from the 402.
3. Retry the same `GET` with the `X-PAYMENT` header. t54 settles, and you get the JSON report.

Working buyer example: `examples/buyer-t54.ts` (set your own wallet seed in env; never commit it).

## Data and honesty rules

- Observed values are labeled **measured**; anything estimated is labeled **modeled**, with its method.
- Derived values (USD, $/kWh, headroom, action flags) ship with their formula.
- History: a full 7-day XRPL backfill (2026-09-20 to 09-27) feeds the baselines.
- Patterns are only promoted to forecasts after they beat a flat baseline on held-out data.
  Current finding: XRPL agent payments show no reliable daily or weekly cycle; the useful signal is
  regime changes and outages (alerts are on the roadmap).

## Status (2026-10-03)

- 8 paid routes live; discovery metadata live; usage and cost metering on.
- Grid/energy conditions module (ERCOT, EIA-930, CAISO, AEMO, Elexon, NESO) collecting, not yet sold.
- Roadmap: fleet outage and regime-change alerts, a de-fleeted activity feed, a free sample route.

Data credits: XRP Ledger public nodes; U.S. Energy Information Administration (EIA-930). No endorsement implied.
