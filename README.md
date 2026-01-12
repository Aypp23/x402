# x402 Facilitator Node

A decentralized payment verification node for the [x402-open](https://github.com/VanshSahay/x402-open) protocol, built with Express.js.

## What is this?

This server acts as a **Facilitator Node** in the x402 network. It verifies and settles blockchain payments (currently supporting Base Sepolia) so that other applications can trust that transactions actually happened.

## Quick Start

### Prerequisites
- Node.js 18+
- An EVM private key (for signing transactions)
- Some Base Sepolia ETH (for gas fees)

### Installation

```bash
cd server
npm install
```

### Configuration

Create a `.env` file in the `server` directory:

```env
PRIVATE_KEY=your_private_key_here
```

### Running

```bash
npm start
```

The server will start on `http://localhost:4101`.

## Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/facilitator/supported` | GET | Returns supported payment networks |
| `/facilitator/verify` | POST | Verifies a payment payload |
| `/facilitator/settle` | POST | Settles a verified payment |

## Example Response

```bash
curl http://localhost:4101/facilitator/supported
```

```json
{"kinds":[{"x402Version":1,"scheme":"exact","network":"base-sepolia"}]}
```

## Deployment

To get a public URL for your facilitator:

1. Push this repo to GitHub
2. Deploy on [Render](https://render.com) or [Railway](https://railway.app)
3. Add `PRIVATE_KEY` as an environment variable in the dashboard
4. Your endpoint will be: `https://your-app.onrender.com/facilitator`

## License

MIT
