import BaseValidator from './BaseValidator';

export default class extends BaseValidator {
  constructor(val) {
    super(val, 'メールアドレス');
    this.checkFormat = this.checkFormat.bind(this);
  }

  validate() {
    return super.cannotEmpty()
      .then(this.checkFormat)
      .then(() => ({ success: true }))
      .catch((err) => err);
  }

  checkFormat() {
    const re = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
    const match = re.test(this.val); // マッチするならtrue、しないならfalseを返す。
    if (match) {
      return Promise.resolve();
    }
    return Promise.reject({
      success: false,
      message: `${this.type}のフォーマットが異なります。`,
    });
  }
}
