const RegisteredThread = require('../../../Domains/threads/entities/RegisteredThread')
const RegisterThread = require('../../../Domains/threads/entities/RegisterThread')
const ThreadRepository  = require('../../../Domains/threads/ThreadRepository')
const AddThread = require('../AddThreadUseCase')
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');

describe('AddTreadUseCase', ()=>{
    it('should orchestrating the add thread action correctly', async()=>{
        // Arrange
        const request = {
            title : 'title',
            body: 'title'
        }
        const ownerId = 'user-123'
        const response = {
            id: 'asdasd',
            ownerid : ownerId,
            title : 'title',
            body: 'title'
        }

        // creating dependency of use case
        const mockThreadRepository = new ThreadRepository()

        // mocking
        mockThreadRepository.addThread = jest.fn().mockImplementation(()=> Promise.resolve(response))

        // creating use case intance
        const getThreadUseCase = new AddThread({threadRepository: mockThreadRepository})

        // action
        const registeredThread = await getThreadUseCase.execute(request, ownerId)

        // Assert
        expect(registeredThread).toStrictEqual(response)
    })
})