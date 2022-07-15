import WelcomeBanner from '../components/WelcomeBanner'
import Search from '../components/Search'
import Popular from '../components/Popular'
import Under5 from '../components/Under5'

import '../styles/Home.css'

function Home() {
    return (
        <div className='Home'>
            <WelcomeBanner />
            <Search />
            <Popular />
            <Under5 />
        </div>
  ) 
}

export default Home;
