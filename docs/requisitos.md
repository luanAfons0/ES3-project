# Documento de Requisitos — Sistema de Gerenciamento de Convites

**Data:** 20/03/2026
**Projeto:** Plataforma de convites digitais para eventos

---

## 1. Requisitos Funcionais

### 1.1 Autenticação e Usuários
- RF01 — O sistema deve permitir que novos usuários se cadastrem com nome, e-mail e senha.
- RF02 — O sistema deve permitir que usuários cadastrados realizem login com e-mail e senha.
- RF03 — O sistema deve encerrar a sessão do usuário ao fazer logout.
- RF04 — Senhas devem ser armazenadas de forma segura (hash).

### 1.2 Gerenciamento de Convites
- RF05 — O criador deve poder criar um convite informando título, data do evento, local, descrição e imagem de capa.
- RF06 — Cada convite deve ter um slug único que compõe sua URL pública.
- RF07 — O criador deve poder editar as informações de um convite existente.
- RF08 — O criador deve poder excluir um convite.
- RF09 — O criador deve poder ativar ou desativar um convite (controle de acesso público).
- RF10 — O dashboard deve listar todos os convites do criador com métricas de RSVP (total, confirmados, recusados, pendentes).

### 1.3 Editor de Blocos (CMS)
- RF11 — O criador deve poder adicionar blocos de conteúdo ao convite: texto, imagem e botão.
- RF12 — O criador deve poder reordenar os blocos via drag-and-drop.
- RF13 — O criador deve poder editar o conteúdo de cada bloco individualmente.
- RF14 — O criador deve poder remover blocos do convite.

### 1.4 Lista de Convidados
- RF15 — O criador deve poder adicionar convidados à lista informando nome e e-mail.
- RF16 — O sistema deve impedir e-mails duplicados por convite.
- RF17 — O criador deve poder remover convidados da lista.
- RF18 — O criador deve poder visualizar o status de RSVP de cada convidado (pendente, confirmado, recusado).

### 1.5 Acesso Público e RSVP
- RF19 — Convidados devem acessar o convite por meio de uma URL única.
- RF20 — Ao acessar o convite, o convidado deve informar seu e-mail para verificação contra a lista de convidados.
- RF21 — Apenas e-mails cadastrados na lista de convidados devem ter acesso ao conteúdo do convite.
- RF22 — Após verificação, o convidado deve poder confirmar ou recusar presença.
- RF23 — Cada convidado pode registrar apenas um RSVP por convite, com possibilidade de atualização.

---

## 2. Requisitos Não-Funcionais

### 2.1 Segurança
- RNF01 — Senhas devem ser armazenadas com hash (ex.: bcrypt).
- RNF02 — A autenticação deve ser baseada em tokens (JWT ou similar) com prazo de expiração.
- RNF03 — Rotas do dashboard devem ser protegidas e acessíveis apenas por usuários autenticados.
- RNF04 — O acesso ao conteúdo público de um convite deve ser restrito a convidados verificados.

### 2.2 Desempenho
- RNF05 — As páginas devem carregar em menos de 2 segundos em conexões padrão.
- RNF06 — O servidor deve suportar múltiplas requisições simultâneas sem degradação perceptível.

### 2.3 Usabilidade e Acessibilidade
- RNF07 — A interface deve ser responsiva para dispositivos móveis e desktops.
- RNF08 — Componentes interativos devem seguir padrões de acessibilidade (WCAG 2.1 AA), utilizando primitivos acessíveis (ex.: Radix UI).
- RNF09 — O sistema deve suportar tema claro e escuro, respeitando a preferência do sistema do usuário.

### 2.4 Manutenibilidade
- RNF10 — O código frontend deve ser escrito em TypeScript com tipagem explícita.
- RNF11 — O projeto deve passar nas verificações de lint, build e análise de código não utilizado (Knip) sem erros.

### 2.5 Integridade de Dados
- RNF12 — O banco de dados deve garantir unicidade de e-mail por usuário e de slug por convite.
- RNF13 — A relação entre convidados e RSVPs deve ser de um para um (um RSVP por convidado).
- RNF14 — A exclusão de um convite deve remover em cascata seus blocos, convidados e RSVPs associados.

---

## 3. Requisitos Desejáveis

- RD01 — Envio de e-mail de confirmação de RSVP ao convidado após resposta.
- RD02 — Envio de notificação por e-mail ao criador quando um convidado responder ao RSVP.
- RD03 — Exportação da lista de convidados com status de RSVP em formato CSV.
- RD04 — Suporte a upload direto de imagem de capa e imagens em blocos (armazenamento em nuvem).
- RD05 — Pré-visualização do convite pelo criador antes de publicá-lo.
- RD06 — Histórico de alterações ou versionamento de convites.
- RD07 — Templates pré-definidos de convite para agilizar a criação.
- RD08 — Suporte a domínio customizado para a URL do convite.
- RD09 — Painel de analytics com visualização gráfica da evolução dos RSVPs ao longo do tempo.
- RD10 — Limite configurável de convidados por convite (controle de capacidade do evento).
