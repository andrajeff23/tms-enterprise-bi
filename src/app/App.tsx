import { Provider, useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { store, RootState } from '../shared/lib/store';
import { tmsTheme } from '../shared/config/tmsTheme';
import { MainLayout } from '../shared/components/layouts/MainLayout';
import { LoginPage } from '../features/auth/pages/login.page';

const AppContent = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  
  return isAuthenticated ? <MainLayout /> : <LoginPage />;
};

export function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={tmsTheme}>
        <CssBaseline />
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
