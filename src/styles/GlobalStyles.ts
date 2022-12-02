// 글로벌 css 관련 파일
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset'; // 리셋 기본 스타일
import 'static/fonts/pretendard.css'; // 폰트 설정

export const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'Cafe24Ohsquare';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/Cafe24Ohsquare.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }
    @font-face {
        font-family: 'Cafe24Ohsquareair';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2202@1.0/Cafe24Ohsquareair.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }

    ${reset}
    :root {
        font-family: 'Pretendard', sans-serif;
        ${({ theme }) => theme.media.mobile} {
            font-size: 12px
        };
        ${({ theme }) => theme.media.tablet} {
            font-size: 14px
        };
        ${({ theme }) => theme.media.desktop} {
            font-size: 16px
        };

    }
    * {
        box-sizing: border-box;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    body {
        background-color: ${(props) => props.theme.colors.gray040};
        position: relative;
    }
    html,
    body {
        height: 100vh;
        height: var(--vh);
    }
    #root {
        --vh: 100%;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
`;
