import Item from './Item'

import '../styles/Under5.css'

function Under5() {
  return (
    <div className='Under5'>
        <h2 className='Under5__Title'>Under <span className='Under5__Title__Highlighted'>$5</span></h2>
        <div className='Under5__Items'>
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
        </div>
    </div>
  )
}

export default Under5;
