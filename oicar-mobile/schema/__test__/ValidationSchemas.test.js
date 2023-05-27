import * as Yup from "yup";
import {
  userValidationSchema,
  loginValidationSchema,
} from "../ValidationSchemas";

describe("Validation Schemas", () => {
  it("should pass validation for valid data", async () => {
    const user = {
      name: "John",
      surname: "Doe",
      email: "john.doe@example.com",
      password: "password123",
      passwordRepeat: "password123",
    };

    await expect(
      Yup.object()
        .shape({
          ...userValidationSchema.fields,
        })
        .validate(user)
    ).resolves.toBe(user);

    await expect(
      Yup.object()
        .shape({
          ...loginValidationSchema.fields,
        })
        .validate({
          email: "john.doe@example.com",
          password: "password123",
        })
    ).resolves.toMatchObject({
      email: "john.doe@example.com",
      password: "password123",
    });

    // Add more test cases for other validation schemas...
  });

  it("should fail validation for invalid data", async () => {
    const invalidUser = {
      name: "",
      surname: "",
      email: "invalidemail",
      password: "",
      passwordRepeat: "password456",
    };

    await expect(
      Yup.object()
        .shape({
          ...userValidationSchema.fields,
        })
        .validate(invalidUser)
    ).rejects.toThrow();

    await expect(
      Yup.object()
        .shape({
          ...loginValidationSchema.fields,
        })
        .validate({
          email: "invalidemail",
          password: "",
        })
    ).rejects.toThrow();

    // Add more test cases for other validation schemas...
  });
});
