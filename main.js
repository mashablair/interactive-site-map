$(function() {
	'use strict';
	
	var moreFilters = $('#more-filters');

	// header tabs navigation
	$('#map-tabs').on('click', '.nav-icon', function() {
		$('#map-tabs .nav-icon').removeClass('active-tab');
		$(this).addClass('active-tab');
	});
	
	// make all interactive elems inside 'more filters' not focusable
	$( "#more-filters :focusable" ).attr( "tabindex", "-1" );
	
	
	// 'More Filters' btn
	$('#more-filters-btn').on('click', function() {
		if ( moreFilters.hasClass('open') ) {
			$('.more-filters-container').animate({
				opacity: 0
			}, 200, function() {
				moreFilters.removeClass('open');
			});
			$(this).text('+ More Filters');
			// remove tabindex
			$( "#more-filters :focusable" ).attr( "tabindex", "-1" );			
		} else {
			moreFilters.addClass('open');
			$(this).text('- Less Filters');
			
			$('.more-filters-container').delay(200).animate({
				opacity: 1
			}, 200);
			// add tabindex
			$( "#more-filters :focusable" ).attr( "tabindex", "0" );
			// put focus on 1st elem
			moreFilters.find(':focusable').eq(0).focus();
		}
	});
	
	// reset all filters
	$('#clear-all-filters').on('click', function() {
		$("#map-header, #more-filters").find(":input", ":checkbox").val("").prop('checked', false).prop('selected', false);
		$("#any-ba").prop('checked', true);
	});
	
});
