import Input from '../form/input/input'
import Select from '../form/select/select'
import SubmitButton from '../form/submitButton/submitButton'
import './formulario-novo.css'
import {useState, useEffect} from 'react'

export default function FormularioNovo({handleSubmit, projetoData}){

    const [categorias, setCategorias] = useState([])
    const [projeto, setProjeto] = useState(projetoData || {})

    useEffect(()=>{
        fetch ('http://localhost:5000/categorias', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        })
        .then((resp)=> resp.json())
        .then((data)=> setCategorias(data))
        .catch((err)=> console.log(err))
    },[])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(projeto)
    }

    function handleChange(e){
        setProjeto({...projeto, [e.target.name]: e.target.value})
    }

    function handleCategoria(e){
        setProjeto({
            ...projeto,
            categorias: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            },
        })
    }

    return(
        <form onSubmit={submit}>
            <Input
            type='text'
            name='name'
            label='Nome do projeto'
            placeholder='Insira o nome do projeto' 
            handleonchange={handleChange}
            value={projeto.name ? projeto.name : ''}
            />
            <Input
            type='number'
            name='orcamento'
            label='Orçamento do projeto'
            placeholder='Insira o orçamento do projeto'
            handleonchange={handleChange}
            value={projeto.orcamento ? projeto.orcamento : ''}
            />
            <Select 
            name='categoria' 
            label='Selecione uma categoria'
            options={categorias}
            handleonchange={handleCategoria}
            value={projeto.categorias ? projeto.categorias.id : ''}
            />
            <SubmitButton text='Enviar'/>
        </form>
    )
}