import { GitHubRepositoryInfo } from './github-repository-info'
import { RepositoryNotFoundError } from '../../application/errors/repository-not-found-error'

describe('GitHub Repository Stats', () => {
  const fakeDateUtils: any = {
    formatDateToIso: jest.fn().mockReturnValue('fake-date'),
    formatDateToLocale: jest.fn().mockReturnValue('fake-date')
  }

  it('should calls `listCommits` with correct params', async () => {
    const fakeClient: any = {
      repos: {
        listCommits: jest.fn()
      }
    }

    const repository = new GitHubRepositoryInfo(fakeClient, fakeDateUtils)
    await repository.getCommits('react', 'facebook', '2020-10-05', '2020-10-10')

    expect(fakeDateUtils.formatDateToIso).toHaveBeenNthCalledWith(1, { date: '2020-10-05' })
    expect(fakeDateUtils.formatDateToIso).toHaveBeenNthCalledWith(2, { date: '2020-10-10', formatEndDayTime: true })
    expect(fakeClient.repos.listCommits).toHaveBeenCalledWith({
      owner: 'react',
      repo: 'facebook',
      since: 'fake-date',
      until: 'fake-date'
    })
  })

  it('should throws RepositoryNotFoundError when gh api returns 404', async () => {
    const fakeNotFoundError = new Error('Fake not found error') as any
    fakeNotFoundError.status = 404

    const fakeClient: any = {
      repos: {
        listCommits: jest.fn().mockRejectedValue(fakeNotFoundError)
      }
    }

    const repository = new GitHubRepositoryInfo(fakeClient, fakeDateUtils)
    await expect(repository.getCommits('react', 'facebook', '2020-10-05', '2020-10-10')).rejects.toThrowError(RepositoryNotFoundError)
  })
})
