## Pixel Hub - Backend

### Pré-requisitos
Docker e Docker Compose instalados na sua máquina
Git (para clonar o repositório)

### Configuração inicial
Certifique-se de que o arquivo .env existe na raiz do projeto com as configurações de conexão ao banco de dados:
```
DATABASE_URL=postgres://postgres:docker@postgres:5432/pixel_hub_db
```

### Iniciando o projeto com Docker

```
docker-compose up --build
```
Isso irá:
- Construir a imagem do aplicativo
- Iniciar o servidor PostgreSQL
- Iniciar o aplicativo Node.js

### Inicialização do Prisma
Após os contêineres estarem em execução, você precisa inicializar o banco de dados com o Prisma. Abra outro terminal e execute:

```
# Acesse o container da aplicação
docker-compose exec app bash

# Dentro do container, execute as migrações do Prisma
npx prisma migrate dev --name init

# Gere o cliente Prisma
npx prisma generate
```

### Verificando a instalação
O aplicativo estará disponível em:

API: http://localhost:3001

Para verificar se está funcionando corretamente, você pode acessar (POST):

http://localhost:3001/accounts (para testar a API de contas)

Exemplo de body 
```
{
  "name": "Jane Doe",
  "email": "jane.doe@mailinator.com",
  "password": "qwer1234",
  "accessRoles": "LEADER"
}
``` 