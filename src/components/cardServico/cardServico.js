import './cardServico.css'
import {BsFillTrashFill} from 'react-icons/bs'

export default function ServiceCard({id, nome, cost, descricao, handleRemove}){

        const remove = (e) =>{
            e.preventDefault()
            handleRemove(id, cost)
        }

        return(
            <div>
                <h3>Nome: {nome}</h3>
                <p>Custo: {cost}</p>
                <p>Descricao: {descricao}</p>
                <BsFillTrashFill onClick={remove}/>
            </div>
        )
}