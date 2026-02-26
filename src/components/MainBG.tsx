import styled from "styled-components";
import bg from "@assets/images/login-bg.jpg";

interface IProps {
  children?: React.ReactNode;
}

export const MainBG = (props: IProps) => {
  return <Layout>{props.children}</Layout>;
};

const Layout = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${bg});
  background-size: cover;
  background-position: center;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
`;
