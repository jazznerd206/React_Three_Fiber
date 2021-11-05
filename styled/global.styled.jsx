import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
    *::-webkit-scrollbar {
    display: none;
    }
    body {
        margin: 0;
        padding: 0;
        height: 100vh;
        width: 100vw;
    }
    #root {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        flex: 1;
        background: linear-gradient(to top, #2d5818 20%, #d2c090 30%, #738b3c 50%, #bbd4eb 80%, #eaeef2 100%);
        /* background: linear-gradient(to top, #2d5818 0% 15%, #d2c090 15% 205, #738b3c 20% 50%, #bbd4eb 50% 80%, #eaeef2 80% 100%); */
    }
`;
 
export default GlobalStyle;