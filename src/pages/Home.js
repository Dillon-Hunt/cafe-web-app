import WelcomeBanner from '../components/WelcomeBanner'
import SearchResults from '../components/SearchResults'
import All from '../components/All'
import Popular from '../components/Popular'
import Under5 from '../components/Under5'
import Navigation from '../components/Navigation'

import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

import '../styles/Home.css'

function Home(props) {
    const { products, signedIn } = props

    // Set state variable (will rerender view on update)
    const [results, setResults] = useState([])

    // Update search results
    const updateResults = (e) => {

        // Check if search term is empty
        if (e.target.value === "") {

            // Set search results to empty array
            setResults([])
        } else {

            // Filter products by search term
            const results = products.filter(product => {
                if (product.title.includes(e.target.value) || product.subtitle.includes(e.target.value)) return true
                return false
            })

            // Check if results are empty
            if (results.length !== 0) {

                // Set search results to filtered products
                setResults(results)
            } else {

                // Set search results to empty array
                setResults([])
            }
        }
    }

    return (
        <div className='Home'>
            <Helmet>
                <title>Home | St Andrew's Anglican College Hospitality</title>
            </Helmet>

            <WelcomeBanner signedIn={signedIn} />

            <div className='Search'>
                <p className='Search__Text'>
                    What would you <br />
                    like <span className='Search__Text__Highlighted'>to order?</span>
                </p>
                <input type='text' className='Search__Input' onKeyUp={updateResults} placeholder='Search'/>
            </div>

            {
                results.length !== 0 && <SearchResults products={results} />
            }
            <All products={products} />
            <Popular products={products} />
            <Under5 products={products} />
            <Navigation />
        </div>
  ) 
}

export default Home;
