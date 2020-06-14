import express from 'express';
import PointsController from './controller/PointsController';
import ItensController from './controller/ItensController';

const pointsController = new PointsController();
const itensController = new ItensController();

const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('<h1>Hello, World!</h1>');
});


/**
 * @resource /itens
 */

routes.get('/itens', itensController.index);
routes.get('/itens/:id', itensController.show);

/**
 * @resource /points
 */
routes.post('/points', pointsController.create);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);


export default routes;

