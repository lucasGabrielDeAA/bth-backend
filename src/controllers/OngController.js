const connection = require('../database');

module.exports = {
  async index(request, response) {
    const ongs = await connection('ong').select('*');

    return response.json(ongs);
  },

  async create(request, response) {
    const {name, email, whatsapp, city, uf} = request.body;

    await connection('ong').insert({name, email, whatsapp, city, uf});

    return response.json({ status: 'ONG created' });
  }

}
