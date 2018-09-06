// TOC
// 1. Declare/define vars
// 2. Some initial tasks e.g. load data, initialize popovers & tabs, etc. 
// 3. Object with all reusable commands
// 4. More init set up actions
// 5. All events handlers
// 6. Some more init functions and commands


(function ($) {
	"use strict";
	
	// ### 1. Declare our local/private vars:
	var moreFilters, tabsBtns, expandBtn, filtersContainer, clearFiltersBtn, applyFiltersBtn, filterBedrooms, thirdStackUnitsAll, secondStackUnitsAll, firstStackUnitsAll, thirdStackUnitsFiltered, secondStackUnitsFiltered, firstStackUnitsFiltered, thirdMinRentFiltered, secondMinRentFiltered, firstMinRentFiltered, thirdMaxRentFiltered, secondMaxRentFiltered, firstMaxRentFiltered, filterSelectionSection, filterSelectionUl, filterMaxRent, firstMinRentAll, secondMinRentAll, thirdMinRentAll, firstMaxRentAll, secondMaxRentAll, thirdMaxRentAll, filterBathrooms, filterMoveInDate, filterCounter, mapsContainer, firstViewBtn, secondViewBtn, secondExpandedViewBtn, thirdViewBtn, views, firstView, secondView, buildingBlocks, blockLinks, firstViewPopovers, backToFirstViewBtn, backToSecondExpandedViewBtn, secondViewHeader, levelNav, firstLevel, levelUpCtrl, levelDownCtrl, levelStackedCtrl, selectedLevel, levelsTotal, isExpanded, isNavigating, numberViewPopovers, levelsContainer, levels, secondViewStackedHeader, filteredUnit, allAvailableUnits, pins, spaceref, unitNumber, unitFloor, unitBedCount, unitBathCount, unitSqFt, unitPrice, unitDepositAmount;
	
	
	function init() {
		
		// units and filters
		moreFilters = $('#more-filters');
		expandBtn = $('#more-filters-btn');
		filtersContainer = $('.more-filters-container');
		clearFiltersBtn = $('#clear-all-filters');
		applyFiltersBtn = $('#apply-filters-btn');
		filteredUnit = $('[data-filter]');
		allAvailableUnits = $('.all-available-units');
		thirdStackUnitsAll = $('.svg-container__part3 .all-available-units').length; 
		secondStackUnitsAll = $('.svg-container__part2 .all-available-units').length; 
		firstStackUnitsAll = $('.svg-container__part1 .all-available-units').length; 

		filterBedrooms = $('#filter-bedrooms');
		filterSelectionSection = $('.filter-selections');
		filterMaxRent = $('#filter-max-rent');
		
		filterBathrooms = $('#filter-bathrooms');
		filterMoveInDate = $('#filter-available-date');
		
		// structure
		tabsBtns = $('.nav-icon');
		mapsContainer = $('#interactive-site-map');
		firstViewBtn = $('.first-view-btn');
		secondViewBtn = $('.second-view-btn');
		secondExpandedViewBtn = $('.second-expanded-view-btn');
		thirdViewBtn = $('.third-view-btn');
		views = $('.views');
		firstView = $('.first-view');
		secondView = $('.second-view');
		buildingBlocks = $('.first-view svg');
		blockLinks = $('.link-for-blocks');
		firstViewPopovers = $('.first-view .link-for-blocks');
		backToFirstViewBtn = $('.back-btn');
		backToSecondExpandedViewBtn = $('.back-to-single-plate__btn');
		secondViewHeader = $('.second-view-header');
		
		// levels and navigation up/down ctrls
		firstLevel = $('.level--1');
		levelNav = $('.levelnav');
		levelUpCtrl = $('.levelnav__button--up');
		levelDownCtrl = $('.levelnav__button--down');
		levelStackedCtrl = $('.levelnav__button--all-levels');
		isExpanded = false;
		isNavigating = false;
		levelsContainer = $('.levels');
		levels = $('.level');
		
		pins = $('.pin');
		unitNumber = $('.unit-number');
		unitFloor = $('.unit-floor');
		unitBedCount = $('.unit-bed-count');
		unitBathCount = $('.unit-bath-count');
		unitSqFt = $('.unit-sq-ft');
		unitPrice = $('.unit-price');
		unitDepositAmount = $('.deposit-amount');
	
		
		// delete later -- just FYI
		function calculateAllUnits() { console.log('available units: ' + allAvailableUnits.length);}
		calculateAllUnits();
		
		
		
		// ### 2. Some initial tasks e.g. load, initialize popovers & tabs, etc. 
		loadData();
		
		// make all interactive elems inside 'more filters' not focusable
		moreFilters.find(":focusable" ).attr( "tabindex", "-1" );
		filterSelectionSection.hide();

		// initialize and show all popovers
		$('[data-toggle="popover"]').popover('show'); 

		// DELETE LATER -- for testing only 
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

		
		
		// ### 3. Object with all reusable commands
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
				tabsBtns.addClass('boxbutton--disabled');
				secondView.removeClass('expanded-view-with-detail');
				firstViewBtn.addClass('active-tab').removeClass('boxbutton--disabled');
				setTimeout(function() {
					commands.showPopovers();
				}, 800); 
			},
			
			navigateToSecondView: function() {
				mapsContainer.addClass('view-change-1').removeClass('view-change-2');
				commands.navigateTabs();
				secondViewBtn.addClass('active-tab');
				secondViewBtn.removeClass('boxbutton--disabled');
				secondExpandedViewBtn.addClass('boxbutton--disabled'); // not working???
				thirdViewBtn.addClass('boxbutton--disabled');
				secondView.removeClass('expanded-view-with-detail');
				commands.hidePopovers();
				setTimeout(function() {
					commands.showPopovers();
				}, 800);
				
				if (isExpanded) {
					commands.showStackedLevels();
				}
			},
			
			navigateToSecondExpandedView: function() {
				mapsContainer.addClass('view-change-1').removeClass('view-change-2');
				commands.navigateTabs();
				secondExpandedViewBtn.addClass('active-tab').removeClass('boxbutton--disabled'); // not working????
				thirdViewBtn.addClass('boxbutton--disabled');
				secondView.removeClass('expanded-view-with-detail');
				pins.removeClass('pin--active');
				$('.all-available-units').removeAttr('data-active');
				setTimeout(function() {
					commands.showPopovers();
				}, 800); 
			},
			
			// when clicked on .nav-icon.third-view-btn OR clicked on interactive plate portion
			navigateToThirdView: function() {
				secondView.addClass('expanded-view-with-detail');
				mapsContainer.addClass('view-change-1 view-change-2');
				commands.navigateTabs();
				thirdViewBtn.addClass('active-tab');
				tabsBtns.removeClass('boxbutton--disabled'); // all tab nav btns are active
			},
			
			showFirstStack: function() {
				secondView.removeClass('second-view__part2 second-view__part3');
				secondView.addClass('second-view__part1');
				commands.setNavigationStateStacks();
				// add building highlight
				firstView.addClass('first-stack-displayed');
				firstView.removeClass('second-stack-displayed third-stack-displayed');
				secondViewHeader.text('Floors 1 - 4 (Lower Third)');
			},
			
			showSecondStack: function() {
				secondView.removeClass('second-view__part1 second-view__part3');
				secondView.addClass('second-view__part2');
				commands.setNavigationStateStacks();
				// add building highlight
				firstView.addClass('second-stack-displayed');
				firstView.removeClass('first-stack-displayed third-stack-displayed');
				secondViewHeader.text('Floors 5 - 8 (Middle Third)');
			},
			
			showThirdStack: function() {
				secondView.removeClass('second-view__part1 second-view__part2');
				secondView.addClass('second-view__part3');
				commands.setNavigationStateStacks();
				// add building hightlight
				firstView.addClass('third-stack-displayed');
				firstView.removeClass('first-stack-displayed second-stack-displayed');
				secondViewHeader.text('Floors 9 - 12 (Upper Third)');
			},
			
			// set up popovers
			setPopovers: function(numberView) {

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
			},
			
			showPopovers: function() {
				firstViewPopovers.popover('show');
				// if active filter
				if (allAvailableUnits.length !== $('[data-filter]').length) {
					commands.updatePopoversFilteredNumbers();
				} else {
					commands.setInitialPopoversNumbers();
				}
			},
			
			getInitialRentPricesRange: function() {
				// get array of all data-rentprice values for each stack
				var thirdPriceArray = [];
				var secondPriceArray = [];
				var firstPriceArray = [];
				
				$('.svg-container__part3 [data-rentprice]').each(function() {
					thirdPriceArray.push($(this).attr('data-rentprice'));
				});
				$('.svg-container__part2 [data-rentprice]').each(function() {
					secondPriceArray.push($(this).attr('data-rentprice'));
				});
				$('.svg-container__part1 [data-rentprice]').each(function() {
					firstPriceArray.push($(this).attr('data-rentprice'));
				});
				
				firstMinRentAll = Math.min.apply(Math, firstPriceArray);
				secondMinRentAll = Math.min.apply(Math, secondPriceArray);
				thirdMinRentAll = Math.min.apply(Math, thirdPriceArray);
				
				firstMaxRentAll = Math.max.apply(Math, firstPriceArray);
				secondMaxRentAll = Math.max.apply(Math, secondPriceArray);
				thirdMaxRentAll = Math.max.apply(Math, thirdPriceArray);
				
			},
			
			// put back all data-filter to all .all-available-units
			resetAllAvailability: function() {
				allAvailableUnits.each(function() {
					$(this).attr('data-filter', true);
					pins.removeClass('hidden');
				});
			},
			
			// dynamically insert availability into popovers
			setInitialPopoversNumbers: function() {
				
				commands.resetAllAvailability();
				
				$('#popover0 .popover-availability span').text(thirdStackUnitsAll);
				$('#popover1 .popover-availability span').text(secondStackUnitsAll);
				$('#popover2 .popover-availability span').text(firstStackUnitsAll);
				
				$('#popover0 .min-rent').text(thirdMinRentAll);
				$('#popover0 .max-rent').text(thirdMaxRentAll);
				$('#popover1 .min-rent').text(secondMinRentAll);
				$('#popover1 .max-rent').text(secondMaxRentAll);
				$('#popover2 .min-rent').text(firstMinRentAll);
				$('#popover2 .max-rent').text(firstMaxRentAll);
			},
			
			hidePopovers: function() {
				firstViewPopovers.popover('hide');
			},
			
			showLevel: function(thisLevel) {
				
				// current .level should receive .level--current
				$(thisLevel).addClass('level--current');
				
				// get last digit
				selectedLevel = parseInt($(thisLevel).attr('data-levelnum'), 10);
				
				// add pins to floorplate
				$(thisLevel).find('.level__pins').addClass('level__pins--active');
				
				// calculate levelsTotal for THIS stack (b/c in future, stacks might contain different # of floors)
				levelsTotal = $('.level--current').closest('.svg-container').find('[data-levelnum]').length;

				// .levels should receive classes: levels--selected-4 levels--open
				levelsContainer.addClass('levels--open levels--selected-' + selectedLevel);

				// activate 3rd tab
				commands.navigateTabs();
				secondExpandedViewBtn.addClass('active-tab');
				secondExpandedViewBtn.removeClass('boxbutton--disabled');

				// update header using floor number
				secondViewStackedHeader = secondViewHeader.text();
				var floorNum = $('.level--current').attr('data-floor');
				secondViewHeader.text('Floor ' + floorNum).css('color', '#04b5fd');

				// navigation arrows
				backToFirstViewBtn.addClass('hidden');
				levelStackedCtrl.removeClass('hidden');

				// check if .boxbutton--disabled needs to be applied
				commands.setNavigationState();
				
				// means only 1 floor plate is visible (we are in 2nd Expanded View)
				isExpanded = true;
				
				// hide other stacks?

			},
			
			// Control navigation ctrls state for single plates. Add disable class to the respective ctrl when the current level is either the first or the last.
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
			
			// Control navigation ctrls state for stacks. Add/remove disable class
			setNavigationStateStacks: function() {
				if ( secondView.hasClass('second-view__part1') ) {
					levelDownCtrl.addClass('boxbutton--disabled');
					levelUpCtrl.removeClass('boxbutton--disabled');
				} else if ( secondView.hasClass('second-view__part2') ) {
					levelUpCtrl.removeClass('boxbutton--disabled');
					levelDownCtrl.removeClass('boxbutton--disabled');
				} else if ( secondView.hasClass('second-view__part3') ) {
					levelUpCtrl.addClass('boxbutton--disabled');
					levelDownCtrl.removeClass('boxbutton--disabled');
				}
			},
			
			// show the stacked view 
			showStackedLevels: function() {
				if( !isExpanded ) {
					return false;
				}
				isExpanded = false;

				levelsContainer.removeClass('levels--open levels--selected-' + selectedLevel);
				var currentLevel = $('.level--current');
				// hide pins from floorplate
				$('.level__pins').removeClass('level__pins--active');
				currentLevel.removeClass('level--current');

				// navigation arrows
				backToFirstViewBtn.removeClass('hidden');
				levelStackedCtrl.addClass('hidden');

				// activate 2nd tab
				commands.navigateTabs();
				secondViewBtn.addClass('active-tab');
				secondExpandedViewBtn.addClass('boxbutton--disabled');
				commands.setNavigationStateStacks();

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

				var prevSelectedLevel = selectedLevel;

				// current level
				var currentLevel = $('.level--' + selectedLevel);
				console.log(currentLevel); // --> .level.level--4

				if( direction === 'Up' && prevSelectedLevel > 1 ) {
					--selectedLevel;
					console.log("selectedLevel-- is " + selectedLevel); // --> 3
				}
				else if( direction === 'Down' && prevSelectedLevel < levelsTotal ) {
					++selectedLevel;
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
				var nextLevel = $('.level--' + nextLevelNum); 
				// ..becomes the current one
				nextLevel.addClass('level--current');
				// add pins to floorplate
				nextLevel.find('.level__pins').addClass('level__pins--active');

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
				currentLevel.removeClass('level__pins--active');

			},
			
			// more filters button
			expandFilters: function() {
				// to close
				if ( moreFilters.hasClass('open') ) {
					// if in Detail Unit view, take user to single plate view
					if ( secondView.hasClass('expanded-view-with-detail')) {
						backToSecondExpandedViewBtn.trigger('click');
					}
					filtersContainer.animate({
						opacity: 0
					}, 200, function() {
						moreFilters.removeClass('open').addClass('hidden-from-interaction');
					});
					expandBtn.text('+ More Filters');
					moreFilters.find(":focusable").attr( "tabindex", "-1" );

					if (filterCounter > 0) {
						filterSelectionSection.slideDown();
					}	
				// to open
				} else {
					// if in Detail Unit view, take user to single plate view
					if ( secondView.hasClass('expanded-view-with-detail')) {
						backToSecondExpandedViewBtn.trigger('click');
					}
					moreFilters.addClass('open').removeClass('hidden-from-interaction').find(":focusable").attr( "tabindex", "0" ).eq(0).focus();
					$(this).text('- Less Filters');
					filtersContainer.delay(200).animate({
						opacity: 1
					}, 200);
					filterSelectionSection.slideUp();	
				}
			},
			
			// reset all filters
			resetFilters: function() {
				moreFilters.find(":input", ":checkbox").val("").prop('checked', false).prop('selected', false);
				$("#any-ba").prop('checked', true);
				filterSelectionSection.slideUp().html('');
				filterCounter = 0;
			},
			
			applyFilters: function() {
				commands.expandFilters();
				filterSelectionSection.slideDown(300).html('');
				commands.buildActiveFiltersList();
			}, 
			
			buildActiveFiltersList: function() {
				filterSelectionUl =  '<ul class="filter-selections__ul flex-container">';
				
				filterCounter = 0;
				
				// max rent
				if ( filterMaxRent.val() !== '' ) {
					filterSelectionUl += '<li>Max Rent: $' + filterMaxRent.val() + ' <button class="delete-filter-btn delete-filter-btn__max-rent transparent-btn"><i class="iconm-cancel-circle2 close-tag-icon"></i></button></li>';
					filterCounter ++;
				}
				
				// bathrooms
				if ( filterBathrooms.val() !== 'all' ) {
					filterSelectionUl += '<li>' + filterBathrooms.val() + ' <button class="delete-filter-btn delete-filter-btn__bathrooms transparent-btn"><i class="iconm-cancel-circle2 close-tag-icon"></i></button></li>';
					filterCounter ++;
				}
				
				// move-in date
				if ( filterMoveInDate.val() !== 'all' ) {
					filterSelectionUl += '<li> Move In Date: ' + filterMoveInDate.find('option:selected').text() + ' <button class="delete-filter-btn delete-filter-btn__move-date transparent-btn"><i class="iconm-cancel-circle2 close-tag-icon"></i></button></li>';
					filterCounter ++;
				}
				
				// ALL cheched checkboxes (includes rush, specials and desired amenities)
				moreFilters.find('input[type=checkbox]').each(function() {
					if ($(this).is(":checked")) {
						console.log($(this).val());
						filterSelectionUl += '<li>' + $(this).val() + ' <button class="delete-filter-btn delete-filter-btn__checkbox transparent-btn"><i class="iconm-cancel-circle2 close-tag-icon"></i></button></li>';
						filterCounter ++;
					}
				});
				
				
				filterSelectionUl += '</ul>';
				
				// if <ul> is empty, display message
				if ( filterCounter === 0) {
					filterSelectionUl = undefined;
					filterSelectionSection.append('<button id="close-filter-msg" class="transparent-btn m-b-sm"><i class="iconm-cancel-circle2 close-tag-icon"></i></button><p class="m-b-none blue text-uppercase" style="line-height:29px">You did not select any filters.</p>').css('display', 'flex');
				} else {
					filterSelectionSection.append(filterSelectionUl);
				}
				
			}, 
			
			calculateFilteredBedrooms: function(bedroomNum) {
				commands.resetAllAvailability();
				// check if maxRent filter is NOT active
				var maxRentNum = parseInt(filterMaxRent.val());
				if (isNaN(maxRentNum)) {
										
					// if both filters are empty
					if (bedroomNum === 'all') {
						commands.setInitialPopoversNumbers();
						commands.setFloorLabelAvailabilityNumber();
						return false; // stop all further calculations
					// if bedroom filter is active
					} else {
						allAvailableUnits.each(function() {
							if ($(this).attr('data-bedroom') !== bedroomNum) {
								$(this).removeAttr('data-filter');
								// find and hide corresponding icon
								spaceref = $(this).attr('data-space');
								$('.pin[data-space="' + spaceref + '"]').addClass('hidden');	  
							}
						});

						thirdStackUnitsFiltered = $('.svg-container__part3 [data-bedroom="' + bedroomNum + '"]');
						secondStackUnitsFiltered = $('.svg-container__part2 [data-bedroom="' + bedroomNum + '"]');
						firstStackUnitsFiltered = $('.svg-container__part1 [data-bedroom="' + bedroomNum + '"]');
					}
					
				// if maxRent is active
				} else {
					// we need a way to reset bedroom filter without resetting maxRent filter:	
					// commands.calculateFilteredMaxRent(maxRentNum); // I can't call this function b/c it creates infite loop
					// but I can manually refilter by maxRent:
					$('[data-filter]').each(function() {
						if ( parseInt($(this).attr("data-rentprice")) > maxRentNum) {
							$(this).removeAttr('data-filter');
							// find and hide corresponding icon
							spaceref = $(this).attr('data-space');
							$('.pin[data-space="' + spaceref + '"]').addClass('hidden');
						}
					});
					commands.filterByMaxRent(maxRentNum);
					
					// if bedroom filter is active
					if (filterBedrooms.val() !== 'all') {
						console.log('if maxRent filter is active AND Bedroom filter is active');
						$('[data-filter]').each(function() {
							if ($(this).attr('data-bedroom') !== bedroomNum) {
								$(this).removeAttr('data-filter');
								// find and hide corresponding icon
								spaceref = $(this).attr('data-space');
								$('.pin[data-space="' + spaceref + '"]').addClass('hidden');
							}
						});

						thirdStackUnitsFiltered = $('.svg-container__part3 [data-filter][data-bedroom="' + bedroomNum + '"]');
						secondStackUnitsFiltered = $('.svg-container__part2 [data-filter][data-bedroom="' + bedroomNum + '"]');
						firstStackUnitsFiltered = $('.svg-container__part1 [data-filter][data-bedroom="' + bedroomNum + '"]');
					} 		
				}
				commands.updatePopoversFilteredNumbers();
				commands.setFloorLabelAvailabilityNumber();
			}, 
			
			calculateFilteredMaxRent: function(maxRentNum) {
				
				// check if bedroom filter is NOT active
				if (filterBedrooms.val() === 'all') {
					
					commands.resetAllAvailability();
					
					// if maxRent is NaN (not active)
					if (isNaN(maxRentNum)) {
						commands.setInitialPopoversNumbers(); 
					// if maxRent filter is active:
					} else { 
						allAvailableUnits.each(function() {
							if ( parseInt($(this).attr("data-rentprice")) > maxRentNum) {
								$(this).removeAttr('data-filter');
								// find and hide corresponding icon
								spaceref = $(this).attr('data-space');
								$('.pin[data-space="' + spaceref + '"]').addClass('hidden');
							}
						});
						commands.filterByMaxRent(maxRentNum);
					}
				// if bedroom filter IS active:	
				} else {			
					commands.calculateFilteredBedrooms(filterBedrooms.val()); // this will also reset all availability 
					
					// if maxRent filter is active
					if (!isNaN(maxRentNum)) {
						console.log('if bedroom filter IS active AND maxRent filter is active');
						$('[data-filter]').each(function() {
							if ( parseInt($(this).attr("data-rentprice")) > maxRentNum) {
								$(this).removeAttr('data-filter');
								// find and hide corresponding icon
								spaceref = $(this).attr('data-space');
								$('.pin[data-space="' + spaceref + '"]').addClass('hidden');
							}
						});
						commands.filterByMaxRent(maxRentNum);
					} 
				}
				commands.updatePopoversFilteredNumbers();
				commands.setFloorLabelAvailabilityNumber();
			},
			
			filterByMaxRent: function(maxRentNum) {
				thirdStackUnitsFiltered = $('.svg-container__part3 [data-filter]').filter(function() {
					return parseInt($(this).attr("data-rentprice")) <= maxRentNum;
				});

				secondStackUnitsFiltered = $('.svg-container__part2 [data-filter]').filter(function() {
					return parseInt($(this).attr("data-rentprice")) <= maxRentNum;
				});

				firstStackUnitsFiltered = $('.svg-container__part1 [data-filter]').filter(function() {
					return parseInt($(this).attr("data-rentprice")) <= maxRentNum;
				});
			},
			
			updatePopoversFilteredNumbers: function() {
				$('#popover0 .popover-availability span').text(thirdStackUnitsFiltered.length);
				$('#popover1 .popover-availability span').text(secondStackUnitsFiltered.length);
				$('#popover2 .popover-availability span').text(firstStackUnitsFiltered.length);
				
				// get array of all data-rentprice values for each stack
				var thirdPriceArray = [];
				var secondPriceArray = [];
				var firstPriceArray = [];
				
				$('.svg-container__part3 [data-filter]').each(function() {
					thirdPriceArray.push($(this).attr('data-rentprice'));
				});
				$('.svg-container__part2 [data-filter]').each(function() {
					secondPriceArray.push($(this).attr('data-rentprice'));
				});
				$('.svg-container__part1 [data-filter]').each(function() {
					firstPriceArray.push($(this).attr('data-rentprice'));
				});
				
				thirdMinRentFiltered = Math.min.apply(Math, thirdPriceArray);
				secondMinRentFiltered = Math.min.apply(Math, secondPriceArray);
				firstMinRentFiltered = Math.min.apply(Math, firstPriceArray);
			
				thirdMaxRentFiltered = Math.max.apply(Math, thirdPriceArray);
				secondMaxRentFiltered = Math.max.apply(Math, secondPriceArray);
				firstMaxRentFiltered = Math.max.apply(Math, firstPriceArray);
				
				// if nothing available, don't calculate min/max -- just set it to 0
				// but check each stack
				if (thirdStackUnitsFiltered.length === 0) {
					$('#popover0 .min-rent, #popover0 .max-rent').text('0');
				} else {
					$('#popover0 .min-rent').text(thirdMinRentFiltered);
					$('#popover0 .max-rent').text(thirdMaxRentFiltered);
				}
				
				if (secondStackUnitsFiltered.length === 0) {
					$('#popover1 .min-rent, #popover1 .max-rent').text('0');
				} else {
					$('#popover1 .min-rent').text(secondMinRentFiltered);
					$('#popover1 .max-rent').text(secondMaxRentFiltered);
				}
				
				if (firstStackUnitsFiltered.length === 0) {
					$('#popover2 .min-rent, #popover2 .max-rent').text('0');
				} else {
					$('#popover2 .min-rent').text(firstMinRentFiltered);
					$('#popover2 .max-rent').text(firstMaxRentFiltered);
				}			
			},
			
			setFloorLabelAvailabilityNumber: function() {
				// check each .level for available units and update the label
				$('.level').each(function() {
					var availableUnitsTotal = $(this).find('[data-filter]').length;
					var floorLabel = $(this).find('.floor-labels');
					floorLabel.find('span').text(availableUnitsTotal);
					if (availableUnitsTotal === 0) {
						floorLabel.removeClass('available-units');
					} else {
						floorLabel.addClass('available-units');
					}
				});
			}
			
		}; // end of 'commands' var
	
		
		
		// ### 4. More init set up actions
		commands.setPopovers("first-view"); // add classes and id's to popovers
		commands.getInitialRentPricesRange();
		commands.setInitialPopoversNumbers();
		commands.setFloorLabelAvailabilityNumber();
		// dynamically add bathrooms, square footage and deposit amount
		allAvailableUnits.each(function() {
			if ($(this).attr('data-bedroom') === '0') {
				$(this).attr('data-bathroom', 1);
				$(this).attr('data-sqft', 536);
				$(this).attr('data-deposit', 500);
			} else if($(this).attr('data-bedroom') === '1') {
				$(this).attr('data-bathroom', 1);
				$(this).attr('data-sqft', 779);
				$(this).attr('data-deposit', 1000);
			} else if ($(this).attr('data-bedroom') === '2') {
				$(this).attr('data-bathroom', 2);
				$(this).attr('data-sqft', 952);
				$(this).attr('data-deposit', 1500);
			}
		});
		
		
		
		
		// ### 5. All events handlers
		
		// filters
		expandBtn.on('click', commands.expandFilters);
		
		// click 'Clear All' filters btn 
		clearFiltersBtn.on('click', function() {
			commands.resetFilters();
			commands.expandFilters();
			commands.setInitialPopoversNumbers();
		});
		
		applyFiltersBtn.on('click', commands.applyFilters);
		
		// to close filter message w/o active filter selection 
		filterSelectionSection.on('click', '#close-filter-msg', function() {
			filterSelectionSection.slideUp().html('');	
		});
		
		// to delete filter tag and corresponding filter
		filterSelectionSection.on('click', '.delete-filter-btn', function() {
			$(this).parent().remove();
			filterCounter--;
			if (filterCounter === 0) {
				filterSelectionSection.slideUp().html('');
				commands.resetFilters();
			}
			
			// it should also find a corresponding input and uncheck it
			// if it's for checkbox
			if ($(this).hasClass('delete-filter-btn__checkbox')) {
				// find checkbox with this label and uncheck it
				var str =  $(this).parent().text();
				moreFilters.find(":checkbox[value='" + $.trim(str) + "']").prop("checked", false);
			} else if ($(this).hasClass('delete-filter-btn__max-rent')) {
				filterMaxRent.val('');
			} else if ($(this).hasClass('delete-filter-btn__bathrooms')) {
				filterBathrooms.find('option:selected').prop('selected', false);
			} else if ($(this).hasClass('delete-filter-btn__move-date')) {
				filterMoveInDate.find('option:selected').prop('selected', false);
			}
			
			commands.calculateFilteredBedrooms(filterBedrooms.val()); // it works BUT popovers info is not updating
			
			
			
			
			
		});
		
		filterBedrooms.on('change', function() {
			// get selected val
			var bedroomNum = this.value;
			commands.calculateFilteredBedrooms(bedroomNum);
			
		});
		
		filterMaxRent.on('change', function() {
			// get entered input value, turn into integer, pass into a function
			var maxRentNum = parseInt(this.value);
			commands.calculateFilteredMaxRent(maxRentNum);
		});
		
		
		// Tabs navigation
		firstViewBtn.on('click', commands.navigateToFirstView);
		
		secondViewBtn.on('click', function() {
			if ($(this).hasClass('boxbutton--disabled')) { return false; }
			commands.navigateToSecondView();
		});
		
		secondExpandedViewBtn.on('click', function() {
			if ($(this).hasClass('boxbutton--disabled')) { return false; }
			commands.navigateToSecondExpandedView();
			secondExpandedViewBtn.removeClass('boxbutton--disabled');
		});
		
		thirdViewBtn.on('click', function() {
			if ($(this).hasClass('boxbutton--disabled')) { return false; }
			commands.navigateToThirdView();
		});
		
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
		
		// clicking on building blocks brings correct stack
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
		
		// clicking on first-view popovers brings correct stack
		$('.first-view-popovers').on('click', function() {
			console.log('popover clicked');
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
				
		// clicking 'Back' btn from Stacked to building view
		backToFirstViewBtn.on('click', function() {
			if (isExpanded) {
				commands.showStackedLevels();
			} else {
				commands.navigateToFirstView();
			}
		});
		
		// clicking 'Back' btn from Detail Unit view to single floor plate view
		backToSecondExpandedViewBtn.on('click', function() {
			commands.navigateToSecondExpandedView();
			secondView.removeClass('expanded-view-with-detail');
		});
		
		
		// clicking on stacked floor plate, shows this plate in expanded view
		levels.on('click', function() {
			var thisLevel = this;
			commands.showLevel(thisLevel);
		});
		
		// 'up' and 'down' arrows for navigating through stacks OR levels (depending on 'expanded')
		levelUpCtrl.on('click', function() {
			if (isExpanded) {
				// means we're navigating thru levels
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
		
		// clicking 'stack' nav btn
		levelStackedCtrl.on('click', function() {
			commands.showStackedLevels();
		});
		
		// clicking on SVG hot spot -- NOT USED ANYMORE b/c user clicks on pins now
		filteredUnit.on('click', function(e) {
			// allow clicking only when not stacked (when single plate is shown)
			if (isExpanded) {
				e.stopPropagation(); // to prevent showLevel() invokation
				// get data-space attribute 
				spaceref = $(this).attr('data-space');
				console.log(spaceref);
				// find pin with same data-space attribute and add .pin--active
				$('.pin[data-space="' + spaceref + '"]').addClass('pin--active');
				commands.navigateToThirdView();
			}
			
		});
		
		// clickin on a pin
		$('.level').on('click', '.level__pins--active .pin', function(e) {
			e.preventDefault(); // prevents page jumpingj
			pins.removeClass('pin--active');
			e.stopPropagation(); // to prevent showLevel() invokation
			// get data-space attribute 
			spaceref = $(this).attr('data-space');
			// find pin with same data-space attribute and add .pin--active
			$(this).addClass('pin--active');
			$('.all-available-units').removeAttr('data-active');
			$('.all-available-units[data-space="' + spaceref + '"]').attr('data-active', 'true');
			commands.navigateToThirdView();
			
			// update Detail Page
			unitNumber.text(spaceref);
			unitFloor.text($('.all-available-units[data-space="' + spaceref + '"]').closest('[data-floor]').attr('data-floor'));
			unitBedCount.text($('.all-available-units[data-space="' + spaceref + '"]').attr('data-bedroom'));
			unitBathCount.text($('.all-available-units[data-space="' + spaceref + '"]').attr('data-bathroom'));
			unitSqFt.text($('.all-available-units[data-space="' + spaceref + '"]').attr('data-sqft'));
			unitPrice.text('$' + $('.all-available-units[data-space="' + spaceref + '"]').attr('data-rentprice'));
			unitDepositAmount.text($('.all-available-units[data-space="' + spaceref + '"]').attr('data-deposit'));
			
		});
		
		
		
		// ### 6. Some more init functions and commands

		// Loads data from JSON to create 1st view.  Some initial tasks e.g. load data, initialize popovers & tabs, etc. 
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

	} // end of 'init' function
	
	
	

	
	$(document).ready(init);

})(jQuery);

