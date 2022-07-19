import NavigationOverlay from './NavigationOverlay'

import { useState } from 'react'

import '../styles/Navigation.css'

function Navigation() {
    const order = JSON.parse(localStorage.getItem('order'))
    const page = window.location.pathname

    // Set state variables (will rerender view on update)
    const [navigationShown, setNavigationShown] = useState(false)

    // Toggle navigation overlay
    const navigationToggle = () => {
        setNavigationShown(!navigationShown)
    }

    // Hide navigation overlay
    const hideOverlay = () => {
        setNavigationShown(false)
    }


    return (
        <div className='Navigation'>
            <div className='Navigation__Notch' />
            <NavigationOverlay shown={navigationShown.toString()} hideOverlay={hideOverlay} />
            { order !== null && page === '/home' && <p className='Navigation__Count' shown={(!navigationShown).toString()}>{order.length} {order.length === 1 ? 'Item' : 'Items'}</p> }
            <img className='Navigation__Image' src='../../menu.svg' alt='Menu' onClick={navigationToggle} shown={navigationShown.toString()} />
        </div>
    )
}

export default Navigation;
