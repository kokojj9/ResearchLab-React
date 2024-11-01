import { Member } from "@/types/types";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

// 초기 상태
const initialState: Member | null = null;

// 액션 크리에이터
const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Member>) => {
      // 회원 정보만 Redux 상태에 저장
      return action.payload;
    },
    logout: () => {
      // 로그아웃 시 상태를 null로 변경
      return null;
    },
    setMember: (state, action: PayloadAction<Member | null>) => {
      // 서버에서 가져온 회원 정보를 설정
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
