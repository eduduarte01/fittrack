# Plano de Gestão de Configuração de Software — FitTrack

**Projeto:** FitTrack  
**Repositório oficial:** <https://github.com/eduduarte01/fittrack>  
**Responsável pelo repositório:** `eduduarte01`  
**Versão do plano:** 1.0  
**Situação:** plano inicial do projeto

## 1. Objetivo e escopo

Este plano define como identificar, versionar, revisar, proteger e liberar os itens de configuração do FitTrack. Aplica-se ao código-fonte, testes, dependências, documentação e configurações necessárias para executar a aplicação. Seu propósito é manter histórico rastreável e reduzir o risco de alterações acidentais ou não revisadas na versão principal.

## 2. Itens de configuração

Cada item é controlado pelo Git e mantido no repositório oficial:

| Identificador | Item | Localização ou controle |
|---|---|---|
| CI-01 | Código-fonte da aplicação e módulos de domínio | `src/`, `modules/`, `routes/`, `middlewares/` |
| CI-02 | Interface, recursos estáticos e uploads versionados | `views/`, `public/` |
| CI-03 | Testes e configuração de teste | `tests/`, `test/`, `vitest.config.js` |
| CI-04 | Manifestos e versões de dependências | `package.json`, `package-lock.json` |
| CI-05 | Configuração do projeto | `config/`, arquivos de configuração versionados |
| CI-06 | Documentação técnica e de GCS | `README.md`, `docs/` |
| CI-07 | Ambientes e regras de proteção | Configuração do GitHub para branches e environments |

Credenciais, senhas, tokens, arquivos `.env` reais e dados pessoais não são itens versionados. Devem permanecer em armazenamento local protegido ou em secrets do GitHub Actions, quando necessários.

## 3. Repositório e organização

O repositório público `eduduarte01/fittrack` é a fonte oficial do projeto. O branch `main` representa a linha de base integrada e estável. A estrutura deve manter responsabilidades separadas em diretórios de código, testes, recursos e documentação. Novos documentos de processo devem ser publicados em `docs/` e apontados pelo README.

## 4. Identificação de versões e estratégia de branches

- `main`: linha de base do projeto. Alterações entram por pull request; push direto e force push devem ser bloqueados pelas regras do GitHub.
- `feature/<resumo>`: novas funcionalidades.
- `fix/<resumo>`: correções.
- `docs/<resumo>`: documentação e atividades de processo.

Os nomes de branch devem ser curtos, em minúsculas e descrever a mudança. Commits devem usar mensagens objetivas e indicar a intenção da alteração. Versões entregáveis devem ser marcadas com tags `vMAJOR.MINOR.PATCH` (por exemplo, `v1.0.0`), seguindo versionamento semântico: mudanças incompatíveis incrementam MAJOR, funcionalidades compatíveis incrementam MINOR e correções compatíveis incrementam PATCH.

## 5. Controle de mudanças e revisão

1. Registrar a necessidade da mudança em uma issue ou descrever o motivo no pull request.
2. Criar branch de trabalho a partir da versão atual de `main`.
3. Implementar a mudança e atualizar testes e documentação afetados.
4. Executar localmente `npm run test:run` antes de abrir o pull request.
5. Abrir pull request com resumo, justificativa, riscos e evidências de teste.
6. Solicitar revisão do par designado, que deverá ter acesso de escrita ao repositório. O merge depende de pelo menos uma aprovação e não pode ser aprovado pelo autor da própria alteração.
7. Incorporar comentários e repetir os testes após alterações relevantes.
8. Fazer merge somente quando a revisão estiver aprovada. A branch `main` deve exigir pull request, uma aprovação e aplicar a regra também ao administrador.

O colaborador que atuará como par de revisão deve ser registrado neste plano após confirmação do seu usuário GitHub e concessão de permissão de escrita. Até esse registro, o requisito de par não deve ser considerado comprovado.

## 6. Baselines e releases

Uma baseline é uma versão integrada e identificável do conjunto de itens de configuração. A baseline inicial é o commit registrado na `main` quando este plano for aprovado. Releases devem ser criadas a partir de `main`, identificadas por tag semântica e acompanhadas de notas resumindo funcionalidades, correções e limitações conhecidas. Mudanças após a criação de uma release são realizadas em novos branches e pull requests; não se altera silenciosamente uma tag publicada.

## 7. Ambientes de implantação

- **`staging`:** ambiente de validação antes da produção. Deve receber versões candidatas e permitir testes de integração e aceitação. Segredos específicos, se necessários, ficam nos secrets do environment.
- **`production`:** ambiente de produção. A implantação deve ocorrer a partir de branch protegida. `eduduarte01` deve constar como revisor obrigatório de implantação. A aprovação de produção deve ocorrer depois da validação em staging; credenciais de produção não devem ser compartilhadas nem colocadas no repositório.

Os ambientes são configurados em **Settings → Environments** no GitHub e suas regras devem ser verificadas sempre que o processo de release mudar.

## 8. Verificação e evidências

A conformidade deste plano é verificada por: (a) visibilidade pública do repositório; (b) proteção da `main` exigindo pull request e pelo menos uma aprovação, aplicada também a administradores; (c) evidência de rejeição de uma tentativa de push direto à `main`; (d) existência de um par com permissão de escrita; e (e) existência dos environments `staging` e `production`, com `eduduarte01` como revisor obrigatório de `production`.

Evidências devem ser mantidas no histórico do GitHub ou em `docs/evidencias/`, sem incluir tokens, segredos ou dados pessoais. Revisar este plano quando o fluxo de branches, a composição do par ou a estratégia de implantação mudar.

## 9. Responsabilidades

O responsável pelo repositório administra branches protegidas, environments e permissões; o par revisa mudanças submetidas por pull request; e o autor da mudança mantém o código, testes e documentação atualizados e fornece evidência de validação. Uma pessoa não deve aprovar a própria alteração.
