'use strict';

var myApp = angular.module('DomeViz', ['chart.js']).controller("DomeCtrl", function ($scope) {

$scope.now = true;
$scope.prev = true;
// $scope.curTemp = 5;

$scope.labels = ["Hej", "Hej", "Hej", "Hej", "Hej", "Hej", "Hej"];
$scope.series = ['Temperature'];
$scope.data = [
   [15, 25, 20, 18, 21, 23, 26]
 ];

$scope.sensor = {};

// Where the sensor data is stored
$scope.mSensorDataURL = 'http://backup.evothings.com:8082/output/';

// A subscriber's key (Five other keys also availble at http://smartspaces.r1.kth.se:8082)
$scope.sensor.key = "BkPNOapq2WSMgpVlNQQKFYXPBWr";

$scope.updateData = function() {
    $.ajax({
	    url: $scope.mSensorDataURL + $scope.sensor.key + ".json?gt[timestamp]=now- 1days",
	    jsonp: "callback",
	    cache: true,
	    dataType: "jsonp",
	    data: 
	        {
	            page: 1
	        },
	    success: function(response) {
            if (response && response[0]) 
                {
                    $scope.sensor.data = response[0];
                    $scope.sensor.fullData = response;
                }
	        }
	    });
}

$scope.getPrevData = function() {
    var currentDate = new Date($scope.sensor.data.timestamp)
    console.log(currentDate)
    var temp = currentDate.toDateString();
    console.log(temp)
 
    for (var j = 1; j < 5; j++) {
        for (var i = 0; i < $scope.sensor.fullData.length; i++) {
            var time = new Date($scope.sensor.fullData[i].timestamp)  
           
            if (currentDate.toDateString() === time.toDateString()) {
                console.log(currentDate.getHours() + ' & ' + time.getHours())
                if (currentDate.getHours() - j === time.getHours()) {
                    console.log('cool')
                    $scope.labels[j-1] = time.getHours() + 1
                    console.log(time.toTimeString())
                    $scope.data[0][j-1] = $scope.sensor.fullData[i].t
                    
                    j = j + 1;


                }
            }
        }
    }
}

$scope.tempMessage = function(curTemp) {
    if (curTemp > 25) {
        return "It's too hot in the Dome. Stay outside!";
    }
    else if (curTemp < 10) {
        return "It's too cold in the Dome. Stay outside!";
    }
    else {
        return "Go to the Dome!";
    }
}

$scope.displayTemp = function() {
    if ($scope.sensor && $scope.sensor.data) {
        $scope.now = true;
        return $scope.sensor.data.t; 
   } else {
        $scope.now = false;
        return 0;
   }
}

$scope.displayTempMessage = function() {
    if ($scope.sensor.data) {
        $scope.now = true;
        return $scope.tempMessage($scope.sensor.data.t)
    } else {
        $scope.now = false;
        return 0;
    }
}

$scope.displayNumberOfPeople = function() {
     if ($scope.sensor && $scope.sensor.data) {
        $scope.now = true;
        return Math.round($scope.sensor.data.c / 15)
    } else {
        $scope.now = false;
        return 0;
    }
}

$scope.displayPercentOfPeople = function() {   
    if ($scope.sensor && $scope.sensor.data) {
        $scope.now = true;
        return Math.floor((($scope.sensor.data.c / 15) / 149) * 100);
    } else {
        $scope.now = false;
        return 0;
    }
}

$scope.updateData();

});