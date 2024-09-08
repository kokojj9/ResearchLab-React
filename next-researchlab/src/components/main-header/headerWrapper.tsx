// HeaderWrapper.tsx (클라이언트 컴포넌트)
"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "../../redux/memberActions";

const HeaderWrapper = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default HeaderWrapper;
