// Browser detection to add css class

/***************************** BEGIN DMV GRAPHIC 1 *****************************/
		function dmvGraphic1() {    
			// Loading data
            var tooltipArea1 = d3.select("#urb-tooltip1");
			var catOverall1=true;
			var catSF1=false;
			var catMF1=false;
			var catSmallBiz1=false;
			var catNonRes1=false;
			var catMission1=false;
			var catFederal1=false;
			
			
			// Set the dimensions and margins of the graph
			var w1 = 600;
			var h1 = 400;
			var xPadding1 = 0;
			var yPadding1 = 20;			
			
			var margin1 = {top: 10, right: 0, bottom: 30, left: 10},
				width1 = w1 - margin1.left - margin1.right,
				height1 = h1 - margin1.top - margin1.bottom;
			

			// Create SVG element
			var svg1 = d3.select("#urb-graphic-container1")
				.append("svg")
				.attr("id","urb-dmv-graphic1")
			//	.attr("width", width1 + margin1.left + margin1.right)
			//	.attr("height", height1 + margin1.top + margin1.bottom)
				.attr("viewBox",(-xPadding1)+" "+(-yPadding1)+" "+w1+" "+h1)
				.attr("preserveAspectRatio","xMinYMin meet")
  				.append("g");
			//	.attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");
			
			
//Read the data
d3.csv("data/dmv-graphic1-data-labelfix.csv", function(data) {
	
data.forEach(function(d) {
  d.line = +d.line;
  d.valueOverall1 = +d.valueOverall1;
  d.valueSF1 = +d.valueSF1;
  d.valueMF1 = +d.valueMF1;
  d.valueSmallBiz1 = +d.valueSmallBiz1;
  d.valueNonRes1 = +d.valueNonRes1;
  d.valueMission1 = +d.valueMission1;
  d.valueFederal1 = +d.valueFederal1;
});

	
    // Add X axis --> it is a date format
    var x = d3.scaleLinear()
      .domain([0,d3.max(data, d=>d.line)])
      .range([ 60, width1 ]);
    svg1.append("g")
		.attr("class", "x1 axis1")
		.attr("transform", "translate(0," + height1 + ")")
		.attr("opacity","0")
		.call(d3.axisBottom(x));

    // Add Y axis
	var y = d3.scaleLinear()
   //   .domain( [0,d3.max(data, d=>d.valueOverall1)])
      .domain( [0,50000])
      .range([ height1, 0 ]);
	
    svg1.append("g")
	.attr("class", "y1 axis1")
//    .call(d3.axisLeft(y).tickSize(-width1).ticks(4).tickFormat(d => "$" + d3.format(",.0f")(parseFloat(d))));
    .call(d3.axisLeft(y).tickSize(-width1).tickValues(y.ticks(6).concat(y.domain())).tickFormat(d => "$" + d3.format(",.0f")(parseFloat(d))));


    // Initialize dots with group a
    var dot1 = svg1
      .selectAll('circle')
     .data(data)
      .enter()
      .append('circle')
        .attr("cx", function(d) { return x(+d.line); })
        .attr("cy", function(d) { return y(+d.valueOverall1); })
        .attr("data-value", function(d) { return d.valueOverall1; })
        .attr("data-city", function(d) { return d.placeOverall1; })
        .attr("r", 4)
        .style("stroke-width", "1px")
        .style("stroke", "#1695d1")
        .style("fill", "#FFF");
	
	// Add text for DC
	var dot1dmv1 = svg1
		.append("g")
		.classed("urb-label-dmv1",true);
	var dot1dmv2 = svg1
		.append("g")
		.classed("urb-label-dmv2",true);
	var dot1dmvLine = svg1
		.append("g")
		.classed("urb-label-dmv-line",true);
	// DISABLED THIS CODE SO DOT, LINE AND LABEL ARE REMOVED 
	 dot1dmv1
	 	.selectAll("text")
	 	.data(data)
	 	.enter()
	 	.append("text")
	 	.text(function(d) {
	 		if(d.placeOverall1=="Arlington County, VA"){
	 			return d.placeOverall1;
	 		}
	 	})
	 	.attr("text-anchor", "middle")
	 	.attr("fill","#12719e")
	 	.attr("x", function(d) { return x(+d.line); })
        .attr("y", function(d) { return y(+d.valueOverall1)-70; });	
	 dot1dmv2
	 	.selectAll("text")
	 	.data(data)
	 	.enter()
	 	.append("text")
	 	.text(function(d) {
	 		if(d.placeOverall1=="Arlington County, VA"){
	 			return "$"+d3.format(",.0f")(parseFloat(d.valueOverall1));
	 		}
	 	})
	 	.attr("text-anchor", "middle")
	 	.attr("fill","#12719e")
	 	.attr("x", function(d) { return x(+d.line); })
        .attr("y", function(d) { return y(+d.valueOverall1)-52; });
	 dot1dmvLine
	 	.selectAll("line")
	 	.data(data)
	 	.enter()
	 	.append("line")
	 	.attr("stroke", "#12719e")
	 	.attr("stroke-width", "1px")
	 	.attr("class", function(d) {
	 		if(d.placeOverall1=="Arlington County, VA"){
	 			return "urb-line-dmv";
	 		}else{
	 			return "urb-line-nodmv";
	 		}
	 	})
	 	.attr("x1", function(d) { return x(+d.line); })
	 	.attr("x2", function(d) { return x(+d.line); })
        .attr("y1", function(d) { return y(+d.valueOverall1); })
        .attr("y2", function(d) { return y(+d.valueOverall1)-47; });

	
	hoverCircle1();


    // A function that update the chart
    function updateGraphic1(selectedGroup,selectedCity) {		
		// Create new data with the selection?
		var dataFilter = data.map(function(d){return {line: d.line, value:d[selectedGroup], place:d[selectedCity]} });
	//	y.domain( [0,d3.max(data, d => d[selectedGroup] )]);
		if (selectedGroup=="valueSF1"){
			y.domain( [0,50000]);
		}else if (selectedGroup=="valueMF1"){
			y.domain( [0,10000]);
		}else if (selectedGroup=="valueSmallBiz1"){
			y.domain( [0,10000]);
		}else if (selectedGroup=="valueNonRes1"){
			y.domain( [0,12000]);
		}else if (selectedGroup=="valueMission1"){
			y.domain( [0,1000]);
		}else if (selectedGroup=="valueFederal1"){
			y.domain( [0,1000]);
		}else{
			y.domain( [0,50000]);
		}
		
      // Give these new data to update circles
      dot1
        .data(dataFilter)
        .transition()
        .duration(1000)
          .attr("cx", function(d) { return x(+d.line) })
          .attr("cy", function(d) { return y(+d.value) })
		  .attr("data-value", function(d) { return d.value; })
		  .attr("data-city", function(d) { return d.place; })
	dot1dmv1
		.selectAll("text")
		.data(dataFilter)
		.transition()
        .duration(1000)
		.text(function(d) {
			if(d.place=="Arlington County, VA"){
				return d.place;
			}
		})
		.attr("text-anchor",function() {
			if(catSF1||catMission1){ // removed 'catNonRes1||' so as to center the label
				return "left";
			}else{
				return "middle";
			}
		})
		.attr("x", function(d) { return x(+d.line); })
        .attr("y", function(d) { return y(+d.value)-70; });	
	dot1dmv2
		.selectAll("text")
		.data(dataFilter)
		.transition()
        .duration(1000)
		.text(function(d) {
			if(d.place=="Arlington County, VA"){
				return "$"+d3.format(",.0f")(parseFloat(d.value));
			}
		})
		.attr("text-anchor",function() {
			if(catSF1||catMission1){  // removed 'catNonRes1||' so as to center the label
				return "left";
			}else{
				return "middle";
			}
		})
		.attr("x", function(d) { return x(+d.line); })
        .attr("y", function(d) { return y(+d.value)-52; });
	dot1dmvLine
		.selectAll("line")
		.data(dataFilter)
		.transition()
        .duration(1000)
		.attr("class", function(d) {
			if(d.place=="Arlington County, VA"){
				return "urb-line-dmv";
			}else{
				return "urb-line-nodmv";
			}
		})
		.attr("x1", function(d) { return x(+d.line); })
		.attr("x2", function(d) { return x(+d.line); })
        .attr("y1", function(d) { return y(+d.value); })
        .attr("y2", function(d) { return y(+d.value)-47; });
		
	svg1.select(".y1.axis1")
		.transition()
  		.duration(1000)
  //  	.call(d3.axisLeft(y).tickSize(-width1).ticks(4).tickFormat(d => "$" + d3.format(",.0f")(parseFloat(d))));
    	.call(d3.axisLeft(y).tickSize(-width1).tickValues(y.ticks(6).concat(y.domain())).tickFormat(d => "$" + d3.format(",.0f")(parseFloat(d))));
		
		hoverCircle1();
    };

	// CHANGE SET OF DATA WITH SELECT
    // When the button is changed, run the updateChart function
/*    d3.select("#urb-selectButton1").on("change", function(d) {
        // recover the option that has been chosen
        var selectedOption1 = d3.select(this).property("value");
        // run the updateChart function with this selected option
        updateGraphic1(selectedOption1);
    })*/
	
		d3.select("#urb-container1 .urb-button-01").on("click", function() {
			catOverall1=true;
			catSF1=false;catMF1=false;catSmallBiz1=false;catNonRes1=false;catMission1=false;catFederal1=false;
			//$("#urb-container1 h3").text("Chicago ranks 40th among the 100 largest US cities");
			$("#urb-container1 .urb-button").removeClass("urb-active1");
			$(this).addClass("urb-active1");
			$('#urb-container1 .urb-container1-column').removeClass("ub-menu-opened1");
			$("#urb-container1 .urb-button-container p span").text("Overall");
			$("#urb-container1 h2 span.urb-data1-cat").text("Overall");
			$("#urb-container1 h2 span.urb-data1-sentence").text("per Household");
			var selectedOption1 = $(this).attr("data-action");
			var selectedCity1 = $(this).attr("data-city");
			updateGraphic1(selectedOption1,selectedCity1);
		});
		d3.select("#urb-container1 .urb-button-02").on("click", function() {
			catSF1=true;
			catOverall1=false;catMF1=false;catSmallBiz1=false;catNonRes1=false;catMission1=false;catFederal1=false;
			//$("#urb-container1 h3").text("Chicago ranks 46th among the 100 largest US cities");
			$("#urb-container1 .urb-button").removeClass("urb-active1");
			$(this).addClass("urb-active1");
			$('#urb-container1 .urb-container1-column').removeClass("ub-menu-opened1");
			$("#urb-container1 .urb-button-container p span").text("Single-Family");
			$("#urb-container1 h2 span.urb-data1-cat").text("Single-Family");
			$("#urb-container1 h2 span.urb-data1-sentence").text("per Owner-Occupied Household");
			var selectedOption1 = $(this).attr("data-action");
			var selectedCity1 = $(this).attr("data-city");
			updateGraphic1(selectedOption1,selectedCity1);
		});
		d3.select("#urb-container1 .urb-button-03").on("click", function() {
			catMF1=true;
			catOverall1=false;catSF1=false;catSmallBiz1=false;catNonRes1=false;catMission1=false;catFederal1=false;
			//$("#urb-container1 h3").text("Chicago ranks 65th among the 100 largest US cities");
			$("#urb-container1 .urb-button").removeClass("urb-active1");
			$(this).addClass("urb-active1");
			$('#urb-container1 .urb-container1-column').removeClass("ub-menu-opened1");
			$("#urb-container1 .urb-button-container p span").text("Multifamily");
			$("#urb-container1 h2 span").text("Multifamily");
			$("#urb-container1 h2 span.urb-data1-sentence").text("per Renter-Occupied Household");
			var selectedOption1 = $(this).attr("data-action");
			var selectedCity1 = $(this).attr("data-city");
			updateGraphic1(selectedOption1,selectedCity1);
		});
		d3.select("#urb-container1 .urb-button-04").on("click", function() {
			catSmallBiz1=true;
			catOverall1=false;catSF1=false;catMF1=false;catNonRes1=false;catMission1=false;catFederal1=false;
			//$("#urb-container1 h3").text("Chicago ranks 45th among the 100 largest US cities");
			$("#urb-container1 .urb-button").removeClass("urb-active1");
			$(this).addClass("urb-active1");
			$('#urb-container1 .urb-container1-column').removeClass("ub-menu-opened1");
			$("#urb-container1 .urb-button-container p span").text("Small-Business");
			$("#urb-container1 h2 span.urb-data1-cat").text("Small-Business");
			$("#urb-container1 h2 span.urb-data1-sentence").text("per Small-Business Employee");
			var selectedOption1 = $(this).attr("data-action");
			var selectedCity1 = $(this).attr("data-city");
			updateGraphic1(selectedOption1,selectedCity1);			
		});
		d3.select("#urb-container1 .urb-button-05").on("click", function() {
			catNonRes1=true;
			catOverall1=false;catSF1=false;catMF1=false;catSmallBiz1=false;catMission1=false;catFederal1=false;
			//$("#urb-container1 h3").text("Chicago ranks 9th among the 100 largest US cities");
			$("#urb-container1 .urb-button").removeClass("urb-active1");
			$(this).addClass("urb-active1");
			$('#urb-container1 .urb-container1-column').removeClass("ub-menu-opened1");
			$("#urb-container1 .urb-button-container p span").text("Nonresidential");
			$("#urb-container1 h2 span.urb-data1-cat").text("Nonresidential");
			$("#urb-container1 h2 span.urb-data1-sentence").text("per Employee");
			var selectedOption1 = $(this).attr("data-action");
			var selectedCity1 = $(this).attr("data-city");
			updateGraphic1(selectedOption1,selectedCity1);
		});
		d3.select("#urb-container1 .urb-button-06").on("click", function() {
			catMission1=true;
			catOverall1=false;catSF1=false;catMF1=false;catSmallBiz1=false;catNonRes1=false;catFederal1=false;
			//$("#urb-container1 h3").text("Chicago ranks 18th among the 100 largest US cities");
			$("#urb-container1 .urb-button").removeClass("urb-active1");
			$(this).addClass("urb-active1");
			$('#urb-container1 .urb-container1-column').removeClass("ub-menu-opened1");
			$("#urb-container1 .urb-button-container p span").text("Mission");
			$("#urb-container1 h2 span.urb-data1-cat").text("Mission");
			$("#urb-container1 h2 span.urb-data1-sentence").text("per Household");
			var selectedOption1 = $(this).attr("data-action");
			var selectedCity1 = $(this).attr("data-city");
			updateGraphic1(selectedOption1,selectedCity1);
		});
		d3.select("#urb-container1 .urb-button-07").on("click", function() {
			catFederal1=true;
			catOverall1=false;catSF1=false;catMF1=false;catSmallBiz1=false;catNonRes1=false;catMission1=false;
			//$("#urb-container1 h3").text("Chicago ranks 42th among the 100 largest US cities");
			$("#urb-container1 .urb-button").removeClass("urb-active1");
			$(this).addClass("urb-active1");
			$(this).parent().addClass("urb-active1");
			$('#urb-container1 .urb-container1-column').removeClass("ub-menu-opened1");
			$("#urb-container1 .urb-button-container p span").text("Federal");
			$("#urb-container1 h2 span.urb-data1-cat").text("Federal");
			$("#urb-container1 h2 span.urb-data1-sentence").text("per Household");
			var selectedOption1 = $(this).attr("data-action");
			var selectedCity1 = $(this).attr("data-city");
			updateGraphic1(selectedOption1,selectedCity1);
		});

});
			

			function hoverCircle1(){
				$("#urb-dmv-graphic1 circle").each(function() {
                    $(this).on({
                        mouseenter:function(){
							var currentValue=$(this).attr("data-value");
                    		var cityName=$(this).attr("data-city");
							d3.select(this).transition().duration(100).style("stroke-width","2").attr("r","6");
							$("#urb-tooltip1 .urb-tooltip-city").text(cityName);
							$("#urb-tooltip1 .urb-tooltip-number").text("$"+d3.format(",.0f")(parseFloat(currentValue)));
							
                            if (catOverall1){
                            } else if (catSF1){
                            } else if (catMF1) {							
                            } else {							
                            }
    						//Show the tooltip
							if (cityName!=="DISABLE, STATE"){ //COULD ADD WASHINGTON, DC TO ENABLE
								$("#urb-tooltip1").removeClass("hidden");
							}							
                        },mouseleave:function(){
    						//Hide the tooltip
							d3.select(this).transition().duration(100).style("stroke-width","1").attr("r","4");
							$("#urb-tooltip1").addClass("hidden");
                        }
                    }); 
                });
                var lateral1 = $("#urb-container1").width();
				d3.select("#urb-dmv-graphic1")
					.selectAll("circle")
				    .on("mousemove", function () {
						if (lateral1-d3.event.pageX<lateral1/4) {
        					return tooltipArea1
            					.style("top", (d3.event.pageY + 20) + "px")
            					.style("left", (d3.event.pageX - 150) + "px");
						} else if (lateral1-d3.event.pageX<lateral1/1.33333) {
        					return tooltipArea1
								.style("top", (d3.event.pageY + 24) + "px")
            					.style("left", (d3.event.pageX -75) + "px");
						} else {
        					return tooltipArea1
								.style("top", (d3.event.pageY + 20) + "px")
            					.style("left", (d3.event.pageX) + "px");
						}
    				});
            };
		};
/***************************** END DMV GRAPHIC 1 *****************************/

/***************************** BEGIN CHICAGO GRAPHIC 3 *****************************/
function dmvGraphic3() {    
	// Loading data
	var tooltipArea3 = d3.select("#urb-tooltip3");
	var catOverall3=true;
	var catSF3=false;
	var catMF3=false;
	var catSmallBiz3=false;
	var catNonRes3=false;
	var catMission3=false;
	var catFederal3=false;


	// Set the dimensions and margins of the graph
	var w3 = 600;
	var h3 = 400;
	var xPadding3 = 0;
	var yPadding3 = 20;         

	var margin3 = {top: 10, right: 0, bottom: 30, left: 10},
		width3 = w3 - margin3.left - margin3.right,
		height3 = h3 - margin3.top - margin3.bottom;


	// Create SVG element
	var svg3 = d3.select("#urb-graphic-container3")
		.append("svg")
		.attr("id","urb-dmv-graphic3")
		//  .attr("width", width1 + margin1.left + margin1.right)
		//  .attr("height", height1 + margin1.top + margin1.bottom)
		.attr("viewBox",(xPadding3)+" "+(-yPadding3)+" "+w3+" "+h3)
		.attr("preserveAspectRatio","xMinYMin meet")
		.append("g");
		//  .attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");

	var g3 = svg3.append("g");

	var parseTime3 = d3.timeParse("%d-%b-%y");
	var formatYear3 = d3.timeFormat("%Y");
		
	// Add X axis --> it is a date format   
	var x3 = d3.scaleTime()
		.rangeRound([0, width3]);

	// Add Y axis
	var y3 = d3.scaleLinear()
		.rangeRound([height3, 0]);

	var area = d3.area()
		.x(function(d) { return x3(d.date); })
		.y1(function(d) { return y3(d.valueOverall3); })
		.y0(y3(0));     

		

		
	//Read the data
	d3.csv("data/dmv-graphic3-data.csv", function(d) {
		d.date = parseTime3(d.date);
		//  d.line = +d.line;
		d.valueOverall3 = +d.valueOverall3;
		d.valueSF3 = +d.valueSF3;
		d.valueMF3 = +d.valueMF3;
		d.valueSmallBiz3 = +d.valueSmallBiz3;
		d.valueNonRes3 = +d.valueNonRes3;
		d.valueMission3 = +d.valueMission3;
		d.valueFederal3 = +d.valueFederal3;
		return d;
	}, function(error, data) {
		if (error) throw error;

		x3.domain(d3.extent(data, function(d) { return d.date; })).range([ 65, width3-6 ]);
		//  y3.domain([0, d3.max(data, function(d) { return d.valueOverall3; })]);
		y3.domain( [0,35000]);


		g3.append("path")
			.datum(data)
			.attr("fill", "#DAEEF8")
			.attr("d", area);

		svg3.append("g")
			.attr("class", "x3 axis3")
			.attr("transform", "translate(0," + height3 + ")")
			.call(d3.axisBottom(x3));


		svg3.append("g")
			.attr("class", "y3 axis3")
			.call(d3.axisLeft(y3).tickSize(-width3+6).ticks(5).tickFormat(d => "$" + d3.format(",.0f")(parseFloat(d))));
			//   .call(d3.axisLeft(y3).tickSize(-width3+6).tickValues(y3.ticks(5).concat(y3.domain())).tickFormat(d => "$" + d3.format(",.0f")(parseFloat(d))));

		// Initialize line with group a
		var line3 = svg3
			.append('g')
			.append("path")
			.datum(data)
			.attr("d", d3.line()
			.x(function(d) { return x3(+d.date) })
			.y(function(d) { return y3(+d.valueOverall3) })
			)
			.attr("stroke", "#1695D1")
			.classed("urb-line3",true)
			.style("stroke-width", 5)
			.style("fill", "none");

		// Initialize dots with group a
		var dot3 = svg3
			.selectAll('circle')
			.data(data)
			.enter()
			.append('circle')
			.attr("cx", function(d) { return x3(+d.date); })
			.attr("cy", function(d) { return y3(+d.valueOverall3); })
			.attr("data-value", function(d) { return d.valueOverall3; })
			.attr("data-year", function(d) { return formatYear3(d.date); })
			.attr("r",function(d) {
				if(formatYear3(d.date)=="2010"||formatYear3(d.date)=="2020"){
					return 7;
				}else{
					return 5;
				}
			})
			.style("stroke-width", "2px")
			.style("stroke", "#1695d1")
			.style("fill", "#FCBE11");
			

		// Add text for first and last
		var dot3first1 = svg3
			.append("g")
			.classed("urb-label-first1",true);

		var dot3first2 = svg3
			.append("g")
			.classed("urb-label-first2",true);

		dot3first1
			.selectAll("text")
			.data(data)
			.enter()
			.append("text")
			.text(function(d) {
				if(formatYear3(d.date)=="2010"||formatYear3(d.date)=="2020"){
					return formatYear3(d.date);
				}
			})
			.attr("text-anchor", function(d) {
				if(formatYear3(d.date)=="2010"){
					return "start";
				} else {
					return "end";
				}
			})
			.attr("fill","#000000")
			.attr("x", function(d) {
				if(formatYear3(d.date)=="2010"){
					return x3(+d.date)+5;
				}else{
					return x3(+d.date)-5;
				}
			})
			.attr("y", function(d) {
				if(formatYear3(d.date)=="2010"){
					return y3(+d.valueOverall3)-32;
				}else{
					return y3(+d.valueOverall3)+30;
				}
			}); 

		dot3first2
			.selectAll("text")
			.data(data)
			.enter()
			.append("text")
			.text(function(d) {
				if(formatYear3(d.date)=="2010"||formatYear3(d.date)=="2020"){
					return "$"+d3.format(",.0f")(parseFloat(d.valueOverall3));
				}
			})
			.attr("text-anchor", function(d) {
				if(formatYear3(d.date)=="2010"){
					return "start";
				} else {
					return "end";
				}
			})
			.attr("fill","#12719e")
			.attr("x", function(d) {
				if(formatYear3(d.date)=="2010"){
					return x3(+d.date)+5;
				}else{
					return x3(+d.date)-5;
				}
			})
			.attr("y", function(d) {
				if(formatYear3(d.date)=="2010"){
					return y3(+d.valueOverall3)-14;
				}else{
					return y3(+d.valueOverall3)+48;
				}
			});     


		//add hover listeners
		hoverCircle3();

		// A function that update the chart, called on category click
		function updateGraphic3(selectedGroup) {        
			// Create new data with the selection?
			var dataFilter = data.map(function(d){
				return {date: d.date, value:d[selectedGroup]} 
			});

			//reset the xaxis from federal
			//x3.domain(d3.extent(data, function(d) { return d.date; })).range([ 65, width3-6 ]);

			//  y3.domain( [0,d3.max(data, d => d[selectedGroup] )]);
			if (selectedGroup=="valueSF3"){
				y3.domain( [0,35000]);
			}else if (selectedGroup=="valueMF3"){
				y3.domain( [0,10000]);
			}else if (selectedGroup=="valueSmallBiz3"){
				y3.domain( [0,7000]);
			}else if (selectedGroup=="valueNonRes3"){
				y3.domain( [0,9000]);
			}else if (selectedGroup=="valueMission3"){
				y3.domain( [0,400]);
			}else if (selectedGroup=="valueFederal3"){
				y3.domain( [0,200]);
				//this changes how much grid is visible for the chart to occupy
				/*x3.domain(d3.extent(data, function(d) { 
					if (formatYear3(d.date)!="2020" ) 
						return d.date;
				})).range([ 65, width3-6 ]);*/
			}else{
				y3.domain( [0,35000]);
			}


			var areaNew = d3.area() //puts last point on secnd to last location, ie 2020 point goes on top of 2019 point, so no area between
				.x(function(d) { return formatYear3(d.date)=="2020"&&catFederal3 ? x3(dataFilter[dataFilter.length-2].date) : x3(d.date); })
				.y1(function(d) { return formatYear3(d.date)=="2020"&&catFederal3 ? y3(dataFilter[dataFilter.length-2].value) : y3(d.value); })
				.y0(y3(0));     


			// Give these new data to update area, line and dots        

			g3.selectAll("path")
				.datum(dataFilter)
				.transition()
				.duration(1000)
				.attr("d", areaNew);
			
			line3
				.datum(dataFilter)
				.transition()
				.duration(1000)
				.attr("d", d3.line() //puts last point on secnd to last location, ie 2020 point goes on top of 2019 point, so no line between
					.x(function(d) { return formatYear3(d.date)=="2020"&&catFederal3 ? x3(dataFilter[dataFilter.length-2].date) : x3(+d.date) })
					.y(function(d) { return formatYear3(d.date)=="2020"&&catFederal3 ? y3(dataFilter[dataFilter.length-2].value) : y3(+d.value) })
				);

			dot3 //this uses all data so it can shut down the 2020 dot in federal
				.data(dataFilter)
				.transition()
				.duration(1000)
				.attr("cx", function(d) { return x3(+d.date) })
				.attr("cy", function(d) { return y3(+d.value) })
				.attr("r", function(d) {
					if (catFederal3){
						if (formatYear3(d.date)=="2020"){ //changes size of circles at ends, based on what the end is
							return 0;
						} 
						else if (formatYear3(d.date)=="2019" || formatYear3(d.date)=="2010") return 7;
						else return 5;
					} else {
						if (formatYear3(d.date)=="2020" || formatYear3(d.date)=="2010") return 7;
						else return 5;
					}
				})
				.attr("data-value", function(d) { return d.value; })
				.attr("data-year", function(d) { return formatYear3(d.date)=="2019"&&catFederal3 ? "2020" : formatYear3(d.date); }) //fake the year to get styles

			dot3first1
				.selectAll("text")
				.data(dataFilter)
				.transition()
				.duration(1000)
				.text(function(d) {
					if(formatYear3(d.date)=="2010"||formatYear3(d.date)=="2020"&&!catFederal3||formatYear3(d.date)=="2019"&&catFederal3){
						return formatYear3(d.date);
					}
				})
				.attr("text-anchor", function(d) {
					if(formatYear3(d.date)=="2010"){
						return "start";
					} else {
						return "end";
					}
				})
				.attr("fill","#000000")
				.attr("x", function(d) {
					if(formatYear3(d.date)=="2010"){
						return x3(+d.date)+5;
					}else{
						if (catSF3){
							return x3(+d.date)-14;
						} else if (catSmallBiz3){
							return x3(+d.date)-21;
						} else if (catFederal3){
							return x3(+d.date)-30; // controls horizontal placement of '2020' label 
						} else {
							return x3(+d.date)-5;
						}
					}
				})
				.attr("y", function(d) {
					if(formatYear3(d.date)=="2010"){
						if (catOverall3||catSF3){
							return y3(+d.value)-32;
						} else if (catMission3){ //edit margins
							return y3(+d.value)-28;
						} else {
							return y3(+d.value)+28;
						}
					}else{
						if (catSF3){
							return y3(+d.value)-15;
						} else if (catSmallBiz3){
							return y3(+d.value)+5;
						} else if (catFederal3){
							return y3(+d.value)+5; // controls vertical placement of '2020' label   
						} else {
							return y3(+d.value)+30;
						}
					}
				});         

			dot3first2
				.selectAll("text")
				.data(dataFilter)
				.transition()
				.duration(1000)     
				.text(function(d) {
					if(formatYear3(d.date)=="2010"||formatYear3(d.date)=="2020"&&!catFederal3||formatYear3(d.date)=="2019"&&catFederal3){
						return "$"+d3.format(",.0f")(parseFloat(d.value));
					}
				})
				.attr("text-anchor", function(d) {
					if(formatYear3(d.date)=="2010"){
						return "start";
					} else {
						return "end";
					}
				})
				.attr("fill","#12719e")
				.attr("x", function(d) {
					if(formatYear3(d.date)=="2010"){
						return x3(+d.date)+5;
					}else{
						if (catSF3){
							return x3(+d.date)-14;
						} else if (catSmallBiz3){
							return x3(+d.date)-21;
						} else if (catFederal3){
							return x3(+d.date)-30; // controls horiz placement of value label for "Federal" cat 
						} else {
							return x3(+d.date)-5;
						}
					}
				})
				.attr("y", function(d) {
					if(formatYear3(d.date)=="2010"){
						if (catOverall3||catSF3){
							return y3(+d.value)-14;
						} else if (catMission3){
							return y3(+d.value)-10; //edit margins
						} else {
							return y3(+d.value)+46;
						}
					}else{
						if (catSF3){
							return y3(+d.value)+3;
						} else if (catSmallBiz3){
							return y3(+d.value)+23;
						} else if (catFederal3){
							return y3(+d.value)+24; // controls vertical placement of value label 
						} else {
							return y3(+d.value)+48;
						}
					}
				});         

			// this makes the xaxis dynamic based on previously set domain
			/*svg3.select(".x3.axis3")
				.transition()
				.duration(1000)
				.call(d3.axisBottom(x3));*/


			svg3.select(".y3.axis3")
				.transition()
				.duration(1000)
				.call(d3.axisLeft(y3).tickSize(-width3+6).ticks(6).tickFormat(d => "$" + d3.format(",.0f")(parseFloat(d))));
				//  .call(d3.axisLeft(y3).tickSize(-width3+6).tickValues(y3.ticks(5).concat(y3.domain())).tickFormat(d => "$" + d3.format(",.0f")(parseFloat(d))));

			//attach hover listeners to new objects
			hoverCircle3();
		}; //close updateGraphics3


		d3.selectAll("#urb-container3 .urb-button-01").on("click", function() {         
			catOverall3=true;
			catSF3=false;catMF3=false;catSmallBiz3=false;catNonRes3=false;catMission3=false;catFederal3=false;
			$("#urb-container3 .urb-button").removeClass("urb-active3");
			$(this).addClass("urb-active3");
			$('#urb-container3 .urb-container3-column').removeClass("ub-menu-opened3");
			$("#urb-container3 .urb-button-container p span").text("Overall");
			$("#urb-container3 h2 span.urb-data3-cat").text("Overall");
			$("#urb-container3 h2 span.urb-data3-sentence").text("per Household");
			var selectedOption3 = $(this).attr("data-action");
			var selectedYear3 = $(this).attr("data-year");
			updateGraphic3(selectedOption3);
		});
		d3.selectAll("#urb-container3 .urb-button-02").on("click", function() {
			catSF3=true;
			catOverall3=false;catMF3=false;catSmallBiz3=false;catNonRes3=false;catMission3=false;catFederal3=false;
			$("#urb-container3 .urb-button").removeClass("urb-active3");
			$(this).addClass("urb-active3");
			$('#urb-container3 .urb-container3-column').removeClass("ub-menu-opened3");
			$("#urb-container3 .urb-button-container p span").text("Single-Family");
			$("#urb-container3 h2 span.urb-data3-cat").text("Single-Family");
			$("#urb-container3 h2 span.urb-data3-sentence").text("per Owner-Occupied Household");
			var selectedOption3 = $(this).attr("data-action");
			var selectedYear3 = $(this).attr("data-year");
			updateGraphic3(selectedOption3);
		});
		d3.selectAll("#urb-container3 .urb-button-03").on("click", function() {
			catMF3=true;
			catOverall3=false;catSF3=false;catSmallBiz3=false;catNonRes3=false;catMission3=false;catFederal3=false;
			$("#urb-container3 .urb-button").removeClass("urb-active3");
			$(this).addClass("urb-active3");
			$('#urb-container3 .urb-container3-column').removeClass("ub-menu-opened3");
			$("#urb-container3 .urb-button-container p span").text("Multifamily");
			$("#urb-container3 h2 span.urb-data3-cat").text("Multifamily");
			$("#urb-container3 h2 span.urb-data3-sentence").text("per Renter-Occupied Household");
			var selectedOption3 = $(this).attr("data-action");
			var selectedYear3 = $(this).attr("data-year");
			updateGraphic3(selectedOption3);
		});
		d3.selectAll("#urb-container3 .urb-button-04").on("click", function() {
			catSmallBiz3=true;
			catOverall3=false;catSF3=false;catMF3=false;catNonRes3=false;catMission3=false;catFederal3=false;
			$("#urb-container3 .urb-button").removeClass("urb-active3");
			$(this).addClass("urb-active3");
			$('#urb-container3 .urb-container3-column').removeClass("ub-menu-opened3");
			$("#urb-container3 .urb-button-container p span").text("Small-Business");
			$("#urb-container3 h2 span.urb-data3-cat").text("Small-Business");
			$("#urb-container3 h2 span.urb-data3-sentence").text("per Small-Business Employee");
			var selectedOption3 = $(this).attr("data-action");
			var selectedYear3 = $(this).attr("data-year");
			updateGraphic3(selectedOption3);		
		});
		d3.selectAll("#urb-container3 .urb-button-05").on("click", function() {
			catNonRes3=true;
			catOverall3=false;catSF3=false;catMF3=false;catSmallBiz3=false;catMission3=false;catFederal3=false;					
			$("#urb-container3 .urb-button").removeClass("urb-active3");
			$(this).addClass("urb-active3");
			$('#urb-container3 .urb-container3-column').removeClass("ub-menu-opened3");
			$("#urb-container3 .urb-button-container p span").text("Nonresidential");
			$("#urb-container3 h2 span.urb-data3-cat").text("Nonresidential");
			$("#urb-container3 h2 span.urb-data3-sentence").text("per Employee");
			var selectedOption3 = $(this).attr("data-action");
			var selectedYear3 = $(this).attr("data-year");
			updateGraphic3(selectedOption3);
		});
		d3.selectAll("#urb-container3 .urb-button-06").on("click", function() {
			catMission3=true;
			catOverall3=false;catSF3=false;catMF3=false;catSmallBiz3=false;catNonRes3=false;catFederal3=false;					
			$("#urb-container3 .urb-button").removeClass("urb-active3");
			$(this).addClass("urb-active3");
			$('#urb-container3 .urb-container3-column').removeClass("ub-menu-opened3");
			$("#urb-container3 .urb-button-container p span").text("Mission");
			$("#urb-container3 h2 span.urb-data3-cat").text("Mission");
			$("#urb-container3 h2 span.urb-data3-sentence").text("per Household");
			var selectedOption3 = $(this).attr("data-action");
			var selectedYear3 = $(this).attr("data-year");
			updateGraphic3(selectedOption3);
		});
		d3.selectAll("#urb-container3 .urb-button-07").on("click", function() {
			catFederal3=true;
			catOverall3=false;catSF3=false;catMF3=false;catSmallBiz3=false;catNonRes3=false;catMission3=false;					
			$("#urb-container3 .urb-button").removeClass("urb-active3");
			$(this).addClass("urb-active3");
			$('#urb-container3 .urb-container3-column').removeClass("ub-menu-opened3");
			$("#urb-container3 .urb-button-container p span").text("Federal");
			$("#urb-container3 h2 span.urb-data3-cat").text("Federal");
			$("#urb-container3 h2 span.urb-data3-sentence").text("per Household");
			var selectedOption3 = $(this).attr("data-action");
			var selectedYear3 = $(this).attr("data-year");
			updateGraphic3(selectedOption3);
		});

	}); //close data fx callback
		

		
	function hoverCircle3(){
		$("#urb-dmv-graphic3 circle").each(function() {
			$(this).on({
				mouseenter:function(){
					var currentValue=$(this).attr("data-value");
					var currentYear=$(this).attr("data-year");
					if (currentYear == "2020" && catFederal3) currentYear = "2019" //unhack last point

					d3.select(this).transition().duration(100).style("fill","#FFF");
					$("#urb-tooltip3 .urb-tooltip-year").text(currentYear);
					$("#urb-tooltip3 .urb-tooltip-number").text("$"+d3.format(",.0f")(parseFloat(currentValue)));
					
					if (currentYear!=="2010"&&currentYear!=="2020" && !(currentYear == "2019" && catFederal3)){
						$("#urb-tooltip3").removeClass("hidden");
					}                           
				},mouseleave:function(){
					//Hide the tooltip
					d3.select(this).transition().duration(100).style("fill","#FCBE11");
					$("#urb-tooltip3").addClass("hidden");
				}
			}); 
		});
		var lateral3 = $("#urb-container3").width();
		d3.select("#urb-dmv-graphic3")
			.selectAll("circle")
			.on("mousemove", function () {
				if (lateral3-d3.event.pageX<lateral3/4) {
					return tooltipArea3
						.style("top", (d3.event.pageY + 20) + "px")
						.style("left", (d3.event.pageX - 90) + "px");
				} else if (lateral3-d3.event.pageX<lateral3/1.33333) {
					return tooltipArea3
						.style("top", (d3.event.pageY + 24) + "px")
						.style("left", (d3.event.pageX -45) + "px");
				} else {
					return tooltipArea3
						.style("top", (d3.event.pageY + 20) + "px")
						.style("left", (d3.event.pageX) + "px");
				}
			});
	};  


};
/***************************** END CHICAGO GRAPHIC 3 *****************************/

/***************************** BEGIN CHICAGO GRAPHIC 5 *****************************/
		function dmvGraphic5() {
			var catOverall5=true;
			var catSF5=false;
			var catMF5=false;
			var catSmallBiz5=false;
			var catNonRes5=false;
			var catMission5=false;
			var catFederal5=false;
			
			
			// Set the dimensions and margins of the graph
			var w5 = 600;
			var h5 = 240;
			var xPadding5 = 60;
			var yPadding5 = 5;	


// set the dimensions and margins of the graph
var margin5 = {top: 0, right: 0, bottom: 40, left: 0},
    width5 = w5 - margin5.left - margin5.right,
    height5 = h5 - margin5.top - margin5.bottom;

// append the svg object to the body of the page
	var svg5 = d3.select("#urb-graphic-container5")
		.append("svg")
		.attr("id","urb-dmv-graphic5")
		.attr("viewBox",(-xPadding5)+" "+(-yPadding5)+" "+w5+" "+h5)
		.attr("preserveAspectRatio","xMinYMin meet")
	//	.attr("width", width5 + margin5.left + margin5.right)
	//	.attr("height", height5 + margin5.top + margin5.bottom)
		.append("g");
	//	.attr("transform","translate(" + margin5.left + "," + margin5.top + ")");

// Parse the Data
d3.csv("data/dmv-graphic5-data.csv", function(data) {
	
data.forEach(function(d) {
  d.valueOverall5 = +d.valueOverall5;
  d.valueSF5 = +d.valueSF5;
  d.valueMF5 = +d.valueMF5;
  d.valueSmallBiz5 = +d.valueSmallBiz5;
  d.valueNonRes5 = +d.valueNonRes5;
  d.valueMission5 = +d.valueMission5;
  d.valueFederal5 = +d.valueFederal5;
});

	
	// Add X axis
	var x5 = d3.scaleLinear()
		.domain([0, d3.max(data, d=>d.valueOverall5)])
    	.range([ 0, width5-130]);
	/* Uncomment to visualize x Axis */
	/*
	svg5.append("g")
		.attr("transform", "translate(0," + height5 + ")")
		.attr("class","x5 axis5")
		.call(d3.axisBottom(x5))
		.selectAll("text")
		.attr("transform", "translate(0,0)")
		.style("text-anchor", "middle");
	*/

	// Y axis
  var y5 = d3.scaleBand()
  	.range([ 0, (height5)/1.08 ])
  	.domain(data.map(function(d) { return d.percentile; }))
  	.padding(.12);
	
	svg5.append("g")
		.attr("class","y5 axis5")
		.call(d3.axisLeft(y5).tickFormat(function(d, i){
			if(i==0){
			   return "0–10%";
			}else if(i==1){
			   return "11–20%";
			}else if(i==2){
			   return "21–30%";
			}else{
				return "31+%";
			}
		}));


	// Bars
	// Bars g's
	var bars5 = svg5
		.append("g")
		.classed("urb-bars5",true);	
	
	// Bars
	bars5
		.selectAll("urb-bars5")
		.data(data)
		.enter()
		.append("rect")
		.attr("x", x5(0) )
		.attr("y", function(d) { return y5(d.percentile); })
		.attr("width", function(d) { return x5(d.valueOverall5); })
		.attr("height", y5.bandwidth() )
		.attr("fill", function(d,i){
			if(i==0){
				return "#73b9e2";
			}else if(i==1){
				return "#1695d1";
			}else if(i==2){
				return "#12719e";
			}else {
				return "#0a4c6a";
			}
		});

	// Bars labels
	bars5
		.selectAll("urb-bars5-labels")
		.data(data)
		.enter()
		.append("text")
		.attr("class","urb-bars5-labels")
		.attr("text-anchor","start")
		.attr("x", function(d) { return x5(d.valueOverall5)+5; })
		.attr("y", function(d) { return y5(d.percentile) + (y5.bandwidth()/2) + 5; })
		.text(function(d) {
			return "$"+d3.format(",.0f")(parseFloat(d.valueOverall5));
		})
		.attr("fill", "#000");
	

    // A function that update the chart
    function updateGraphic5(selectedGroup5) {		
		// Create new data with the selection?
		var dataFilter5 = data.map(function(d){return {percentile: d.percentile, value:d[selectedGroup5]} });
		x5.domain([0, d3.max(data, d=>d[selectedGroup5])]);
		var newx5 = d3.scaleLinear()
		.domain([0, d3.max(data, d=>d[selectedGroup5])])
    	.range([ 0, width5-130]);		
		
	//	x5.domain([0, d3.max(dataFilter5, d=>d[selectedGroup5])])
		
	// Give these new data to update bars
	bars5
	  	.selectAll("rect")
        .data(dataFilter5)
        .transition()
        .duration(750)
		.attr("width", function(d) { return x5(d.value); });
		
	// Give these new data to update labels
	bars5
		.selectAll("text")
		.data(dataFilter5)
        .transition()
        .duration(750)
		.attr("x", function(d) { return x5(d.value)+5; })
		.text(function(d) {
			return "$"+d3.format(",.0f")(parseFloat(d.value));
		});
	
	/* Uncomment to visualize x Axis */
	/*
	svg5.select(".x5.axis5")
		.transition()
  		.duration(1000)
		.call(d3.axisBottom(x5));
	*/
    };	
	
	
		d3.select("#urb-container5 .urb-button-01").on("click", function() {
			catOverall5=true;
			catSF5=false;catMF5=false;catSmallBiz5=false;catNonRes5=false;catMission5=false;catFederal5=false;
			$("#urb-container5 .urb-button").removeClass("urb-active5");
			$(this).addClass("urb-active5");
			$('#urb-container5 .urb-container5-column').removeClass("ub-menu-opened5");
			$("#urb-container5 .urb-button-container p span").text("Overall");
			$("#urb-container5 h2 span").text("Overall");
			$("#urb-container5 h3 span").text("per household");
			var selectedOption5 = $(this).attr("data-action");
			updateGraphic5(selectedOption5);
		});
		d3.select("#urb-container5 .urb-button-02").on("click", function() {
			catSF5=true;
			catOverall5=false;catMF5=false;catSmallBiz5=false;catNonRes5=false;catMission5=false;catFederal5=false;
			$("#urb-container5 .urb-button").removeClass("urb-active5");
			$(this).addClass("urb-active5");
			$('#urb-container5 .urb-container5-column').removeClass("ub-menu-opened5");
			$("#urb-container5 .urb-button-container p span").text("Single-Family");
			$("#urb-container5 h2 span").text("Single-Family");
			$("#urb-container5 h3 span").text("per owner-occupied household");
			var selectedOption5 = $(this).attr("data-action");
			updateGraphic5(selectedOption5);
		});
		d3.select("#urb-container5 .urb-button-03").on("click", function() {
			catMF5=true;
			catOverall5=false;catSF5=false;catSmallBiz5=false;catNonRes5=false;catMission5=false;catFederal5=false;
			$("#urb-container5 .urb-button").removeClass("urb-active5");
			$(this).addClass("urb-active5");
			$('#urb-container5 .urb-container5-column').removeClass("ub-menu-opened5");
			$("#urb-container5 .urb-button-container p span").text("Multifamily");
			$("#urb-container5 h2 span").text("Multifamily");
			$("#urb-container5 h3 span").text("per renter-occupied household");
			var selectedOption5 = $(this).attr("data-action");
			updateGraphic5(selectedOption5);
		});
		d3.select("#urb-container5 .urb-button-04").on("click", function() {
			catSmallBiz5=true;
			catOverall5=false;catSF5=false;catMF5=false;catNonRes5=false;catMission5=false;catFederal5=false;
			$("#urb-container5 .urb-button").removeClass("urb-active5");
			$(this).addClass("urb-active5");
			$('#urb-container5 .urb-container5-column').removeClass("ub-menu-opened5");
			$("#urb-container5 .urb-button-container p span").text("Small-Business");
			$("#urb-container5 h2 span").text("Small-Business");
			$("#urb-container5 h3 span").text("per small-business employee");
			var selectedOption5 = $(this).attr("data-action");
			updateGraphic5(selectedOption5);	
		});
		d3.select("#urb-container5 .urb-button-05").on("click", function() {
			catNonRes5=true;
			catOverall5=false;catSF5=false;catMF5=false;catSmallBiz5=false;catMission5=false;catFederal5=false;					
			$("#urb-container5 .urb-button").removeClass("urb-active5");
			$(this).addClass("urb-active5");
			$('#urb-container5 .urb-container5-column').removeClass("ub-menu-opened5");
			$("#urb-container5 .urb-button-container p span").text("Nonresidential");
			$("#urb-container5 h2 span").text("Nonresidential");
			$("#urb-container5 h3 span").text("per employee");
			var selectedOption5 = $(this).attr("data-action");
			updateGraphic5(selectedOption5);
		});
		d3.select("#urb-container5 .urb-button-06").on("click", function() {
			catMission5=true;
			catOverall5=false;catSF5=false;catMF5=false;catSmallBiz5=false;catNonRes5=false;catFederal5=false;					
			$("#urb-container5 .urb-button").removeClass("urb-active5");
			$(this).addClass("urb-active5");
			$('#urb-container5 .urb-container5-column').removeClass("ub-menu-opened5");
			$("#urb-container5 .urb-button-container p span").text("Mission");
			$("#urb-container5 h2 span").text("Mission");
			$("#urb-container5 h3 span").text("per household");
			var selectedOption5 = $(this).attr("data-action");
			updateGraphic5(selectedOption5);
		});
		d3.select("#urb-container5 .urb-button-07").on("click", function() {
			catFederal5=true;
			catOverall5=false;catSF5=false;catMF5=false;catSmallBiz5=false;catNonRes5=false;catMission5=false;					
			$("#urb-container5 .urb-button").removeClass("urb-active5");
			$(this).addClass("urb-active5");
			$('#urb-container5 .urb-container5-column').removeClass("ub-menu-opened5");
			$("#urb-container5 .urb-button-container p span").text("Federal");
			$("#urb-container5 h2 span").text("Federal");
			$("#urb-container5 h3 span").text("per household");
			var selectedOption5 = $(this).attr("data-action");
			updateGraphic5(selectedOption5);
		});

});
			
		};
/***************************** END CHICAGO GRAPHIC 5 *****************************/

/***************************** BEGIN CHICAGO GRAPHIC 4 *****************************/
		function dmvGraphic4() {
			var catOverall4=true;
			var catSF4=false;
			var catMF4=false;
			var catSmallBiz4=false;
			var catNonRes4=false;
			var catMission4=false;
			var catFederal4=false;
			
			
			// Set the dimensions and margins of the graph
			var w4 = 600;
			var h4 = 550;
			var xPadding4 = 60;
			var yPadding4 = 20;	


// set the dimensions and margins of the graph
var margin4 = {top: 0, right: 0, bottom: 40, left: 0},
    width4 = w4 - margin4.left - margin4.right,
    height4 = h4 - margin4.top - margin4.bottom;

// append the svg object to the body of the page
	var svg4 = d3.select("#urb-graphic-container4")
		.append("svg")
		.attr("id","urb-dmv-graphic4")
		.attr("viewBox",(-xPadding4)+" "+(-yPadding4)+" "+w4+" "+h4)
		.attr("preserveAspectRatio","xMinYMin meet")
	//	.attr("width", width4 + margin4.left + margin4.right)
	//	.attr("height", height4 + margin4.top + margin4.bottom)
		.append("g");
	//	.attr("transform","translate(" + margin4.left + "," + margin4.top + ")");

// Parse the Data
d3.csv("data/dmv-graphic4-data.csv", function(data) {
	
data.forEach(function(d) {
  d.valueOverall4 = +d.valueOverall4;
  d.valueSF4 = +d.valueSF4;
  d.valueMF4 = +d.valueMF4;
  d.valueSmallBiz4 = +d.valueSmallBiz4;
  d.valueNonRes4 = +d.valueNonRes4;
  d.valueMission4 = +d.valueMission4;
  d.valueFederal4 = +d.valueFederal4;
});
	
	// Divide CSV in chukns of 5 rows
	var dataDivide = [], i, chunk = 5; 
    for (i=0; i<data.length; i+=chunk) {
         dataDivide.push(data.slice(i, i+chunk));
    }
	
	// Add X axis
	var x4 = d3.scaleLinear()
		.domain([0, d3.max(data, d=>d.valueOverall4)])
    	.range([ 0, width4-130]);
	/* Uncomment to visualize x Axis */
	/*
	svg4.append("g")
		.attr("transform", "translate(0," + height4 + ")")
		.attr("class","x4 axis4")
		.call(d3.axisBottom(x4))
		.selectAll("text")
		.attr("transform", "translate(0,0)")
		.style("text-anchor", "middle");
	*/

	// Y axis
  var y4asian = d3.scaleBand()
  	.range([ 0, (height4/5) ])
  	.domain(dataDivide[0].map(function(d) { return d.percentile; }))
  	.padding(.12);
	
	svg4.append("g")
		.attr("class","y4 axis4 axis4asian")
		.call(d3.axisLeft(y4asian).tickFormat(function(d, i){
			if(i==0){
			   return "0–5%";
			}else if(i==1){
			   return "6–10%";
			}else if(i==2){
			   return "11–20%";
			}else if(i==3){
			   return "21+%";
			}else{
				return "";
			}
		}));
	
  var y4black = d3.scaleBand()
  	.range([ 0, (height4/5) ])
  	.domain(dataDivide[1].map(function(d) { return d.percentile; }))
  	.padding(.12);
	
	svg4.append("g")
		.attr("class","y4 axis4 axis4black")
		.attr("transform", "translate(0,118)")
		.call(d3.axisLeft(y4black).tickFormat(function(d, i){
			if(i==0){
			   return "0–20%";
			}else if(i==1){
			   return "21–40%";
			}else if(i==2){
			   return "41–60%";
			}else if(i==3){
			   return "61–80%";
			}else{
				return "81+%";
			}
		}));
	
  var y4latine = d3.scaleBand()
  	.range([ 0, (height4/5) ])
  	.domain(dataDivide[2].map(function(d) { return d.percentile; }))
  	.padding(.12);
	
	svg4.append("g")
		.attr("class","y4 axis4 axis4latine")
		.attr("transform", "translate(0,258)")
		.call(d3.axisLeft(y4latine).tickFormat(function(d, i){
			if(i==0){
			   return "0–10%";
			}else if(i==1){
			   return "11–20%";
			}else if(i==2){
			   return "21–30%";
			}else if(i==3){
			   return "31+%";
			}else{
				return "";
			}
		}));

  var y4white = d3.scaleBand()
  	.range([ 0, (height4/5) ])
  	.domain(dataDivide[3].map(function(d) { return d.percentile; }))
  	.padding(.12);
	
	svg4.append("g")
		.attr("class","y4 axis4 axis4white")
		.attr("transform", "translate(0,376)")
		.call(d3.axisLeft(y4white).tickFormat(function(d, i){
			if(i==0){
			   return "0–20%";
			}else if(i==1){
			   return "21–40%";
			}else if(i==2){
			   return "41–60%";
			}else if(i==3){
			   return "61–80%";
			}else{
				return "81+%";
			}
		}));

	
	// Bars
	// Bars g's
	var bars4asianTitle = svg4
		.append("g")
		.classed("urb-bars4-asian-title",true);	
	var bars4blackTitle = svg4
		.append("g")
		.classed("urb-bars4-black-title",true)
		.attr("transform", "translate(0,118)");
	var bars4latineTitle = svg4
		.append("g")
		.classed("urb-bars4-latine-title",true)
		.attr("transform", "translate(0,258)");
	var bars4whiteTitle = svg4
		.append("g")
		.classed("urb-bars4-white-title",true)
		.attr("transform", "translate(0,376)");
	var bars4asian = svg4
		.append("g")
		.classed("urb-bars4-asian",true);	
	var bars4black = svg4
		.append("g")
		.classed("urb-bars4-black",true)
		.attr("transform", "translate(0,118)");
	var bars4latine = svg4
		.append("g")
		.classed("urb-bars4-latine",true)
		.attr("transform", "translate(0,258)");
	var bars4white = svg4
		.append("g")
		.classed("urb-bars4-white",true)
		.attr("transform", "translate(0,376)");

	// Bar titles
	bars4asianTitle
		.append("text")
		.classed("urb-bars4-asian-title-blue",true)
		.text(function(d) {
			return "Asian";
		})
		.attr("x", 0)
		.attr("y", -6);
	bars4asianTitle
		.append("text")
		.text(function(d) {
			return " population share of neighborhood";
		})
		.attr("x", 42)
		.attr("y", -6);
	bars4blackTitle
		.append("text")
		.classed("urb-bars4-black-title-blue",true)
		.text(function(d) {
			return "Black";
		})
		.attr("x", 0)
		.attr("y", -6);
	bars4blackTitle
		.append("text")
		.text(function(d) {
			return " population share of neighborhood";
		})
		.attr("x", 42)
		.attr("y", -6);
	bars4latineTitle
		.append("text")
		.classed("urb-bars4-latine-title-blue",true)
		.text(function(d) {
			return "Latine";
		})
		.attr("x", 0)
		.attr("y", -6);
	bars4latineTitle
		.append("text")
		.text(function(d) {
			return " population share of neighborhood";
		})
		.attr("x", 47)
		.attr("y", -6);
	bars4whiteTitle
		.append("text")
		.classed("urb-bars4-white-title-blue",true)
		.text(function(d) {
			return "White";
		})
		.attr("x", 0)
		.attr("y", -6);
	bars4whiteTitle
		.append("text")
		.text(function(d) {
			return " population share of neighborhood";
		})
		.attr("x", 47)
		.attr("y", -6);
	
	// Bars
	bars4asian
		.selectAll("urb-bars4")
		.data(dataDivide[0])
		.enter()
		.append("rect")
		.attr("x", x4(0) )
		.attr("y", function(d) { return y4asian(d.percentile); })
		.attr("width", function(d) { return x4(d.valueOverall4); })
		.attr("height", y4asian.bandwidth() )
		.attr("fill", "#73b9e2");
	
	bars4black
		.selectAll("urb-bars4")
		.data(dataDivide[1])
		.enter()
		.append("rect")
		.attr("x", x4(0) )
		.attr("y", function(d) { return y4black(d.percentile); })
		.attr("width", function(d) { return x4(d.valueOverall4); })
		.attr("height", y4black.bandwidth() )
		.attr("fill", "#1695d1");

	bars4latine
		.selectAll("urb-bars4")
		.data(dataDivide[2])
		.enter()
		.append("rect")
		.attr("x", x4(0) )
		.attr("y", function(d) { return y4latine(d.percentile); })
		.attr("width", function(d) { return x4(d.valueOverall4); })
		.attr("height", y4latine.bandwidth() )
		.attr("fill", "#12719e");
	
	bars4white
		.selectAll("urb-bars4")
		.data(dataDivide[3])
		.enter()
		.append("rect")
		.attr("x", x4(0) )
		.attr("y", function(d) { return y4white(d.percentile); })
		.attr("width", function(d) { return x4(d.valueOverall4); })
		.attr("height", y4white.bandwidth() )
		.attr("fill", "#0a4c6a");

	// Bars labels
	bars4asian
		.selectAll("urb-bars4-labels")
		.data(dataDivide[0])
		.enter()
		.append("text")
		.attr("class","urb-bars4-labels")
		.attr("text-anchor","start")
		.attr("x", function(d) { return x4(d.valueOverall4)+5; })
		.attr("y", function(d) { return y4asian(d.percentile) + (y4asian.bandwidth()/2) + 5; })
		.text(function(d) {
			return "$"+d3.format(",.0f")(parseFloat(d.valueOverall4));
		})
		.attr("fill", "#000");
	bars4black
		.selectAll("urb-bars4-labels")
		.data(dataDivide[1])
		.enter()
		.append("text")
		.attr("class","urb-bars4-labels")
		.attr("text-anchor","start")
		.attr("x", function(d) { return x4(d.valueOverall4)+5; })
		.attr("y", function(d) { return y4black(d.percentile) + (y4black.bandwidth()/2) + 5; })
		.text(function(d) {
			return "$"+d3.format(",.0f")(parseFloat(d.valueOverall4));
		})
		.attr("fill", "#000");
	bars4latine
		.selectAll("urb-bars4-labels")
		.data(dataDivide[2])
		.enter()
		.append("text")
		.attr("class","urb-bars4-labels")
		.attr("text-anchor","start")
		.attr("x", function(d) { return x4(d.valueOverall4)+5; })
		.attr("y", function(d) { return y4latine(d.percentile) + (y4latine.bandwidth()/2) + 5; })
		.text(function(d) {
			return "$"+d3.format(",.0f")(parseFloat(d.valueOverall4));
		})
		.attr("fill", "#000");
	bars4white
		.selectAll("urb-bars4-labels")
		.data(dataDivide[3])
		.enter()
		.append("text")
		.attr("class","urb-bars4-labels")
		.attr("text-anchor","start")
		.attr("x", function(d) { return x4(d.valueOverall4)+5; })
		.attr("y", function(d) { return y4white(d.percentile) + (y4white.bandwidth()/2) + 5; })
		.text(function(d) {
			return "$"+d3.format(",.0f")(parseFloat(d.valueOverall4));
		})
		.attr("fill", "#000");
	

	
    // A function that update the chart
    function updateGraphic4(selectedGroup4) {		
		// Create new data with the selection?
		var dataFilter4 = data.map(function(d){return {percentile: d.percentile, value:d[selectedGroup4]} });
		x4.domain([0, d3.max(data, d=>d[selectedGroup4])]);
		var newx4 = d3.scaleLinear()
		.domain([0, d3.max(data, d=>d[selectedGroup4])])
    	.range([ 0, width4-130]);
		
		// Divide CSV in chunks of 5 rows
		var dataFilter4Divide = [], i, chunk = 5; 
    	for (i=0; i<dataFilter4.length; i+=chunk) {
			dataFilter4Divide.push(dataFilter4.slice(i, i+chunk));
    	}		
		
	//	x4.domain([0, d3.max(dataFilter4, d=>d[selectedGroup4])])
		
	// Give these new data to update bars
	bars4asian
	  	.selectAll("rect")
        .data(dataFilter4Divide[0])
        .transition()
        .duration(750)
		.attr("width", function(d) { return x4(d.value); });
	bars4black
	  	.selectAll("rect")
        .data(dataFilter4Divide[1])
        .transition()
        .duration(750)
		.attr("width", function(d) { return x4(d.value); });
	bars4latine
	  	.selectAll("rect")
        .data(dataFilter4Divide[2])
        .transition()
        .duration(750)
		.attr("width", function(d) { return x4(d.value); });
	bars4white
	  	.selectAll("rect")
        .data(dataFilter4Divide[3])
        .transition()
        .duration(750)
		.attr("width", function(d) { return x4(d.value); });
		
	// Give these new data to update labels
	bars4asian
		.selectAll("text")
		.data(dataFilter4Divide[0])
        .transition()
        .duration(750)
		.attr("x", function(d) { return x4(d.value)+5; })
		.text(function(d) {
			return "$"+d3.format(",.0f")(parseFloat(d.value));
		});
	bars4black
		.selectAll("text")
		.data(dataFilter4Divide[1])
        .transition()
        .duration(750)
		.attr("x", function(d) { return x4(d.value)+5; })
		.text(function(d) {
			return "$"+d3.format(",.0f")(parseFloat(d.value));
		});
	bars4latine
		.selectAll("text")
		.data(dataFilter4Divide[2])
        .transition()
        .duration(750)
		.attr("x", function(d) { return x4(d.value)+5; })
		.text(function(d) {
			return "$"+d3.format(",.0f")(parseFloat(d.value));
		});
	bars4white
		.selectAll("text")
		.data(dataFilter4Divide[3])
        .transition()
        .duration(750)
		.attr("x", function(d) { return x4(d.value)+5; })
		.text(function(d) {
			return "$"+d3.format(",.0f")(parseFloat(d.value));
		});
	
	/* Uncomment to visualize x Axis */
	/*
	svg4.select(".x4.axis4")
		.transition()
  		.duration(1000)
		.call(d3.axisBottom(x4));
	*/	
    };	
	
	
		d3.select("#urb-container4 .urb-button-01").on("click", function() {
			catOverall4=true;
			catSF4=false;catMF4=false;catSmallBiz4=false;catNonRes4=false;catMission4=false;catFederal4=false;
			$("#urb-container4 .urb-button").removeClass("urb-active4");
			$(this).addClass("urb-active4");			
			$('#urb-container4 .urb-container4-column').removeClass("ub-menu-opened4");
			$("#urb-container4 .urb-button-container p span").text("Overall");			
			$("#urb-container4 h2 span").text("Overall");
			$("#urb-container4 h3 span").text("per household");
			var selectedOption4 = $(this).attr("data-action");
			updateGraphic4(selectedOption4);
		});
		d3.select("#urb-container4 .urb-button-02").on("click", function() {
			catSF4=true;
			catOverall4=false;catMF4=false;catSmallBiz4=false;catNonRes4=false;catMission4=false;catFederal4=false;
			$("#urb-container4 .urb-button").removeClass("urb-active4");
			$(this).addClass("urb-active4");
			$('#urb-container4 .urb-container4-column').removeClass("ub-menu-opened4");
			$("#urb-container4 .urb-button-container p span").text("Single-Family");	
			$("#urb-container4 h2 span").text("Single-Family");
			$("#urb-container4 h3 span").text("per owner-occupied household");
			var selectedOption4 = $(this).attr("data-action");
			updateGraphic4(selectedOption4);
		});
		d3.select("#urb-container4 .urb-button-03").on("click", function() {
			catMF4=true;
			catOverall4=false;catSF4=false;catSmallBiz4=false;catNonRes4=false;catMission4=false;catFederal4=false;
			$("#urb-container4 .urb-button").removeClass("urb-active4");
			$(this).addClass("urb-active4");
			$('#urb-container4 .urb-container4-column').removeClass("ub-menu-opened4");
			$("#urb-container4 .urb-button-container p span").text("Multifamily");	
			$("#urb-container4 h2 span").text("Multifamily");
			$("#urb-container4 h3 span").text("per renter-occupied household");
			var selectedOption4 = $(this).attr("data-action");
			updateGraphic4(selectedOption4);
		});
		d3.select("#urb-container4 .urb-button-04").on("click", function() {
			catSmallBiz4=true;
			catOverall4=false;catSF4=false;catMF4=false;catNonRes4=false;catMission4=false;catFederal4=false;
			$("#urb-container4 .urb-button").removeClass("urb-active4");
			$(this).addClass("urb-active4");
			$('#urb-container4 .urb-container4-column').removeClass("ub-menu-opened4");
			$("#urb-container4 .urb-button-container p span").text("Small-Business");
			$("#urb-container4 h2 span").text("Small-Business");
			$("#urb-container4 h3 span").text("per small-business employee");
			var selectedOption4 = $(this).attr("data-action");
			updateGraphic4(selectedOption4);		
		});
		d3.select("#urb-container4 .urb-button-05").on("click", function() {
			catNonRes4=true;
			catOverall4=false;catSF4=false;catMF4=false;catSmallBiz4=false;catMission4=false;catFederal4=false;					
			$("#urb-container4 .urb-button").removeClass("urb-active4");
			$(this).addClass("urb-active4");
			$('#urb-container4 .urb-container4-column').removeClass("ub-menu-opened4");
			$("#urb-container4 .urb-button-container p span").text("Nonresidential");
			$("#urb-container4 h2 span").text("Nonresidential");
			$("#urb-container4 h3 span").text("per employee");
			var selectedOption4 = $(this).attr("data-action");
			updateGraphic4(selectedOption4);
		});
		d3.select("#urb-container4 .urb-button-06").on("click", function() {
			catMission4=true;
			catOverall4=false;catSF4=false;catMF4=false;catSmallBiz4=false;catNonRes4=false;catFederal4=false;					
			$("#urb-container4 .urb-button").removeClass("urb-active4");
			$(this).addClass("urb-active4");
			$('#urb-container4 .urb-container4-column').removeClass("ub-menu-opened4");
			$("#urb-container4 .urb-button-container p span").text("Mission");
			$("#urb-container4 h2 span").text("Mission");
			$("#urb-container4 h3 span").text("per household");
			var selectedOption4 = $(this).attr("data-action");
			updateGraphic4(selectedOption4);
		});
		d3.select("#urb-container4 .urb-button-07").on("click", function() {
			catFederal4=true;
			catOverall4=false;catSF4=false;catMF4=false;catSmallBiz4=false;catNonRes4=false;catMission4=false;					
			$("#urb-container4 .urb-button").removeClass("urb-active4");
			$(this).addClass("urb-active4");
			$('#urb-container4 .urb-container4-column').removeClass("ub-menu-opened4");
			$("#urb-container4 .urb-button-container p span").text("Federal");
			$("#urb-container4 h2 span").text("Federal");
			$("#urb-container4 h3 span").text("per household");
			var selectedOption4 = $(this).attr("data-action");
			updateGraphic4(selectedOption4);
		});

});
			
		};
/***************************** END CHICAGO GRAPHIC 4 *****************************/


