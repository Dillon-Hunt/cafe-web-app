import Item from './Item'

import '../styles/Popular.css'

function Popular(props) {
    const { products } = props

    const popular = products.sort((a, b) => b.orders - a.orders).slice(0, 5)

    return (
        <div className='Popular'>
            <h2 className='Popular__Title'>Popular</h2>
            <div className='Popular__Items'>
                {
                    popular.map((product, idx) => 
                        <Item key={idx} product={product} />
                    )
                }
            </div>
        </div>
    )
}

export default Popular;
