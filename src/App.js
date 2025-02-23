import './App.css';
import Login from './Components/Login';
import Chat from './Components/Chat';
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';

function App() {
  return (

<BrowserRouter>

    <Routes>      
       <Route path="/" element={<Login />} />
       <Route path='/chat' element={<Chat />} />
    </Routes>
</BrowserRouter>
    
  );
}

export default App;
