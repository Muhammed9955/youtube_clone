import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes, BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import './mixins/chartjs';
import theme from './theme';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import useRoutesHook from './routes';

const RoutesCom = () => {
  const { routes } = useRoutesHook();
  const routing = useRoutes(routes);
  return routing;
};
const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          {' '}
          <RoutesCom />{' '}
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
