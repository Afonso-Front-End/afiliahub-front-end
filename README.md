# AfiliaHub — Frontend

Aplicação web em React com TanStack Start (SSR), preparada para deploy na **Vercel**.

## Requisitos

- Node.js 18+
- Backend da API em execução (ver `../backend/README.md`)

## Desenvolvimento local

```bash
npm install
cp .env.example .env
npm run dev
```

O frontend abre em `http://localhost:8080` e faz proxy de `/api` e `/uploads` para `http://localhost:4000`.

Em outro terminal, inicie o backend:

```bash
cd ../backend
npm run dev
```

## Deploy na Vercel

### 1. Importar o projeto

1. Envie o repositório para o GitHub.
2. Em [vercel.com/new](https://vercel.com/new), importe o repositório.
3. Defina **Root Directory** como `frontend` (monorepo).
4. Confirme que o **Framework Preset** é **TanStack Start**.

A Vercel detecta automaticamente `vite build` via `vercel.json` e o plugin **Nitro** (`preset: vercel`).

### 2. Variáveis de ambiente (Vercel)

| Variável | Obrigatória | Exemplo |
|----------|-------------|---------|
| `VITE_API_URL` | **Sim** | `https://api.seudominio.com` |

Sem `VITE_API_URL`, o browser tenta chamar `/api` no domínio da Vercel — isso só funciona em dev com proxy.

### 3. Backend em produção

O frontend **não inclui** a API. Hospede o backend separadamente (VPS, Railway, Render, etc.) e:

1. Configure `VITE_API_URL` na Vercel com a URL pública da API.
2. No backend, adicione o domínio da Vercel em `FRONTEND_URL` (CORS), por exemplo:
   ```
   FRONTEND_URL=https://seu-app.vercel.app,https://www.seudominio.com
   ```

### 4. Deploy via CLI (opcional)

```bash
cd frontend
npx vercel
```

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção (client + SSR via Nitro) |
| `npm run preview` | Pré-visualizar build local |

## Estrutura

```
frontend/
├── src/
│   ├── routes/       # Páginas (TanStack Router)
│   ├── components/   # Componentes React
│   ├── api/          # Cliente HTTP da API
│   └── ...
├── vite.config.js    # Vite + TanStack Start + Nitro (Vercel)
├── vercel.json       # Configuração Vercel
└── .env.example
```
