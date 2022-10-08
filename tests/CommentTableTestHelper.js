/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const CommentTableTestHelper = {
    async addComment({
        id = 'comment-123',
        ownerId = 'user-123',
        content = 'content',
        threadId = 'thread-123'
    }){
        const query = {
            text : 'INSERT INTO comments VALUES($1, $2, $3, $4)',
            values: [id, content, ownerId, threadId],
        }
        await pool.query(query)
        return {id, ownerId}
    },
    async cleanTable(){
        await pool.query('DELETE FROM comments WHERE 1=1')
    },
    async findCommentById(id){
        const query = {
            text: 'SELECT * FROM comments WHERE id = $1',
            values: [id],
          }
      
          const result = await pool.query(query)
          return result.rows
    }
}
module.exports = CommentTableTestHelper
