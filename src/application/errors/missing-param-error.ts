export class MissingParamError extends Error {
  constructor (param: string) {
    super(`Query param '${param}' is required`)
  }
}
