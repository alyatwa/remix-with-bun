import { Context } from 'elysia';
import { Database } from 'bun:sqlite';
import { Task } from './types';

const db = new Database("todo.db");

// Ensure the tasks table exists
db.run("CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, checked BOOLEAN)");

export const taskController = {
  createTask: async (ctx: Context) => {
    const { id, title, description, checked } = ctx.body as Task; 
      db.run(
        "INSERT INTO tasks (id,title, description, checked) VALUES (?, ?, ?, ?)",
        [id, title, description, checked],
        function(err) {
          if (err) {
            console.error(err); 
          } else {
            console.log("Last ID:", this.lastID); 
          }
        }
      );

    return { id: id, title, description };
  },

  getTasks: async (_: Context, response: any) => {
    return db.prepare("SELECT * FROM tasks").all();

  },

  getTask: async (ctx: Context) => {
    const id = parseInt(ctx.params.id);
    const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
    if (task) {
      return task;
    } else {
      ctx.response.status = 404;
      return { error: "Task not found" };
    }
  },

  putTask: async (ctx: Context) => {
    const id = parseInt(ctx.params.id);
    const { checked } = ctx.body as Task;
    const result = db.run("UPDATE tasks SET checked = ? WHERE id = ?", checked, id);

      return { id, checked };
  },
  
  updateTask: async (ctx: Context) => {
    const id = parseInt(ctx.params.id);
    const { title, description } = ctx.body as Task;
    const result = db.run("UPDATE tasks SET title = ?, description = ? WHERE id = ?", title, description, id);

      return { id, title, description };
  },

  deleteTask: async (ctx: Context) => {
    const id = parseInt(ctx.params.id);
    const result = db.run("DELETE FROM tasks WHERE id =(?)", id);
    return {success:true }
  }
};