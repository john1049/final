(function() {
    var app = angular.module('todoApp', ['ngAnimate', 'angular.filter'])
    app.controller('todoController', function($scope) {
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
    })
})();
