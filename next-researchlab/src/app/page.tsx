import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import { MemberProvider } from "./context/MemberContext.js";

// import MainNews from "./pages/news/MainNews.js";
// import StockList from "./components/contents/StockList.js";
// import CryptoList from "./pages/investment/CryptoList.js";
// import MainContent from "./pages/common/MainContent.js";
// import ErrorPage from "./pages/common/error/ErrorPage.js";
// import RootLayout from "./pages/common/Root.js";
// import TradeDiaryBoard from "./pages/tradeboard/TradeDiaryBoard.js";
// import InterestCalculatorPage from "./pages/calculator/InterestCalculator.js";
// import NewTradePost from "./pages/tradeboard/NewTradePost.js";

import "./App.css";
// import TradePostDetail from "./components/tradeBoard/TeadePostDetail.js";

const router = createBrowserRouter([
  {
    // path: "/",
    // element: <RootLayout />,
    // errorElement: <ErrorPage />,
    // children: [
    //   { index: true, element: <MainContent /> },
    //   { path: "mainNews", element: <MainNews /> },
    //   { path: "stockList", element: <StockList /> },
    //   { path: "cryptoList", element: <CryptoList /> },
    //   { path: "calculator", element: <InterestCalculatorPage /> },
    //   {
    //     path: "tradeBoard",
    //     element: <TradeDiaryBoard />,
    //     children: [
    //       { path: "new", element: <NewTradePost /> },
    //       { path: ":boardNo", element: <TradePostDetail /> },
    //     ],
    //   },
    //   ,
    // ],
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
