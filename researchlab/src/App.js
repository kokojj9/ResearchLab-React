import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import MainNews from "./components/contents/MainNews.js";
import StockList from "./components/contents/StockList.js";
import CryptoList from "./components/contents/CryptoList.js";
import { MemberProvider } from "./context/MemberContext.js";
import MainContent from "./components/contents/MainContent.js";
import ErrorPage from "./pages/common/error/ErrorPage.js";
import RootLayout from "./pages/common/Root.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MainContent /> },
      { path: "mainNews", element: <MainNews /> },
      { path: "stockList", element: <StockList /> },
      { path: "cryptoList", element: <CryptoList /> },
      // 복리계산기
      // 매매복기 게시판
    ],
  },
]);

function App() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}

export default App;
