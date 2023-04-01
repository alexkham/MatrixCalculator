import { Inter } from 'next/font/google'
import MatrixViewComponent from '@/components/matrix_view'
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {

};

export async function generateMetadata({ }) {
  const title = "Matrix Calculator";
  const description =
    "This is a Next.js prject that calculates different matrices addition, multiplication and scalar multiplication operation";

  return {
    title: title,
    description: description,
    viewport: "width=device-width, initial-scale=1.0",
    openGraph: { title: title, description: description },
  };
}

export default function Home() {
  return (
    <main>
      <MatrixViewComponent />
    </main>
  )
}
