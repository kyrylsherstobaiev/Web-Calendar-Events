import {
  Box,
  Flex,
  Grid,
  Stack,
  GridItem,
  useDisclosure,
  Center,
} from "@chakra-ui/react";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { CalendarCustom } from "../../../shared/ui/CalendarPicker/";
import { Day } from "../../../entities/Day/";
import { Week } from "../../../entities/Week/";
import { HoursScale } from "../../../entities/HoursScale/";
import { CreateUpdateEvent } from "../../../features/CreateUpdateEvent/";
import { SpinnerFetch } from "../../../shared/ui/SpinnerFetch/";
import { Button } from "../../../shared/ui/Button/";
import { DisplayEventsOnTheDay } from "../../../entities/DisplayEventsOnTheDay/";

import { useGetWeek } from "../hook/useGetWeek.js";

import moment from "moment";
import { getEvents } from "../../../shared/api/api_events/CRUID operations/api.js";

moment.updateLocale("en", {
  week: {
    dow: 1,
  },
});

export const UserSignedIn = ({ Header }) => {
  const { user } = useSelector((state) => state.isSignedInUser);
  const pickedDate = useSelector((state) => state.pickedDate);
  const date = moment(pickedDate.date, "DD/MM/YYYY");
  const [isDay, setIsDay] = useState("day");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { dates } = useGetWeek(date);

  const { data, isPending, isSuccess, error } = useQuery({
    queryKey: ["events"],
    queryFn: () => getEvents(`${user.uid}`),
    enabled: true,
  });

  if (isPending) {
    return (
      <Center mt={100}>
        <SpinnerFetch />
      </Center>
    );
  }

  if (error) {
    console.log("Fetching error");
  }

  if (isSuccess) {
    if (data.length === 0) {
      console.log("No events were fetched");
    }
  }

  return (
    <Box justifyItems="center" bg="gray.50" pb={3}>
      <Header onSelected={(value) => setIsDay(value)} />
      <Flex justify="center" px="1rem">
        <Flex maxW="1300px" width="full" gap="0.75rem">
          <Stack position="sticky" top="68px" alignSelf="flex-start">
            <Button onClick={onOpen} width={"100%"}>
              New Event
            </Button>
            <CreateUpdateEvent onClose={onClose} isOpen={isOpen} />
            <CalendarCustom />
          </Stack>

          <Grid
            bg="white"
            flex={1}
            gridTemplateColumns="auto 1fr"
            gridTemplateRows="repeat(25,35px)"
            h="calc(100vh - 80px)"
            overflow="auto"
          >
            <GridItem
              gridColumn="1"
              gridRow="1/2"
              bg="white"
              position="sticky"
              top="0"
              borderBottom="1px"
              borderColor="green.300"
            ></GridItem>
            <GridItem gridColumn="1" gridRow="2/26">
              <HoursScale />
            </GridItem>

            <GridItem gridColumn="2" gridRow="1/26">
              {isDay === "day" ? (
                <Day
                  date={date}
                  dayEvents={data}
                  DisplayEventsOnTheDay={DisplayEventsOnTheDay}
                  CreateUpdateEvent={CreateUpdateEvent}
                />
              ) : (
                <Week
                  daysInWeek={dates}
                  weekEvents={data}
                  Day={Day}
                  DisplayEventsOnTheDay={DisplayEventsOnTheDay}
                  CreateUpdateEvent={CreateUpdateEvent}
                />
              )}
            </GridItem>
          </Grid>
        </Flex>
      </Flex>
    </Box>
  );
};
