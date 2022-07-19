import Item from './Item'

import '../styles/Under5.css'

function Under5(props) {

  // Filter out products that are not under $5
  const products = props.products.filter(product => product.prices.min < 5)

  return (
    <div className='Under5'>
        <h2 className='Under5__Title'>Under <span className='Under5__Title__Highlighted'>$5</span></h2>
        <div className='Under5__Items'>
            {
              products.map((product, idx) => 
                <Item key={idx} product={product} />
              )
            }
        </div>
    </div>
  )
}

export default Under5;
