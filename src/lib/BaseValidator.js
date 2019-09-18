export default class {
  constructor(val, type) {
    this.val = val;
    this.type = type;
    this.result = {};
  }

  cannotEmpty() {
    return new Promise((resolve, reject) => {
      if (this.val) {
        resolve(this);
      } else {
        reject({
          success: false,
          message: `${this.type}は必須です。`,
        });
      }
    });
  }
}
