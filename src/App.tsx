import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from './store';
import { tmsTheme } from './presentation/theme/tmsTheme';
import { MainLayout } from './presentation/layouts/MainLayout';

export function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={tmsTheme}>
        <CssBaseline />
        <MainLayout />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
