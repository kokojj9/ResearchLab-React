import { useEffect, useState, createContext } from "react";
import axios from "axios";

export const MemberContext = createContext(null);

export const MemberProvider = ({ children }) => {
  const [member, setMember] = useState(null);

  useEffect(() => {
    getSession();
  }, []);

  const getSession = () => {
    axios({
      method: "get",
      url: "/members/getSession",
      withCredentials: true,
    }).then((response) => {
      if (response.data != null) {
        setMember(response.data.data);
      }
    });
  };

  return (
    <MemberContext.Provider value={{ member, setMember, getSession }}>
      {children}
    </MemberContext.Provider>
  );
};
