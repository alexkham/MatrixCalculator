import { Inter } from 'next/font/google'
import styles from './page.module.css'
import MatrixViewComponent from '@/components/matrix_view'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <MatrixViewComponent />
    </main>
  )
}
