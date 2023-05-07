import {
  aboutYouValidationSchema,
  addPRValidationSchema,
  editExerciseValidationSchema,
  loginValidationSchema,
  userValidationSchema,
  workoutValidationSchema,
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

export const validateAboutYouForm = async (data) => {
  try {
    await aboutYouValidationSchema.validate(
      {
        birthday: data.birthday,
        weight: data.weight,
        height: data.height,
      },
      {
        abortEarly: false,
      }
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

export const validateWorkoutForm = async (data) => {
  try {
    await workoutValidationSchema.validate(
      {
        workoutName: data.workoutName,
        workoutSets: data.workoutSets,
        workoutReps: data.workoutReps,
        workoutWeight: data.workoutWeight,
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

export const validateAddPRForm = async (data) => {
  try {
    await addPRValidationSchema.validate(
      {
        workoutDate: data.workoutDate,
        workoutName: data.workoutName,
        workoutWeight: data.workoutWeight,
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

export const validateExerciseForm = async (data) => {
  try {
    await editExerciseValidationSchema.validate(
      {
        sets: data.sets,
        repetition: data.repetition,
        weight: data.weight,
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
