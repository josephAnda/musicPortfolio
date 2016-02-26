//  [!!]  Determine how to control animation . . . . does the position simply reset after an element is hidden?
//  [!!]  Use the indexOf on the class string name to compare the classes of list and view-items in your UI bindings
//  [  ]  Clean up the code 
//  [  ]  Implement Jasmine
//  [  ]  Implement Angular 

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
			this.opened = false;
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
			
			//  Wires up the menu items to the toggling functionality defined below
			$.each(this.links, function(index, item) {
				console.log(item.className);
				self.bindToToggle(item);
			});

			
			

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
		
		//  allows one view to be open at a time
		toggleViews: function(array, element) {
			$.each(array, function( index, viewItem ) {
  				if (viewItem.className.indexOf(element.id) == -1) {
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
		}
	};

	var controller = {
		init: function() {
			view.init();
			view.xButton.addEventListener('click', function() {
				view.animate(view.menuItems);
			});
		},

		deselectItemsIn: function(array) {
			$.each(array, function( index, item) {
				item.selected = false;
			})
		}
	}

	
	controller.init();    	
})();