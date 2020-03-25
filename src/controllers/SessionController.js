const connection = require('../database');

module.exports = {
  async create(request, response) {
    const { body: { token } } = request;

    const ong = await connection('ong')
      .where('token', token)
      .select('name')
      .first();

    if (!ong) {
      return response.status(400).json({ error: `No ONG with this token ${token}` });
    }

    return response.json(ong);
  }
}
