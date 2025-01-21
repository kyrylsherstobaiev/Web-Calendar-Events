import { Box, Button, Center, Flex, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import imgLogo from "../../../shared/assets/main-logo.svg";

export const UserNotFound = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Center w="100vw" h="100vh" bg="gray.50">
      <Box p={9} borderRadius="5px" boxShadow="2xl" bg="white">
        <Flex align="center" justify="center" pb={6}>
          <Image src={imgLogo} alt="logo" />
          <Text fontSize="5xl">WebCalendar</Text>
        </Flex>
        <Flex gap={2}>
          <Button flex="1" onClick={() => handleNavigation("/signup")}>
            SignUp
          </Button>
          <Button flex="1" onClick={() => handleNavigation("/signin")}>
            SignIn
          </Button>
        </Flex>
      </Box>
    </Center>
  );
};
