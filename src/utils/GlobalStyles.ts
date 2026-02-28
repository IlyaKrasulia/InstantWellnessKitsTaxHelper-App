import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  .custom-cluster-icon {
    background: rgba(158, 154, 237, 0.6) !important;
    border: 3px solid rgba(158, 154, 237, 0.3) !important;
    border-radius: 50% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    color: white !important;
    font-weight: bold !important;
    box-shadow: 0 0 15px rgba(158, 154, 237, 0.4) !important;
    backdrop-filter: blur(2px) !important;
  }

  .cluster-small { width: 40px !important; height: 40px !important; }
  .cluster-medium { width: 55px !important; height: 55px !important; }
  .cluster-large { width: 75px !important; height: 75px !important; }

  .custom-cluster-icon span {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
  }
`;