import FormularioNovo from '../../components/fomulario-novo/formulario-novo'
import './novoProjeto.css'
import {useNavigate} from 'react-router-dom'


export default function NovoProjeto(){

    const navigate = useNavigate()


    function criaPost(projeto){

        //inicializando cost e os services
        projeto.cost= 0
        projeto.services = []

        fetch('http://localhost:5000/projeto', {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projeto),
        })
        .then((resp)=> resp.json())
        .then((data)=>{
            console.log(data)
            //redirecionando
            navigate('/projetos', { state: {message: 'Projeto criado com sucesso!'} })
        })
        .catch((err)=> console.log(err))
            
    }

    return(
        <div className='container-novo'>
            <h1>Novo projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <FormularioNovo handleSubmit={criaPost}/>
        </div>
    )
}