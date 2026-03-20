# DER — Diagrama Entidade-Relacionamento

```mermaid
erDiagram
    USUARIOS {
        uuid        id            PK
        varchar     nome
        varchar     email         UK
        varchar     hash_senha
        timestamp   criado_em
        timestamp   atualizado_em
    }

    CONVITES {
        uuid        id            PK
        uuid        usuario_id    FK
        varchar     titulo
        varchar     slug          UK
        timestamp   data_evento
        varchar     local_evento
        text        descricao
        text        url_imagem_capa
        boolean     ativo
        timestamp   criado_em
        timestamp   atualizado_em
    }

    BLOCOS_CONVITE {
        uuid        id            PK
        uuid        convite_id    FK
        tipo_bloco  tipo
        jsonb       conteudo
        int         posicao
        timestamp   criado_em
        timestamp   atualizado_em
    }

    CONVIDADOS {
        uuid        id            PK
        uuid        convite_id    FK
        varchar     nome
        varchar     email
        timestamp   criado_em
    }

    CONFIRMACOES {
        uuid                id            PK
        uuid                convidado_id  FK "UK"
        status_confirmacao  status
        timestamp           respondido_em
        timestamp           criado_em
        timestamp           atualizado_em
    }

    USUARIOS        ||--o{ CONVITES        : "cria"
    CONVITES        ||--o{ BLOCOS_CONVITE  : "contém"
    CONVITES        ||--o{ CONVIDADOS      : "possui"
    CONVIDADOS      ||--o| CONFIRMACOES    : "responde"
```
