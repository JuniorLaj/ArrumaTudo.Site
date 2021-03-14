import { Provider } from 'react-redux';
import './App.css';
import Home from './Home'
import './mock'
import store from './store'

function App() {
  return (
    <Provider store={store}>

      <Home />
    </Provider>
  );
}

export default App;
