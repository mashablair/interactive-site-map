(function ($) {
	"use strict";
	// Declare our local/private vars:
	var moreFilters, tabsBtns, expandBtn, filtersContainer, clearFiltersBtn, mapsContainer, firstViewBtn, secondViewBtn, secondExpandedViewBtn, thirdViewBtn, views, firstView, secondView, buildingBlocks, popovers, blockLinks, firstViewPopovers, backBtn, secondViewHeader, levelNav, firstLevel, levelUpCtrl, levelDownCtrl, levelStackedCtrl, selectedLevel, levelsTotal, isExpanded, isNavigating, numberViewPopovers, levelsContainer, levels, secondViewStackedHeader, availableUnit;
	
	function init() {
		moreFilters = $('#more-filters');
		tabsBtns = $('.nav-icon');
		expandBtn = $('#more-filters-btn');
		filtersContainer = $('.more-filters-container');
		clearFiltersBtn = $('#clear-all-filters');
		mapsContainer = $('#interactive-site-map');
		firstViewBtn = $('.first-view-btn');
		secondViewBtn = $('.second-view-btn');
		secondExpandedViewBtn = $('.second-expanded-view-btn');
		thirdViewBtn = $('.third-view-btn');
		views = $('.views');
		firstView = $('.first-view');
		secondView = $('.second-view');
		buildingBlocks = $('.first-view svg');
		popovers = null;
		blockLinks = $('.link-for-blocks');
		firstViewPopovers = $('.first-view .link-for-blocks');
		backBtn = $('.back-btn');
		secondViewHeader = $('.second-view-header');
		firstLevel = $('.level--1');
		// levels navigation up/down ctrls
		levelNav = $('.levelnav');
		levelUpCtrl = $('.levelnav__button--up');
		levelDownCtrl = $('.levelnav__button--down');
		levelStackedCtrl = $('.levelnav__button--all-levels');
		selectedLevel = null;
		levelsTotal = null;
		isExpanded = false;
		isNavigating = false;
		numberViewPopovers = null;
		levelsContainer = $('.levels');
		levels = $('.level');
		secondViewStackedHeader = null;
		availableUnit = $('.available-unit');
		
		// make all interactive elems inside 'more filters' not focusable
		moreFilters.find(":focusable" ).attr( "tabindex", "-1" );
		
		loadData();
		
		// to experiment with modifying the URL string
		var loc = location.href;
		console.log(loc);
	//	if (loc.indexOf("?") === -1) {
	//  	loc += "?";
	//	} else {
	//      loc += "&";
	//	}
	//  location.href = loc + "ts=true";
		
		// initialize and show all popovers
		$('[data-toggle="popover"]').popover('show'); 
		
		
		// add classes and id's to popovers for :hover highlighting
		setPopovers("first-view");
		
		
		// DELETE LATER
		$('.first-view h2').on('click', function() {
			commands.showPopovers();
		});
		
		// to reposition popovers on screen resize
		// needed b/c popovers are set on SVG parts, and not on regular elems
		$(window).resize(function() {
			commands.hidePopovers();
			clearTimeout(window.resizedFinished);
			window.resizedFinished = setTimeout(function() {
				commands.showPopovers();
			}, 800);  
		}); 
		
		
		// initialize tabs in 3rd View
		$('#unitDetailTabs a').click(function (e) {
		  e.preventDefault();
		  $(this).tab('show');
		});
		
		// initialize carousel in 3rd View
		$('.carousel').carousel();
		
		var commands = {
			
			// header tabs navigation -- appearance only
			navigateTabs: function() {
				tabsBtns.removeClass('active-tab');
			},
			
			// 3 methods below change Interactive Site Map view by toggling 
			// CSS classes that create a slider effect with a transition
			navigateToFirstView: function() {
				commands.hidePopovers();
				mapsContainer.removeClass('view-change-1 view-change-2');
				commands.showPopovers();
				commands.navigateTabs();
				firstViewBtn.addClass('active-tab');
				setTimeout(function() {
					commands.showPopovers();
				}, 800); 
			},
			
			navigateToSecondView: function() {
				// if no .view-change-1 class
				if ( !mapsContainer.hasClass('view-change-1')) {
					mapsContainer.addClass('view-change-1').removeClass('view-change-2');
					commands.navigateTabs();
					secondViewBtn.addClass('active-tab');
					commands.hidePopovers();
					setTimeout(function() {
						commands.showPopovers();
					}, 800);
				}
			},
			
			navigateToSecondExpandedView: function() {
				mapsContainer.addClass('view-change-1').removeClass('view-change-2');
				commands.navigateTabs();
				secondExpandedViewBtn.addClass('active-tab');
				firstLevel.trigger('click');
				$('[data-toggle="popover"]').popover('show'); 
			},
			
			// when clicked on .nav-icon.third-view-btn OR clicked on interactive plate portion
			navigateToThirdView: function() {
				mapsContainer.addClass('view-change-1 view-change-2');
				commands.navigateTabs();
				thirdViewBtn.addClass('active-tab');
				secondView.addClass('expanded-view-with-detail');
			},
			
			showFirstStack: function() {
				secondView.removeClass('second-view__part2 second-view__part3');
				secondView.addClass('second-view__part1');
				levelDownCtrl.addClass('boxbutton--disabled');
				levelUpCtrl.removeClass('boxbutton--disabled');
				// add building highlight
				firstView.addClass('first-stack-displayed');
				firstView.removeClass('second-stack-displayed third-stack-displayed');
				secondViewHeader.text('Floors 1 - 4 (Lower Third)');
			},
			
			showSecondStack: function() {
				secondView.removeClass('second-view__part1 second-view__part3');
				secondView.addClass('second-view__part2');
				levelUpCtrl.removeClass('boxbutton--disabled');
				levelDownCtrl.removeClass('boxbutton--disabled');
				// add building highlight
				firstView.addClass('second-stack-displayed');
				firstView.removeClass('first-stack-displayed third-stack-displayed');
				secondViewHeader.text('Floors 5 - 8 (Middle Third)');
			},
			
			showThirdStack: function() {
				secondView.removeClass('second-view__part1 second-view__part2');
				secondView.addClass('second-view__part3');
				levelUpCtrl.addClass('boxbutton--disabled');
				levelDownCtrl.removeClass('boxbutton--disabled');
				// add building hightlight
				firstView.addClass('third-stack-displayed');
				firstView.removeClass('first-stack-displayed second-stack-displayed');
				secondViewHeader.text('Floors 9 - 12 (Upper Third)');
			},
			
			showPopovers: function() {
				firstViewPopovers.popover('show');
			},
			
			hidePopovers: function() {
				firstViewPopovers.popover('hide');
			},
			
//			repositionPopovers: function() {
//				this.hidePopovers();
//				setTimeout(function() {
//					commands.showPopovers();
//				}, 500);  
//			},
			
			showLevel: function() {
				// calculate levelsTotal
				levelsTotal = $('[data-levelnum]').length;

				// .levels should receive classes: levels--selected-4 levels--open
				levelsContainer.addClass('levels--open levels--selected-' + selectedLevel);

				// activate 3rd tab
				commands.navigateTabs();
				secondExpandedViewBtn.addClass('active-tab');

				// update header using floor number
				secondViewStackedHeader = secondViewHeader.text();
				var floorNum = $('.level--current').attr('data-floor');
				secondViewHeader.text('Floor ' + floorNum).css('color', '#04b5fd');

				// navigation arrows
				backBtn.addClass('hidden');
				levelStackedCtrl.removeClass('hidden');

				// check if .boxbutton--disabled needs to be applied
				commands.setNavigationState();
				
				// means only 1 floor plate is visible (we are in 2nd Expanded View)
				isExpanded = true;
			},
			
			// Control navigation ctrls state. Add disable class to the respective ctrl when the current level is either the first or the last.
			setNavigationState: function() {
				if ( selectedLevel === 1 ) {
					levelDownCtrl.addClass('boxbutton--disabled');
				} else {
					levelDownCtrl.removeClass('boxbutton--disabled');
				}

				if ( selectedLevel === levelsTotal ) {
					levelUpCtrl.addClass('boxbutton--disabled');
				} else {
					levelUpCtrl.removeClass('boxbutton--disabled');
				}
			},
			
			// show the stacked view 
			showStackedLevels: function() {
				if( !isExpanded ) {
					return false;
				}
				isExpanded = false;

				levelsContainer.removeClass('levels--open levels--selected-' + selectedLevel);
				$('.level--current').removeClass('level--current');

				// navigation arrows
				backBtn.removeClass('hidden');
				levelStackedCtrl.addClass('hidden');

				// activate 2nd tab
				commands.navigateTabs();
				secondViewBtn.addClass('active-tab');

				// update header back to stacked
				if (secondView.hasClass('second-view__part1')) {
					secondViewHeader.text('Floors 1 - 4 (Lower Third)');
				} else if (secondView.hasClass('second-view__part2')) {
					secondViewHeader.text('Floors 5 - 8 (Middle Third)');
				} else if (secondView.hasClass('second-view__part3')) {
					secondViewHeader.text('Floors 9 - 12 (Upper Third)');
				}
				secondViewHeader.css('color', '');
			},
			
			// navigate through levels
			navigate: function(direction) {
				if( !isExpanded ) {
					return false;
				}
				isNavigating = true;

				console.log("selectedLevel is " + selectedLevel);
				var prevSelectedLevel = selectedLevel;
				console.log("prevSelectedLevel " + prevSelectedLevel); // --> should be 4
				console.log(levels); // --> array like object of levels

				// current level
				var currentLevel = $('.level--' + selectedLevel);
				console.log(currentLevel); // --> .level.level--4

				if( direction === 'Up' && prevSelectedLevel > 1 ) {
					--selectedLevel;
					console.log("selectedLevel-- is " + selectedLevel); // --> 3
				}
				else if( direction === 'Down' && prevSelectedLevel < levelsTotal ) {
					++selectedLevel;
					console.log("selectedLevel++ is " + selectedLevel); 
				}
				else {
					isNavigating = false;	
					return false;
				}

				// control navigation controls state (enabled/disabled)
				commands.setNavigationState();
				// transition direction class
				currentLevel.addClass('level--moveOut' + direction);
				// next level element
				var nextLevelNum = selectedLevel; // --> ??? should be '3'
				console.log('nextLevelNum is ' + nextLevelNum);
				var nextLevel = $('.level--' + nextLevelNum); 
				console.log(nextLevel);  // --> should be .level.level--3
				// ..becomes the current one
				nextLevel.addClass('level--current');

				// moves levels out of view, updates the container's classes
				currentLevel.removeClass('level--moveOut' + direction);
				// solves rendering bug for the SVG opacity-fill property
				setTimeout(function() {
					currentLevel.removeClass('level--current');
				}, 60);

				levelsContainer.removeClass('levels--selected-' + prevSelectedLevel);
				levelsContainer.addClass('levels--selected-' + selectedLevel);

				// update header
				secondViewHeader.text('Floor ' + selectedLevel);

				isNavigating = false;

			},
			
			// more filters button
			expandFilters: function() {
				if ( moreFilters.hasClass('open') ) {
					filtersContainer.animate({
						opacity: 0
					}, 200, function() {
						moreFilters.removeClass('open');
						commands.showPopovers();
					});
					$(this).text('+ More Filters');
					moreFilters.find(":focusable").attr( "tabindex", "-1" );
				} else {
					moreFilters.addClass('open').find(":focusable").attr( "tabindex", "0" ).eq(0).focus();
					$(this).text('- Less Filters');
					filtersContainer.delay(200).animate({
						opacity: 1
					}, 200);
					commands.hidePopovers();
				}
			},
			
			// reset all filters
			resetFilters: function() {
				$("#map-header, #more-filters").find(":input", ":checkbox").val("").prop('checked', false).prop('selected', false);
				$("#any-ba").prop('checked', true);
			}
			
		}; // end of 'commands' var
		
		
		// ALL EVENT HANDLERS
		tabsBtns.on('click', commands.navigateTabs);
		
		// filters
		expandBtn.on('click', commands.expandFilters);
		clearFiltersBtn.on('click', commands.resetFilters);
		
		firstViewBtn.on('click', commands.navigateToFirstView);
		secondViewBtn.on('click', function() {
			if (isExpanded) {
				commands.showStackedLevels();
			} else {
				commands.navigateToSecondView();
			}
		});
		secondExpandedViewBtn.on('click', commands.navigateToSecondExpandedView);
		thirdViewBtn.on('click', commands.navigateToThirdView);
		
		// hovering over building blocks
		blockLinks.on({
			'hover' : function() {
				// find related popover and add 'in-focus' class to it
				var thisId = $(this).attr('id');
				var lastNum = thisId.substr(thisId.length -1);
				$('#popover' + lastNum).find('.popover-title').addClass('in-focus');
			},
			'mouseout' : function() {
				$('.first-view-popovers .popover-title').removeClass('in-focus');
			}
		});
		
		// clicking on building blocks or related popovers
		blockLinks.on('click', function() {
			// if 1 floor is expanded
			if (isExpanded) {
				commands.showStackedLevels();
			}
			
			if ( $(this).attr('id') === 'link0') {
				commands.showThirdStack();
			} else if ( $(this).attr('id') === 'link1') {
				commands.showSecondStack();
			} if ( $(this).attr('id') === 'link2') {
				commands.showFirstStack();
			}
			commands.navigateToSecondView();
		});
		
		// ***********FIX THIS
		$('.first-view-popovers').on('click', function() {
			
			if ( $(this).attr('id') === 'popover0') {
				commands.showThirdStack();
			} else if ( $(this).attr('id') === 'popover1') {
				commands.showSecondStack();
			} if ( $(this).attr('id') === 'popover2') {
				commands.showFirstStack();
			}
			
			// if 1 floor is expanded
			if (isExpanded) {
				commands.showStackedLevels();
			}
			
			commands.navigateToSecondView();
		});
				
		// clicking 'Back' btn
		backBtn.on('click', function() {
			if (isExpanded) {
				commands.showStackedLevels();
			} else if ( $(window).width() >= 1400 ) {
				commands.navigateToSecondView();
				secondView.removeClass('expanded-view-with-detail');
			} else {
				commands.navigateToFirstView();
				secondView.removeClass('expanded-view-with-detail');
			}
		});
		
		
		// clicking on stacked floor plate, shows this plate in expanded view
		levels.on('click', function() {

			// current .level should receive .level--current
			$(this).addClass('level--current');
			// get last digit
			selectedLevel = parseInt($(this).attr('data-levelnum'), 10);
			console.log("selectedLevel is " + selectedLevel);
			
			commands.showLevel();
		});
		
		// 'up' and 'down' arrows for navigating through stacks OR levels (depending on 'expanded')
		levelUpCtrl.on('click', function() {
			if (isExpanded) {
				// means we're navingating thru levels
				commands.navigate('Down');
			} else {
				// means we are navigating thru stacks (only 3 stacks)
				if (secondView.hasClass('second-view__part1')) {
					commands.showSecondStack();
				} else if (secondView.hasClass('second-view__part2')) {
					commands.showThirdStack();
				}
			}
		});
		
		// this nav is shared by both stacks and levels
		levelDownCtrl.on('click', function() { 
			if (isExpanded) {
				// means we are navigating thru levels
				commands.navigate('Up'); 
			} else {
				// means we are navigating thru stacks (only 3 stacks)
				if (secondView.hasClass('second-view__part3')) {
					commands.showSecondStack();
				} else if (secondView.hasClass('second-view__part2')) {
					commands.showFirstStack();
				}
			}
		});
		
		levelStackedCtrl.on('click', function() {
			commands.showStackedLevels();
			commands.navigateToSecondView(); 
		});
		
		// clicking on SVG hot spot
		availableUnit.on('click', function(e) {
			e.stopPropagation(); // to prevent showLevel() invokation 
			$('.second-view').addClass('expanded-view-with-detail');
			commands.navigateToThirdView();
		});
		

				   
		// DELETE AFTER DONE W/ DEMO:		
//		var topNum = 0;
//		$('.floor-plate').each(function() {
//			topNum -= 30;
//			var top = topNum + "px";
//			$(this).css('top', top);
//		});
	

	} // end of 'init' function
	
	
	
	// Loads data from JSON to create 1st view:
    function loadData() {
//        // loops through each plans.js object:
//        $.each(plans, function (key, cardData) {
//
//            // first creates html card for each plans.js objects
//            var CARD = _makeCard();
//            // personalizes each card:
//            CARD.title.text(typeToString(cardData.type) + ' | ' + cardData.size);
//            CARD.name.text(cardData.name);
//            CARD.image.attr({src: cardData.image});
//            CARD.pre.text(cardData.price.pre);
//            CARD.price.text('$' + cardData.price.usd);
//            CARD.post.text(cardData.price.post);
//            CARD.note.text(cardData.note);
//            // add the 'specials' banner:
//            if (cardData.specials) CARD.item.addClass('special');
//            cards.append(CARD.card);
//
//        });
    }
	
	// set up popovers
	function setPopovers(numberView) {
		
		// FIRST VIEW POPOVERS (unless we change 'blockLinks')
		// since all popovers are attached .svg-container, we need to connect them with their <a>
		// so when user hovers over particular <a>, related popover gets highlighted 
		numberViewPopovers = $('.' + numberView).find('.popover').addClass('first-view-popovers');
		
		// ***to make this function universal, 'blockLinks' should also be param/argument (currently, this will only work for .first-view)
		blockLinks.each(function(i) {
			$(this).attr('id', 'link' + i);
		});
		
		numberViewPopovers.each(function(i) {
			$(this).attr('id', 'popover' +i);
		});
	}
	
	$(document).ready(init);
})(jQuery);

