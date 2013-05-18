'use strict';

angular.module('p2pmusicApp')
  .factory('RTCService', function ($rootScope) {

    window.mainChannel = new DataChannel();
    mainChannel.firebase = 'webrtc-experiment';
    mainChannel.direction = 'many-to-many';
    var p2pChannels = [];

    var nms = ["De Jong", "Jansen", "De Vries", "Van den Berg",
      "Van Dijk", "Bakker", "Visser", "Smit", "Meijer", "De Boer", "Mulder",
      "De Groot", "Bos", "Vos", "Peters", "Hendriks", "Van Leeuwen", "Dekker",
      "Brouwer", "De Wit", "Dijkstra", "Smits", "De Graaf", "Van der Meer"]

    mainChannel.userid = nms[Math.floor(Math.random() * nms.length)];

    mainChannel.connect('2');


    mainChannel.onopen = function (userid)
    {
      // get user filelist
      $rootScope.$broadcast('rtc-onopen', userid);
      mainChannel.send('hi!');
    }

    mainChannel.onclose = function (userid)
    {
      console.log(userid);
      $rootScope.$broadcast('rtc-onclose', userid);
    }

    // all incoming messages
    mainChannel.onmessage = function (message, userid)
    {
      // if filelist request
      if (typeof message == 'object')
      {
        console.log(message);
        if (typeof message.filelistRequest !== 'undefined'){
          // send filelist if requested
          console.log('filelistRequest!');
          mainChannel.channels[userid].send({filelist: 'files'});
        }
      }
      else if(typeof message == 'string')
      {
        $rootScope.$broadcast('rtc-onmessage', {msg: message, user: userid});
      }
    }

    mainChannel.onFileProgress = function (packets)
    {
      console.log(packets);
      $rootScope.$broadcast('rtc-onFileProgress', packets);

      // packets.remaining
      // packets.sent
      // packets.received
      // packets.length
    };

    // on file successfully sent
    mainChannel.onFileSent = function (file)
    {
      console.log(file);
      $rootScope.$broadcast('rtc-onFileSent', file);

      // file.name
      // file.size
    };

    mainChannel.onFileReceived = function (fileName)
    {
      console.log(fileName);
      $rootScope.$broadcast('rtc-onFileReceived', fileName);
    };

    // Public API here
    return mainChannel;
  });
