/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ThreadTableTestHelper = {
    async addThread({
        id = 'thread-123', 
        ownerid = 'user-111',
        title = 'title',
        body = 'body'
    }){
        const query = {
            text : 'INSERT INTO threads VALUES($1, $2, $3, $4)',
            values: [id, title, body, ownerid],
        }

        await pool.query(query)
    },
    async cleanTable() {
        await pool.query('DELETE FROM threads WHERE 1=1');
      },
    async findThreadById(id){
        const query = {
            text: 'SELECT * FROM threads WHERE id = $1',
            values: [id],
          }
      
          const result = await pool.query(query)
          return result.rows
    },
    async addThreadWithReturnId(request) {
        const {userid, username, password, fullname } = request
        const userquery = {
        text: 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id, username, fullname',
        values: [userid, username, password, fullname],
        };
        await pool.query(userquery)
        const threadId = 'thread-281'
        const query = {
            text : 'INSERT INTO threads VALUES($1, $2, $3, $4)',
            values: [ threadId, 'thread', 'content thread', userid],
        }

        await pool.query(query)
        return {threadId, userid}
    },
    async addThreadDetailWithReturnId() {
        try {
            const user = {
                userid : 'user-9998',
                username: 'userhelper',
                password: 'secret',
                fullname: 'userhelper'
            }
            const userquery = {
            text: 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id, username, fullname',
            values: [user.userid, user.username, user.password, user.fullname],
            };
            await pool.query(userquery)
            const threadId = 'thread-281'
            const threadQuery = {
                text : 'INSERT INTO threads VALUES($1, $2, $3, $4)',
                values: [ threadId, 'thread', 'content thread', user.userid],
            }
            await pool.query(threadQuery)
            const commentQuery = {
                text : 'INSERT INTO comments VALUES ($1, $2, $3, $4), ($5, $2, $3, $4)',
                values: ['comment-1234', 'comment', user.userid, threadId, 'comment-12345'],
            }
            await pool.query(commentQuery)
            return threadId

        } catch (error) {
            return error
        }
      
    },
}

module.exports = ThreadTableTestHelper