import styled from "styled-components";
import { COLORS, FONT_SIZES, FONTS, SPACING } from "@styles";
import logo from "@assets/images/logo-black.svg";
import fitnessImg from "@assets/images/login-bg.jpg";
import { File, HelpCircle, Import, ListOrdered, Settings } from "lucide-react";
import { ReactNode } from "react";

const Layout = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${fitnessImg});
  background-size: cover;
  background-position: center;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const AppContainer = styled.div`
  display: flex;
  width: 90vw;
  height: 80vh;

  background-color: rgba(248, 249, 250, 0.8);

  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);

  border-radius: 32px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  overflow: hidden;
  z-index: 10;
`;

const SidebarContainer = styled.aside`
  width: 280px;
  height: 100мр;
  background-color: ${COLORS.surface};
  border-right: 1px solid ${COLORS.border};
  display: flex;
  flex-direction: column;
  padding: 32px 24px;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
`;

const NavMenu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 40px;
  flex: 1;
`;

const NavItem = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  cursor: pointer;
  font-family: ${FONTS.family};
  font-weight: ${FONTS.weight.medium};
  transition: all 0.2s ease;

  background-color: ${(props) => (props.$active ? COLORS.gray : "transparent")};
  color: ${(props) => (props.$active ? COLORS.white : COLORS.textSecondary)};

  &:hover {
    background-color: ${(props) =>
      props.$active ? COLORS.gray : COLORS.hoverOverlay};
    color: ${(props) => (props.$active ? COLORS.white : COLORS.textPrimary)};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const BottomMenu = styled.div`
  border-top: 1px solid ${COLORS.border};
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.h1`
  font-family: ${FONTS.family};
  font-weight: ${FONTS.weight.bold};
  font-size: ${FONT_SIZES.h1};
  margin-bottom: ${SPACING.sm};
  color: ${COLORS.textPrimary};
`;

const InfoText = styled.h3`
  font-family: ${FONTS.family};
  font-weight: ${FONTS.weight.medium};
  font-size: ${FONT_SIZES.body};
  color: ${COLORS.textSecondary};
`;

interface IProps {
  children: ReactNode;
  title?: string;
  info?: string;
}

export const AppLayout = ({ children, title, info }: IProps) => {
  return (
    <Layout>
      <AppContainer>
        <SidebarContainer>
          <div style={{ paddingLeft: "10px" }}>
            <img src={logo} alt="BDPay" style={{ height: "20px" }} />
          </div>

          <NavMenu>
            <NavItem $active>
              <span>
                <Import />
              </span>{" "}
              Import CSV
            </NavItem>
            <NavItem>
              <span>
                <File />
              </span>{" "}
              Manual Create
            </NavItem>
            <NavItem>
              <span>
                <ListOrdered />
              </span>{" "}
              Orders List
            </NavItem>
          </NavMenu>

          <BottomMenu>
            <NavItem>
              <span>
                <HelpCircle />
              </span>{" "}
              Get Help
            </NavItem>
            <NavItem>
              <span>
                <Settings />
              </span>{" "}
              Settings
            </NavItem>
          </BottomMenu>
        </SidebarContainer>

        <MainContent>
          {title && <Title>{title}</Title>}
          {info && <InfoText>{info}</InfoText>}
          {children}
        </MainContent>
      </AppContainer>
    </Layout>
  );
};
