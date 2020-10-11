import { FetchRepoCommits } from './fetch-repo-commits'

describe('Fetch repo commits', () => {
  const repository = { getCommits: jest.fn() }

  it('should calls repository with correct params', async () => {
    const useCase = new FetchRepoCommits(repository as any)
    await useCase.execute({
      owner: 'facebook',
      repo: 'react',
      since: '2020-10-05',
      until: '2020-10-10'
    })

    expect(repository.getCommits).toHaveBeenCalledWith('facebook', 'react', '2020-10-05', '2020-10-10')
  })

  it('should calls repository with last week date if since and until are not provided', async () => {
    const useCase = new FetchRepoCommits(repository as any)
    await useCase.execute({
      owner: 'facebook',
      repo: 'react',
      since: '',
      until: ''
    })

    const now = new Date()
    const since = new Date()
    since.setDate(now.getDate() - 7)

    expect(repository.getCommits).toHaveBeenCalledWith('facebook', 'react', since.toISOString().split('T')[0], now.toISOString().split('T')[0])
  })
})
