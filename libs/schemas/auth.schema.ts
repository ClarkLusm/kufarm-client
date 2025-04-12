import * as yup from "yup";

export const SignInSchema = yup
  .object({
    email: yup.string().email().required(),
    loginType: yup.number().required(),
    password: yup
      .string()
      .min(6)
      .when("loginType", ([type], schema) => {
        return type == 0 ? schema.required() : schema.nullable();
      }),
    code: yup
      .string()
      .length(6)
      .when("loginType", ([type], schema) => {
        return type == 1 ? schema.required() : schema.nullable();
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
