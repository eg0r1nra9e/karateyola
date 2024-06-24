import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Home = () => {
  const { push } = useRouter()

  useEffect(() => {
    push('/events')
  }, [push])
  return null
}

export default Home
