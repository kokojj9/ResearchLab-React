import { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import axios from "axios";
import Header from './components/common/Header.jsx'
import MainNews from './components/contents/MainNews.jsx';
import StockList from './components/contents/StockList.jsx';
import CryptoList from './components/contents/CryptoList.jsx';

function App() {
  const [member, setMember] = useState(null);

  const { loginMember } = useContext(member);

  useEffect(() => {
    getSession();
  }, [])

  const getSession = () => {
    axios({
      method: 'get',
      url: '/members/getSession',
      withCredentials: true
    }).then(response => {
      if (response.data != null) {
        setMember(response.data.data);
      }
    })
  }

  return (
    <Router>
      <div className="App">
        <Header
          loginMember={member}
          getSession={getSession}
          setMember={setMember}
        />
        <div className="content">
          <Routes>
            <Route path="/mainNews" element={<MainNews />} />
            <Route path="/stockList" element={<StockList />} />
            <Route path="/cryptoList" element={<CryptoList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
