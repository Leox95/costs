import './submitButton.css'

export default function SubmitButton({text}){

    return(
        <div>
            <button className='botao-form' >{text}</button>
        </div>
    )
}