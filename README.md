# Simple Chat

Simple chat app

## Tech Stack

- Frontend
    - Vue + TypeScript
    - Pinia
    - Vue Router
    - Socket.IO-client
    - TailwindCSS
- Backend
    - Express
    - Socket.IO

## Run Locally

**Install dependencies**

```bash
  pnpm install
```

**Create apps/server/.env file with the following variables**

```
PORT=7000
ORIGIN=http://localhost:5173
CLEAR_MESSAGES_INTERVAL=600000
```

**Create apps/web/.env file with the following variable**

```
VITE_SERVER_URL=http://localhost:7000
```

**Start dev server**

```bash
  pnpm apps:dev
```
