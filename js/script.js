(function() {
	"use strict";
	
	var menuIcon = document.getElementById('menu-icon'),
		menuItems = document.querySelectorAll(".navbar > li"),
	    links = document.querySelectorAll(".navbar > li > a"),
	    opened = false;
	
	//  Wire up first menu icon
	menuIcon.addEventListener('click', function() {
		open();
	});

	//  Intended to fix an autoselect bug from rapid clicking
	function deselectItemsIn(array) {
		$.each(array, function( index, item) {
			item.selected = false;
		})
	}

	//  Boilerplate UI code for animating menu items 
	function open() {
		var slideDistance = 2;  //  control how far the menu item slides 
		if (!opened) {
			//  Move menu items down a relative amount 
			for (var i = 0; i < menuItems.length; i++) {
				menuItems[i].style.transition = 'all 0.2s ease';
				menuItems[i].style.transform = 'translatey(' + slideDistance + 'em)';
				slideDistance += 2;
				menuItems[i].style.visibility = 'visible';
				
			}
			opened = true;

		} else {
			//  Move the menu items back up a relative amount 
			for (var i = menuItems.length - 1; i >= 0; i--) {
				menuItems[i].style.transition = 'none';
				menuItems[i].style.visibility = 'hidden';
				menuItems[i].style.transform = 'translatey(-' + slideDistance/2 + 'em)';
				slideDistance -= 2;
			}
			opened = false;
		}
	}
})();