import * as yup from "yup";

export const SignInSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  })
  .required();

export const SignUpSchema = yup
  .object({
    username: yup
      .string()
      .matches(/^[a-z0-9]+$/i)
      .required(),
    email: yup.string().required(),
    password: yup.string().min(6).required(),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required(),
    referralId: yup.string().optional().nullable(),
    walletAddress: yup.string().required(),
  })
  .required();
