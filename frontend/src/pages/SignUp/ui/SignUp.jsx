import {
  Box,
  Center,
  Container,
  Heading,
  Stack,
  useToast,
  Highlight,
  Flex,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { yupSchemeSingUp } from "../model/yup/yupSchemeSingUp.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { showToast } from "../../../shared/ui/Toast/toast.js";
import { Input } from "../../../shared/ui/Input/index.js";
import { Button } from "../../../shared/ui/Button/index.js";
import { apiUser } from "../../../shared/api/api_user/api-user.js";

export const SignUp = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { SIGNUP_URL, HEADERS } = apiUser;

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange", resolver: yupResolver(yupSchemeSingUp) });

  const onSubmit = async (newUser) => {
    try {
      let response = await fetch(SIGNUP_URL, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(newUser),
      });

      showToast(toast, "success", "Account created");
      reset();
      navigate("/signin");
    } catch (e) {
      console.log(`error ${e}`);
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
            query="SignUp"
            styles={{
              px: "2",
              py: "1",
              rounded: "full",
              bg: "green.500",
              color: "white",
            }}
          >
            SignUp
          </Highlight>
        </Heading>
        <Container as="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={"0.6rem"}>
            <Input
              register={register}
              name="email"
              placeholder="Email"
              error={errors.email?.message}
            />
            <Input
              register={register}
              name="password"
              placeholder="Password"
              type="password"
              error={errors.password?.message}
            />
            <Input
              register={register}
              name="firstName"
              placeholder="First name"
              error={errors.firstName?.message}
            />
            <Input
              register={register}
              name="lastName"
              placeholder="Last name"
              error={errors.lastName?.message}
            />
            <Flex flexDirection="column" gap={"0.1rem"}>
              <Button type="submit" width="100%">
                Register
              </Button>
              <Button
                type="button"
                width="100%"
                handleClick={() => reset()}
                className="btn-clear"
              >
                Clear
              </Button>
            </Flex>
          </Stack>
        </Container>
      </Box>
    </Center>
  );
};
