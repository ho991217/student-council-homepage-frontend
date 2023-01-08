// 글로벌 css 관련 파일
import { createGlobalStyle } from 'styled-components';

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
    html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

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
