const connection = require('../database');

module.exports = {
  async index(request, response) {
    const ongs = await connection('incident').select('*');

    return response.json(ongs);
  },

  async create(request, response) {
    const {title, description, value} = request.body;

    const ong_id = await connection('ong').where({'token': request.headers.authorization}, result => {
      console.log(result);
    });

    console.log(ong_id);

    // await connection('incident').insert({title, description, value});

    return response.json({ ong_id });
  }

}
