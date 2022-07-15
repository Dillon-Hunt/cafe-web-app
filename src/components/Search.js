import '../styles/Search.css'

function Search() {
    return (
        <div className='Search'>
            <p className='Search__Text'>
                What would you <br />
                like <span className='Search__Text__Highlighted'>to order?</span>
            </p>
            <input type='text' className='Search__Input' placeholder='Search'/>
        </div>
    )
}

export default Search;
