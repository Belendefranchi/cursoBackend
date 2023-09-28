export class NotFound extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name
  }
}

export class IncorrectLoginCredentials extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name
  }
}

export class AlreadyExists extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name
  }
}
