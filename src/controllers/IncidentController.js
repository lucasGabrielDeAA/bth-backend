const connection = require('../database');

module.exports = {
  async index(request, response) {
    const incidents = await connection('incident').select('*');

    return response.json(incidents);
  },

  async create(request, response) {
    const { body: { title, description, value }, headers: { authorization: token } } = request;

    const ong_id = await getOngIDByToken(token);

    const [id] = await connection('incident').insert({title, description, value, ong_id});

    return response.json({ id });
  },

  async delete(request, response) {
    try {
      const { headers: { authorization: token }, params } = request;
      const { id } = params;

      const ong_id = await getOngIDByToken(token);

      const incident = await connection('incident')
        .where('id', id)
        .where('ong_id', ong_id)
        .first();

      if (incident) {
        await connection('incident').where('id', id).delete();

        return response.status(204).send();
      }
    } catch (error) {
      return response.json(error);
    }
  }

}

const getOngIDByToken = async token => {
  const [ong] = await connection('ong')
  .where('token', token)
  .select('id');

  return String(ong.id);
}
