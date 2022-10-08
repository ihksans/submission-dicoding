const pool = require('../../database/postgres/pool');
const ThreadTableTestHelper = require('../../../../tests/ThreadTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ServerTestHelper = require('../../../../tests/ServerTestHelper');

const container = require('../../container');
const createServer = require('../createServer');
const CommentTableTestHelper = require('../../../../tests/CommentTableTestHelper');

describe('/threads endpoint', ()=>{
    afterAll(async ()=>{
        await pool.end()
    })
    afterEach(async ()=>{
        await CommentTableTestHelper.cleanTable()
        await ThreadTableTestHelper.cleanTable()
        await UsersTableTestHelper.cleanTable();
    })
    describe('when POST /threads', () => {
        it('should response 201 and added thread', async () => {
          // Arrange
          const payload = {
            title: 'title',
            body: 'dummy body',
          }
          const userPaylaod = {
            id: 'user-888',
            password: 'secret',
            username: 'admintest',
            fullname: 'admintest'
          }
          await UsersTableTestHelper.addUser(userPaylaod)
          const accessToken = await ServerTestHelper.getAccessToken(userPaylaod)
          const server = await createServer(container)
          // Action
          const response = await server.inject({
            url: '/threads',
            method: 'POST',
            payload: payload,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          // Assert
          const responseJson = JSON.parse(response.payload)
          expect(response.statusCode).toEqual(201)
          expect(responseJson.status).toEqual('success')
          expect(responseJson.data.addedThread).toBeDefined()
          expect(responseJson.data.addedThread.title).toEqual(payload.title)
        })
    })
    describe('when Get /threads/{threadId}', () => {
      it('should response 200 and response thread data', async () => {
        // stub
        const threadId = await ThreadTableTestHelper.addThreadDetailWithReturnId()
        const server = await createServer(container)
        // Action
        const response = await server.inject({
          url: '/threads/'+ threadId,
          method: 'GET'
        })
        // Assert
        const responseJson = JSON.parse(response.payload)
        expect(response.statusCode).toEqual(200)
        expect(responseJson.status).toEqual('success')
        expect(responseJson.data.thread).toBeDefined()
      })
  })
})