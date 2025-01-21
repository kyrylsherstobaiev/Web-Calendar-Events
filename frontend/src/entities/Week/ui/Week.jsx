import { Grid } from "@chakra-ui/react";

export const Week = ({
  daysInWeek,
  weekEvents,
  Day,
  DisplayEventsOnTheDay,
  CreateUpdateEvent,
}) => {
  const week = daysInWeek.map((el, i) => (
    <Day
      date={el}
      dayEvents={weekEvents}
      key={i + "g"}
      DisplayEventsOnTheDay={DisplayEventsOnTheDay}
      CreateUpdateEvent={CreateUpdateEvent}
    />
  ));

  return (
    <Grid gap="1px" gridAutoFlow="column" fontSize={11}>
      {week.map((day) => day)}
    </Grid>
  );
};
