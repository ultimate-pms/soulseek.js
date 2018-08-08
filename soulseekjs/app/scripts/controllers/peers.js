'use strict';

angular.module('p2pmusicApp')
  .controller('PeersCtrl', function ($scope, $rootScope) {

    $scope.peers = ['You'];

    $scope.showFileList = function (){
      mainChannel.channels[this.peer].send({filelistRequest: true});
    }

    $rootScope.$on('rtc-onopen', function(event, data)
    {
      $scope.peers.push(data);
      $scope.$digest();
    });

    $rootScope.$on('rtc-onleave', function(event, data)
    {
      for (var i = 0; i < $scope.peers.length; i++) {
        var peer = $scope.peers[i];
        if (peer === data) {
          $scope.peers.splice(i, 1);
          break;
        }
      }
      $scope.$digest();
    });

  });
