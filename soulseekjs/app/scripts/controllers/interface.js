'use strict';

angular.module('p2pmusicApp')
  .controller('InterfaceCtrl', function ($scope) {

    $scope.broadcastClick = function() {

      $scope.$parent.$broadcast('interfaceClick');

    };

  });
