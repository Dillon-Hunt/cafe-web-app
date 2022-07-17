import WelcomeBanner from '../components/WelcomeBanner'
import SearchResults from '../components/SearchResults'
import Popular from '../components/Popular'
import Under5 from '../components/Under5'
import Navigation from '../components/Navigation'

import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

import '../styles/Home.css'

function Home(props) {
    const { products, signedIn } = props

    console.log(signedIn)

    const [results, setResults] = useState([])

    const updateResults = (e) => {
        if (e.target.value === "") setResults([])
        else {
            const results = products.filter(product => {
                if (product.title.includes(e.target.value) || product.subtitle.includes(e.target.value)) return true
                return false
            })

            if (results.length !== 0) {
                setResults(results)
            } else {
                setResults([null])
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
            <Popular products={products} />
            <Under5 products={products} />
            <Navigation />
        </div>
  ) 
}

export default Home;
