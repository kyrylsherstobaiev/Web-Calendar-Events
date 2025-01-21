import {
  Box,
  Center,
  Container,
  Heading,
  Highlight,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { yupSchemeSingIn } from "../model/yup/yupSchemeSingIn.js";
import { userSignedIn } from "../../../app/reducers/isSignedInUser.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../../shared/ui/Toast/index.js";
import { Input } from "../../../shared/ui/Input/index.js";
import { Button } from "../../../shared/ui/Button/index.js";
import { apiUser } from "../../../shared/api/api_user/api-user.js";

export const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { SIGNIN_URL, HEADERS } = apiUser;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(yupSchemeSingIn) });

  const onSubmit = async (data) => {
    try {
      let response = await fetch(SIGNIN_URL, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(data),
      });

      let user = await response.json();

      dispatch(
        userSignedIn({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        }),
      );

      if (user.name === "FirebaseError") {
        showToast(toast, "warning", "Firebase Error - Invalid-Credential");
        return console.log(user.code);
      }
      navigate("/");
      showToast(toast, "success", "User is signed in");
    } catch (e) {
      console.error(`error ${e}`);
    }
  };

  // noinspection JSValidateTypes
  return (
    <Center height="100vh" bg="gray.50">
      <Box
        p={6}
        borderRadius={3}
        w="350px"
        boxShadow="2xl"
        bg="white"
        textAlign="center"
        mx={2}
      >
        <Heading as="h3" mb={4} fontSize={20}>
          <Highlight
            query="Login"
            styles={{
              px: "2",
              py: "1",
              rounded: "full",
              bg: "green.500",
              color: "white",
            }}
          >
            Login
          </Highlight>
        </Heading>
        <Container as="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <Input
              name="email"
              register={register}
              placeholder={"Email"}
              error={errors.email?.message}
            />
            <Input
              name="password"
              register={register}
              placeholder={"Password"}
              error={errors.password?.message}
              type="password"
            />
            <Button type="submit" width={"100%"}>
              Sign In
            </Button>
          </Stack>
        </Container>
      </Box>
    </Center>
  );
};
