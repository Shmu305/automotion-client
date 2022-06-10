import { BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from '../src/pages/DashboardPage/DashboardPage';
import RegisterPage from '../src/pages/RegisterPage/RegisterPage';
import LoginPage from '../src/pages/LoginPage/LoginPage';
import './App.scss';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
