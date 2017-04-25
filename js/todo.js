angular
    .module('todoApp', ['firebase', 'angular.filter'])
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

    function TodoCtrl(todos){

      this.getNewTodo = function getNewTodo(){
        return{
          task_name: '',
          due_date: '',
          category: '',
          comment: '',
          priority: '',
          complete: false
        }
      }

      this.newTodo = this.getNewTodo();

      this.todos = todos.getAll();

      console.log(this.todos);

      this.addTodo = function addTodo(newTodo){
        this.todos
          .$add(newTodo)
          .then(newRef => {
            this.newTodo = this.getNewTodo()
            console.log(this.todos)
          })
      }

      this.remove = function remove(todo){
        this.todos.$remove(todo)
      }

      this.save = function save(todo) {
        this.todos.$save(todo)
      }

      this.complete = function complete(todo){
        console.log(todo.complete)
        todo.complete = true
        this.todos.$save(todo)
      }
    }

/*
    app.controller('TodoCtrl', function($scope) {
        $scope.tasks = (localStorage.getItem('todo') != null) ? JSON.parse(localStorage.getItem('todo')) : [];
        $scope.visible = false;

        console.log($scope.tasks);

        $scope.update = function() {
            localStorage.setItem('todo', JSON.stringify($scope.tasks));
        }

        Array.prototype.remove = function(value) {
            this.splice(this.indexOf(value), 1);
            return true;
        };

        $scope.add = function() {
              console.log($scope.priority);
            $scope.todo = ({
                name: $scope.taskName,
                date: $scope.dueDate,
                priority: $scope.priority,
                category: $scope.category,
                complete: false
            })
            $scope.todo.id = cuid();
            $scope.tasks.push($scope.todo);
            $scope.update();
            $scope.taskName = '';
            $scope.dueDate = '';
        }

        $scope.delete = function(task) {
            $scope.tasks.remove(task);
            $scope.update();
        }

        $scope.completed = function() {
            this.task.complete = true;
            $scope.update();
        }

        $scope.uncomplete = function() {
            this.task.complete = false;
            $scope.update();
        }
    })*/
