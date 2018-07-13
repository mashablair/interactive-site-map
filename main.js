(function ($) {
	"use strict";
	// Declare our local/private vars:
	var moreFilters, tabs, expandBtn, filtersContainer, clearFiltersBtn;
	
	function init() {
		moreFilters = $('#more-filters');
		tabs = $('#map-tabs');
		expandBtn = $('#more-filters-btn');
		filtersContainer = $('.more-filters-container');
		clearFiltersBtn = $('#clear-all-filters');
		
		// make all interactive elems inside 'more filters' not focusable
		moreFilters.find(":focusable" ).attr( "tabindex", "-1" );
		
		
		loadData();
		
		var commands = {
			
			// header tabs navigation
			navigateTabs: function() {
				$('#map-tabs .nav-icon').removeClass('active-tab');
				$(this).addClass('active-tab');
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
		tabs.on('click', '.nav-icon', commands.navigateTabs);
		expandBtn.on('click', commands.expandFilters);
		clearFiltersBtn.on('click', commands.resetFilters);
	
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

