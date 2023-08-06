export class UserAlreadyExistsError extends Error {
  constructor() {
    super('There is a duplicate name in one or more lines.')
  }
}