import './App.css';

import Home from './pages/Home'
import ItemOverview from './pages/ItemOverview'
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import NoPage from './pages/NoPage'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from 'react';

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
// Add Analytics

function App() {
  const [products, setProducts] = useState(null)

  useEffect(() => {
    getDocs(collection(database, 'products')).then(results => {
    setProducts(results.docs.map(result => {
      let products = result.data()
      products.id = result.id
      return products
    }))
  })}, [])
  

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={products !== null && <Home products={products} />}/>
          <Route path='/products/:productId' element={products !== null && <ItemOverview products={products} />}/>
          <Route path='/checkout' element={products !== null && <Checkout products={products} />}/>
          <Route path='/success' element={<Success />}/>
          <Route path='*' element={<NoPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
