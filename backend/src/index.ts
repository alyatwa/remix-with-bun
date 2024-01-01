// server.ts
import { Elysia } from 'elysia';
import { registerTaskRoutes } from './routes/tasks'; 

const app = new Elysia(); 

// Register the task routes
registerTaskRoutes(app);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));