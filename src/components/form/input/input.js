import './input.css'

export default function Input({type, name,label,  placeholder, value, handleonchange}){

    return(
        <div className='form-control'>
            <label htmlFor={name}>{label}</label>
            <input type={type}
            placeholder={placeholder}
            name={name}
            id={name}
            value={value}
            onChange={handleonchange}/>
        </div>
    )
}