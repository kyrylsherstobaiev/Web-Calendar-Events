import { Center, Text } from "@chakra-ui/react";

export const PageNotFound = () => {
  return (
    <Center
      h="100vh"
      p={6}
      fontWeight={700}
      textColor="white"
      bgGradient="linear(to-t, red.300, orange.500)"
    >
      <Text fontSize="2rem" align="center">
        "Oops...! Something went wrong. Please try again letter."
      </Text>
    </Center>
  );
};
