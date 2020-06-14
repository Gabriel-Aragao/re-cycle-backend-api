import {Request, Response} from 'express';
import knex from '../database/connection';
/**
 * Controls the requests to the "/point" resource
 */
class PointsController {
  /**
   * Adds a colect point to the database
   * @param  {Request} request
   * @param  {Response} response
   */
  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      itens
    } = request.body;

    const trx = await knex.transaction();
    const point = {
      name,
      email,
      image: 'image-fake',
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    };
    const InsertedIds = await trx('points').insert(point);

    const pointId = InsertedIds[0];

    const pointItens = itens.map((itemId: Number) =>{
      return {
        item_id: itemId,
        point_id: pointId
      };
    });

    await trx('point_itens').insert(pointItens);

    await trx.commit();

    return response.json({
      pointId,
      ...point,
      itens
    });
  }

  /**
   * Returns a list of colect points by Query filter
   * @param  {Request} request
   * @param  {Response} response
   */
  async index(request: Request, response: Response) {
    const {city, uf, itens} = request.query;

    const parsedItens = String(itens)
        .split(',')
        .map((item) => Number(item.trim()));

    const points = await knex('points')
        .join('point_itens', 'points.id', '=', 'point_itens.point_id')
        .whereIn('point_itens.item_id', parsedItens)
        .orWhere('points.city', String(city))
        .orWhere('points.uf', String(uf))
        .distinct()
        .select('points.*');

    return response.json(points);
  }

  /**
   * Returns the colect point by id
   * @param  {Request} request
   * @param  {Response} response
   */
  async show(request: Request, response: Response) {
    const {id} = request.params;
    const point = await knex('points').where('id', id).first();
    if (!point) {
      return response.status(400).json({message: 'Point not found!'});
    }

    const itens = await knex('itens')
        .join('point_itens', 'itens.id', '=', 'point_itens.item_id')
        .where('point_itens.point_id', id)
        .select('itens.title');
    return response.json({
      ...point,
      itens
    });
  }
}

export default PointsController;
