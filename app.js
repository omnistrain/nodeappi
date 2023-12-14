const express = require('express');

const app = express();
const todosFunc = require('./data/todos_storage.js');


app.use(express.json());

app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send('Hello world !!');
});

app.get('/api/todo/all',(req, res)=>{
    res.setHeader('content-type', 'application/json');
    const todos = todosFunc.findTodos();
    res.write(JSON.stringify(todos));
    res.end();

});

app.put('/api/todo/add',(req, res)=>{
    res.setHeader('content-type', 'application/json');
    const todo = todosFunc.createTodo(req.body);
    res.write(JSON.stringify(todo));
    res.end();
});

app.patch('/api/todo/update/:id',(req, res)=>{
    res.setHeader('content-type', 'application/json');
    const todo = todosFunc.updateTodo(req.params.id, req.body);
    //res.write(JSON.stringify(todo));
    res.end();
    //res.sendStatus(404);

});

app.delete('/api/todo/delete/:id',(req, res)=>{
    //query possible
    todosFunc.deletetodo(parseInt(req.params.id));
    res.end();

});


app.listen(9999, () => {
    console.log('Server app listening on port ' + 9999);
});