import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
    * {
        &::-webkit-scrollbar {
            display: none;
        }
    }
        
    html {
        margin: 0;
        padding: 0;
        height: 100vh;
        width: 100vw;
    }
    body {
        margin: 0;
        padding: 0;
        height: 100vh;
        width: 100vw;
    }
    #root {
        margin: 0;
        padding: 0;
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        flex: 1;
    }
    canvas {
        margin: 0;
        padding: 0;
    }
`;
 
export default GlobalStyle;