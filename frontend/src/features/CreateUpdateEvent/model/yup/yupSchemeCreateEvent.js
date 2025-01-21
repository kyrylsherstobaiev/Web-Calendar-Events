import * as yup from "yup";

export const yupSchemeCreateEvent = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "More than 3 letters"),
  dateEvent: yup
    .date()
    .typeError("Date should be chosen ")
    .required("Date is required"),
  startTimeEvent: yup.string().required(" StartTimeEvent is required"),
  endTimeEvent: yup
    .string()
    .required(" EndTimeEvent is required")
    .test(
      " GreaterThan",
      "EndTimeEvent should be greater than StartTimeEvent",
      (value, context) =>
        parseFloat(value) > parseFloat(context.parent.startTimeEvent),
    ),
});
