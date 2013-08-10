"use strict";

var moment = require('../moment.js');
var scoreboard = require('../scoreboard.js');

var days = false;

var vices = {};

window.onload = function(){
	//~ makeCalendar();
}

var streak = angular.module('streak', []);

streak.controller('StreakControl',function($scope){
    
    var goals = localStorage['goals'];
    try{
        goals = JSON.parse(goals);
        
    } catch(e) {
        goals = [
            {
                name : 'Read 15 minutes each day',
                streak : 0,
                class : '',
                lastDate : false
            }
        ];
    }
    
    $scope.goals = goals;
    
    $scope.$watch('goals',function(newValue,oldValue){
        console.log('saving');
        localStorage['goals'] = JSON.stringify(newValue);
    },true);
    
    $scope.calendarclass = '';
    $scope.newclass = '';
    
    $scope.showGoals = function(){
        $scope.calendarclass = 'right';
        $scope.newclass = 'right';
    }
    
    $scope.showNew = function(){
        $scope.newclass = 'current';
        $scope.calendarclass = 'right';
    }
    
    $scope.showCalendar = function(){
        $scope.newclass = 'right';
        $scope.calendarclass = 'current';
    }
    
    $scope.taskSccess = function(){
        this.i.streak++;
        this.i.class = 'row-success';
    };
    $scope.taskFail = function(){
        this.i.streak = 0;
        this.i.class = 'row-failure';
    };
    $scope.createGoal = function(goal){
        goal.streak = 0;
        goal.lastDate = Date.now();
        $scope.goals.push(angular.copy(goal));
        $scope.showGoals();
        goal.name = '';
    };
});



function Day(opts){
	this.calY = opts.calY;
	this.calX = opts.calX;
	this.moment = opts.moment;
	this.color = opts.color;
}

function makeCalendar(){
	d3
		.select('#cal')
		.append('svg')
		.attr('width',window.innerWidth)
		.attr('height',window.innerHeight);
	
	var max = moment().daysInMonth();
	var start = moment().date(1).day();
	var calendarRow = 0;
	
	var theseDays = [];
	
	// Previous month
	for(var i=1-start; i<=42; i++){
		var thisMoment = moment().date(i);
		theseDays.push(new Day({
			calY : Math.floor((i+start-1)/7),
			calX : thisMoment.weekday(),
			moment : thisMoment,
			color: thisMoment.month() == moment().month() ? 'pink' : 'lightblue'
		}));
	}
	
	var width = window.innerWidth/7;
	var height = window.innerHeight/6;
	var foo = d3
		.select('svg')
			.selectAll('g')
				.data(theseDays)
				.enter()
					.append('g');
	foo
		.append('rect')
			.attr('width',width)
			.attr('height',height)
			.attr('x',function(d){return d.calX * width;})
			.attr('y',function(d){return d.calY * height;})
			.attr('fill',function(d){return d.color})
			.attr('date',function(d){return d.moment.date()});
	
	foo
		.append('text')
			.attr('x',function(d){return (d.calX+1) * width-20;})
			.attr('y',function(d){return (d.calY * height)+20;})
			.text(function(d){return d.moment.date()});
						
					
	
}
