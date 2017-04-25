angular
    .module('todoApp', ['firebase', 'angular.filter', 'ngAnimate'])
    .constant('firebaseConfig', {
        apiKey: "AIzaSyCGz88kNQ2b-7nU8EGaQHtubdnlisG54hI",
        authDomain: "cloud-based-todo.firebaseapp.com",
        databaseURL: "https://cloud-based-todo.firebaseio.com",
        projectId: "cloud-based-todo",
        storageBucket: "cloud-based-todo.appspot.com",
        messagingSenderId: "509749300206"
    })

    .run(firebaseConfig => firebase.initializeApp(firebaseConfig))
    .service('dbRefRoot', DbRefRoot)
    .service('todos', Todos)
    .controller('TodoCtrl', TodoCtrl)

function DbRefRoot() {
    return firebase.database().ref()
}

function Todos(dbRefRoot, $firebaseObject, $firebaseArray) {
    const dbRefTodos = dbRefRoot.child('todos')

    this.get = function get(id) {
        return $firebaseObject(dbRefTodos.child(id))
    }

    this.getAll = function getAll() {
        return $firebaseArray(dbRefTodos)
    }
}

function TodoCtrl(todos) {

    this.getNewTodo = function getNewTodo() {
        return {
            task_name: '',
            due_date: '',
            category: '',
            notes: '',
            priority: '',
            complete: false
        }
    }

    this.newTodo = this.getNewTodo();

    this.todos = todos.getAll();

    this.addTodo = function addTodo(newTodo) {
        this.todos
            .$add(newTodo)
            .then(newRef => {
                this.newTodo = this.getNewTodo()
            })
    }

    this.remove = function remove(todo) {
        this.todos.$remove(todo)
    }

    this.save = function save(todo) {
        this.todos.$save(todo)
    }

    this.complete = function complete(todo) {
        todo.complete = true
        this.todos.$save(todo)
    }

    this.uncomplete = function uncomplete(todo) {
        todo.complete = false
        this.todos.$save(todo)
    }
}
