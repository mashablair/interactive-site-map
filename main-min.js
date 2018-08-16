!function($){"use strict";function e(){a=$("#more-filters"),t=$(".nav-icon"),i=$("#more-filters-btn"),n=$(".more-filters-container"),l=$("#clear-all-filters"),d=$("#interactive-site-map"),c=$(".first-view-btn"),v=$(".second-view-btn"),r=$(".second-expanded-view-btn"),w=$(".third-view-btn"),p=$(".views"),u=$(".first-view"),h=$(".second-view"),f=$(".first-view svg"),b=null,C=$(".link-for-blocks"),k=$(".first-view .link-for-blocks"),g=$(".back-btn"),m=$(".second-view-header"),_=$(".level--1"),T=$(".levelnav"),x=$(".levelnav__button--up"),S=$(".levelnav__button--down"),F=$(".levelnav__button--all-levels"),y=null,V=null,L=!1,P=!1,D=null,N=$(".levels"),z=$(".level"),E=null,O=$(".available-unit"),U=!1,a.find(":focusable").attr("tabindex","-1");var e=location.href;console.log(e),$(window).width()>=1400&&(U=!0),$('[data-toggle="popover"]').popover("show"),o("first-view"),$(".first-view h2").on("click",function(){s.showPopovers()}),$(window).resize(function(){s.hidePopovers(),clearTimeout(window.resizedFinished),window.resizedFinished=setTimeout(function(){s.showPopovers()},800)}),$("#unitDetailTabs a").click(function(e){e.preventDefault(),$(this).tab("show")}),$(".carousel").carousel();var s={navigateTabs:function(){t.removeClass("active-tab")},navigateToFirstView:function(){s.hidePopovers(),d.removeClass("view-change-1 view-change-2"),s.showPopovers(),s.navigateTabs(),c.addClass("active-tab"),setTimeout(function(){s.showPopovers()},800)},navigateToSecondView:function(){d.addClass("view-change-1").removeClass("view-change-2"),s.navigateTabs(),v.addClass("active-tab"),s.hidePopovers(),setTimeout(function(){s.showPopovers()},800)},navigateToSecondExpandedView:function(){d.addClass("view-change-1").removeClass("view-change-2"),s.navigateTabs(),r.addClass("active-tab"),_.trigger("click"),$('[data-toggle="popover"]').popover("show")},navigateToThirdView:function(){d.addClass("view-change-1 view-change-2"),s.navigateTabs(),w.addClass("active-tab"),h.addClass("expanded-view-with-detail")},showFirstStack:function(){h.removeClass("second-view__part2 second-view__part3"),h.addClass("second-view__part1"),S.addClass("boxbutton--disabled"),x.removeClass("boxbutton--disabled"),u.addClass("first-stack-displayed"),u.removeClass("second-stack-displayed third-stack-displayed")},showSecondStack:function(){h.removeClass("second-view__part1 second-view__part3"),h.addClass("second-view__part2"),x.removeClass("boxbutton--disabled"),S.removeClass("boxbutton--disabled"),u.addClass("second-stack-displayed"),u.removeClass("first-stack-displayed third-stack-displayed")},showThirdStack:function(){h.removeClass("second-view__part1 second-view__part2"),h.addClass("second-view__part3"),x.addClass("boxbutton--disabled"),S.removeClass("boxbutton--disabled"),u.addClass("third-stack-displayed"),u.removeClass("first-stack-displayed second-stack-displayed")},showPopovers:function(){k.popover("show")},hidePopovers:function(){k.popover("hide")},showLevel:function(){V=$("[data-levelnum]").length,N.addClass("levels--open levels--selected-"+y),s.navigateTabs(),r.addClass("active-tab"),E=m.text(),m.text("Floor "+y).css("color","#04b5fd"),g.addClass("hidden"),F.removeClass("hidden"),s.setNavigationState(),L=!0},setNavigationState:function(){1===y?S.addClass("boxbutton--disabled"):S.removeClass("boxbutton--disabled"),y===V?x.addClass("boxbutton--disabled"):x.removeClass("boxbutton--disabled")},showStackedLevels:function(){if(!L)return!1;L=!1,N.removeClass("levels--open levels--selected-"+y),$(".level--current").removeClass("level--current"),g.removeClass("hidden"),F.addClass("hidden"),s.navigateTabs(),v.addClass("active-tab"),m.text(E).css("color","")},navigate:function(e){if(!L)return!1;P=!0,console.log("selectedLevel is "+y);var o=y;console.log("prevSelectedLevel "+o),console.log(z);var a=$(".level--"+y);if(console.log(a),"Up"===e&&o>1)--y,console.log("selectedLevel-- is "+y);else{if(!("Down"===e&&o<V))return P=!1,!1;++y,console.log("selectedLevel++ is "+y)}s.setNavigationState(),a.addClass("level--moveOut"+e);var t=y;console.log("nextLevelNum is "+t);var i=$(".level--"+t);console.log(i),i.addClass("level--current"),a.removeClass("level--moveOut"+e),setTimeout(function(){a.removeClass("level--current")},60),N.removeClass("levels--selected-"+o),N.addClass("levels--selected-"+y),m.text("Floor "+y),P=!1},expandFilters:function(){a.hasClass("open")?(n.animate({opacity:0},200,function(){a.removeClass("open"),s.showPopovers()}),$(this).text("+ More Filters"),a.find(":focusable").attr("tabindex","-1")):(a.addClass("open").find(":focusable").attr("tabindex","0").eq(0).focus(),$(this).text("- Less Filters"),n.delay(200).animate({opacity:1},200),s.hidePopovers())},resetFilters:function(){$("#map-header, #more-filters").find(":input",":checkbox").val("").prop("checked",!1).prop("selected",!1),$("#any-ba").prop("checked",!0)}};t.on("click",s.navigateTabs),i.on("click",s.expandFilters),l.on("click",s.resetFilters),$("#link0").on("click",s.showThirdStack),$("#link1").on("click",s.showSecondStack),$("#link2").on("click",s.showFirstStack),c.on("click",s.navigateToFirstView),v.on("click",function(){L?s.showStackedLevels():s.navigateToSecondView()}),r.on("click",s.navigateToSecondExpandedView),w.on("click",s.navigateToThirdView),C.on({hover:function(){var e=$(this).attr("id"),s=e.substr(e.length-1);$("#popover"+s).find(".popover-title").addClass("in-focus")},mouseout:function(){$(".first-view-popovers .popover-title").removeClass("in-focus")}}),C.on("click",function(){s.navigateToSecondView()}),$(".link-for-blocks, .first-view-popovers").on("click",s.navigateToSecondView),g.on("click",function(){L?s.showStackedLevels():$(window).width()>=1400?(s.navigateToSecondView(),h.removeClass("expanded-view-with-detail")):(s.navigateToFirstView(),h.removeClass("expanded-view-with-detail"))}),z.on("click",function(){console.log($(this)),$(this).addClass("level--current"),y=parseInt($(this).attr("data-levelnum"),10),console.log("selectedLevel is "+y),s.showLevel()}),x.on("click",function(){L?s.navigate("Down"):h.hasClass("second-view__part1")?s.showSecondStack():h.hasClass("second-view__part2")&&s.showThirdStack()}),S.on("click",function(){L?s.navigate("Up"):h.hasClass("second-view__part3")?s.showSecondStack():h.hasClass("second-view__part2")&&s.showFirstStack()}),F.on("click",function(){s.showStackedLevels(),s.navigateToSecondView()}),O.on("click",function(e){e.stopPropagation(),$(".second-view").addClass("expanded-view-with-detail"),s.navigateToThirdView()})}function s(){}function o(e){D=$("."+e).find(".popover").addClass("first-view-popovers"),C.each(function(e){$(this).attr("id","link"+e)}),D.each(function(e){$(this).attr("id","popover"+e)})}var a,t,i,n,l,d,c,v,r,w,p,u,h,f,b,C,k,g,m,T,_,x,S,F,y,V,L,P,D,N,z,E,O,U;$(document).ready(e)}(jQuery);