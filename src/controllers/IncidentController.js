const connection = require('../database');

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection('incident').count();

    const incidents = await connection('incident')
      .limit(5)
      .offset((page - 1) * 5)
      .select('*');

    response.header('X-Total-Count', count['count(*)']);

    return response.json(incidents);
  },

  async create(request, response) {
    const { body: { title, description, value }, headers: { authorization: token } } = request;

    const ong_id = await getOngIDByToken(token);

    if (ong_id !== null) {
      const [id] = await connection('incident').insert({title, description, value, ong_id});

      return response.json({ id });
    } else {
      return response.json({ message: `ONG with information ${token} not found` });
    }
  },

  async delete(request, response) {
    try {
      const { headers: { authorization: token }, params } = request;
      const { id } = params;

      const ong_id = await getOngIDByToken(token);

      if (ong_id !== null) {
        const incident = await connection('incident')
          .where('id', id)
          .where('ong_id', ong_id)
          .first();

        if (incident) {
          await connection('incident').where('id', id).delete();

          return response.status(204).send();
        }
      } else {
        return response.status(400).json({ error: `No ONG with this token ${token}` });
      }
    } catch (error) {
      return response.json(error);
    }
  },

  async incidentsByOng(request, response) {
    const { headers: { authorization: token } } = request;

    const ong_id = await getOngIDByToken(token);

    if (ong_id !== null) {
      const incidents = await connection('incident')
      .where('ong_id', ong_id).select('*');

      return response.json(incidents);
    } else {
      return response.json({ message: `ONG with information ${token} not found` });
    }
  }

}

const getOngIDByToken = async token => {
  const [ong] = await connection('ong')
  .where('token', token)
  .select('id');

  return ong !== undefined ? String(ong.id) : null;
}
