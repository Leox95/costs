import '../fomulario-novo/formulario-novo.css'
import Input from '../form/input/input'
import SubmitButton from '../form/submitButton/submitButton'
import { useState} from 'react'



export default function FormularioServico({handleSubmit, btnText, projetoData}){

    const [servico, setServico]= useState({})
    
    function handleOnChange(e){
        setServico({...servico, [e.target.name]: e.target.value})
    }
    function submit(e){
        e.preventDefault()
        projetoData.services.push(servico)
        handleSubmit(projetoData)
    }

    
    return(
            <form onSubmit={submit}>
                <Input
                type='text'
                name='nome'
                label='Nome do serviço'
                placeholder='Ex. comprar template'
                handleonchange={handleOnChange}
                />
                <Input
                type='number'
                name='cost'
                label='Custo do serviço'
                placeholder='Ex. 5000.00'
                handleonchange={handleOnChange}
                />
                <Input
                type='text'
                name='descricao'
                label='Descrição do serviço'
                placeholder='Ex. Comprar template novo para melhorar estilo'
                handleonchange={handleOnChange}
                />
                <SubmitButton text={btnText}/>

            </form>
    )
}