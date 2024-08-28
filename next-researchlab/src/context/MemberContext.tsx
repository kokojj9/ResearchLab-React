"use client";
import { createContext, ReactNode, useState } from "react";

export type MemberType = {
  memberNo: number;
  memberId: string;
  email: string;
};

export type MemberContextType = {
  member: MemberType | null;
  setMember: (member: MemberType | null) => void;
  login: (member: MemberType) => void;
  logout: () => void;
};

export const MemberContext = createContext<MemberContextType | undefined>(
  undefined
);
// <타입 | undefind,null > 해당 타입이 타입이나 다른 것일 수 있다는 표현
// 보통 context에서 아직 값이 정해지지 제공되지 않는 경우를 처리하기 위해 사용됨
export const MemberProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [member, setMember] = useState<MemberType | null>(null);

  const login = (member: MemberType) => {
    localStorage.setItem("loginMember", JSON.stringify(member));
    setMember(member);
  };

  const logout = () => {
    localStorage.removeItem("loginMember");
    setMember(null);
  };

  return (
    <MemberContext.Provider value={{ member, setMember, login, logout }}>
      {children}
    </MemberContext.Provider>
  );
};
