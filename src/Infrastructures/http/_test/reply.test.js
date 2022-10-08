const pool = require('../../database/postgres/pool');
const ThreadTableTestHelper = require('../../../../tests/ThreadTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const CommentTableTestHelper = require('../../../../tests/CommentTableTestHelper');
const ServerTestHelper = require('../../../../tests/ServerTestHelper');
const container = require('../../container');
const createServer = require('../createServer');
const ReplyTableTestHelper = require('../../../../tests/ReplyTableTestHelper');
describe('/replies endpoint', ()=>{
    afterEach(async ()=>{
        await ReplyTableTestHelper.cleanTable()
        await CommentTableTestHelper.cleanTable()
        await ThreadTableTestHelper.cleanTable()
        await UsersTableTestHelper.cleanTable()
    }),
    afterAll(async ()=>{
        await pool.end()
    })
    describe('when POST /threads/{threadId}/comments/{commentId}/replies', ()=>{
        it('should response 201 and added replies', async () => {
            // Arrange
            var payload = {
                content: 'new comment'
            }
            const userId = 'user-9998'
            const userPaylaod = {
                userid: userId,
                username: 'userhelper',
                password: 'secret',
                fullname: 'userhelper',
                id: userId
            }
            const {commentId, ownerId, threadId}  = await ThreadTableTestHelper.addThreadDetailWithReturnAllId()
            userPaylaod.userid = ownerId
            const accessToken = await ServerTestHelper.getAccessToken(userPaylaod)
            const server = await createServer(container)
            // Action
            const response = await server.inject({
            url: '/threads/'+threadId+'/comments/'+commentId +'/replies',
            method: 'POST',
            payload: payload,
            headers: {
              Authorization: `Bearer ${accessToken}`,
                },
            })
          
           const responseJson = JSON.parse(response.payload)
         
           expect(response.statusCode).toEqual(201)
           expect(responseJson.status).toEqual('success')
           expect(responseJson.data.addedReply).toBeDefined()
           expect(responseJson.data.addedReply.body).toEqual(payload.body)
        })
    })
    describe('when DELETE /threads/{threadId}/comments/{commentId}/replies/{replyId}', ()=>{
        it('should response 200 and delete comments', async () => {
            // Arrange
            const userId = 'user-9998'
            const userPaylaod = {
                userid: userId,
                username: 'userhelper',
                password: 'secret',
                fullname: 'userhelper',
                id: userId
            }
            const {replyId, commentId, ownerId, threadId}  = await ThreadTableTestHelper.addThreadDetailWithReturnAllId()
            userPaylaod.userid = ownerId
            const accessToken = await ServerTestHelper.getAccessToken(userPaylaod)
            const server = await createServer(container)
            // Action
            const response = await server.inject({
            url: '/threads/'+ threadId +'/comments/'+ commentId +'/replies/'+ replyId,
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