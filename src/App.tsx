
import './App.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/reactQuery'
import AppRoutes from './routes/AppRoutes'
import ReduxProvider from './app/ReduxProvider'
import { Toaster } from 'sonner'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


function App() {

  return (
    <>
      <ReduxProvider>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
          <Toaster position="top-right" richColors={true} closeButton={true} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ReduxProvider>
    </>
  )
}

export default App
