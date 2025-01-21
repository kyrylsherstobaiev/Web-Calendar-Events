import { Grid, GridItem } from "@chakra-ui/react";
import moment from "moment";

export const Day = ({
  date,
  dayEvents,
  DisplayEventsOnTheDay,
  CreateUpdateEvent,
}) => {
  const markup = new Array(24).fill(null);

  const events = dayEvents.filter((event) => {
    return moment(event.dateEvent).isSame(date);
  });

  // noinspection JSValidateTypes
  return (
    <>
      <Grid
        bg="white"
        gridTemplateColumns="1fr"
        gridTemplateRows="repeat(25, 35px)"
      >
        <GridItem
          borderBottom="1px"
          borderColor="green.200"
          fontWeight="700"
          bg="green.200"
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="sticky"
          top="0"
          px={1}
          zIndex="5"
        >
          {date.format("ddd, DD/MM/YY")}
        </GridItem>
        {markup.map((_, i) => {
          // noinspection JSValidateTypes
          return (
            <GridItem
              borderBottom="1px"
              borderX="1px"
              borderColor="green.200"
              key={i + "c"}
              h="35px"
              data-key={i + "c"}
              {...(i === 0 && { position: "relative" })}
            >
              {i === 0 && (
                <DisplayEventsOnTheDay
                  events={events}
                  CreateUpdateEvent={CreateUpdateEvent}
                />
              )}
            </GridItem>
          );
        })}
      </Grid>
    </>
  );
};
