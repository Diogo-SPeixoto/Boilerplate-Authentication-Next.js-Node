# Base Authentication

Sistema completo de autenticação com backend e frontend, desenvolvido com tecnologias modernas para fornecer uma base sólida para aplicações que necessitam de autenticação de usuários.
<br/><br/>
*Em breve em produção.*

## 📋 Funcionalidades

### Autenticação
- **Registro de usuários**: Criação de novas contas com validação de dados
- **Login**: Autenticação segura com email e senha
- **Logout**: Encerramento de sessão com limpeza de cookies
- **Refresh Token**: Renovação automática de tokens de acesso
- **Proteção de rotas**: Middleware de autenticação para rotas protegidas

### Segurança
- **Hash de senhas**: Utilização de bcryptjs para criptografia de senhas
- **JWT (JSON Web Tokens)**: Tokens de acesso e refresh para autenticação stateless
- **Cookies HTTP-only**: Armazenamento seguro de tokens em cookies
- **Rate limiting**: Proteção contra tentativas excessivas de login usando Redis
- **Validação de dados**: Validação de entrada com Zod em todas as rotas
- **CORS configurado**: Controle de acesso entre origens

### Interface do Usuário
- **Design moderno**: Interface responsiva com Tailwind CSS
- **Tema claro/escuro**: Suporte a modo claro e escuro com next-themes
- **Formulários validados**: Validação em tempo real com React Hook Form e Zod
- **Feedback visual**: Notificações toast para ações do usuário
- **Componentes reutilizáveis**: Biblioteca de componentes UI baseada em Radix UI

## 🛠️ Tecnologias Utilizadas

### Back-end
- **Fastify**: Framework web rápido e eficiente para Node.js
- **TypeScript**: Tipagem estática para maior segurança de código
- **Prisma**: ORM moderno para gerenciamento de banco de dados
- **PostgreSQL**: Banco de dados relacional
- **Redis**: Cache e armazenamento de sessões/tentativas de login
- **JWT**: Autenticação baseada em tokens
- **Zod**: Validação de schemas TypeScript-first
- **bcryptjs**: Criptografia de senhas
- **Docker Compose**: Orquestração de containers para PostgreSQL e Redis

### Front-end
- **Next.js 16**: Framework React com App Router
- **React 19**: Biblioteca para construção de interfaces
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Framework CSS utility-first
- **Radix UI**: Componentes acessíveis e customizáveis
- **React Hook Form**: Gerenciamento de formulários performático
- **Zod**: Validação de schemas (compartilhado com backend)
- **next-themes**: Gerenciamento de temas claro/escuro
- **Sonner**: Sistema de notificações toast

## 📁 Estrutura do Projeto

```
Base-Authentication/
├── Back-end/                    # API REST com Fastify
│   ├── src/
│   │   ├── app.ts              # Configuração principal da aplicação
│   │   ├── server.ts           # Servidor HTTP
│   │   ├── config/             # Arquivos de configuração
│   │   │   └── auth.config.ts  # Configurações de autenticação
│   │   ├── controllers/        # Controladores das rotas
│   │   │   ├── auth.controller.ts
│   │   │   └── users.controller.ts
│   │   ├── services/           # Lógica de negócio
│   │   │   ├── auth.service.ts
│   │   │   └── users.services.ts
│   │   ├── routes/             # Definição de rotas
│   │   │   ├── auth/
│   │   │   └── users/
│   │   ├── schemas/            # Schemas de validação Zod
│   │   │   ├── auth.schema.ts
│   │   │   └── users.schema.ts
│   │   ├── plugins/            # Plugins do Fastify
│   │   │   ├── jwt.ts          # Configuração JWT
│   │   │   ├── cookie.ts       # Configuração de cookies
│   │   │   ├── cors.ts         # Configuração CORS
│   │   │   ├── prisma.ts       # Cliente Prisma
│   │   │   └── redis.ts        # Cliente Redis
│   │   ├── utils/              # Utilitários
│   │   │   └── hash.ts         # Funções de hash de senha
│   │   └── errors.ts           # Catálogo de erros
│   ├── prisma/
│   │   ├── schema.prisma       # Schema do banco de dados
│   │   └── migrations/         # Migrações do banco
│   ├── generated/              # Código gerado pelo Prisma
│   ├── docker-compose.yml      # Configuração Docker
│   ├── package.json
│   └── tsconfig.json
│
└── Front-end/                   # Aplicação Next.js
    ├── app/                     # App Router do Next.js
    │   ├── (auth)/             # Rotas protegidas (grupo de rotas)
    │   │   ├── dashboard/      # Página do dashboard
    │   │   └── layout.tsx      # Layout para rotas autenticadas
    │   ├── (public)/           # Rotas públicas (grupo de rotas)
    │   │   ├── login/          # Página de login
    │   │   ├── register/       # Página de registro
    │   │   ├── callback/       # Callback de autenticação
    │   │   └── layout.tsx      # Layout para rotas públicas
    │   ├── actions/            # Server Actions
    │   │   └── auth.ts         # Ações de autenticação
    │   ├── api/                # API Routes
    │   │   └── getUser.ts      # Endpoint para obter usuário
    │   ├── layout.tsx          # Layout raiz
    │   ├── page.tsx            # Página inicial (redireciona para login)
    │   └── globals.css         # Estilos globais
    ├── components/             # Componentes React
    │   ├── auth/               # Componentes de autenticação
    │   │   ├── login-form.tsx
    │   │   ├── register-form.tsx
    │   │   ├── user-profile.tsx
    │   │   └── footer-auth.tsx
    │   ├── ui/                 # Componentes UI reutilizáveis
    │   ├── input-form.tsx
    │   └── theme-provider.tsx
    ├── hooks/                  # Custom hooks
    │   ├── use-mobile.ts
    │   └── use-toast.ts
    ├── lib/                    # Utilitários e configurações
    │   ├── definitions.ts      # Definições de tipos e schemas
    │   └── utils.ts            # Funções utilitárias
    ├── public/                 # Arquivos estáticos
    │   └── icons/
    ├── package.json
    ├── tsconfig.json
    └── next.config.mjs
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- Docker e Docker Compose
- npm ou pnpm

### Back-end

1. Navegue até a pasta do backend:
```bash
cd Back-end
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie os serviços Docker (PostgreSQL e Redis):
```bash
docker-compose up -d
```

4. Configure as variáveis de ambiente (crie um arquivo `.env`):
```env
DATABASE_URL="postgresql://docker:docker@localhost:5432/baseproject"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="seu-secret-jwt-aqui"
NODE_ENV="development"
```

5. Execute as migrações do Prisma:
```bash
npx prisma migrate dev
```

6. Gere o cliente Prisma:
```bash
npx prisma generate
```

7. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3333`

### Front-end

1. Navegue até a pasta do frontend:
```bash
cd Front-end
```

2. Instale as dependências:
```bash
npm install
# ou
pnpm install
```

3. Configure as variáveis de ambiente (crie um arquivo `.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:3333
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
pnpm dev
```

A aplicação estará rodando em `http://localhost:3000`

## 📝 Endpoints da API

### Autenticação
- `POST /auth/login` - Realizar login
- `POST /auth/refresh` - Renovar tokens de acesso
- `DELETE /auth/logout` - Realizar logout

### Usuários
- `POST /users` - Criar novo usuário (registro)
- `GET /users/:id` - Obter informações do usuário (requer autenticação)

## 🔐 Segurança

- Senhas são hasheadas usando bcryptjs antes de serem armazenadas
- Tokens JWT são armazenados em cookies HTTP-only para proteção contra XSS
- Implementado rate limiting para prevenir ataques de força bruta
- Validação rigorosa de entrada em todas as rotas
- CORS configurado para controle de acesso entre origens

## 📄 Licença

Este projeto é uma base de autenticação e pode ser usado como ponto de partida para seus projetos.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.
