class Player {
  constructor({ firstName, lastName }) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  toString() {
    return `${this.firstName} ${this.lastName}`;
  }

  isValid() {
    this.errors = {};

    this._validateNotEmpty('firstName');
    this._validateNotEmpty('lastName');

    return Object.keys(this.errors).length === 0;
  }

  _validateNotEmpty(field) {
    const val = this[field];
    if (typeof val === 'string' && val.length > 0) {
      return;
    }
    this.errors[field] = 'campo obbligatorio';
  }
}
