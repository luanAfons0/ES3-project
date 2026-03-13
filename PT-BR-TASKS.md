# Tarefas do Projeto

---

## BACKEND

### 1. Configuração do Projeto

- [ ] Inicializar o projeto (linguagem, framework, gerenciador de pacotes)
- [ ] Configurar variáveis de ambiente (`.env`)
- [ ] Configurar conexão com o banco de dados
- [ ] Executar as migrações iniciais a partir do `database.dbml`
- [ ] Definir a estrutura de pastas do projeto

### 2. Autenticação

- [ ] `POST /auth/register` — criar conta de usuário
- [ ] `POST /auth/login` — autenticar e retornar JWT
- [ ] Middleware JWT para rotas protegidas

### 3. Convites

- [ ] `POST /invitations` — criar convite
- [ ] `GET /invitations` — listar convites do criador
- [ ] `GET /invitations/:id` — obter detalhes do convite
- [ ] `PUT /invitations/:id` — atualizar convite
- [ ] `DELETE /invitations/:id` — excluir convite
- [ ] Validação de unicidade do slug

### 4. Blocos de Convite (CMS)

- [ ] `POST /invitations/:id/blocks` — adicionar bloco
- [ ] `PUT /invitations/:id/blocks/:blockId` — atualizar conteúdo do bloco
- [ ] `DELETE /invitations/:id/blocks/:blockId` — remover bloco
- [ ] `PATCH /invitations/:id/blocks/reorder` — atualizar posição dos blocos

### 5. Gerenciamento de Convidados

- [ ] `POST /invitations/:id/guests` — adicionar convidado
- [ ] `GET /invitations/:id/guests` — listar convidados
- [ ] `DELETE /invitations/:id/guests/:guestId` — remover convidado
- [ ] Garantir e-mail único por convite

### 6. Controle de Acesso (Público)

- [ ] `POST /e/:slug/verify` — validar e-mail do convidado contra a lista de convidados
- [ ] Retornar dados do convite somente se o e-mail for válido
- [ ] Retornar erro adequado se o e-mail não estiver na lista

### 7. RSVP

- [ ] `POST /e/:slug/rsvp` — convidado confirma presença (confirmado/recusado)
- [ ] Impedir envios duplicados de RSVP

### 8. Dashboard

- [ ] `GET /invitations/:id/dashboard` — retornar métricas (total, confirmados, recusados, pendentes)

---

## FRONTEND

### 1. Configuração do Projeto

- [ ] Inicializar o projeto frontend (framework, estilização)
- [ ] Configurar roteamento
- [ ] Configurar cliente de API (URL base, cabeçalhos de autenticação)
- [ ] Configurar estado global / contexto de autenticação

### 2. Páginas de Autenticação

- [ ] Página de cadastro (nome, e-mail, senha)
- [ ] Página de login (e-mail, senha)
- [ ] Guarda de rota protegida (redirecionar se não autenticado)

### 3. Dashboard do Criador

- [ ] Listar todos os convites criados pelo usuário logado
- [ ] Estatísticas rápidas por convite (convidados, RSVPs)
- [ ] Botão para criar novo convite
- [ ] Botão para copiar link do convite

### 4. Formulário de Convite

- [ ] Formulário de criação / edição de convite (título, slug, data, local, descrição, imagem de capa)
- [ ] Pré-visualização do slug (ex.: `invitation.app/e/meu-evento`)
- [ ] Excluir convite com confirmação

### 5. Editor de Blocos do Convite (CMS)

- [ ] Exibir lista ordenada de blocos
- [ ] Adicionar bloco (selecionar tipo: texto, imagem, botão)
- [ ] Editar conteúdo do bloco inline
- [ ] Remover bloco
- [ ] Reordenar blocos (arrastar e soltar ou controles de subir/descer)

### 6. Página de Gerenciamento de Convidados

- [ ] Listar convidados (nome, e-mail)
- [ ] Formulário para adicionar convidado (nome + e-mail)
- [ ] Remover convidado
- [ ] Exibir status de RSVP por convidado

### 7. Página Pública do Convite (`/e/:slug`)

- [ ] Tela de verificação de e-mail (campo de entrada + enviar)
- [ ] Exibir erro se o e-mail não estiver na lista de convidados
- [ ] Renderizar blocos do convite em ordem após o acesso ser concedido
- [ ] Exibir informações do evento (título, data, local)

### 8. Componente de RSVP

- [ ] Prompt "Você vai comparecer?" com botões Sim / Não
- [ ] Exibir feedback de confirmação após o envio
- [ ] Desabilitar botões se o RSVP já foi enviado

---

## INTEGRAÇÃO

### 1. Fluxo de Autenticação

- [ ] Conectar formulários de cadastro/login ao backend
- [ ] Armazenar JWT e anexar a todas as requisições autenticadas
- [ ] Tratar expiração de token e logout

### 2. Gerenciamento de Convites

- [ ] Conectar lista de convites ao `GET /invitations`
- [ ] Conectar formulário de criação/edição ao `POST` / `PUT /invitations/:id`
- [ ] Conectar exclusão ao `DELETE /invitations/:id`

### 3. Editor de Blocos

- [ ] Conectar ações de adicionar/editar/excluir/reordenar blocos aos endpoints de blocos do backend
- [ ] Refletir o estado salvo no editor após cada operação

### 4. Gerenciamento de Convidados

- [ ] Conectar lista de convidados e ações de adicionar/remover ao backend
- [ ] Exibir status de RSVP obtido do endpoint de lista de convidados

### 5. Controle de Acesso

- [ ] Conectar formulário de verificação de e-mail ao `POST /e/:slug/verify`
- [ ] Em caso de sucesso, buscar e renderizar os blocos do convite
- [ ] Em caso de falha, exibir mensagem de acesso negado

### 6. RSVP

- [ ] Conectar botões Sim/Não ao `POST /e/:slug/rsvp`
- [ ] Tratar estado de resposta já enviada

### 7. Métricas do Dashboard

- [ ] Conectar a visualização do dashboard ao `GET /invitations/:id/dashboard`
- [ ] Exibir contagens em tempo real (total, confirmados, recusados, pendentes)

### 8. Testes de Ponta a Ponta

- [ ] Fluxo completo do criador: cadastro → criar convite → adicionar blocos → adicionar convidados → compartilhar link
- [ ] Fluxo completo do convidado: abrir link → verificação de e-mail → visualizar convite → RSVP
- [ ] Verificar se as métricas do dashboard são atualizadas corretamente após os RSVPs
