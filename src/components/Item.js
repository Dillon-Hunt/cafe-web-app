import { Link } from 'react-router-dom'
import '../styles/Item.css'

// Format an array prices to be in the format of '0.00' and get minimum and maximum prices
export const formatPrices = (prices) => {

    // Default minimum and maximum prices to null
    prices.max = null
    prices.min = null

    Object.keys(prices).forEach(key => {
        
        // Format prices to be in the format of '0.00'
        if (prices[key].toString().split(".")[1] === undefined) prices[key] = prices[key] + '.00'
        else if (prices[key].toString().split(".")[1].length === 1) prices[key] = prices[key] + '0'
        
        // Set minimum and maximum prices
        if (parseFloat(prices[key]) > prices.max || prices.max === null) prices.max = prices[key]
        if (parseFloat(prices[key]) < prices.min || prices.min === null) prices.min = prices[key]
    })

    // Return formatted prices
    return prices
}

function Item(props) {
    const { product } = props

    // Set prices to formatted prices
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
