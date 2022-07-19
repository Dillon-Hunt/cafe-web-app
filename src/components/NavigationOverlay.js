import { Link } from 'react-router-dom';
import '../styles/NavigationOverlay.css'

function NavigationOverlay(props) {
    const { shown, hideOverlay } = props

    return (
        <div className='NavigationOverlay' shown={shown}>
            <div className='NavigationOverlay__Links' shown={shown}>
                <Link className='NavigationOverlay__Link' to='/home' onClick={hideOverlay}>Home</Link>
                <Link className='NavigationOverlay__Link' to='/checkout'onClick={hideOverlay}>Checkout</Link>
            </div>
        </div>
    )
}

export default NavigationOverlay;
