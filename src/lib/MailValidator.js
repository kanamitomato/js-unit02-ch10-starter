import BaseValidator from './BaseValidator';

export default class extends BaseValidator {
  constructor(val) {
    super(val, 'メールアドレス');
    this._checkFormat = this._checkFormat.bind(this);
  }

  validate() {
    return super._cannotEmpty()
      .then(this._checkFormat)
      .then(() => ({ success: true }))
      .catch((err) => err);
  }

  _checkFormat() {
    const re = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
    const match = re.test(this.val); // マッチするならtrue、しないならfalseを返す。
    if (match) {
      return Promise.resolve();
    }
    return Promise.reject({
      success: false,
      message: `${this.type}のフォーマットが異なります。`
    });
  }
}
