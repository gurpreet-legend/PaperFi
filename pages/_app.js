import '../styles/globals.css'
import Layout from '../components/Layout/Layout'
import { ThemeProvider } from 'next-themes'
import FormContextProvider from '../contexts/FormContext'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute='class'>
      <FormContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </FormContextProvider>
    </ThemeProvider>
  )
}

export default MyApp
