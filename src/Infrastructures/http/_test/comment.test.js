const pool = require('../../database/postgres/pool')
const ThreadTableTestHelper = require('../../../../tests/ThreadTableTestHelper')
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')
const CommentTableTestHelper = require('../../../../tests/CommentTableTestHelper')
const ServerTestHelper = require('../../../../tests/ServerTestHelper')
const container = require('../../container')
const createServer = require('../createServer')
describe('/comments endpoint', ()=>{
    afterEach(async ()=>{
        await CommentTableTestHelper.cleanTable()
        await ThreadTableTestHelper.cleanTable()
        await UsersTableTestHelper.cleanTable()
    }),
    afterAll(async ()=>{
        await pool.end()
    })
    describe('when POST /threads/{threadId}/comments', ()=>{
        it('should response 201 and added comments', async () => {
            // Arrange
            const payload = {
                content: 'comment',
                ownerId : null,
                threadId: null,
            }
            var commentPayload = {
                content: 'comment'
            }
            const ownerId = 'user-281'
            const userPaylaod = {
                userid: ownerId,
                username: 'useraddcomment',
                password: 'secret',
                fullname: 'usernamedev',
                id: ownerId
            }
            const {threadId, userid}  = await ThreadTableTestHelper.addThreadWithReturnId(userPaylaod);
            payload.threadId = threadId
            payload.ownerId = userid
            const accessToken = await ServerTestHelper.getAccessToken(userPaylaod)
            const server = await createServer(container)
            // Action
            const response = await server.inject({
            url: '/threads/thread-281/comments',
            method: 'POST',
            payload: commentPayload,
            headers: {
              Authorization: `Bearer ${accessToken}`,
                },
            })
            // Assert
            const responseJson = JSON.parse(response.payload)
           expect(response.statusCode).toEqual(201)
           expect(responseJson.status).toEqual('success')
           expect(responseJson.data.addedComment).toBeDefined()
           expect(responseJson.data.addedComment.body).toEqual(payload.body)
        })
    })
    describe('when DELETE /threads/{threadId}/comments/{commentId', ()=>{
        it('should response 200 and delete comments', async () => {
            const registerComment = ({
                content: 'comment',
            })
            const ownerId = 'user-281'
            const userPaylaod = {
                userid: ownerId,
                username: 'useraddcomment',
                password: 'secret',
                fullname: 'usernamedev',
                id: ownerId
            }
            const commentId = "comment-555"
            const {threadId, userid}  = await ThreadTableTestHelper.addThreadWithReturnId(userPaylaod)
            const {id} = await CommentTableTestHelper.addComment({
                id: commentId,
                ownerId: userid,
                content:registerComment.content, 
                threadId: threadId 
            })
            const accessToken = await ServerTestHelper.getAccessToken(userPaylaod)
            const server = await createServer(container)
            // Action
            const response = await server.inject({
            url: '/threads/thread-281/comments/comment-555',
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${accessToken}`,
                },
            })
            // Assert
           const responseJson = JSON.parse(response.payload)
           expect(response.statusCode).toEqual(200)
           expect(responseJson.status).toEqual('success')
        })
    })

})