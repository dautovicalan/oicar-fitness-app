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
  return re.test(String(email).toLowerCase());
};
