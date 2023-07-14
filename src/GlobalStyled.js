import { createGlobalStyle } from "styled-components";

export const GlobalStyled = createGlobalStyle`
	@font-face {
    font-family: 'SUITE-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
}
@font-face {
    font-family: 'PartialSansKR-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-1@1.1/PartialSansKR-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

  html, body, div, span, h1, h2, h3, h4, h5, h6, p, a, img, ol, ul, li, fieldset, form, label, legend, article,figure, figcaption, footer, header,nav, section {
	margin: 0;
	padding: 0;
	border: 0;
	text-decoration: none;
  font-size: 14px;
  color: rgb(29, 29, 31);
}

body {
	width: 100%;
	height: 100%;
	font-family: 'SUITE-Regular';
}
`