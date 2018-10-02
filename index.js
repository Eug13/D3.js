// D3 basic cocepts

// d3.select('h1').style('color' ,'red')
// .attr('class','head')
// .text('Hello world D3 js!')

// d3.select('body')
// .append('p').text('Lorem ipsum dolor sit amet!')
// .append('p').text('Lorem ipsum dolor sit amet!')
// .append('p').text('Lorem ipsum dolor sit amet!')

// d3.selectAll('p').style('color','blue')



// D3 data loading and binding

// var dataset =[1,2,3,4,5,6,7,8,9];

// d3.select('body')
// .selectAll('p')
// .data(dataset)
// .enter()
// .append('p')
// // .text('D3 is awesome!')
// .text(function(d){ return d });


// D3 Creating a simple bar chart!

// var dataset =[10,20,30,40,50,60,70,80,90,100];
// var dataset =[1,2,3,4,5,6,7,8,9,10];//small dataset

// var svgWidth = 500, svgHeight = 300, barPadding = 10;
// var barWidth = (svgWidth / dataset.length);

// var svg = d3.select('svg')
// .attr('width', svgWidth)
// .attr('height', svgHeight);

// // D3 Scales for small datasets
// var yScale = d3.scaleLinear()
// .domain([0, d3.max(dataset)])
// .range([0, svgHeight]);

// var barChart = svg.selectAll('rect')
// .data(dataset)
// .enter()
// .append('rect')
// .attr('y', function(d){
//     return svgHeight - yScale(d);
// })
// .attr('height', function(d){
//     return yScale(d);
// })
// .attr('width', barWidth - barPadding)
// .attr('transform', function(d, i){
//     var translate = [barWidth*i ,0];
//     return "translate("+ translate +")";
// }).style('fill','red')

// // D3 Creating labels to barChart require top example

// var text = svg.selectAll('text')
// .data(dataset)
// .enter()
// .append('text')
// .text(function(d){
//     return d + '%';
// })
// .attr('y',function(d, i){
//     return svgHeight - d - 4;
// })
// .attr('x',function(d, i){
// return barWidth * i;
// })
// .attr('fill','white')
// .style('font-size','20px');

// D3 Axes


// var dataset =[10,20,30,40,50,60,70,80,90,100];
//  //var dataset =[1,2,3,4,5,6,7,8,9,10];//small dataset

// var svgWidth = 500, svgHeight = 300;

// var svg = d3.select('svg')
// .attr('width', svgWidth)
// .attr('height', svgHeight)
// .attr('class', 'svg-container');

// var xScale = d3.scaleLinear()
// .domain([0, d3.max(dataset)])
// .range([0, svgWidth - 80]);

// var yScale = d3.scaleLinear()
// .domain([0, d3.max(dataset)])
// .range([svgHeight, 0]);

// var x_axis =d3.axisBottom().scale(xScale);
// var y_axis = d3.axisLeft().scale(yScale);

// svg.append('g')
// .attr('transform', 'translate(50, 10)')
// .call(y_axis);

// var xAxisTranslate = svgHeight - 20;

// svg.append('g')
// .attr('transform', 'translate(50, '+ xAxisTranslate +')')
// .call(x_axis);


// D3 Creating svg element


// var svgWidth = 600, svgHeight = 400;

// var svg = d3.select('svg')
// .attr('width', svgWidth)
// .attr('height', svgHeight)
// .attr('class', 'svg-container');

// var line = svg.append('line')
// .attr('x1', 100)
// .attr('x2', 500)
// .attr('y1', 50)
// .attr('y2', 50)
// .attr('stroke', 'red')
// .attr('stroke-width', 4);

// var rect = svg.append('rect')
// .attr('x', 100)
// .attr('y', 100)
// .attr('width', 200)
// .attr('height', 100)
// .attr('fill', '#9b95ff');

// var circle = svg.append('circle')
// .attr('cx', 200)
// .attr('cy', 300)
// .attr('r', 80)
// .attr('fill', '#7ce8d5');

// D3 Creating a pie chart; but not enough example

// var data = [
//     {'platform' : 'Android' ,'percentage' : 40.11},
//     {'platform' : 'Windows' ,'percentage' : 36.69},
//     {'platform' : 'IOS' ,'percentage' : 13.06},
//     {'platform' : 'Mobster' ,'percentage' : 3.01}
// ]

// var svgWidth = 600, svgHeight = 400 , radius = Math.min(svgWidth ,svgHeight)/2;


// var svg = d3.select('svg')
// .attr('width', svgWidth)
// .attr('height', svgHeight);

// //Create  group element to hold pie chart;
// var g = svg.append('g')
// .attr('transform', 'translate('+ radius +','+ radius +')' );

// var color = d3.scaleOrdinal(d3.schemeCategory10);

// var pie = d3.pie().value(function(d){ return d.percentage; });

// var path = d3.arc()
// .outerRadius(radius)
// .innerRadius(0);

// var arc = g.selectAll('arc')
// .data(pie(data))
// .enter()
// .append('g');

// arc.append('path')
// .attr('d', 'path')
// .attr('fill', function(d){ return color(d.data.percentage);});

// var label = d3.arc()
// .outerRadius(radius)
// .innerRadius(0);

// arc.append('text')
// .attr('transform', function(d){
//     return'translate('+ label.centroid(d) +')';
// })
// .attr('text-anchor', 'middle')
// .text(function(d){
//     return d.data.platform + ':' + d.data.percentage + '%';
// });


// D3 Line chart

const api = 'https://api.coindesk.com/v1/bpi/historical/close.json';


document.addEventListener("DOMContentLoaded", function(event){
    fetch(api)
    .then(function(response){ return response.json(); })
    // .then(function(response){ console.log(response)})
    .then(function(data){
         var parsedData = parseData(data);
         drawChart(parsedData);
    })
    .catch(function(err){
        console.log(err);
    })
});

function parseData(data){
    var arr =[];
    for(var i in data.bpi){
        arr.push({
            date:new Date(i),
            value: +data.bpi[i]
        })
    }
    return arr;
}

function drawChart(data){

    var svgWidth = 800, svgHeight = 300;
    var margin = { top:20, right:20, bottom: 30, left:50 };
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    var svg = d3.select('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);

    var g = svg.append('g')
    .attr('transform', 'translate('+ margin.left +','+ margin.top +')' );

    var x = d3.scaleTime()
    .rangeRound([0, width ]);

    var y = d3.scaleLinear()
    .rangeRound([height, 0]);

    var line = d3.line()
    .x(function(d){ return x(d.date) })
    .y(function(d){ return y(d.value) })
    x.domain(d3.extent(data, function(d){ return d.date }));
    y.domain(d3.extent(data, function(d){ return d.value }));

    g.append('g')
    .attr('transform', 'translate(0, '+ height +')')
    .call(d3.axisBottom(x))
    .attr('fill', 'green')
    .append('text')
    .select('.domain')
    .remove();

    g.append('g')
    .call(d3.axisLeft(y))
    .attr('fill', 'orange')
    .append('text')
    .attr('fill', 'red')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '0.71em')
    .attr('text-anchor', 'end')
    .text('Prise ($)');

    g.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-linejoin', 'round' )
    .attr('stroke-linecap', 'round')
    .attr('stroke-width', 1.5)
    .attr('d', line);

}