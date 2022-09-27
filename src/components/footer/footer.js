import './footer.css'
import { FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa'


export default function Footer(){

    return(
        <footer>
            <hr/>
            <ul>
                <li><FaFacebook/></li>
                <li><FaInstagram/></li>
                <li><FaLinkedin/></li>
            </ul>
            <p>Costs &copy; 2022</p>
        </footer>
    )
}