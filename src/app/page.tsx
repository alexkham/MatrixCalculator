import { Inter } from 'next/font/google'
import MatrixViewComponent from '@/components/matrix_view'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <MatrixViewComponent />
    </main>
  )
}
