/* istanbul ignore file */
const pool = require('../../database/postgres/pool');
const ThreadTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ServerTestHelper = require('../../../../tests/ServerTestHelper');

const container = require('../../container');
const createServer = require('../createServer');

describe('/threads endpoint', ()=>{
    afterAll(async ()=>{
        await pool.end()
    })
    afterEach(async ()=>{
        await ThreadTableTestHelper.cleanTable()
        await UsersTableTestHelper.cleanTable();
    })
    describe('when POST /threads', () => {
        it('should response 201 and added thread', async () => {
          // Arrange
          const payload = {
            title: 'title',
            body: 'dummy body',
          };
          const userPaylaod = {
            id: 'user-888',
            password: 'secret',
            username: 'admintest',
            fullname: 'admintest'
          };
          const user = await UsersTableTestHelper.addUser(userPaylaod);
          const accessToken = await ServerTestHelper.getAccessToken();
          const server = await createServer(container);
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
          const responseJson = JSON.parse(response.payload);
          expect(response.statusCode).toEqual(201);
          expect(responseJson.status).toEqual('success');
          expect(responseJson.data.addedThread).toBeDefined();
          expect(responseJson.data.addedThread.title).toEqual(payload.title);
        })
    })
})