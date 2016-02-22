(function() {
	"use strict";

	var model = { };

	var view = {
		init: function() {
			this.menuIcon = document.getElementById('menu-icon');
			this.menuItems = document.querySelectorAll(".navbar > li");
			this.links = document.querySelectorAll(".navbar > li > a");
			this.opened = false;
				
		},
		openMenu: function() {
			var slideDistance = 2;  //  control how far the menu item slides 
			if (!this.opened) {
				//  Move menu items down a relative amount 
				for (var i = 0; i < this.menuItems.length; i++) {
					this.menuItems[i].style.transition = 'all 0.2s ease';
					this.menuItems[i].style.transform = 'translatey(' + slideDistance + 'em)';
					slideDistance += 2;
					this.menuItems[i].style.visibility = 'visible';
				}
				this.opened = true;

			} else {
				//  Move the menu items back up a relative amount 
				for (var i = this.menuItems.length - 1; i >= 0; i--) {
					this.menuItems[i].style.transition = 'none';
					this.menuItems[i].style.visibility = 'hidden';
					this.menuItems[i].style.transform = 'translatey(-' + slideDistance/2 + 'em)';
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
				view.openMenu();
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