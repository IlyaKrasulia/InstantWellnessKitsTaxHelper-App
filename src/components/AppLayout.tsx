import styled from "styled-components";
import { Outlet, useMatches, useNavigate } from "react-router-dom";
import { COLORS, FONT_SIZES, FONTS, SPACING } from "@styles";
import logo from "@assets/images/logo-black.svg";
import { File, HelpCircle, Import, ListOrdered, LogOut, Settings } from "lucide-react";
import { RouteNames } from "@/utils/routes";
import { MainBG } from "./MainBG";
import { GlassContainer } from "./GlassContainer";

interface RouteHandle {
  title?: string;
  info?: string;
}

const TABS = [
  { name: "Import CSV", icon: <Import />, path: RouteNames.IMPORT },
  { name: "Manual Create", icon: <File />, path: RouteNames.CREATE },
  { name: "Orders List", icon: <ListOrdered />, path: RouteNames.ORDERS },
];

export const AppLayout = () => {
  const navigate = useNavigate();

  const matches = useMatches();

  const currentMatch = matches.find((m) => m.handle);
  const { title, info } = (currentMatch?.handle as RouteHandle) || {};

  const onOpenPage = (path: string) => {
    navigate(`/${path}`);
  };

  const onLogout = () => {
    localStorage.removeItem('isLogin');
    navigate(RouteNames.LOGIN);
  }

  return (
    <MainBG>
      <GlassContainer>
        <SidebarContainer>
          <div style={{ paddingLeft: "10px" }}>
            <img src={logo} alt="BDPay" style={{ height: "20px" }} />
          </div>

          <NavMenu>
            {TABS.map((tab) => (
              <NavItem
                key={tab.path}
                $active={currentMatch?.pathname === `/${tab.path}`}
                onClick={() => onOpenPage(tab.path)}
                as="button"
                type="button"
                aria-current={currentMatch?.pathname === `/${tab.path}` ? "page" : undefined}
              >
                <span>{tab.icon}</span> {tab.name}
              </NavItem>
            ))}
          </NavMenu>

          <BottomMenu>
            <NavItem>
              <span>
                <HelpCircle />
              </span>{" "}
              Get Help
            </NavItem>
            <NavItem $logout onClick={onLogout}>
              <span>
                <LogOut />
              </span>{" "}
              Logout
            </NavItem>
          </BottomMenu>
        </SidebarContainer>

        <MainContent>
          {title && <Title>{title}</Title>}
          {info && <InfoText>{info}</InfoText>}
          <Outlet />
        </MainContent>
      </GlassContainer>
    </MainBG>
  );
};

const SidebarContainer = styled.aside`
  width: 280px;
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

const NavItem = styled.div<{ $active?: boolean, $logout?: boolean, }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  cursor: pointer;
  font-family: ${FONTS.family};
  font-weight: ${FONTS.weight.medium};
  transition: all 0.2s ease;

  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;

  background-color: ${(props) => (props.$active ? COLORS.gray : "transparent")};
  color: ${(props) => (props.$active ? COLORS.white : props.$logout ? COLORS.error : COLORS.textSecondary)};

  &:hover {
    background-color: ${(props) =>
      props.$active ? COLORS.gray : COLORS.hoverOverlay};
    color: ${(props) => (props.$active ? COLORS.white : props.$logout ? COLORS.errorLigher : COLORS.textPrimary)};
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
  color: ${COLORS.gray};
`;
