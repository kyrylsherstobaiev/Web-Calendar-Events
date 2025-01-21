// Library Imports
import moment from "moment";

// Chakra UI Imports
import {
  Box,
  Circle,
  Flex,
  Heading,
  Image,
  Text,
  Tooltip,
} from "@chakra-ui/react";

import { useSelector, useDispatch } from "react-redux";

import { Button } from "../../../shared/ui/Button/index.js";
import { DropDown } from "../../../shared/ui/DropDown/index.js";
import { useSignOut } from "../model/hook/useSignOut.jsx";

import { setToday } from "../../../app/reducers/isToday.js";

import imgLogo from "../../../shared/assets/logo-in-calendar.svg";

export const Header = ({ onSelected }) => {
  // noinspection JSUnresolvedReference
  const pickedDate = useSelector((state) => state.pickedDate);
  // noinspection JSUnresolvedReference
  const { onSignOut } = useSignOut();

  let date = moment(pickedDate.date, 'DD/MM/YYYY"');

  // noinspection JSUnresolvedReference
  const user = useSelector((state) => state.isSignedInUser);

  const dispatch = useDispatch();

  const { email, displayName } = user.user;

  // noinspection JSValidateTypes
  return (
    <Box
      bg="white"
      display="flex"
      justifyContent="center"
      boxShadow="lg"
      mb={3}
      px="1rem"
      py="0.5rem"
      position="sticky"
      top="0"
      zIndex="20"
    >
      <Box maxW="1300px" width="100%">
        <Flex justify="space-between" alignItems="center">
          <Flex align="center" gap={4}>
            <Flex align="center">
              <Image src={imgLogo} alt="logo-calendar" />
              <Heading as="h4" size="md" fontWeight={400}>
                WebCalendar
              </Heading>
            </Flex>
            <Box>
              <Button
                handleClick={() =>
                  dispatch(setToday(`${new Date().getDate()}`))
                }
                className={"btn-today"}
                type="button"
              >
                Today
              </Button>
            </Box>
            <Box>
              <Text fontWeight="700" fontSize={16} letterSpacing={-0.5}>
                {date.format("ddd, DD MMM YYYY")}
              </Text>
            </Box>
          </Flex>
          <Flex>
            <Flex align="center" gap={1}>
              <DropDown onSelected={(value) => onSelected(value)} />
              <Tooltip hasArrow label="Sign out" bg="blue.600">
                <Flex
                  onClick={onSignOut}
                  align="center"
                  gap={1}
                  cursor="pointer"
                >
                  <Flex
                    mx={2}
                    flexDirection="column"
                    fontSize={10}
                    fontWeight="700"
                  >
                    <Box fontWeight="700" fontSize={13}>
                      {displayName}
                    </Box>
                    <Box color="blue.800">{email}</Box>
                  </Flex>
                  <Circle
                    size="30px"
                    bg="green.500"
                    color="white"
                    fontSize={20}
                    fontWeight={700}
                  >
                    {email[0].toUpperCase()}
                  </Circle>
                </Flex>
              </Tooltip>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};
