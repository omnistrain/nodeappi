//toujours relatif au path d'execution
const path = "store/todos.json";

const fs = require('fs');



/**
 * @typedef {object} Todo
 * @property {number} id
 * @property {string} nom
 * @property {string} description
 * @property {boolean} completed
 */

/**
 * @return {Promise<Todo[]>}
 * 
 */


module.exports.findTodos = () => {
    const data = fs.readFileSync(path);
    return JSON.parse(data);

}

/**
 * 
 * @param {string} nom
 * @param {string} description
 * @param {boolean} completed
 * @returns {Promise<Todo>}
 */

module.exports.createTodo = ({nom, description, completed=false}) => {
    const todo = {nom, description, completed, id: Date.now()};
    const data = [todo, ...this.findTodos()];
    fs.writeFileSync(path, JSON.stringify(data));

    return todo;

}


/**
 * 
 * @param {number} id 
 * @return {Promise}
 */
module.exports.deletetodo = (id)=>{
    const data = this.findTodos();
    const resultat = data.filter( todo => todo.id != id);
    fs.writeFileSync(path, JSON.stringify(resultat));

}


/**
 * @param {number} id 
 * @param {{completed: boolean, nom: string, description: string}} partialTodo
 * @returns {Promise<Todo>}
 */

module.exports.updateTodo = (id, partialTodo) => {
    
    const data = this.findTodos();
    const todo = data.find(todo => todo.id == id);
    if(todo != undefined){
        Object.assign(todo, partialTodo);



    }
    fs.writeFileSync(path, JSON.stringify(data));

    return todo;

}