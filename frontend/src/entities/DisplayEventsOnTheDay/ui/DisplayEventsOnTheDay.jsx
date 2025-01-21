import React, { useState } from "react";
import moment from "moment";

import {
  Box,
  Grid,
  GridItem,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";

const formatStartTime = (time) => (time < 10 ? `0${time}:00` : `${time}:00`);

export const DisplayEventsOnTheDay = ({ events, CreateUpdateEvent }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [eventInfo, setEventInfo] = useState({});

  const handleOpen = (el) => {
    onOpen();
    setEventInfo({
      title: el.title,
      dateValue: moment(el.dateEvent).format("YYYY-MM-DD"),
      startTimeEventValue: el.startTimeEvent,
      endTimeEventValue: el.endTimeEvent,
      id: el.id,
    });
  };
  // noinspection JSValidateTypes
  return (
    <Grid
      display="grid"
      gridAutoColumns=" minmax(auto, 1fr)"
      gridTemplateRows="repeat(24, 35px)"
      position="absolute"
      w="full"
      fontSize="9"
    >
      {events.map((el, i) => {
        const startTime = formatStartTime(el.startTimeEvent);

        return (
          <React.Fragment key={i + "cd"}>
            <Tooltip
              hasArrow={true}
              placement={"auto"}
              label={`Time: ${startTime} --- Event: ${el.title}`}
            >
              <GridItem
                gridRow={`${+el.startTimeEvent + 1}/span ${+el.endTimeEvent - +el.startTimeEvent}`}
                bg="blue.100"
                border="1px"
                borderColor="gray.500"
                borderLeftWidth="4px"
                borderLeftColor="blue.500"
                borderRadius="5px"
                p="2px"
                overflow="auto"
                onClick={() => handleOpen(el)}
                cursor="pointer"
                sx={{
                  "&::-webkit-scrollbar": {
                    width: "0.4rem",
                  },
                  "&::-webkit-scrollbar-track": {
                    bg: "#f7f6f9",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    bg: "#b8b8b8",
                    borderRadius: "1.4rem",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    bg: "#929292",
                  },
                }}
              >
                <Box>
                  <Box as="span" mr="2px">
                    &#8986;
                  </Box>
                  <Box as="span">{startTime}</Box>
                </Box>
                <Box mr="2px" display="inline-block">
                  &#128221;
                </Box>
                <Text fontWeight="700" wordBreak="break-all" as="span">
                  {el.title}
                </Text>
              </GridItem>
            </Tooltip>
          </React.Fragment>
        );
      })}
      {eventInfo.title ? (
        <CreateUpdateEvent
          onClose={onClose}
          isOpen={isOpen}
          titleValue={eventInfo.title}
          dateValue={moment(eventInfo.dateValue).format("YYYY-MM-DD")}
          startTimeEventValue={eventInfo.startTimeEventValue}
          endTimeEventValue={eventInfo.endTimeEventValue}
          id={eventInfo.id}
        />
      ) : null}
    </Grid>
  );
};
