const CommentRepository = require('../../../Domains/comments/CommentRepository')
const ThreadRepository = require('../../../Domains/threads/ThreadRepository')
const GetThreadDetail = require('../GetThreadDetailUseCase')
describe('Get Thread Use Case', ()=>{
    it('should orchestrating the get comment action correctly', async ()=>{
        const id = 'thread-123'
        const response = {
           
                "id": "thread-h_2FkLZhtgBKY2kh4CC02",
                "title": "sebuah thread",
                "body": "sebuah body thread",
                "createdAt": "2021-08-08T07:19:09.775Z",
                "username": "dicoding",
                "comments": [
                    {
                        "id": "comment-_pby2_tmXV6bcvcdev8xk",
                        "username": "johndoe",
                        "createdAt": "2021-08-08T07:22:33.555Z",
                        "content": "sebuah comment"
                    },
                    {
                        "id": "comment-yksuCoxM2s4MMrZJO-qVD",
                        "username": "dicoding",
                        "createdAt": "2021-08-08T07:26:21.338Z",
                        "content": "**komentar telah dihapus**"
                    }
                ]
        }
        // creating dependency of use case
        const mockCommentRepository = new CommentRepository()
        const mockThreadRepository = new ThreadRepository()

        // mocking
        mockCommentRepository.getComments = jest.fn().mockImplementation(()=> Promise.resolve(response))
        mockThreadRepository.getThreadDetail = jest.fn().mockImplementation(()=> Promise.resolve(response))
       
        // creating use case intance
        const getThreadDetail = new GetThreadDetail({commentRepository: mockCommentRepository, threadRepository: mockThreadRepository})
        // action
        const threadDetail = await getThreadDetail.execute(id)
        // Assert
        expect(threadDetail).toStrictEqual(response)
    })
})