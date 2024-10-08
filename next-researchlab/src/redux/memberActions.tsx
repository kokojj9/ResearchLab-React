import { Member } from "@/types/types";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

// 초기 상태
const initialState: Member | null = null;

// 액션 크리에이터
const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    login: (state: Member | null, action: PayloadAction<Member>) => {
      localStorage.setItem("loginMember", JSON.stringify(action.payload));
      console.log("회원정보 로컬스토리지저장");
      return action.payload;
    },
    logout: () => {
      localStorage.removeItem("loginMember");
      return null;
    },
    setMember: (state: Member | null, action: PayloadAction<Member | null>) => {
      return action.payload;
    },
  },
});

// 액션 크리에이터 추출
export const { login, logout, setMember } = memberSlice.actions;

// 리덕스 스토어 생성
const store = configureStore({
  reducer: { member: memberSlice.reducer },
});

// RootState 타입 정의
export type RootState = ReturnType<typeof store.getState>;

export default store;
