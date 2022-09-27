import './cardProjeto.css'
import {BsFillTrashFill, BsPencil} from 'react-icons/bs'
import { Link } from 'react-router-dom'

export default function CardProjeto({id, nome, orcamento, categoria, handleDelete}){

    function remove(e){
        e.preventDefault()
        handleDelete(id)
    }


    return(
        <div className='card-projeto'>
            <h4>{nome}</h4>
            <p>Orçamento: {orcamento}</p>
            <p>Categoria: {categoria}</p>
            <div className='icones-card'>
            <p>Editar:
                <Link className='editar' to={`/projeto/${id}`}> <BsPencil/> </Link>
            </p>
            <p >Remover: <BsFillTrashFill className='lixeira' onClick={remove}/> </p>
            </div>
        </div>
    )
}