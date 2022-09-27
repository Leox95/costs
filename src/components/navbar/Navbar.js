import './navbar.css'
import { Link} from 'react-router-dom'
import moeda from '../../assets/icone-moeda.png'

export default function Navbar(){

    return(
        <nav>
            <Link to="/"><img className="moeda" src={moeda} alt="Moeda usada como icone"/></Link>
            <Link className='link-nav' to="/">Home</Link>
            <Link className='link-nav' to="/projetos">Projetos</Link>
            <Link className='link-nav' to="/contato">Contato</Link>
            <Link className='link-nav' to="novoProjeto">Novo Projeto</Link>
        </nav>
    )
}