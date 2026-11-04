# UniSalas · Backend

API do UniSalas, sistema de reserva de salas acadêmicas desenvolvido por Jackson Pandolfo como trabalho de conclusão de curso. A API conecta os pedidos de professores e funcionários ao trabalho da equipe que administra os espaços. Cada solicitação reúne os dados do evento, a quantidade de participantes e os recursos necessários para escolher uma sala.

O projeto usa **NestJS 11, TypeScript, Prisma ORM 6 e PostgreSQL**. A [interface web do UniSalas](https://github.com/JacksonPandolfo/FrontendUniSalas) consome a API.

## Como o domínio está organizado

- **Espaços.** Cada setor contém blocos, e cada bloco contém salas. A sala registra capacidade, acessibilidade, equipamentos e mobiliário.
- **Reservas.** Uma solicitação pode ser esporádica ou recorrente. O registro associa solicitante, ministrante e aprovador e pode aguardar a definição da sala. Os estados previstos são `PENDENTE`, `APROVADA` e `CANCELADA`.
- **Ocupação.** Uma rotina executada a cada minuto consulta reservas aprovadas e atualiza o estado das salas de acordo com o horário.
- **Usuários.** A aplicação distingue ministrantes, funcionários, atendimento e administradores. As senhas são armazenadas com bcrypt, e o login entrega um JWT no cookie HTTP-only `jwt`.

## Executar localmente

Use Node.js 22, npm e uma instância de PostgreSQL com um banco **vazio e dedicado ao projeto**. No exemplo, o banco se chama `unisalas`.

```bash
git clone https://github.com/JacksonPandolfo/BackendUniSalas.git
cd BackendUniSalas
```

Crie um arquivo `.env` na raiz. Ajuste o usuário, a senha e a porta do PostgreSQL para a sua instalação. Gere um segredo local, por exemplo com `node -p "require('node:crypto').randomBytes(32).toString('hex')"`, e use o mesmo valor no frontend.

```dotenv
DATABASE_URL=postgresql://usuario:senha@localhost:5432/unisalas
JWT_SECRET=cole_aqui_o_segredo_gerado
FRONTEND_URL=http://localhost:3000
PORT=8000
```

Instale as dependências, crie as tabelas a partir do schema atual e inicie a API:

```bash
npm ci
npx prisma db push
npx prisma generate
node --env-file=.env --run start:dev
```

A API atende em `http://localhost:8000`. O comando de inicialização carrega as variáveis antes de o NestJS configurar a autenticação.

**Por que usar `db push` neste exemplo?** A migração inicial versionada é anterior ao [schema atual](prisma/schema.prisma). Por exemplo, ela não cria o tipo `StatusReserva` usado pela aplicação. Para reproduzir o projeto em um banco local novo, `db push` cria a estrutura esperada pelo código. Bancos existentes exigem uma migração que preserve seus dados.

## Primeira execução

O repositório não inclui dados de demonstração. Para experimentar o fluxo completo:

1. Inicie o [frontend](https://github.com/JacksonPandolfo/FrontendUniSalas) e, pela tela de cadastro, crie um ministrante e um segundo usuário de atendimento para receber o pedido.
2. No banco local, use `npx prisma studio` para criar um setor, um bloco vinculado ao setor e uma sala vinculada ao bloco. Preencha a capacidade e a acessibilidade da sala. Para demonstrar uma aula vinculada a uma turma, prepare também os respectivos dados acadêmicos.
3. Entre como ministrante para solicitar uma reserva. Depois, entre como o aprovador para selecionar a sala e acompanhar a mudança de status.

## Consultar a API

Os exemplos abaixo usam os caminhos do NestJS. As rotas de reserva exigem o cookie `jwt` obtido no login.

| Método e rota | Uso |
| --- | --- |
| `POST /usuario` | Cadastrar um usuário |
| `POST /auth/login` | Autenticar com e-mail e senha e receber o cookie de sessão |
| `POST /reserva` | Registrar uma solicitação |
| `GET /reserva/byUsuario/:id` | Listar pedidos em que o usuário é solicitante ou aprovador |
| `GET /reserva/bySala/:id` | Consultar reservas aprovadas de uma sala |
| `PATCH /reserva/:id` | Atualizar uma reserva, inclusive a sala e o status |
| `POST /auth/logout` | Encerrar a sessão |

Com uma conta local já cadastrada, estes comandos permitem testar o login e reutilizar o cookie para consultar as reservas. Substitua o e-mail e a senha pelos valores da sua conta de demonstração.

```bash
curl -c cookies.txt -H 'Content-Type: application/json' \
  -d '{"email":"docente@unisinos.br","senha":"senha-da-conta-local"}' \
  http://localhost:8000/auth/login

curl -b cookies.txt http://localhost:8000/reserva
```

Os módulos de [reservas](src/reserva), [salas](src/sala) e [autenticação](src/auth) concentram os respectivos controladores e serviços. Para compilar a API, execute `npm run build` após gerar o cliente Prisma.
