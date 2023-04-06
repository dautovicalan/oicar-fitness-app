import {
  loginValidationSchema,
  userValidationSchema,
} from "../schema/ValidationSchemas";

export const formValid = (inputFields) => {
  let ok = true;

  inputFields.forEach((e) => {
    if (e.trim().length == 0) {
      ok = false;
    }
  });

  return ok;
};

export const emailValid = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  console.log(re.test(String(email).toLowerCase()));
  return re.test(String(email).toLowerCase());
};

export const isPasswordMatch = (password, repeatPassword) => {
  return password === repeatPassword;
};

export const validateUserRegistration = async (newUser) => {
  try {
    await userValidationSchema.validate(
      {
        name: newUser.name,
        surname: newUser.surname,
        email: newUser.email,
        password: newUser.password,
        passwordRepeat: newUser.passwordRepeat,
      },
      { abortEarly: false }
    );
    return { isValid: true, errors: {} };
  } catch (err) {
    const errors = {};
    err.inner.forEach((e) => {
      errors[e.path] = e.message;
    });
    return { isValid: false, errors };
  }
};

export const validateLoginForm = async (data) => {
  try {
    await loginValidationSchema.validate(
      {
        email: data.email,
        password: data.email,
      },
      { abortEarly: false }
    );
    return { isValid: true, errors: {} };
  } catch (err) {
    const errors = {};
    err.inner.forEach((e) => {
      errors[e.path] = e.message;
    });
    return { isValid: false, errors };
  }
};
