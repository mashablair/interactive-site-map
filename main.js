(function ($) {
	"use strict";
	// Declare our local/private vars:
	var moreFilters, tabsBtns, expandBtn, filtersContainer, clearFiltersBtn, mapsContainer, firstViewBtn, secondViewBtn, secondExpandedViewBtn, thirdViewBtn, popovers, blockLinks, firstViewPopovers, backBtn, secondViewHeader, levelNav, firstLevel, levelUpCtrl, levelDownCtrl, selectedLevel, levelsTotal, isExpanded, isNavigating, numberViewPopovers;
	
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
		popovers = null;
		blockLinks = $('.link-for-blocks');
		firstViewPopovers = null;
		backBtn = $('.back-btn');
		secondViewHeader = $('.second-view-header');
		firstLevel = $('.level--1');
		// levels navigation up/down ctrls
		levelNav = $('.levelnav');
		levelUpCtrl = $('.levelnav__button--up');
		levelDownCtrl = $('.levelnav__button--down');
		selectedLevel = null;
		levelsTotal = null;
		isExpanded = false;
		isNavigating = false;
		numberViewPopovers = null;
		
		// make all interactive elems inside 'more filters' not focusable
		moreFilters.find(":focusable" ).attr( "tabindex", "-1" );
		
		
		
		loadData();
		
		// initialize and show all popovers
		$('[data-toggle="popover"]').popover('show'); 
		
		
		// add classes and id's to popovers for :hover highlighting
		setPopovers("first-view");
		
		$('.first-view svg').on('click', function() {
			// target should be <a>, not .popover
			$('.first-view .link-for-blocks').popover('hide'); 
		});
		
		$('.first-view h2').on('click', function() {
			// target should be <a>, not .popover
			$('.first-view .link-for-blocks').popover('show'); 
		});
		
		var commands = {
			
			// header tabs navigation -- appearance only
			navigateTabs: function() {
				tabsBtns.removeClass('active-tab');
				$(this).addClass('active-tab');
			},
			
			// 3 methods below change Interactive Site Map view by toggling 
			// CSS classes that create a slider effect with a transition
			navigateToFirstView: function() {
				mapsContainer.removeClass('view-change-1 view-change-2');
				commands.showPopovers();
				commands.navigateTabs();
				firstViewBtn.addClass('active-tab');
			},
			
			navigateToSecondView: function() {
				mapsContainer.addClass('view-change-1').removeClass('view-change-2');
				commands.hidePopovers();
				commands.navigateTabs();
				secondViewBtn.addClass('active-tab');
			},
			
			navigateToSecondExpandedView: function() {
				mapsContainer.addClass('view-change-1').removeClass('view-change-2');
				commands.navigateTabs();
				secondExpandedViewBtn.addClass('active-tab');
				commands.hidePopovers();
				firstLevel.trigger('click');
			},
			
			navigateToThirdView: function() {
				mapsContainer.addClass('view-change-1 view-change-2');
				commands.navigateTabs();
				thirdViewBtn.addClass('active-tab');
				commands.hidePopovers();
			},
			
			showPopovers: function() {
				firstViewPopovers.addClass('in');
			},
			
			hidePopovers: function() {
				firstViewPopovers.removeClass('in');
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
		
		// all events handlers
		tabsBtns.on('click', commands.navigateTabs);
		expandBtn.on('click', commands.expandFilters);
		clearFiltersBtn.on('click', commands.resetFilters);
		firstViewBtn.on('click', commands.navigateToFirstView);
		secondViewBtn.on('click', function() {
			if (isExpanded) {
				showStackedLevels();
			} else {
				commands.navigateToSecondView();
			}
		});
		secondExpandedViewBtn.on('click', commands.navigateToSecondExpandedView);
		thirdViewBtn.on('click', commands.navigateToThirdView);
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
		blockLinks.on('click', commands.navigateToSecondView);
		$('.link-for-blocks, .first-view-popovers .popover-title, .first-view-popovers .popover-availability').on('click', commands.navigateToSecondView);	
		
		backBtn.on('click', function() {
			
			if (isExpanded) {
				showStackedLevels();
			} else {
				commands.navigateToFirstView();
			}
		});
				   
				   
		
		// DELETE AFTER DONE W/ DEMO:
//		commands.navigateToSecondView();
		
		
//		var topNum = 0;
//		$('.floor-plate').each(function() {
//			topNum -= 30;
//			var top = topNum + "px";
//			$(this).css('top', top);
//		});
		
		var levelsContainer = $('.levels');
		var levels = $('.level');
		var secondViewStackedHeader; 
		
		levels.on('click', function() {
			console.log($(this)); // --> .level.level--1
			
			// current .level should receive .level--current
			$(this).addClass('level--current');
			// get last digit
			selectedLevel = parseInt($(this).attr('data-levelnum'), 10);
			console.log("selectedLevel is " + selectedLevel);
			
			showLevel();
						
		});
		
		
		function showLevel() {
			// calculate levelsTotal
			levelsTotal = $('[data-levelnum]').length;
			
			// .levels should receive classes: levels--selected-4 levels--open
			levelsContainer.addClass('levels--open levels--selected-' + selectedLevel);
			
			// activate 3rd tab
			commands.navigateTabs();
			secondExpandedViewBtn.addClass('active-tab');
			
			// update header
			secondViewStackedHeader = secondViewHeader.text();
			secondViewHeader.text('Floor ' + selectedLevel).css('color', '#04b5fd');
			
			// show navigation arrows
			levelNav.removeClass('levelnav--hidden');
				
			// check if .boxbutton--disabled needs to be applied
			setNavigationState();
			
			isExpanded = true;
			
		}
		
		
		// Control navigation ctrls state. Add disable class to the respective ctrl when the current level is either the first or the last.
		function setNavigationState() {
			console.log("selectedLevel is " + selectedLevel);
			console.log("levelsTotal is " + levelsTotal);
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
		}

		
		// show the stacked view 
		function showStackedLevels() {
			if( !isExpanded ) {
				return false;
			}
			isExpanded = false;

			levelsContainer.removeClass('levels--open levels--selected-' + selectedLevel);
			$('.level--current').removeClass('level--current');

			// show navigation arrows
			levelNav.addClass('levelnav--hidden');
			
			// activate 2nd tab
			commands.navigateTabs();
			secondViewBtn.addClass('active-tab');
			
			// update header back to stacked
			secondViewHeader.text(secondViewStackedHeader).css('color', '');

		}

//		// navigating through the levels
		levelUpCtrl.on('click', function() { navigate('Down'); });
		levelDownCtrl.on('click', function() { navigate('Up'); });
		
		function navigate(direction) {
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
			setNavigationState();
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

		}
		
		// open detail area 
		$('#place-to-click').on('click', function() {
			// add class to .svg-container
			$('.svg-container').addClass('svg-container--content-open');
			
			// add class to .content
			$('.content').addClass('content--open');
			$('.content__item').addClass('content__item--current');
			$('.content__button').removeClass('content__button--hidden');
		});
		
		// close detail area
		$('.content__button').on('click', function() {
			// add class to .svg-container
			$('.svg-container').removeClass('svg-container--content-open');
			
			// add class to .content
			$('.content').removeClass('content--open');
			$('.content__item').removeClass('content__item--current');
			$('.content__button').addClass('content__button--hidden');
		});
		
	
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

