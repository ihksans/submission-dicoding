const InvariantError = require('../../Commons/exceptions/InvariantError');
const RegisteredThread = require('../../Domains/threads/entities/RegisteredThread')
const ThreadRepository = require('../../Domains/users/UserRepository')

class ThreadRepositoryPostgres extends ThreadRepository{
    constructor(pool, idGenerator){
        super()
        this._pool = pool
        this._idGenerator = idGenerator
    }
    async addThread(request){
        const {ownerid, title, body} = request
        const id = `thread-${this._idGenerator()}`;

        const query = {
            text: 'INSERT INTO threads VALUES($1, $2, $3, $4) RETURNING id, title, body, ownerid',
            values: [id, title, body, ownerid]
        }
        const result = await this._pool.query(query)

        return new RegisteredThread({...result.rows[0]})
    }
    async getThread(id){
        const query = {
            text: 'SELECT * FROM threads WHERE id = $1',
            values: [id],
          };
      
          const result = await this._pool.query(query);
      
          if (!result.rowCount) {
            throw new InvariantError('thread tidak ditemukan');
          }
      
          return result.rows[0];
    }
}
module.exports = ThreadRepositoryPostgres