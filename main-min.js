!function($){"use strict";function e(){s=$("#more-filters"),t=$(".nav-icon"),n=$("#more-filters-btn"),a=$(".more-filters-container"),l=$("#clear-all-filters"),c=$("#interactive-site-map"),v=$(".first-view-btn"),d=$(".second-view-btn"),r=$(".second-expanded-view-btn"),w=$(".third-view-btn"),p=$(".views"),u=$(".second-view"),h=$(".first-view svg"),f=null,g=$(".link-for-blocks"),b=$(".first-view .link-for-blocks"),C=$(".back-btn"),k=$(".second-view-header"),T=$(".level--1"),m=$(".levelnav"),S=$(".levelnav__button--up"),x=$(".levelnav__button--down"),_=$(".levelnav__button--all-levels"),V=null,F=null,L=!1,P=!1,y=null,M=$(".levels"),N=$(".level"),z=null,D=$(".available-unit"),s.find(":focusable").attr("tabindex","-1");var e=location.href;console.log(e),$('[data-toggle="popover"]').popover("show"),i("first-view"),$(".first-view h2").on("click",function(){o.showPopovers()}),$(window).resize(function(){o.hidePopovers(),clearTimeout(window.resizedFinished),window.resizedFinished=setTimeout(function(){o.showPopovers()},800)});var o={navigateTabs:function(){t.removeClass("active-tab")},splitViewMode:function(){p.addClass("split-view"),o.repositionPopovers()},noSplitViewMode:function(){p.removeClass("split-view"),o.repositionPopovers()},navigateToFirstView:function(){c.removeClass("view-change-1 view-change-2"),o.showPopovers(),o.navigateTabs(),v.addClass("active-tab"),$(window).width()>=1400&&o.noSplitViewMode()},navigateToSecondView:function(){c.addClass("view-change-1").removeClass("view-change-2"),o.navigateTabs(),d.addClass("active-tab"),$(window).width()>=1400&&o.splitViewMode()},navigateToSecondExpandedView:function(){c.addClass("view-change-1").removeClass("view-change-2"),o.navigateTabs(),r.addClass("active-tab"),T.trigger("click"),$('[data-toggle="popover"]').popover("show")},navigateToThirdView:function(){c.addClass("view-change-1 view-change-2"),o.navigateTabs(),w.addClass("active-tab"),u.addClass("expanded-view-with-detail")},showFirstStack:function(){u.removeClass("second-view__part2 second-view__part3"),u.addClass("second-view__part1")},showSecondStack:function(){u.removeClass("second-view__part1 second-view__part3"),u.addClass("second-view__part2")},showThirdStack:function(){u.removeClass("second-view__part1 second-view__part2"),u.addClass("second-view__part3")},showPopovers:function(){b.popover("show")},hidePopovers:function(){b.popover("hide")},repositionPopovers:function(){this.hidePopovers(),setTimeout(function(){o.showPopovers()},500)},showLevel:function(){F=$("[data-levelnum]").length,M.addClass("levels--open levels--selected-"+V),o.navigateTabs(),r.addClass("active-tab"),z=k.text(),k.text("Floor "+V).css("color","#04b5fd"),C.addClass("hidden"),_.removeClass("hidden"),o.setNavigationState(),L=!0},setNavigationState:function(){console.log("selectedLevel is "+V),console.log("levelsTotal is "+F),1===V?x.addClass("boxbutton--disabled"):x.removeClass("boxbutton--disabled"),V===F?S.addClass("boxbutton--disabled"):S.removeClass("boxbutton--disabled")},showStackedLevels:function(){if(!L)return!1;L=!1,M.removeClass("levels--open levels--selected-"+V),$(".level--current").removeClass("level--current"),C.removeClass("hidden"),_.addClass("hidden"),o.navigateTabs(),d.addClass("active-tab"),k.text(z).css("color","")},navigate:function(e){if(!L)return!1;P=!0,console.log("selectedLevel is "+V);var i=V;console.log("prevSelectedLevel "+i),console.log(N);var s=$(".level--"+V);if(console.log(s),"Up"===e&&i>1)--V,console.log("selectedLevel-- is "+V);else{if(!("Down"===e&&i<F))return P=!1,!1;++V,console.log("selectedLevel++ is "+V)}o.setNavigationState(),s.addClass("level--moveOut"+e);var t=V;console.log("nextLevelNum is "+t);var n=$(".level--"+t);console.log(n),n.addClass("level--current"),s.removeClass("level--moveOut"+e),setTimeout(function(){s.removeClass("level--current")},60),M.removeClass("levels--selected-"+i),M.addClass("levels--selected-"+V),k.text("Floor "+V),P=!1},expandFilters:function(){s.hasClass("open")?(a.animate({opacity:0},200,function(){s.removeClass("open"),o.showPopovers()}),$(this).text("+ More Filters"),s.find(":focusable").attr("tabindex","-1")):(s.addClass("open").find(":focusable").attr("tabindex","0").eq(0).focus(),$(this).text("- Less Filters"),a.delay(200).animate({opacity:1},200),o.hidePopovers())},resetFilters:function(){$("#map-header, #more-filters").find(":input",":checkbox").val("").prop("checked",!1).prop("selected",!1),$("#any-ba").prop("checked",!0)}};t.on("click",o.navigateTabs),n.on("click",o.expandFilters),l.on("click",o.resetFilters),h.on("click",o.splitViewMode),$("#link0").on("click",o.showThirdStack),$("#link1").on("click",o.showSecondStack),$("#link2").on("click",o.showFirstStack),v.on("click",o.navigateToFirstView),d.on("click",function(){L?o.showStackedLevels():o.navigateToSecondView()}),r.on("click",o.navigateToSecondExpandedView),w.on("click",o.navigateToThirdView),g.on({hover:function(){var e=$(this).attr("id"),o=e.substr(e.length-1);$("#popover"+o).find(".popover-title").addClass("in-focus")},mouseout:function(){$(".first-view-popovers .popover-title").removeClass("in-focus")}}),g.on("click",o.navigateToSecondView),$(".link-for-blocks, .first-view-popovers .popover-title, .first-view-popovers .popover-availability").on("click",o.navigateToSecondView),C.on("click",function(){L?o.showStackedLevels():$(window).width()>=1400?(o.navigateToSecondView(),u.removeClass("expanded-view-with-detail")):(o.navigateToFirstView(),u.removeClass("expanded-view-with-detail"))}),N.on("click",function(){console.log($(this)),$(this).addClass("level--current"),V=parseInt($(this).attr("data-levelnum"),10),console.log("selectedLevel is "+V),o.showLevel()}),S.on("click",function(){L?o.navigate("Down"):o.showSecondStack()}),x.on("click",function(){L?o.navigate("Up"):o.showFirstStack()}),_.on("click",function(){o.showStackedLevels(),o.navigateToSecondView()}),D.on("click",function(e){e.stopPropagation(),$(".second-view").addClass("expanded-view-with-detail"),o.navigateToThirdView()})}function o(){}function i(e){y=$("."+e).find(".popover").addClass("first-view-popovers"),g.each(function(e){$(this).attr("id","link"+e)}),y.each(function(e){$(this).attr("id","popover"+e)})}var s,t,n,a,l,c,v,d,r,w,p,u,h,f,g,b,C,k,m,T,S,x,_,V,F,L,P,y,M,N,z,D;$(document).ready(e)}(jQuery);