import { Grid, GridItem } from "@chakra-ui/react";

const generateHourLabels = (count) => {
  return new Array(count).fill(0).map((_, i) => `${i}:00`);
};

export const HoursScale = () => {
  const hourLabels = generateHourLabels(24);

  // noinspection JSValidateTypes
  return (
    <Grid>
      {hourLabels.map((el, i) => (
        <GridItem
          borderBottom="1px"
          borderColor="green.200"
          textAlign="right"
          color="gray.500"
          fontSize={12}
          key={`${i}_hour`}
          h="35px"
        >
          {el}
        </GridItem>
      ))}
    </Grid>
  );
};
