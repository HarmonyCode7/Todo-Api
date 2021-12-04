"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todo_1 = require("./entity/todo");
const todo_service_1 = require("./todo-service");
const app = (0, express_1.default)();
const port = 4500;
const todoService = new todo_service_1.TodoService();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.get('/api/todos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let todos = yield todoService.getAllTodos();
    res.send(todos);
}));
app.post('api/todos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let todo = new todo_1.Todo();
    todo.title = req.body.title;
    todo.category = req.body.category ? req.body.category : null;
    todo.start = new Date(req.body.start);
    todo.end = new Date(req.body.end);
    try {
        todoService.createTodo(todo);
    }
    catch (err) {
        res.status(400).send(`Failed to create todo: ${err}`);
    }
}));
app.listen(port, () => console.log(`Server running on http://localhost:${port}/`));
