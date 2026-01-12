import express from "express";
import { Facilitator, createExpressAdapter, startGatewayRegistration } from "x402-open";
import { baseSepolia } from "viem/chains";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const facilitator = new Facilitator({
  evmPrivateKey: process.env.PRIVATE_KEY || "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
  evmNetworks: [baseSepolia],
  svmNetworks: [],
});

createExpressAdapter(facilitator, app, "/facilitator");

const PORT = 4101;

// Auto-register with the gateway
startGatewayRegistration({
  gatewayUrls: process.env.GATEWAY_URLS
    ? process.env.GATEWAY_URLS.split(",")
    : ["http://localhost:8080/facilitator"],
  nodeBaseUrl: process.env.NODE_BASE_URL || `http://localhost:${PORT}/facilitator`,
  kindsProvider: async () => {
    try {
      const res = await fetch(`http://localhost:${PORT}/facilitator/supported`);
      const j = await res.json();
      return j?.kinds ?? [];
    } catch (e) {
      console.error("Failed to fetch supported kinds:", e);
      return [];
    }
  },
  debug: true,
});

app.listen(PORT, () => {
  console.log(`x402 Facilitator Node running on port ${PORT}`);
});
