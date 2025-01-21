import * as yup from "yup";

export const yupSchemeSingIn = yup.object({
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
});
