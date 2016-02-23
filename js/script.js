//  [  ]  Determine how to control animation . . . . does the position simply reset after an element is hidden?

(function() {
	"use strict";

	//  To hold any JSON or server data
	var model = { };

	//  Holds variables and logic pertaining to the view   
	var view = {
		init: function() {
			this.menuIcon = document.getElementById('menu-icon');
			this.menuItems = document.querySelectorAll(".navbar > li");
			this.links = document.querySelectorAll(".navbar > li > a");
			this.opened = false;
				
		},
		animate: function(element) {
			var slideDistance = 2;  //  control how far the menu item slides 
			if (!this.opened) {
				//  Move menu items down a relative amount 
				for (var i = 0; i < element.length; i++) {
					element[i].style.visibility = 'visible';
					element[i].style.transition = 'all 0.2s ease';
					element[i].style.transform = 'translatey(' + slideDistance + 'em)';
					slideDistance += 2;
				}
				this.opened = true;

			} else {
				//  Move the menu items back up a relative amount 
				for (var i = element.length - 1; i >= 0; i--) {
					element[i].style.visibility = 'hidden';
					//  The following line triggers a closing animation that I still want to figure out the specifics of
					element[i].style.transition = 'all 0.2s ease';
					//element[i].style.transition = 'none';
					element[i].style.transform = 'translatex(-12em)';
					slideDistance -= 2;
				}
				this.opened = false;
			}
		}
	};

	var controller = {
		init: function() {
			view.init();
			view.menuIcon.addEventListener('click', function() {
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