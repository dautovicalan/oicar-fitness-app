import { emailValid } from '../FormValidation.js'; // Replace 'yourFile' with the actual file path

describe('emailValid', () => {
  it('should return true for a valid email', () => {
    const validEmail = 'test@example.com';
    expect(emailValid(validEmail)).toBe(true);
  });

  it('should return false for an invalid email', () => {
    const invalidEmail = 'invalid_email';
    expect(emailValid(invalidEmail)).toBe(false);
  });

  it('should return false for an empty email', () => {
    const emptyEmail = '';
    expect(emailValid(emptyEmail)).toBe(false);
  });

  it('should return false for a null email', () => {
    const nullEmail = null;
    expect(emailValid(nullEmail)).toBe(false);
  });

  it('should return false for an undefined email', () => {
    const undefinedEmail = undefined;
    expect(emailValid(undefinedEmail)).toBe(false);
  });
});