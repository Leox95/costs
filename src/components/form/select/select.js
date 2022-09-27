import './select.css'

export default function Select({label, name, options, handleonchange,value}){

    return(
        <div className='form-control'>
            <label htmlFor={name}>{label}</label>
            <select 
            name={name} 
            id={name}
            onChange={handleonchange}
            value={value || ''}>
                <option>Selecione uma opção</option>
                {options.map((option)=>(
                    <option value={option.id} key={option.id}>{option.categoria}</option>
                ))}
            </select>
        </div>
    )
}