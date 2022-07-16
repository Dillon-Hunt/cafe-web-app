import WelcomeBanner from '../components/WelcomeBanner'
import Search from '../components/Search'
import Popular from '../components/Popular'
import Under5 from '../components/Under5'

import '../styles/Home.css'
import Navigation from '../components/Navigation'

function Home(props) {
    const { products } = props

    return (
        <div className='Home'>
            <WelcomeBanner />
            <Search />
            <Popular products={products} />
            <Under5 products={products} />
            <Navigation />
        </div>
  ) 
}

export default Home;
