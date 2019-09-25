import PasswordValidator from './PasswordValidator';

describe('password validator', () => {
  it('should pass with valid data', () => {
    const password = 'samplePass1';
    const validator = new PasswordValidator(password);
    return validator.validate()
      .then((res) => {
        expect(res).toEqual({
          success: true
        });
      });
  });

  it('should return error with empty password', () => {
    const password = '';
    const validator = new PasswordValidator(password);
    return validator.validate()
      .then((res) => {
        expect(res.success).toBeFalsy();
        expect(res.message).toBe('パスワードは必須です。');
      });
  });

  it('should return error with short password', () => {
    const password = 'test';
    const validator = new PasswordValidator(password);
    return validator.validate()
      .then((res) => {
        expect(res.success).toBeFalsy();
        expect(res.message).toBe('パスワードが短すぎます。');
      });
  });
});
