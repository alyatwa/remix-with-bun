// taskRoutes.ts
import { Elysia } from 'elysia';
import { taskController } from '../taskController';

export const registerTaskRoutes = (app: Elysia) => {
  app.post('/tasks', taskController.createTask);
  app.get('/tasks', taskController.getTasks);
  app.get('/tasks/:id', taskController.getTask);
  //update checkbox
  app.put('/tasks/:id', taskController.putTask);
  app.patch('/tasks/:id', taskController.updateTask);
  app.delete('/tasks/:id', taskController.deleteTask);
};