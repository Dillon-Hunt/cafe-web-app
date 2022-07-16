import { useState } from 'react';
import '../styles/Navigation.css'
import NavigationOverlay from './NavigationOverlay';

function Navigation() {
    const [navigationShown, setNavigationShown] = useState(false)

    const navigationToggle = () => {
        setNavigationShown(!navigationShown)
    }


    return (
        <div className='Navigation'>
            <NavigationOverlay shown={navigationShown.toString()} />
            <img className='Navigation__image' src='../../menu.svg' alt='Menu' onClick={navigationToggle} shown={navigationShown.toString()} />
        </div>
    )
}

export default Navigation;
