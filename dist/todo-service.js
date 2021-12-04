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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const todo_1 = require("./entity/todo");
const typeorm_1 = require("typeorm");
class TodoService {
    constructor() {
        this.getConnection().then(() => console.log('Connection successful')).catch(err => console.log("Error connection to database: " + err));
    }
    getConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, typeorm_1.createConnection)();
        });
    }
    getAllTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let conn = yield this.getConnection();
                let todoRepo = conn.getRepository(todo_1.Todo);
                let todos = todoRepo.find();
                resolve(todos);
            }));
        });
    }
    createTodo(todo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let conn = yield this.getConnection();
                let todoRepo = yield conn.getRepository(todo_1.Todo);
                let newTodo = new todo_1.Todo();
                newTodo.title = todo.title;
                newTodo.category = todo.category ? todo.category : 'NULL';
                newTodo.start = todo.start;
                newTodo.end = todo.end;
            }
            catch (err) {
                console.log(`Could not add new todo: ${err}`);
                throw new Error(`Could not add new todo: ${err}`);
            }
        });
    }
}
exports.TodoService = TodoService;
;
