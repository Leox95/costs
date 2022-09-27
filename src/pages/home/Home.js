import './home.css'
import ganancioso from '../../assets/ganancioso.png'
import LinkButton from '../../components/linkButton/linkButton'


export default function Home(){

    return(
        <div className='container-home'>
            <h1>Bem-Vindo aos <span>COSTS</span></h1>
            <p >Comece a gerenciar seus projetos agora mesmo</p>
            <LinkButton to='/novoProjeto' text='Novo Projeto'/>
            <img src={ganancioso} alt='foto de homem ganancioso'/>
        </div>
    )
}