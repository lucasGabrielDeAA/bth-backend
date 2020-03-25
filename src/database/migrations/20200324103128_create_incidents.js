exports.up = function(knex) {
  return knex.schema.createTable("incident", function(table) {
    table.increments("id"); //ID with auto-increment
    table.string("title").notNullable();
    table.string("description").notNullable();
    table.decimal("value").notNullable();
    table.string("ong_id").notNullable(); //ONG_ID's ref
    table
      .foreign("ong_id")
      .references("id")
      .inTable("ong"); //ONG_ID foreignKey
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("incident");
};
