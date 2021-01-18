export class MissingFieldError extends Error {
  constructor (fieldName: string) {
    super(`Field ${fieldName} should be prodided`)
    this.name = 'MissingFieldError'
  }
}
