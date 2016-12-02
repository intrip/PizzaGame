class Player {
  constructor({firstName, lastName}) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  toString() {
    return `${this.firstName} ${this.lastName}`;
  }
}

if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') ) {
   module.exports = Player;
}
