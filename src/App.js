import './App.css';

import Home from './pages/Home'
import ItemOverview from './pages/ItemOverview'
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import NoPage from './pages/NoPage'
import SignIn from './pages/SignIn'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect, useState } from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async'

import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs, getDoc, doc } from "firebase/firestore"
import { getAuth, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD1MZx4gn6sZB83dm16fgaGG-wLw6mId_o",
  authDomain: "cafe-web-app-d741e.firebaseapp.com",
  projectId: "cafe-web-app-d741e",
  storageBucket: "cafe-web-app-d741e.appspot.com",
  messagingSenderId: "439419802863",
  appId: "1:439419802863:web:3ba5c71a2e4a1570a3771a",
  measurementId: "G-FT6SQ8GD6G"
}

export const app = initializeApp({...firebaseConfig})
export const database = getFirestore(app)
export const auth = getAuth(app)
// Add Analytics Here

function App() {
  const [products, setProducts] = useState(null)
  const [signedIn, loading] = useAuthState(auth)
  const [allowedAccess, setAllowedAccess] = useState(false)

  useEffect(() => {
    getDocs(collection(database, 'products')).then(results => {
    setProducts(results.docs.map(result => {
      let products = result.data()
      products.id = result.id
      return products
    }))
  })}, [])

  useEffect(() => {
    if (signedIn === null) {
      setAllowedAccess(true)
    } else {
      getDoc(doc(database, 'config', 'allowedUsers')).then(snapshot => {
        if (!snapshot.data().emails.includes(signedIn.email)) {
            signOut(auth)
            setAllowedAccess(false)
            alert('Staff Only, If you\'re a staff member contact an administrator.')
        }
      })
    }
  }, [signedIn])

  return (
    <div className='App'>
      <HelmetProvider>
      {
        loading || !allowedAccess ? <>
          <Helmet>
            <title>Loading</title>
          </Helmet> 
          <p className='App__Loading'>
            Loading...
          </p>
        </>

        :
        <BrowserRouter>
          <Routes>
            {
                signedIn === null ?
                <>
                  <Route path="*" element={<SignIn />} />
                </>

                :

                <>
                <Route index path="/" element={<SignIn />} />
                <Route path='/home' element={products !== null && <Home products={products} signedIn={signedIn} />}/>
                <Route path='/products/:productId' element={products !== null && <ItemOverview products={products} />}/>
                <Route path='/checkout' element={products !== null && <Checkout products={products} signedIn={signedIn} />}/>
                <Route path='/success' element={<Success />}/>
                <Route path='*' element={<NoPage />}/>
              </>
            }
          </Routes>
        </BrowserRouter>
      }
      </HelmetProvider>
    </div>
  );
}

export default App;
