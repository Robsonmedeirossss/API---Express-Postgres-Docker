# ApiMyContacts

API RESTful para gerenciamento de contatos, construída com Node.js, Express e PostgreSQL.

## Funcionalidades
- CRUD de contatos
- CRUD de categorias
- Validação de dados e tratamento de erros
- Ordenação de resultados por nome
- Verificação de e-mail duplicado

## Estrutura do Projeto
```
src/
  controllers/
    ContactController.js
    CategoryController.js
  repositories/
    contactRepository.js
    categoryRepository.js
  middlewares/
    cors.js
    errorHandler.js
  database/
    index.js
    schema.sql
  routes.js
  index.js
.env
package.json
.editorconfig
.gitignore
```

## Tecnologias
- Node.js
- Express
- PostgreSQL
- pg (driver)
- dotenv
- uuid

## Como rodar o projeto
1. Instale as dependências:
   ```bash
   npm install
   ```

2. Suba o banco de dados PostgreSQL com Docker Compose (recomendado):
   ```bash
   docker-compose up -d
   ```
   Isso criará um container chamado `pg` com as configurações do arquivo `docker-compose.yml`.

   Alternativamente, você pode subir o banco manualmente:
   ```bash
   docker run --name pg -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -e POSTGRES_DB=mycontacts -p 5432:5432 -d postgres
   docker exec -it pg bash
   psql -U root
   # Execute os comandos SQL do arquivo src/database/schema.sql
   ```

3. Configure as variáveis de ambiente no arquivo `.env`:
   ```env
   DB_PASSWORD=root
   DB_USER=root
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=mycontacts
   ```

5. Inicie o servidor:
   ```bash
   node src/index.js
   ```
6. Importante: Verifique se seu container está rodando, utilize o comando: `docker ps`, caso não estiver listado nenhum container, utilize o comando `docker ps -a`, verifique o nome do seu container e rode `docker start nomeDoContainer`, somente depois disso rode o servidor.

## Exemplos de uso
- Listar contatos: `GET /contacts?orderBy=ASC|DESC`
- Criar contato: `POST /contacts`
- Atualizar contato: `PUT /contacts/:id`
- Deletar contato: `DELETE /contacts/:id`

## Observações
- O projeto segue o padrão de repositórios para acesso ao banco.
- Controllers fazem validação e retornam status HTTP apropriados.
- As variáveis de ambiente devem ser mantidas fora do versionamento.

---

Feito por Robson.
