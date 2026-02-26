import { COLORS, FONT_SIZES, FONTS, SHADOWS } from '@/utils/styles';
import fitnessImg from '@assets/images/login-bg.jpg';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${fitnessImg});
  background-size: cover;
  background-position: center;
  overflow: hidden;
`;

const FormCard = styled.form`
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.7); 
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 24px;
  border: 1px solid ${COLORS.border};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 2px solid ${COLORS.border};
  box-shadow: ${SHADOWS.input};
`;

const Title = styled.h2`
  font-family: ${FONTS.family};
  font-size: ${FONT_SIZES.h2};
  color: ${COLORS.textPrimary};
  text-align: center;
`;

const Subtitle = styled.h3`
  font-family: ${FONTS.family};
  font-size: ${FONT_SIZES.body};
  color: ${COLORS.textSecondary};
  font-weight: ${FONTS.weight.medium};
  margin-bottom: 8px;
  text-align: center;
`;

const MainContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const IconContainer = styled.div`
width: 48px;
  height: 48px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  background-color: ${COLORS.white};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

const LoginIcon = styled.img`
width: 30px;
`

const Logo = styled.img`
  height: 20px;
  width: auto;
  cursor: pointer;
  padding: 20px;
`;

export {
    Container, FormCard, Title, Logo, MainContent, IconContainer, LoginIcon, Subtitle
}