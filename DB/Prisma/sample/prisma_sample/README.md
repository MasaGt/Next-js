### Prisma Practice Project (Blog app)

#### To start this project

1. run the following npm command

```bash
npm install
```

2. create and define .env under project root

```
#.env

# variable for prisma.shcema
DATABASE_URL="mysql://<USER>:<PASSWORD>@<HOST>:<PORT>/prisma"

# variables for compose.yml
MYSQL_ROOT_PASSWORD=your_root_pass
MYSQL_DATABASE="prisma"
MYSQL_USER=your_user_name
MYSQL_PASSWORD=your_user_password
```

3. run the following docker command

```bash
docker compose up -d
```

4. run Next.js project

```bash
npm run dev
```