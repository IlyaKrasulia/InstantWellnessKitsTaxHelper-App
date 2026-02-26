import styled from "styled-components";

interface IProps {
  children?: React.ReactNode;
}

export const GlassContainer = ({children}: IProps) => {
  return <AppContainer>{children}</AppContainer>;
};

const AppContainer = styled.div`
  display: flex;
  width: 90vw;
  height: 80vh;

  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  border-radius: 32px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  overflow: hidden;
  z-index: 10;
`;
