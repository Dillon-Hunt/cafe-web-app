import './App.css';

import Home from './pages/Home'
import ItemOverview from './pages/ItemOverview'
import NoPage from './pages/NoPage'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs } from "firebase/firestore"

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

function App() {
  getDocs(collection(database, 'products')).then(results => {
    console.log(results.docs.map(result => result.data()))
  })

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home />}/>
          <Route path='/items/:itemId' element={<ItemOverview />}/>
          <Route path='*' element={<NoPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
