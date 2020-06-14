import Knex from 'knex';

/**
 * @param  {Knex} knex
 */
export async function seed(knex:Knex) {
  await knex('itens').insert([
    {title: 'Lamps', image: 'lampadas.svg'},
    {title: 'Batteries', image: 'baterias.svg'},
    {title: 'Papper and Cardboard', image: 'papeis-papelao.svg'},
    {title: 'Eletronic Stuff', image: 'eletronicos.svg'},
    {title: 'Organic', image: 'organicos.svg'},
    {title: 'Vegetal Oil', image: 'oleo.svg'}
  ]);
}
