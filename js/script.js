/*
[  ]  Implement Jasmine
[  ]  Learn how to apply fixtures to implement Jasmine on scripts with DOM dependencies 
[  ]  Implement Angular 
[  ]  Add some sort of blue, animated background  
[  ]  Use bootstrap to 'box out' all of the major menu items 
[  ]  Read up on error handling in Javascript
*/

(function() {
	"use strict";

	//  To hold any JSON or server data.  For this project the contents are the html of the views
	var model = {
		menuItems: [
			{
				section:  "about",
				content:  "<h1>About Joseph</h1></br><p>My name is Joseph Anda, and I am a producer and DJ living in the San Francisco Bay Area. My style is influenced by a variety of musical elements and genres including rock, classical, house, trance, ambient, and hip-hop. When I'm not producing or mixing you can find me writing and testing software, riding longboards, reading and writing SciFi, playing video games and bodybuilding.</p><h5>Instrumentalist</h5><p>As a guitarist and pianist, I like to incorporate both of those musical elements into my electronic works</p><h5>DJ</h5><p>As a DJ, I enjoy mixing my own and others' tracks together to create a unique audio experience every time.</p><h5>Producer</h5><p>I bring my love of analog intstrumentation and digital mxixing together in my original productions</p>"
			},
			{
				section:  "tracks",
				content:  "<h1>Tracks</h1><p>Scroll through the available tracks or submit a comment.  Direct download is currently not supported, though you can find the tracks for free via SoundCloud.</p><div id='music_player'><h5>Track 01 - Upward Spiral</h5><audio controls><source src='horse.ogg' type='audio/ogg'><source src='horse.mp3' type='audio/mpeg'>Your browser does not support the audio element.</audio><h5>Track 02 - Tomorrow</h5><audio controls><source src='horse.ogg' type='audio/ogg'><source src='horse.mp3' type='audio/mpeg'>Your browser does not support the audio element.</audio></div>"
			},
			{
				section:  "mixes",
				content:  "<h1>Mixes</h1><p>Scroll through the available mixes or submit a comment</p><div id='music_player'><h5>Mix 01 - Sky Mix</h5><audio controls><source src='horse.ogg' type='audio/ogg'><source src='horse.mp3' type='audio/mpeg'>Your browser does not support the audio element.</audio></div>"
			},
			{
				section:  "contact",
				content:  "<h1>Contact Me</h1><p>I would love to hear from you! You can e-mail me at:  orenmurasaki@gmail.com</p>"
			}
		]
	};

	//  Holds variables and logic pertaining to the view, including the main functions for data-bindings   
	var view = {
		init: function() {
			var self = this;
			self.menuIcon = document.getElementById('menu-icon');
			self.menuItems = document.querySelectorAll(".navbar > li");
			self.links = document.querySelectorAll(".navbar > li > a");
			self.opened = false;  //  Boolean to track the toggle state of the menu
			self.slid = false;
			self.xButton = document.getElementsByClassName("x")[0];
			self.currentSection = model.menuItems[0].section; 
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
				this.xButton.className += " close";  //  animate the menu icon via adding 'close' styles
				this.opened = true;
			} else {
				//  Move the menu items back up a relative amount 
				for (var i = element.length - 1; i >= 0; i--) {
					this.hide(element[i]);
					element[i].style.transition = 'all .2s ease';
					element[i].style.transform = 'translatey(-' + 1 + 'em)';
					slideDistance -= 2;
				}
				this.xButton.className = this.xButton.className.replace(" close", "");  //  undo adding 'close' class
				this.opened = false;
			}
		},

		//Animation functionality for the view div
		slide: function(element, displacement) {
			var slideDistance = displacement;  //  controls how far the view item slides
			element.style.transition = 'all 0.2s ease';
			element.style.transform = 'translate(' + slideDistance + 'px)';
		},

		reset: function(element) {
			element.style.transition = '';
			element.style.transform = '';
		},

		hide: function(element) {	
			element.style.visibility = 'hidden';
		},

		show: function(element) {
			element.style.visibility = 'visible';
		},

		//  The function below encapsulates necessary boolean logic to make the logic more readable (test first)
		matchesIndex: function(object, element) {
			return object.section.indexOf(element.id) != -1;
		},

		//  ensures only one page view is open at a time
		toggleViews: function(array, element) {
			$.each(array, function( index, menuItem ) {

				//  Find and change current view only if a different one is selected via the navbar
				if ( view.matchesIndex(menuItem, element) && view.currentSection != menuItem.section )  {	
					view.currentSection = menuItem.section;
					$( '#view_id' ).fadeTo(190, 0);

					//  Times it so the content is changed once the element has faded
					setTimeout( function() {
						$( '#view_id' ).html( menuItem.content );	
						$( '#view_id' ).fadeTo(190, 1);
					}, 200);
				} 		
			});
		},

		bindToToggle: function(element) {
			element.addEventListener('click', function() {
				view.toggleViews(model.menuItems, element);
			});
		},

		//  View method to dynamically create <div>s and insert content to webpage
		createDiv: function(content, div_class, div_id) {
			var newDiv = document.createElement( "div" );
			$(newDiv).attr('id', div_id);
			$(newDiv).addClass("col-md-8 col-md-offset-2" + " " + div_class );
			$(newDiv).html( content );
			$( '#viewsRow' ).append( $(newDiv) );
		}
	};

	//  Implements the view's functions and retrieves data from the model
	var controller = {

		//  initialize items and necessary UI data bindings related to the view
		init: function() {
			view.init();
			//  Wires up the menu button
			view.xButton.addEventListener('click', function() {
				view.animate(view.menuItems);
			});
			//  Wires up the menu items to the toggling functionality defined in the view
			$.each(view.links, function(index, item) {
				view.bindToToggle(item);
			});
			//  Populates the view with the first page 
			view.createDiv(model.menuItems[0].content, 'view_class', 'view_id');   
			
		},

		//  Originally intended to fix a bug that auto-selects all elements, not currently implemented
		deselectItemsIn: function(array) {
			$.each(array, function( index, item) {
				item.selected = false;
			})
		}
	};

	controller.init();
	$.getJSON("model.json", function(json) {
    	console.log(json); // this will show the info it in firebug console
	});
})();