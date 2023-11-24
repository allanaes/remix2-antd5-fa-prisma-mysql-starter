# Project Setup

# A. From Clone

1. Install modules
   `npm install`

2. Generate Prisma Clinet
   Rename .env.SAMPLE to .env, edit DATABASE_URL
   `npx prisma generate`

3. Test dev
   `npm run dev`

4. Test build

```
npm run build

npm start
```

# B. From Scratch

## Remix

1. Create Remix

```
npx create-remix@latest
```

2. Change to Vite
   https://remix.run/docs/en/main/future/vite

## Ant Design

1. Install antd

```
npm install antd --save
```

2. Configure SSR
   https://ant.design/docs/react/server-side-rendering

Install static style extract:

```
npm install -D "@ant-design/static-style-extract"

mkdir ./app/styles
```

Skip to step 3, Predev only.

```
// scripts/genAntdCss.js
import fs from 'fs'
import { extractStyle } from '@ant-design/static-style-extract'

const outputPath = './app/styles/antd.min.css'

const css = extractStyle()

fs.writeFileSync(outputPath, css)

```

Generate style, then import css to root.tsx, no need to add in links/head section.

```
import './styles/antd.min.css';
```

## Font Awesome Icons

https://fontawesome.com/docs/web/use-with/react/use-with#next-js

1. Install Packages

```
npm install "@fortawesome/fontawesome-svg-core" "@fortawesome/free-solid-svg-icons" "@fortawesome/react-fontawesome"
```

2. Import style and add config to root.tsx

```
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
```

3. Test Antd + FontAwesome icon

```
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'

...

<Button type="primary" icon={<FontAwesomeIcon icon={faHouse} />}>
  Home
</Button>
```

## Prisma

1. Install Prisma
   https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-node-mysql

2. Configure Prisma

```
// env.d.ts
DATABASE_URL="mysql://root:MYPASSWORD@localhost:3306/MYDBNAME"


// prisma/schema.prisma
...
datasource db {
  provider = "mysql"
```

```
npx prisma db pull

npx prisma generate
```

3. DB Server (single Prisma Client)

```
// app/utils/db.server.ts

import { PrismaClient } from '@prisma/client'

let db: PrismaClient

declare global {
  var __db: PrismaClient | undefined
}

if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient()
  db.$connect()
} else {
  if (!global.__db) {
    global.__db = new PrismaClient()
    global.__db.$connect()
  }
  db = global.__db
}

export { db }

```

4. Test Prisma

```
...
import { db } from '../utils/db.server'
...

export const loader = async () => {
  const prismaTest = await db.$queryRaw`
  SELECT 1+1;
  `
  console.log(prismaTest)

  return null
}

```
