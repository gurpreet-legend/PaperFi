import '../styles/globals.css'
import Layout from '../components/Layout/Layout'
import { ThemeProvider } from 'next-themes'
import FormContextProvider from '../contexts/FormContext'
import IpfsContextProvider from '../contexts/IpfsContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ServicesContextProvider from '../contexts/Services'
import SearchFilterProvider from '../contexts/SearchFilter'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute='class'>
      <ServicesContextProvider>
        <FormContextProvider>
          <IpfsContextProvider>
            <SearchFilterProvider>
              <ToastContainer theme='light' />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </SearchFilterProvider>
          </IpfsContextProvider>
        </FormContextProvider>
      </ServicesContextProvider>
    </ThemeProvider>
  )
}

export default MyApp
