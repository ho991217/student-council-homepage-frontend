// 글로벌 css 관련 파일
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset'; // 리셋 기본 스타일
import './fonts/pretendard.css'; // 폰트 설정

export const GlobalStyles = createGlobalStyle`
    ${reset}
    :root {
        font-family: 'Pretendard', sans-serif;
    }
`;
