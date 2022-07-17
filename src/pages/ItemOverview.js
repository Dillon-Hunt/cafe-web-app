import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation'
import Options from '../components/Options';
import NoPage from './NoPage';

import { Helmet } from 'react-helmet-async'

import '../styles/ItemOverview.css'

function ItemOverview(props) {
    const { productId } = useParams()
    const product = props.products.filter(product => product.id === productId)[0]

    const [shown, setShown] = useState(false)

    const showPopupMenu = () => {
        if (shown !== true) setShown(true)
    }

    const hidePopupMenu = () => {
        if (shown !== false) setShown(false)
    }

    return (
        product !== undefined ? <div className='ItemOverview'>
            <div className='ItemOverview__Content' onClick={hidePopupMenu}>
                <Helmet>
                    <title>Order a {product.title} | St Andrew's Anglican College Hospitality</title>
                </Helmet>
                <img className='ItemOverview__Image' src={product.image} alt=''/>
                <h1 className='ItemOverview__Title'>{product.title}</h1>
                <h2 className='ItemOverview__Subtitle'>{product.subtitle}</h2>
                <h2 className='ItemOverview__Description__Title'>Description</h2>
                <h2 className='ItemOverview__Description__Subtitle'>{product.description}</h2>
                <button type='button' className='ItemOverview__Continue__Button' onClick={showPopupMenu}>Continue</button>
            </div>
            <Options shown={shown} product={product} />
            <Navigation />
        </div> :
        <NoPage />
    )
}

export default ItemOverview;
