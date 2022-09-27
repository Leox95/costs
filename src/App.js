import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home/Home';
import Contato from './pages/contato/Contato';
import NovoProjeto from './pages/novoProjeto/NovoProjeto';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Projetos from './pages/projetos/Projetos';
import Footer from './components/footer/footer';
import Projeto from './pages/projeto/Projeto';

function App() {
  return (
      <BrowserRouter>
      <Navbar/>
      <div className='container-geral'>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/projetos' element={<Projetos/>}/>
          <Route exact path='/projeto/:id' element={<Projeto/>}/>
          <Route exact path='/contato' element={<Contato/>}/>
          <Route exact path='/novoProjeto' element={<NovoProjeto/>}/>
        </Routes>
      </div>
      <Footer/>
      </BrowserRouter>
  );
}

export default App;
