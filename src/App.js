import { Provider } from 'react-redux';
import { BrowserRouter, Routes} from 'react-router-dom'
import './App.css';
import Home from './pages'
import './mock'
import HomeCliente from './pages/HomeCliente';
import GuestRoute from './routes/guestRoute';
import store from './store'
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
      <GuestRoute path="//*" element={<HomeCliente />} />
      <GuestRoute path="/home" element={<Home />} />
      </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
