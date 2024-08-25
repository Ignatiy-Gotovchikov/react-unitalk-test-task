import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    background-color: #f0f2f5;
  }

  #root {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    padding: 8px 12px;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
    font-weight: bold;
  }
`;

export default GlobalStyles;
