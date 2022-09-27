import './Projeto.css'
import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import FormularioNovo from '../../components/fomulario-novo/formulario-novo'
import Mensagem from '../../components/mensagem/mensagem'
import FormularioServico from '../../components/formulario-servico/formularioServico'
import {parse, v4} from 'uuid'
import ServiceCard from '../../components/cardServico/cardServico'

export default function Projeto(){

    const {id} = useParams()
    const [projeto, setProjeto] = useState([])
    const [mostraForm, setMostraForm] = useState(false)
    const [mostraServico, setMostraServico] = useState(false)
    const [msg, setMsg] = useState()
    const [tipoMsg, setTipoMsg] = useState()
    const [servicos, setServicos] = useState([])

    useEffect(()=>{
        fetch(`http://localhost:5000/projeto/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((resp)=> resp.json())
        .then((data)=> {
            setProjeto(data)
            setServicos(data.services)
        })
        .catch((err)=> console.log(err))
    },[id])

    function formProjeto(){
        setMostraForm(!mostraForm)
    }
    function formServico(){
        setMostraServico(!mostraServico)
    }
    function criarServico(projeto){
        const ultimoProjeto = projeto.services[projeto.services.length -1]

        ultimoProjeto.id = v4()
        const ultimoCusto = ultimoProjeto.cost

        const novoCusto  = parseFloat(projeto.cost) + parseFloat(ultimoCusto)
        // validando se custo não ultrapassa orcamento
        if (novoCusto > projeto.orcamento){
            setMsg('Erro!! O valor do custo ultrapassa o orçamento')
            setTipoMsg('erro')
            projeto.servicos.pop()
            return false
        }
        //inserindo custo atual
        projeto.cost = novoCusto
        //atualizando a api
        fetch(`http://localhost:5000/projeto/${projeto.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projeto)
        })
        .then((resp)=> resp.json())
        .then((data)=>{
            console.log(data)
            setMsg('Serviço inserido com sucesso')
            setTipoMsg('sucesso')
        })
        .catch((err)=> console.log(err))

    }

    function removeServico(id, cost){
        const servicoAtual = projeto.services.filter(
            (servicos) => servicos.id !== id
        )

        const projetoAtual = projeto

        projetoAtual.services = servicoAtual
        projetoAtual.cost = parseFloat(projetoAtual.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projeto/${projetoAtual.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projetoAtual)
        })
        .then((resp)=> resp.json())
        .then((data)=>{
            setProjeto(projetoAtual)
            setServicos(servicoAtual)
            setMsg('Serviço removido com sucesso')
        })
        .catch((err)=> console.log(err))

    }

    function editar(projeto){
        if(projeto.orcamento < projeto.cost){
            setMsg('O custo de serviço não pode ser maior que o orçamento Bocó')
            setTipoMsg('erro')
            return false
        }

        fetch(`http://localhost:5000/projeto/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projeto),
        })
        .then((resp)=> resp.json())
        .then((data)=>{
            setProjeto(data)
            setMostraForm(false)
            setMsg('Projeto atualizado com sucesso')
            setTipoMsg('sucesso')
        })
        .catch((err)=> console.log(err))



    }

    console.log(projeto)

    return(
        <div className='container-edicao'>
            <h2>Editar Projeto</h2>
            {msg && <Mensagem type={tipoMsg} msg={msg}/>}
            {!mostraForm ?
            <div>
                <p>Projeto: {projeto.name}</p>
                <p>Orçamento: {projeto.orcamento}</p>
                <p>Custo: {projeto.cost}</p>
                <button onClick={formProjeto}>
                {!mostraForm ? 'Editar Projeto' : 'Fechar'}
                </button>
            </div> :
            <div className='container-edicao'>
                <FormularioNovo handleSubmit={editar} projetoData={projeto}/>
            </div>}
            <br/>
            <hr/>
            <div className='container-edicao'>
                <h2>Adicionando Serviços</h2>
                <div>
                    {mostraServico && (
                        <FormularioServico
                        btnText='Criar Servico'
                        handleSubmit={criarServico}
                        projetoData={projeto}
                        />
                    )}
                </div>
                <button onClick={formServico}>
                {!mostraServico ? 'Adicionar Serviços' : 'Fechar'}
                </button>    
            </div>
            <br/>
            <hr/>
            <h2>Serviços:</h2>
            {servicos.length > 0 &&
                servicos.map((servico)=>(
                    <ServiceCard
                    key={servico.id}
                    id={servico.id}
                    nome={servico.nome}
                    cost={servico.cost}
                    descricao={servico.descricao}
                    handleRemove={removeServico}
                    />
                ))
            }
            {servicos.length === 0 &&
            <p>Não há serviços cadastrados</p>
            }
        </div>
    )
}