const connection = require('../database');
const crypto = require('crypto');

module.exports = {
  async index(request, response) {
    const ongs = await connection('ong').select('*');

    return response.json(ongs);
  },

  async create(request, response) {
    const {name, email, whatsapp, city, uf} = request.body;

    const token = crypto.randomBytes(4).toString('HEX');

    await connection('ong').insert({name, email, whatsapp, city, uf, token});

    return response.json({ token });
  }

}
