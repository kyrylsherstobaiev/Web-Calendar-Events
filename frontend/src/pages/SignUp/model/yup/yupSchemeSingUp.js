import * as yup from "yup";

export const yupSchemeSingUp = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^(?<login>[\w.-]+)@(?<domen>[a-z\d-]+)\.(?<suffixes>[a-z]{2,10})(?<add>\.[a-z]{2,5})?$/,
      "Invalid email format",
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "More than 6 letters"),
  firstName: yup
    .string()
    .required("First Name is required")
    .min(3, "More than 2 letters")
    .max(25, "Less than 25 letters")
    .matches(/^[a-zA-Zа-яА-Я]*$/, "Only letters"),
  lastName: yup
    .string()
    .required("Last Name is required")
    .min(2, "More than 2 letters")
    .max(25, "Less than 25 letters")
    .matches(/^[a-zA-Zа-яА-Я]*$/, "Only letters"),
});
