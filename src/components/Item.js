import '../styles/Item.css'

function formatPrices(prices) {
    Object.keys(prices).forEach(key => {
        if (prices[key].toString().split(".")[1] === undefined) prices[key] = prices[key] + '.00'
        else if (prices[key].toString().split(".")[1].length === 1) prices[key] = prices[key] + '0'
    })
    return prices
}

function Item(props) {
    const { product } = props

    product.prices = formatPrices(product.prices)

    return (
        <div className='Item'>
            <p className='Item__Title'>{product.title}</p>
            <p className='Item__Subtitle'>{product.subtitle}</p>
            <img className='Item__Image' src={product.image} alt={product.title} />
            <p className='Item__Price'><span className='Item__Price__Symbol'>$</span>{product.prices.medium}</p>
        </div>
    )
}

export default Item;
