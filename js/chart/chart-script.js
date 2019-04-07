var oilCanvas,
	chartActivParam = 0,
	chartchartFontS = 15;

document.addEventListener( "DOMContentLoaded", ready );

function ready( event ) {
	oilCanvas = document.getElementById("oilChart");
	
	if ( oilCanvas ) {
		charts_resize();
		window.addEventListener( "resize", charts_resize);
		charts_scroll();
		window.addEventListener( "scroll", charts_scroll );
	}
		
}

function charts_scroll() {
	var nowPageScroll = window.pageYOffset + document.documentElement.clientHeight;
	if ( chartActivParam == 0 && nowPageScroll >= getCoords( oilCanvas ).top + 400 )  {
		chart_1( oilCanvas, chartchartFontS );
		chartActivParam = 1;
	}
}

function charts_resize() {
	if ( document.documentElement.clientWidth < 600 ) {
		if ( chartchartFontS != 10 ) {
			chartchartFontS = 10;
			chartActivParam = 0;
			charts_scroll();
		}
	}
	else {
		if ( chartchartFontS != 15 ) {
			chartchartFontS = 15;
			chartActivParam = 0;
			charts_scroll();
		}
	}
}

function chart_1(el, f_size = 15) {
	if ( ! el )
		return;
	

	Chart.defaults.global.defaultFontFamily = "Montserrat";
	Chart.defaults.global.defaultFontSize = 14;
	
	var oilData = {
	    labels: [
	        "Filipino",
	        "Indonesian",
	        "Indian",
	        "Ukrainian",
	        "Mexican",
	        "Myanmar",
	        "Others"
	    ],
	    datasets: [
	        {
	            data: [30, 20, 17, 11, 4, 5, 13],
	            backgroundColor: [
	                "#007DC4",
	                "#F89C1C",
	                "#458781",
	                "#AB8871",
	                "#A51354",
	                "#A79838",
	                "#6287A2"
	            ]
	        }]
	};
	
	var chartOptions = {
		cutoutPercentage: 80,
		legend: {
			position: 'right',
			labels: {
				boxWidth: 15,
				fontSize: f_size,
				fontStyle: "normal",
				fontColor: "#414243"
			}
		},
		layout: {
            padding: {
                left: 0,
                right: 10,
                top: 0,
                bottom: 0
            }
        },
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    var amount = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    var total = eval(data.datasets[tooltipItem.datasetIndex].data.join("+"));
                    return data.labels[tooltipItem.index] + ": " + parseFloat(amount * 100 / total).toFixed(2) + '%';
                },
            }
        }
	};
	
	var pieChart = new Chart( el, {
	  	type: 'pie',
	  	data: oilData,
  		options: chartOptions
	});
}