import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import routes from './routes/routes.tsx';
import { Toaster } from './components/ui/sonner.tsx';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store.ts';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={routes} />
      </PersistGate>
    </Provider>
    <Toaster
      closeButton
      richColors
      position="top-center"
      theme="system"
      toastOptions={{
        style: {
          borderRadius: "0px",
          padding: "16px",
          minHeight: "60px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
        }
      }}
    />
  </StrictMode>
);
