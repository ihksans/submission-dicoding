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
    }
}

module.exports = ThreadTableTestHelper