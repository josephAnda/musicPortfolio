//  [!!]  Determine how to control animation . . . . does the position simply reset after an element is hidden?
//  [!!]  Use the indexOf on the class string name to compare the classes of list and view-items in your UI bindings
//  [!!]  Clean up the code 
//  [  ]  FIX THIS DESIGN FLAW:  Currently, you are changing views by altering the visibility property of the elements.  
//  	  One issue with this (perhaps inter alia) is that the positions of the views are still affected by hidden 
//        elements (preferably we have each view occupying the same position as each other).  To fix, the view needs
//        to have a way of recognizing the 'current view', meaning a 'current view' variable needs to be updated and 
//        Given the value of the necessary html content.  This means we should probably dynamically populate the html
//        document with values from the js file, which in turn means that I should package my raw data either in script.js
//        or (more likely) in a JSON file that is loaded by the model object.  (probably via JSON.Stringify() or something
//        similar.  
//  [  ]  Implement Jasmine
//  [  ]  Implement Angular 
//  [  ]  Add some sort of blue, animated background  
//  [  ]  Draw up the contents of every view
//  [  ]  Ensure each view item occupies the same position when switched on
//  [  ]  Use bootstrap to 'box out' all of the major menu items 
//  [  ]  Read up on error handling in Javascript

(function() {
	"use strict";

	//  To hold any JSON or server data
	var model = { };

	//  Holds variables and logic pertaining to the view   
	var view = {
		init: function() {
			var self = this;
			this.menuIcon = document.getElementById('menu-icon');
			this.menuItems = document.querySelectorAll(".navbar > li");
			this.links = document.querySelectorAll(".navbar > li > a");
			this.opened = false;  //  Boolean to track the toggle state of the menu
			this.xButton = document.getElementsByClassName("x")[0]; 
			this.views = document.getElementsByClassName("view-item");
			this.aboutView = document.getElementsByClassName('about view-item')[0];	
			this.tracksView = document.getElementsByClassName('tracks view-item')[0];	
			this.mixesView = document.getElementsByClassName('mixes view-item')[0];	
			this.hireView = document.getElementsByClassName('contact view-item')[0];	
			//  Initialize views by hiding the last three and keeping the first
			//console.log(this.tracksView);
			this.hide(this.tracksView);
			this.hide(this.mixesView);
			this.hide(this.hireView);
		},
		animate: function(element) {
			var slideDistance = 2;  //  control how far the menu item slides 
			if (!this.opened) {
				//  Move menu items down a relative amount 
				for (var i = 0; i < element.length; i++) {
					this.show(element[i]);
					element[i].style.transition = 'all 0.2s ease';
					element[i].style.transform = 'translatey(' + slideDistance + 'em)';
					slideDistance += 2;
				}
				this.xButton.className += " close";  //  animate the menu icon
				this.opened = true;
			} else {
				//  Move the menu items back up a relative amount 
				for (var i = element.length - 1; i >= 0; i--) {
					this.hide(element[i]);
					element[i].style.transition = 'all .2s ease';
					element[i].style.transform = 'translatey(-' + 1 + 'em)';
					slideDistance -= 2;
				}
				this.xButton.className = this.xButton.className.replace(" close", "");  //  animate the menu icon 
				this.opened = false;
			}
		},
		hide: function(element) {
			element.style.visibility = 'hidden';
		},
		show: function(element) {
			element.style.visibility = 'visible';
		},
		//  The function below encapsulates necessary boolean logic to make the logic more readable (test first)
		matchesIndex: function(array, element) {
			return array.className.indexOf(element.id) != -1;
		},
		//  ensures only one page view is open at a time
		toggleViews: function(array, element) {
			$.each(array, function( index, viewItem ) {
  				if (!view.matchesIndex(viewItem, element)) {
  					view.hide(viewItem);
  				} else {
  					view.show(viewItem);
  				}
			});
		},
		bindToToggle: function(element) {
			element.addEventListener('click', function() {
				view.toggleViews(view.views, element);
			});
		},
		//  View method to dynamically create <divs> and insert content
		createDiv: function(content, div_class, div_id) {
			var newDiv = document.createElement( "div" );
			$(newDiv).attr('id', div_id);
			$(newDiv).addClass( div_class );
			$(newDiv).addClass("col-md-8 col-md-offset-2" );
			$( newDiv ).html( content );
			$( '#viewsRow' ).append( $(newDiv) );
		}
	};

	//  Implements the view and retrieves data from the model
	var controller = {
		//  initialize items and necessary UI data bindings related to the view
		init: function() {
			view.init();
			view.xButton.addEventListener('click', function() {
				view.animate(view.menuItems);
			});
			//  Wires up the menu items to the toggling functionality defined in the view
			$.each(view.links, function(index, item) {
				console.log(item.className);
				view.bindToToggle(item);
			});
			view.createDiv('This is some content', 'test_class', 'test_id');   
			
		},
		//  Originally intended to fix a bug that auto-selects all elements
		deselectItemsIn: function(array) {
			$.each(array, function( index, item) {
				item.selected = false;
			})
		}
	};

	controller.init();

	/*
	var newDiv = document.createElement( "div" );
	$(newDiv).attr('id', 'test_id');
	$(newDiv).addClass( 'test_class' );
	$( newDiv ).html( 'this is some content' );
	$( '#viewsRow' ).append( $(newDiv) );
	*/
	
	
})();