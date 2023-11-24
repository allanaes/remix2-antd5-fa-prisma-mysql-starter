import type { MetaFunction } from '@remix-run/node'
import { Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'

import { db } from '../utils/db.server'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export const loader = async () => {
  const prismaTest = await db.$queryRaw`
  SELECT 1+1;
  `
  console.log(prismaTest)

  return null
}

export default function Index() {
  return (
    <div>
      <h1>Hello</h1>
      <Button type="primary" icon={<FontAwesomeIcon icon={faHouse} />}>
        Home
      </Button>
    </div>
  )
}
