/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');
const Jwt = require('@hapi/jwt')
const ServerTestHelper = {
  async getAccessToken(request) {
    
    const accessToken = Jwt.token.generate(
      request,
      process.env.ACCESS_TOKEN_KEY
    )
    return accessToken
  },

  async findToken(token) {
    const query = {
      text: 'SELECT token FROM authentications WHERE token = $1',
      values: [token],
    };

    const result = await pool.query(query);

    return result.rows;
  },
  async cleanTable() {
    await pool.query('DELETE FROM authentications WHERE 1=1')
  },
}

module.exports = ServerTestHelper