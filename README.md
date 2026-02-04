# Projeto Front-end — Pet Manager

Aplicação front-end em React + TypeScript + Vite para gestão de pets e tutores, consumindo API REST.

---

## Dados de Inscrição

| Campo | Valor |
|-------|--------|
| **Candidata** | Estela Marie Sato |
| **CPF** | 128.415.699-00 |
| **Vaga** | ANALISTA DE TI |
| **Tipo** | Projeto front-end  |

---

Credenciais para login:
```
login: admin
senha: admin
```

---

## Como executar

### Pré-requisitos

- **Node.js**
- **Yarn**

### Instalação

```bash
yarn install
```

### Executar localmente

```bash
yarn dev
```
Abre em `http://localhost:5173` .


### Build para produção

```bash
yarn build
```

Saída em `dist/`. Para pré-visualizar o build: `yarn preview`.

---

## Docker

```bash
yarn docker:build
yarn docker:run
```

## Como testar

```bash
yarn test          # watch
yarn test:run      # uma vez
yarn test:coverage
```

---

## Arquitetura

O projeto segue uma estrutura em camadas: **domain** (núcleo), **app** (regras e infra), **view** (UI) e **shared** (tipos/utils comuns).

### Visão geral

```
src/
├── app/              # Regras de aplicação e infraestrutura
│   ├── facades/      # Orquestram services + invalidação de cache (React Query)
│   ├── services/     # Chamadas HTTP (axios), auth, owners, pets
│   ├── store/        # Estado global (auth com Zustand + persist)
│   ├── health/       # Health check e liveness (ciclo de vida da app)
│   ├── lib/          # QueryClient (React Query)
│   └── utils/        # Máscaras, helpers
├── domain/           # Núcleo: entidades e regras de validação
│   ├── entities/     # Tipos/DTOs (Auth, Owner, Pet, Health)
│   └── validators/   # Schemas Zod para formulários
├── view/             # Interface
│   ├── components/  # Componentes reutilizáveis e UI (estilo shadcn)
│   ├── layouts/      # Layouts (auth, área privada)
│   └── pages/        # Páginas por feature (List, Form, Detail + hooks useX)
├── shared/           # Compartilhado entre camadas
│   ├── types/        # Tipos genéricos (listagem, paginação, imagem)
│   └── utils/        # Utilitários (ex.: cn)
├── router/           # Rotas e AuthGuard (proteção por token)
└── test/             # Setup e documentação de testes
```

### Fluxo de dados

- **View** usa apenas **facades** . Hooks por página chamam facades e reagem ao estado do React Query.
- **Facades** chamam **services** (HTTP) e fazem `queryClient.invalidateQueries` após mutações.
- **Services** usam `httpClient` (axios com interceptors: Bearer, refresh de token).
- **Domain** contém entidades e validators (Zod).
- **Auth**: Zustand (persist) + AuthGuard (validação de token com margem de expiração). Rotas privadas exigem autenticação.

### Health check

- **Liveness**: indica se a aplicação React “subiu” (sinalizado no mount da `App` via `markAppAsAlive`).
- Rota pública `/health` exibe o status (healthy/unhealthy) e o payload de liveness. Útil para monitoramento e documentação de requisitos.

---

## Stack principal

| Área | Tecnologia |
|-----|------------|
| Build / dev | Vite 7, TypeScript |
| UI | React 19, React Router 7 |
| Estilo | Tailwind CSS 4, Radix UI, Lucide icons |
| Formulários | React Hook Form, Zod (@hookform/resolvers) |
| Dados / cache | TanStack React Query |
| Auth | Zustand (persist), axios interceptors |
| Testes | Vitest, Testing Library |

---

## Resumo scripts

| Script | Descrição |
|--------|-----------|
| `yarn dev` | Sobe o servidor de desenvolvimento |
| `yarn build` | Build de produção (`tsc` + `vite build`) |
| `yarn test` | Roda testes em modo watch |
| `yarn test:run` | Roda testes uma vez |
| `yarn docker:build` | Gera a imagem Docker da aplicação (tag `pet-manager`) |
| `yarn docker:run` | Sobe o container e expõe o app em `http://localhost:3000` |
