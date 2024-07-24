import {
  createBrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import "./App.css";
import axios from "axios";
import Header from "./components/common/Header.jsx";
import MainNews from "./components/contents/MainNews.jsx";
import StockList from "./components/contents/StockList.jsx";
import CryptoList from "./components/contents/CryptoList.jsx";
import { MemberProvider } from "./components/common/MemberContext.jsx";
import MainContent from "./components/contents/MainContent.jsx";
import ErrorPage from "./pages/common/error/ErrorPage.js";

const router = createBrowserRouter([
  { path: "/", element: <></>, errorElement: <ErrorPage />, children: [] },
]);

function App() {
  return (
    <Router>
      <div className="App">
        <MemberProvider>
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/mainNews" element={<MainNews />} />
              <Route path="/stockList" element={<StockList />} />
              <Route path="/cryptoList" element={<CryptoList />} />
            </Routes>
          </div>
        </MemberProvider>
      </div>
    </Router>
  );
}

export default App;
