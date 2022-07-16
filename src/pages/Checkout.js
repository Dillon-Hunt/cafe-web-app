import '../styles/Checkout.css'

import CheckoutItem, { formatPrice } from '../components/CheckoutItem';
import Navigation from '../components/Navigation';

import { useNavigate } from 'react-router-dom';

function Checkout() {
    const order = JSON.parse(localStorage.getItem('order'))

    let total = 0

    order !== null && order.forEach(item => {
        total += item.price * item.quantity
    })

    const navigate = useNavigate()

    const submitOrder = () => {
        if (order !== null) {
            localStorage.clear()
            navigate('/success')
        }
    }

    return (
        <div className='Checkout'>
            <h1 className='Checkout__Title'>Checkout</h1>
            <div className='Checkout__Items'>
                {
                     order !== null ? order.map((item, idx) =>
                        <CheckoutItem key={idx} item={item} />
                    ) : <p className='Checkout__Items__Empty'>Add Some Items To Your Order.</p>
                }
                <p className='Checkout__Total'>Total: <span className='Checkout__Total__Symbol'>$</span><span className='Checkout__Total__Value'>{formatPrice(total)}</span></p>
            </div>
            <button className='Checkout__Checkout__Button' onClick={submitOrder} disabled={order === null}>Checkout</button>
            <Navigation />
        </div>
    )
}

export default Checkout;
