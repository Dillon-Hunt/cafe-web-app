import '../styles/Checkout.css'

import CheckoutItem, { formatPrice } from '../components/CheckoutItem'
import Navigation from '../components/Navigation'

import { database } from '../App'

import { useNavigate } from 'react-router-dom'
import { addDoc, collection } from 'firebase/firestore'
import { Helmet } from 'react-helmet-async'

function Checkout(props) {
    const { signedIn } = props

    const order = JSON.parse(localStorage.getItem('order'))

    let total = 0

    order !== null && order.forEach(item => {
        total += item.price * item.quantity
    })

    const navigate = useNavigate()

    const submitOrder = () => {
        if (order !== null) {
            addDoc(collection(database, 'orders'), { items: order, name: signedIn.displayName, time: Date.now() })
            localStorage.clear()
            navigate('/success')
        }
    }

    return (
        <div className='Checkout'>
            <Helmet>
                <title>Checkout | St Andrew's Anglican College Hospitality</title>
            </Helmet>

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
