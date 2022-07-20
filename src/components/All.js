import Item from './Item'

import '../styles/All.css'

function All(props) {
    const { products } = props

    return (
        <div className='All'>
            <h2 className='All__Title'>All</h2>
            <div className='All__Items'>
                {
                    products.map((product, idx) => 
                        <Item key={idx} product={product} />
                    )
                }
            </div>
        </div>
    )
}

export default All;
