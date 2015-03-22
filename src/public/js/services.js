(function (angular) {
    "use strict";

    angular.module("TwitterTopicStream.services", [
        "btford.socket-io"
    ])
    .service("Api", [
        '$http',
        function ($http) {
            return {
                "tweets": {
                    "setSearch": function (search) {
                        return $http({
                            "url": "/tweets/search",
                            "data": { "search": search },
                            "method": "POST",
                            "cache": false
                        });
                    },
                    "toggleStream": function (command) {
                        return $http({
                            "url": "/tweets/stream",
                            "data": { "command": command },
                            "method": "PUT",
                            "cache": false
                        });
                    }
                }
            };
        }
    ])
    .factory("mySocket", function (socketFactory) {
        var mySocket = socketFactory();
        mySocket.forward("tweet");
        mySocket.forward("tweetstarted");
        mySocket.forward("tweetsclients");
        mySocket.forward("tweetsfirst");
        mySocket.forward("tweetscount");
        mySocket.forward("error");
        return mySocket;
    });

})(angular);
