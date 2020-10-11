export class RepositoryNotFoundError extends Error {
  constructor () {
    super('Repository not found')
  }
}
