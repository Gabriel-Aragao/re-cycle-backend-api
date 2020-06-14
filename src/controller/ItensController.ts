import {Request, Response} from 'express';
import knex from '../database/connection';

/**
 * Controls the requests to the "/itens" resource
 */
class ItensController {
  /**
   * Returns all itens in database
   * @param  {Request} request
   * @param  {Response} response
   */
  async index(request: Request, response: Response) {
    const itens = await knex('itens').select('*');
    const serializedItens = itens.map((item) => {
      return {
        id: item.id,
        title: item.title,
        image_url: `localhost:3333/uploads/${item.image}`
      };
    });
    return response.json(serializedItens);
  }

  /**
   * Returns one itens by id
   * @param  {Request} request
   * @param  {Response} response
   */
  async show(request: Request, response: Response) {
    const {id} = request.params;
    const item = await knex('itens').where('id', id);
    const serializedItem = item.map((item) => {
      return {
        id: item.id,
        title: item.title,
        image_url: `localhost:3333/uploads/${item.image}`
      };
    });
    return response.json(serializedItem[0]);
  }
}

export default ItensController;
