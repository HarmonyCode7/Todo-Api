import {Todo} from './entity/todo';
import {createConnection} from 'typeorm';

export class TodoService {
    conn: any = ""
    constructor() {
       console.log('Database service ready!!!');
    }

    async getConnection() {
        if(!this.conn)
        {
            this.conn = await createConnection();
        }  
    }

    async getAllTodos(): Promise<Todo[]>{
        return new Promise(async (resolve, reject) => {
            try {
                await this.getConnection();
                let todoRepo = this.conn.getRepository(Todo);
                let todos = todoRepo.find()
                resolve(todos)
            }
            catch(err) {
                reject(err)
            }
        })
    }

    //adds a new todo to the database
    async createTodo(todo: Todo) {
        try 
        {
            
            await this.getConnection();
            let todoRepo = this.conn.getRepository(Todo);
            let newTodo = new Todo();
            newTodo.title = todo.title;
            newTodo.category = todo.category ? todo.category : 'NULL';
            newTodo.start = todo.start;
            newTodo.end = todo.end; 
            todoRepo.save(newTodo);
        }catch(err) {
            console.log(`Could not add new todo: ${err}`);
            throw new Error(`Could not add new todo: ${err}`)
        }    
    }

    async removeTodo(id: number){
        try
        {
            await this.getConnection();
            let todoRepo = this.conn.getRepository(Todo);
            let removedTodo = await todoRepo.find({id: id});
            await todoRepo.remove(removedTodo);

        }catch(err)
        {
            console.log(`Todo item could not be removed: ${err}`);
            throw new Error(`Todo item could not be removed: ${err}`);
        }
    }
};