import BaseValidator from './BaseValidator';

export default class extends BaseValidator {
  constructor(val) {
    super(val, 'パスワード');
    this._checkLength = this._checkLength.bind(this);
  }

  validate() {
    return super._cannotEmpty()
      .then(this._checkLength)
      .then(() => ({ success: true }))// Promise.resolve({ success: true })と同一
      .catch((err) => err); // Promise.resolve(err)と同一
  }

  _checkLength() {
    if (this.val.length >= 8) {
      return Promise.resolve();
    }
    return Promise.reject({
      success: false,
      message: 'パスワードが短すぎます。'
    });
  }
}
