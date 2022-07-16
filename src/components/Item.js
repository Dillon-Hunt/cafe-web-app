import { Link } from 'react-router-dom'
import '../styles/Item.css'

export const formatPrices = (prices) => {
    prices.max = null
    prices.min = null
    Object.keys(prices).forEach(key => {
        if (prices[key].toString().split(".")[1] === undefined) prices[key] = prices[key] + '.00'
        else if (prices[key].toString().split(".")[1].length === 1) prices[key] = prices[key] + '0'
        
        if (parseFloat(prices[key]) > prices.max || prices.max === null) prices.max = prices[key]
        if (parseFloat(prices[key]) < prices.min || prices.min === null) prices.min = prices[key]
    })
    return prices
}

function Item(props) {
    const { product } = props

    product.prices = formatPrices(product.prices)

    return (
        <Link to={`/products/${product.id}`} className='Item'>
            <p className='Item__Title'>{product.title}</p>
            <p className='Item__Subtitle'>{product.subtitle}</p>
            <img className='Item__Image' src={product.image} alt={product.title} />
            {product.prices.min === product.prices.max ? <p className='Item__Price'><span className='Item__Price__Symbol'>$</span>{product.prices.min}</p> : <p className='Item__Price'><span className='Item__Price__Symbol'>$</span>{product.prices.min} - <span className='Item__Price__Symbol'>$</span>{product.prices.max}</p>}
        </Link>
    )
}

export default Item;
