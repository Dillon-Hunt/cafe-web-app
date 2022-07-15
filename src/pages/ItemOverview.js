import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation'

import '../styles/ItemOverview.css'
import NoPage from './NoPage';

function ItemOverview(props) {
    const { productId } = useParams()
    const product = props.products.filter(product => product.id === productId)[0]

    return (
        product !== undefined ? <div className='ItemOverview'>
            <Navigation />
            <img className='ItemOverview__Image' src={product.image} alt=''/>
            <h1 className='ItemOverview__Title'>{product.title}</h1>
            <h2 className='ItemOverview__Subtitle'>{product.subtitle}</h2>
            <h2 className='ItemOverview__Description__Title'>Description</h2>
            <h2 className='ItemOverview__Description__Subtitle'>{product.description}</h2>
            <button type='button' className='ItemOverview__AddToOrder__Button'>Add To Order</button>
        </div> :
        <NoPage />
    )
}

export default ItemOverview;
