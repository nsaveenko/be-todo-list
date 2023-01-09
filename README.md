# be-todo-list

Database snapshot: I'm using the collection, called 'todos', which included todo items. Todo items consist of several fields:

1. id - unique identifier
2. email - user's email
3. title - title of the todo
4. description - description of the todo
5. date - date of the todo

Endpoints: 

1. method: GET, path: "/todos" (to get all todos)
2. method: POST, path: "/todo" (to create new todo)
3. method: DELETE, path: "/todo/:id" (to delete todo by id)
4. method: PUT, path: "//todo/completed/:id" (to update completed property by id)
5. method: PUT, path: "/todos" (to update todo)
6. method: GET, path: "/todo/:id" (to get todo by id)
