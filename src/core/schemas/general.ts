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

export const transactionCreateSchema = yup.object({
  wallet: yup.number().required("Wallet is required"),
  // wallet: yup
  //   .object()
  //   .shape({
  //     id: yup.number().required("Wallet is required"),
  //   })
  //   .required("Wallet is required"),
  // transaction_date: yup.string().required("Transaction date is required"),
  // transaction_time: yup.string().required("Transaction time is required"),
  transaction_type: yup.string().required("Transaction type is required"),
  // category: yup
  //   .object()
  //   .shape({
  //     id: yup.number().required("Category is required"),
  //   })
  //   .required("Category is required"),
  category: yup.number().required("Category is required"),
  amount: yup
    .number()
    .required("Amount is required")
    .typeError("Amount must be a number")
    .min(0, "Amount cannot be negative")
    .max(999999999999.99, "Amount cannot be more than 999999999999.99"),
  description: yup.string().optional(),
  note: yup.string().optional(),
  transaction_date_time: yup
    .string()
    .required("Transaction date and time is required")
    .typeError("Transaction date and time must be a string"),
});

export const categoryCreateSchema = yup.object({
  name: yup.string().required("Name is required"),
  category_type: yup.string().required("Transaction type is required"),
  icon: yup.string().required("Icon is required"),
});

export const categoryUpdateSchema = yup.object({
  name: yup.string().required("Name is required"),
  icon: yup.string().required("Icon is required"),
});
