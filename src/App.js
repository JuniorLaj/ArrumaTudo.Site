import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import Home from './pages/Home'
import './mock'
import SignIn from './pages/Sign-In';
import GuestRoute from './routes/guestRoute';
import store from './store'
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
      <GuestRoute path="//*" element={<Home />} />
      <GuestRoute path="/inicio" element={<SignIn />} />
      
      </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
