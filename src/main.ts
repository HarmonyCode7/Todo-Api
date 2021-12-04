import express, {Application, Request, Response} from 'express';
import { Todo } from './entity/todo';
import { TodoService } from './todo-service';

const app = express();
const port = 4500;
const todoService = new TodoService();

app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.get('/api/todos', async (req: Request, res: Response) => {
    let todos = await todoService.getAllTodos();
    res.send(todos);
})



function testTodo(): Todo {
    let todo = new Todo();
    todo.title = "Test todo";
    todo.category = "Testing"
    todo.start = new Date();
    todo.end = new Date();
    return todo;
}

app.post('/api/todos', async (req: Request, res: Response) => {
    console.log('Adding new todo');
    let todo = testTodo()

    // todo.title = req.body.title;
    // todo.category = req.body.category ? req.body.category : null;
    // todo.start = new Date(req.body.start);
    // todo.end = new Date(req.body.end);

    try
    {
        todoService.createTodo(todo);
        console.log("Success new todo added")
        console.log(todo);
        res.status(200).send(todo)
    }catch(err) {
        console.log("Failed to add todo");
        console.log(todo);
        res.status(400).send(`Failed to create todo: ${err}`)
    }
});


app.delete('/api/todos/:id', async (req: Request, res: Response) => {
    let todoid = Number(req.body.id);
    try
    {
        await todoService.removeTodo(todoid);
        let todos = await todoService.getAllTodos();
        console.log(`Success removing todo with id: ${todoid}`);
        res.status(200).send(todos);

    }catch(err)
    {

        console.log(`Failed to delete todo item with id: ${todoid}`);
        res.status(400).send(`Failed to delete todo item with id: ${todoid}: ${err}`)
    }
})

app.listen(port, () => console.log(`Server running on http://localhost:${port}/`));