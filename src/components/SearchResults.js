import Item from './Item'

import '../styles/SearchResults.css'

function SearchResults(props) {
    const { products } = props

    return (
        <div className='SearchResults'>
            <h2 className='SearchResults__Title'>Results</h2>
            <div className='SearchResults__Items'>
                {
                    products[0] !== null ? products.map((product, idx) => 
                        <Item key={idx} product={product} />
                    ) : <div className='SearchResults__NoResults'><p className='SearchResults__NoResults__Text'>No Results</p></div>
                }
            </div>
        </div>
    )
}

export default SearchResults;