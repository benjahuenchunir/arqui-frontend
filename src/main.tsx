import App from './App';
import { Auth0ProviderWithNavigate } from './AuthProvider';
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css'
import './axiosConfig';
import { ModalProvider } from './components/Modal/ModalContext';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Auth0ProviderWithNavigate>
          <ModalProvider>
              <App />
          </ModalProvider>
        </Auth0ProviderWithNavigate>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);