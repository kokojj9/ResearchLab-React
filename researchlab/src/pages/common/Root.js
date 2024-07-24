import { Outlet } from "react-router-dom";
import Header from "../../components/common/header/Header";

const RootLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* 자식 컴포넌트를 랜더링 해주는 역할 */}
      </main>
    </>
  );
};

export default RootLayout;
