import Item from './Item'

import '../styles/Popular.css'

function Popular(props) {
    const { products } = props

    return (
        <div className='Popular'>
            <h2 className='Popular__Title'>Popular</h2>
            <div className='Popular__Items'>
                {
                    products.map((product, idx) => 
                        <Item key={idx} product={product} />
                    )
                }
            </div>
        </div>
    )
}

export default Popular;
