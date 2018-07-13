(function ($) {
	"use strict";
	// Declare our local/private vars:
	var moreFilters, tabsBtns, expandBtn, filtersContainer, clearFiltersBtn, mapsContainer, firstViewBtn, secondViewBtn, thirdViewBtn;
	
	function init() {
		moreFilters = $('#more-filters');
		tabsBtns = $('.nav-icon');
		expandBtn = $('#more-filters-btn');
		filtersContainer = $('.more-filters-container');
		clearFiltersBtn = $('#clear-all-filters');
		mapsContainer = $('#interactive-site-map');
		firstViewBtn = $('.first-view-btn');
		secondViewBtn = $('.second-view-btn');
		thirdViewBtn = $('.third-view-btn');
		
		// make all interactive elems inside 'more filters' not focusable
		moreFilters.find(":focusable" ).attr( "tabindex", "-1" );
		
		
		loadData();
		
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
			},
			
			navigateToSecondView: function() {
				mapsContainer.addClass('view-change-1').removeClass('view-change-2');
			},
			
			navigateToThirdView: function() {
				mapsContainer.addClass('view-change-1 view-change-2');
			},
			
			// more filters button
			expandFilters: function() {
				if ( moreFilters.hasClass('open') ) {
					filtersContainer.animate({
						opacity: 0
					}, 200, function() {
						moreFilters.removeClass('open');
					});
					$(this).text('+ More Filters');
					moreFilters.find(":focusable").attr( "tabindex", "-1" );			
				} else {
					moreFilters.addClass('open').find(":focusable").attr( "tabindex", "0" ).eq(0).focus();
					$(this).text('- Less Filters');
					filtersContainer.delay(200).animate({
						opacity: 1
					}, 200);
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
		secondViewBtn.on('click', commands.navigateToSecondView);
		thirdViewBtn.on('click', commands.navigateToThirdView);
		
		
		
	
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
	
	$(document).ready(init);
})(jQuery);

