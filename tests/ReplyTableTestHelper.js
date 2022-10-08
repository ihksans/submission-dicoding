/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ReplyTableTestHelper = {
    async addReply({
        id = 'reply-123',
        ownerid = 'user-123',
        content = 'content',
        commentid = 'comment-123'
    }){
        const query = {
            text : 'INSERT INTO replies VALUES($1, $2, $3, $4)',
            values: [id, content, ownerid, commentid],
        }
        await pool.query(query)
        return {id, ownerid}
    },
    async cleanTable(){
        await pool.query('DELETE FROM replies WHERE 1=1');
    },
    async findReplyById(id){
        const query = {
            text: 'SELECT * FROM replies WHERE id = $1',
            values: [id],
          }
      
          const result = await pool.query(query)
          return result.rows
    }
}
module.exports = ReplyTableTestHelper
