import Knex from 'knex';
/**
 * @param  {Knex} knex
 */
export async function up(knex: Knex) {
  return knex.schema.createTable('itens', (table) => {
    table.increments('id').primary();
    table.string('image').notNullable();
    table.string('title').notNullable();
  });
}

/**
 * @param  {Knex} knex
 */
export async function down(knex: Knex) {
  return knex.schema.dropTable('itens');
}
