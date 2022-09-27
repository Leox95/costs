import { Link } from 'react-router-dom'
import './linkButton.css'

export default function LinkButton({to, text}){

    return(
        <Link className='link-button' to={to}>
            {text}
        </Link>
    )
}