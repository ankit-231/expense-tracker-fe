import * as yup from "yup";

export const walletCreateSchema = {
  name: yup.string().required("Name is required"),
  initial_amount: yup
    .number()
    .required("Initial amount is required")
    .typeError("Initial amount must be a number")
    .min(0, "Initial amount cannot be negative")
    .max(999999999999.99, "Initial amount cannot be more than 999999999999.99"),
};

// export const departmentMasterConfigSchema = (isCounterRequired: boolean) =>
//   yup.object().shape({
//     department: yup.number().required("Department is required"),

//     counter: yup
//       .string()
//       .nullable()
//       .when("$isCounterRequired", {
//         is: true, // Condition that makes the field required
//         then: yup.string().required("Counter is required"), // Schema when condition is true
//         otherwise: yup.string().nullable(), // Schema when condition is false
//       }),

//     token_prefix: yup
//       .string()
//       .required("Token prefix is required")
//       .min(3, "Token prefix must be at least 3 characters")
//       .max(3, "Token prefix must be at most 3 characters"),

//     token_reset_time: yup
//       .number()
//       .required("Token reset time is required")
//       .moreThan(60, "Token reset time must be greater than 60")
//       .lessThan(1440, "Token reset time must be less than 1440"),
//   });

export const createDepartmentMasterConfigSchema = (
  isCounterRequired: boolean
) => {
  return yup.object().shape({
    department: yup.number().required("Department is required"),
    counter: yup
      .string()
      .nullable()
      .when([], (counter, schema) => {
        return isCounterRequired
          ? schema.required("Counter is required")
          : schema.nullable();
      }),
    token_prefix: yup
      .string()
      .required("Token prefix is required")
      .min(3, "Token prefix must be at least 3 characters")
      .max(3, "Token prefix must be at most 3 characters"),
    token_reset_time: yup
      .number()
      .required("Token reset time is required")
      .moreThan(59, "Token reset time must be greater than 59")
      .lessThan(1440, "Token reset time must be less than 1440"),
  });
};

export const counterCreateSchema = {
  name: yup.string().required("Name is required"),
  department: yup.number().required("Department is required"),
  code: yup.string().required("Code is required"),
};

export const companyCreateSchema = {
  name: yup.string().required("Name is required"),
};

export const tokenCreateSchema = {
  service: yup.number().nullable().label("Service"),
  priority: yup.string().required("Priority is required").label("Priority"),
  description: yup.string().nullable().label("Description"),
};

export const changePasswordSchema = {
  old_password: yup.string().required("Current password is required"),
  new_password: yup
    .string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
  confirm_password: yup
    .string()
    .required("Please confirm your new password")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
};

export const tokenReferSchema = {
  description: yup.string().nullable().label("Description"),
  "token_detail.description": yup.string().nullable().label("Description"),
  "token_detail.counter_id": yup.number().required("Department is required"),
};
