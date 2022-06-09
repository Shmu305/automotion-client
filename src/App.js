import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from '../src/pages/DashboardPage/DashboardPage';
import RegisterPage from '../src/pages/RegisterPage/RegisterPage';
import './App.scss';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RegisterPage/>}/>
        {/* <Route path='/login' element={<Login/>}/> */}
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
