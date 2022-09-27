import Mensagem from '../../components/mensagem/mensagem'
import './projetos.css'
import { useLocation } from 'react-router-dom'
import LinkButton from '../../components/linkButton/linkButton'
import { useState, useEffect } from 'react'
import CardProjeto from '../../components/cardProjeto/cardProjeto'

export default function Projetos() {

    const [projetos, setProjetos] = useState([])

    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
        fetch('http://localhost:5000/projeto', {
            method: 'GET',
            headers: {
                'Content-Type': 'application.json'
            }
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                setProjetos(data)
            })
            .catch((err) => console.log(err))
    }, [])

    function deleteCard(id){
        fetch(`http://localhost:5000/projeto/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application.json'
            },
        })
        .then((resp) => resp.json())
        .then((data)=>{
            setProjetos(projetos.filter((projeto)=> projeto.id !== id))
        })
        .catch((err)=> console.log(err))
    }


    return (
        <div className='container-projeto'>
            <div className='titulo-projeto'>
                <h1>Meus Projetos</h1>
                <LinkButton to='/novoProjeto' text='Criar Projeto' />
            </div>
            {message &&
                <Mensagem type='sucesso' msg={message} />
            }
            <div className='container-card'>
                {projetos.length > 0 &&
                    projetos.map((projeto) => (
                        <CardProjeto
                            //props do cardProjeto
                            id={projeto.id}
                            nome={projeto.name}
                            orcamento={projeto.orcamento}
                            categoria={projeto.categorias.name}
                            handleDelete={deleteCard}
                            key={projeto.id}
                        />
                    ))
                }
            </div>
        </div>
    )
}