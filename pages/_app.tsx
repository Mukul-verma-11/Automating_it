import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { styles } from '@/styles/Home.module.css';
import {RegistationNumberProvider} from './ContextApi'
export default function App({ Component, pageProps }: AppProps) {
  return (<RegistationNumberProvider>
  <Component {...pageProps} />
  </RegistationNumberProvider>)
}
