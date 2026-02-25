import { RadialBlur } from "progressive-blur";
import {
  Container,
  FormCard,
  IconContainer,
  LoginIcon,
  Logo,
  MainContent,
  Subtitle,
  Title,
} from "./styles";
import { CustomInput } from "@/components/CustomInput";
import { CustomButton } from "@/components/CustomButton";
import logo from "@assets/images/logo.svg";
import loginIcon from "@assets/images/login.svg";

export const LoginPage = () => {
  return (
    <Container>
      <Logo src={logo} />

      <RadialBlur
        steps={2}
        strength={10}
        falloffPercentage={200}
        tint="rgba(255, 255, 255, 0.2)"
        style={{
          position: "absolute",
          inset: 0,
        }}
      />

      <MainContent>
        <FormCard>
          <IconContainer>
            <LoginIcon src={loginIcon} />
          </IconContainer>
          <Title>Sign In With email</Title>
          <Subtitle>
            Make a new doc to bring your words, data, and teams together. For
            free
          </Subtitle>

          <CustomInput
            label="Email Address"
            placeholder="example@mail.com"
            fullWidth
          />

          <CustomInput
            label="Password"
            type="password"
            placeholder="••••••••"
            fullWidth
          />

          <CustomButton
            variant="primary"
            fullWidth
            style={{ marginTop: "10px" }}
          >
            Sign In
          </CustomButton>
        </FormCard>
      </MainContent>
    </Container>
  );
};
