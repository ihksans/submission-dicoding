const ForbiddenError = require('../../Commons/exceptions/ForbiddenError')
const InvariantError = require('../../Commons/exceptions/InvariantError');
const RegisteredReply = require('../../Domains/replies/entities/RegisteredReply');
const ReplyRepository = require('../../Domains/replies/ReplyRepository');

class ReplyRepositoryPostgres extends ReplyRepository{
    constructor(pool, idGenerator, dateGenerator){
        super()
        this._pool = pool
        this._idGenerator = idGenerator
        this._dateGenerator = dateGenerator
    }
    async addReply({content, ownerid, commentid}){
        const id = `reply-${this._idGenerator()}`
        const query = {
                text: 'INSERT INTO replies VALUES($1, $2, $3, $4) RETURNING id, content, ownerid, commentid',
                values: [id, content, ownerid, commentid]
        }
        const result = await this._pool.query(query)
        return new RegisteredReply({...result.rows[0]})
    }
    async deleteReply({id, ownerId}){
        console.log("tes: ", {ownerId, id})
        const date = new this._dateGenerator().toISOString()
        const query = {
            text: 'UPDATE replies SET deletedat=$1 where "id"=$2 AND "ownerid"=$3 RETURNING id',
            values: [date, id, ownerId]
        }
        const result = await this._pool.query(query)
        if (!result.rowCount) {
            throw new ForbiddenError('User tidak memiliki akses') 
        }
        else{
            return {isDeleted: true}
        }
    }
    async getReply({id}){
        const query = {
            text: 'SELECT * FROM replies WHERE id = $1',
            values: [id],
          };
      
          const result = await this._pool.query(query);
      
          if (!result.rowCount) {
            throw new InvariantError('comment tidak ditemukan');
          }
      
          return result.rows[0];
    }
    async getReplies(id){
        const query = {
            text: ` SELECT replies.id, 
                    CASE
                        WHEN replies.deletedat is NULL THEN replies.content
                    ELSE '**balasan telah dihapus**'
                    END AS content, replies.createdat, users.username, replies.commentid
                    FROM replies
                    LEFT JOIN users 
                    ON replies.ownerid = users.id
                    WHERE replies.commentid = $1 
                    ORDER BY replies.createdat`,
            values: [id],
          }
      
          const result = await this._pool.query(query)
          return result.rows
    }
}

module.exports = ReplyRepositoryPostgres