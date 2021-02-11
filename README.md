# API Autenticação

### Tecnologias que foram usadas: 

- Node 12.x
- Knex
- Docker-compose

### Objetivos da API: 
- Criar usuário, realizar login e listar usuários cadastrados.

## Instalação

Instalação do docker conforme seu sistema operacional: [Docker](https://docs.docker.com/engine/install/).

Instalação do docker-compose conforme seu sistema operacional: [Docker compose](https://docs.docker.com/compose/install/).

Para finalizar a instalação da API clone o projeto no link a seguir: `https://github.com/orenansouza/auth-api.git`.

**Iniciando o banco de dados**

Vá a raiz do seu projeto inicie o banco de dados com o comando `docker-compose up`.

**Iniciando tabelas do banco de dados**

Vá a raiz do seu projeto e rode o comando `npx knex migrate:latest`

## Endpoints

### POST `/user`

- Payload:

```json
  "name": "username",
  "email": "email@email.com",
  "passowrd": "password"
}
```

Este método irá criar um usuário no banco de dados e caso sucesso deve retornar:

```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "username",
    "email": "email@email.com",
    "updatedAt": "2020-09-11T03:58:04.137Z",
    "createdAt": "2020-09-11T03:58:04.137Z"
  }
}
```

### POST `/user/login`

- Payload:

```json
  "email": "email@email.com",
  "passowrd": "password"
}
```

Este método irá realizar login e caso sucesso deve retornar:

```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "token": "Token de authenticação"
}
```

### GET `/users`

Este método irá retornar aos usuários cadastrados:

**header**
- authorization: *bearer* `token gerado após realizar login`


```json
{
  "success": true,
  "current": {
    "pagination": {
      "pageCurrent": 1,
      "limit": 10,
      "totalItems": 1
    },
    "users": [
      {
        "id": 1,
        "email": "email@email.com",
        "created_at": "2021-02-11T04:46:13.085Z",
        "updated_at": "2021-02-11T04:46:13.085Z"
      },
    ]
  }
}
```

