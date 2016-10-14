var chart1 = {};
    chart1.type = "ColumnChart";
    // chart1.cssStyle = "height:200px; width:300px;";
    chart1.data = {"cols": [
        {id: "month", label: "Unit", type: "string"},
        {id: "laptop-id", label: "Value", type: "number"},
    ], "rows": [
        {c: [
            {v: "Barometric pressure (Pa)"},
            {v: $scope.curPa, f: $scope.curPa + ' Pa'},
        ]},
        {c: [
            {v: "Temperature (C)"},
            {v: 13},
        ]},
        {c: [
            {v: "Lumination (lux)"},
            {v: 24},

        ]},
        {c: [
            {v: "Humidity"},
            {v: 24},

        ]}
    ]};

    chart1.options = {
        "title": "Current values",
        "isStacked": "true",
        "fill": 20,
        "displayExactValues": true,
        "vAxis": {
            "title": "Sales unit", "gridlines": {"count": 6}
        },
        "hAxis": {
            "title": "Date"
        }
    };

    chart1.formatters = {};

    $scope.chart = chart1;

$scope.updateData = function() {
    $.ajax({
	    url: $scope.mSensorDataURL + $scope.sensor.key + ".json?gt[timestamp]=now- 1day",
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