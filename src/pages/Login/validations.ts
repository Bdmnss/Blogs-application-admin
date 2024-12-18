export const validationRules = {
  email: {
    required: "email is Required",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: "invalid Email",
    },
  },
  password: {
    required: "password is Required",
    minLength: {
      value: 8,
      message: "Enter at least 8 characters",
    },
    maxLength: {
      value: 20,
      message: "password should not exceed 20 characters",
    },
  },
};