import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import UsuariosPage from './pages/UsuariosPage';
import InformesPage from './pages/InformesPage';
import NotificacionesPage from './pages/NotificacionesPage';
import EstadisticasPage from './pages/EstadisticasPage';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const [activeTab, setActiveTab] = useState('usuarios');

  const renderContent = () => {
    switch (activeTab) {
      case 'usuarios':
        return <UsuariosPage />;
      case 'informes':
        return <InformesPage />;
      case 'notificaciones':
        return <NotificacionesPage />;
      case 'estadisticas':
        return <EstadisticasPage />;
      default:
        return <UsuariosPage />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Layout 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          notificationCount={0}
        >
          {renderContent()}
        </Layout>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </div>
    </QueryClientProvider>
  );
}

export default App;