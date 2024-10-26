// src/api/apiClient.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000", // 서버의 기본 URL 설정
  withCredentials: true, // 요청마다 쿠키를 자동으로 포함
});

// 요청 인터셉터 설정 (필요 시)
apiClient.interceptors.request.use(
  (config) => {
    // 필요한 경우 요청마다 헤더 설정 등 추가 작업 가능
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
apiClient.interceptors.response.use(
  (response) => response, // 성공적인 응답은 그대로 반환
  (error) => {
    if (error.response && error.response.status === 401) {
      // 인증 실패 처리 (예: 로그아웃 처리 또는 로그인 페이지로 리디렉션)
      console.error("인증 오류: 로그인 상태가 아닙니다.");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
