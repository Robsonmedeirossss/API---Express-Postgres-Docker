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

### Pré-requisitos
- **Node.js** (v18 ou superior)
- **Docker** e **Docker Compose**

### Passos para Execução

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/ApiMyContacts.git
   cd ApiMyContacts
   ```

2. **Instale as dependências do projeto:**
   ```bash
   npm install
   ```
   *ou, se preferir usar o Yarn:*
   ```bash
   yarn
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo chamado `.env` na raiz do projeto e preencha com as mesmas credenciais definidas no `docker-compose.yml`:
   ```env
   DB_PASSWORD=root
   DB_USER=robson
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=mycontacts
   ```

4. **Inicie o banco de dados com Docker Compose:**
   Este comando irá criar e iniciar o container do PostgreSQL em segundo plano (`-d`).
   ```bash
   docker-compose up -d
   ```

5. **Crie as tabelas no banco de dados:**
   Execute o script `schema.sql` dentro do container Docker para criar a estrutura do banco.
   ```bash
   docker-compose exec postgres psql -U robson -d mycontacts < src/database/schema.sql
   ```
   *Nota: `postgres` é o nome do serviço no `docker-compose.yml`, `-U robson` é o usuário e `-d mycontacts` é o banco de dados.*

6. **Inicie o servidor da aplicação:**
   ```bash
   node src/index.js
   ```

Pronto! A API estará rodando em `http://localhost:3001`.

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
