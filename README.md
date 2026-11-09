# FitTrack(APP DE TREINOS)

Aplicação web para acompanhamento de treinos, construída com Node.js, Express, EJS e Sequelize.

## Requisitos

- Node.js e npm
- Banco de dados MySQL configurado para a aplicação

## Executar localmente

```bash
npm install
npm run dev
```

A aplicação inicia pelo arquivo `src/server.js`. Configure as variáveis de ambiente necessárias ao banco de dados no arquivo `.env` local. Não versione credenciais, tokens ou outros segredos.

## Testes

```bash
npm test       # modo interativo
npm run test:run
npm run test:coverage
```

Os testes Vitest estão em `tests/`.

## Estrutura principal

- `src/`: aplicação e servidor
- `modules/`: módulos do domínio
- `routes/`: rotas HTTP
- `middlewares/`: middlewares
- `config/`: configurações da aplicação
- `views/`: páginas EJS
- `public/`: arquivos estáticos e uploads
- `tests/` e `test/`: testes e configuração de teste
- [`docs/plano-gcs.md`](docs/plano-gcs.md): Plano de Gestão de Configuração de Software

## Gestão de Configuração

O fluxo de configuração, revisão e liberação está descrito no [Plano de GCS](docs/plano-gcs.md). Alterações destinadas à `main` devem ser enviadas por pull request e aprovadas antes do merge, conforme as regras de proteção configuradas no GitHub.
