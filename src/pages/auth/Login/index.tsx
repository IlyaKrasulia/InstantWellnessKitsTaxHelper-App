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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthFormData, authSchema } from "./validation";
import { useNavigate } from "react-router-dom";
import api from "@/api/instance";
import { Endpoints } from "@/api/endpoints";
import { RouteNames } from "@/utils/routes";
import { toast } from "react-toastify";

export const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    mode: "onTouched",
  });

  const onSubmit = (data: AuthFormData) => {
    api
      .post(Endpoints.LOGIN, data)
      .then((res) => {
        if (res.data.isSuccess) {
          localStorage.setItem("isLogin", "1");
          navigate("/");
        } else {
          toast.error(res.data.message || "Login failed");
        }
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message || "Network error. Please try again.",
        );
      });
  };

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
        <FormCard onSubmit={handleSubmit(onSubmit)}>
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
            error={errors.login?.message}
            {...register("login")}
          />

          <CustomInput
            label="Password"
            type="password"
            placeholder="••••••••"
            fullWidth
            error={errors.password?.message}
            {...register("password")}
          />

          <CustomButton
            variant="primary"
            fullWidth
            style={{ marginTop: "10px" }}
            type="submit"
            isLoading={false}
          >
            Sign In
          </CustomButton>
        </FormCard>
      </MainContent>
    </Container>
  );
};
