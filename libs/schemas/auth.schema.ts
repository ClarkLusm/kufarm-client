import * as yup from "yup";

export const SignInSchema = yup
  .object({
    email: yup.string().email().required(),
    loginType: yup.number().required(),
    password: yup.string().when("loginType", ([type], schema) => {
      return type != 0 ? schema.nullable() : schema.min(6).required();
    }),
    code: yup.string().when("loginType", ([type], schema) => {
      return type != 1 ? schema.nullable() : schema.length(6).required();
    }),
  })
  .required();

export const SignUpSchema = yup
  .object({
    // username: yup
    //   .string()
    //   .matches(
    //     /^[a-z0-9]+$/i,
    //     "Username is invalid. Includes letters and numbers."
    //   )
    //   .required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required(),
    referralId: yup.string().optional().nullable(),
    walletAddress: yup
      .string()
      .matches(/^0x[a-z0-9]+$/i, "Address is invalid. Begin with 0x...")
      .required(),
  })
  .required();
