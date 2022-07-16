import { Link } from 'react-router-dom';
import '../styles/NavigationOverlay.css'

function NavigationOverlay(props) {
    const { shown } = props

    return (
        <div className='NavigationOverlay' shown={shown}>
            <div className='NavigationOverlay__Links' shown={shown}>
                <Link className='NavigationOverlay__Link' to='/home'>Home</Link>
                <Link className='NavigationOverlay__Link' to='/checkout'>Checkout</Link>
            </div>
        </div>
    )
}

export default NavigationOverlay;
