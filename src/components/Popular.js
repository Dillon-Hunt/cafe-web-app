import Item from './Item'

import '../styles/Popular.css'

function Popular() {
    return (
        <div className='Popular'>
            <h2 className='Popular__Title'>Popular</h2>
            <div className='Popular__Items'>
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

export default Popular;
