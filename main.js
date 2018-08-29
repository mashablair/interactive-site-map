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
	var moreFilters, tabsBtns, expandBtn, filtersContainer, clearFiltersBtn, applyFiltersBtn, filterBedrooms, thirdStackUnitsAll, secondStackUnitsAll, firstStackUnitsAll, thirdStackUnitsFiltered, secondStackUnitsFiltered, firstStackUnitsFiltered, thirdMinRentFiltered, secondMinRentFiltered, firstMinRentFiltered, thirdMaxRentFiltered, secondMaxRentFiltered, firstMaxRentFiltered, filterSelectionSection, filterSelectionUl, filterMaxRent, firstMinRentAll, secondMinRentAll, thirdMinRentAll, firstMaxRentAll, secondMaxRentAll, thirdMaxRentAll, filterBathrooms, filterMoveInDate, filterCounter, mapsContainer, firstViewBtn, secondViewBtn, secondExpandedViewBtn, thirdViewBtn, views, firstView, secondView, buildingBlocks, blockLinks, firstViewPopovers, backBtn, secondViewHeader, levelNav, firstLevel, levelUpCtrl, levelDownCtrl, levelStackedCtrl, selectedLevel, levelsTotal, isExpanded, isNavigating, numberViewPopovers, levelsContainer, levels, secondViewStackedHeader, filteredUnit, allAvailableUnits;
	
	
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
		backBtn = $('.back-btn');
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
				
				// hide other stacks?

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
				// to close
				if ( moreFilters.hasClass('open') ) {
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
				} else {
					// to open 
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
					// if bedroom filter is active
					} else {
						allAvailableUnits.each(function() {
							if ($(this).attr('data-bedroom') !== bedroomNum) {
								$(this).removeAttr('data-filter');
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
						}
					});
					commands.filterByMaxRent(maxRentNum);
					
					// if bedroom filter is active
					if (filterBedrooms.val() !== 'all') {
						console.log('if maxRent filter is active AND Bedroom filter is active');
						$('[data-filter]').each(function() {
							if ($(this).attr('data-bedroom') !== bedroomNum) {
								$(this).removeAttr('data-filter');
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
		
		
		
		
		// ### 5. All events handlers
		tabsBtns.on('click', commands.navigateTabs);
		
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
				commands.setInitialPopoversNumbers(); // ***unless combined with other filters (esp. bedrooms)

			} else if ($(this).hasClass('delete-filter-btn__bathrooms')) {
				filterBathrooms.find('option:selected').prop('selected', false);
			} else if ($(this).hasClass('delete-filter-btn__move-date')) {
				filterMoveInDate.find('option:selected').prop('selected', false);
			}
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
			commands.navigateToSecondView(); 
		});
		
		// clicking on SVG hot spot
		filteredUnit.on('click', function(e) {
			e.stopPropagation(); // to prevent showLevel() invokation 
			$('.second-view').addClass('expanded-view-with-detail');
			commands.navigateToThirdView();
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

