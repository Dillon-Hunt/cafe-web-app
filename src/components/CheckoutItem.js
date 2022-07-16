import '../styles/CheckoutItem.css'

export const formatPrice = (price) => {
    if (price.toString().split(".")[1] === undefined) price = price + '.00'
    else if (price.toString().split(".")[1].length === 1) price = price + '0'
    return price
}

function CheckoutItem(props) {
    const { item } = props

    return (
        <div className='CheckoutItem'>
            <img className='CheckoutItem__Image' src={item.image} alt={item.title} />
            <p className='CheckoutItem__Title'>{item.title}</p>
            <p className='CheckoutItem__Subtitle'>{item.subtitle}</p>
            <p className='CheckoutItem__Quantity'>x{item.quantity}</p>
            <p className='CheckoutItem__Price'><span className='CheckoutItem__Price__Symbol'>$</span>{formatPrice(item.price * item.quantity)}</p>
        </div>
    )
}

export default CheckoutItem;
