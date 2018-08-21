!function($){"use strict";function e(){a=$("#more-filters"),o=$(".nav-icon"),i=$("#more-filters-btn"),l=$(".more-filters-container"),n=$("#clear-all-filters"),d=$("#apply-filters-btn"),c=$(".filter-selections"),p=$("#interactive-site-map"),h=$(".first-view-btn"),w=$(".second-view-btn"),u=$(".second-expanded-view-btn"),f=$(".third-view-btn"),b=$(".views"),C=$(".first-view"),k=$(".second-view"),g=$(".first-view svg"),x=$(".link-for-blocks"),T=$(".first-view .link-for-blocks"),_=$(".back-btn"),S=$(".second-view-header"),y=$(".level--1"),F=$(".levelnav"),L=$(".levelnav__button--up"),V=$(".levelnav__button--down"),P=$(".levelnav__button--all-levels"),U=!1,N=!1,A=$(".levels"),E=$(".level"),O=$(".available-unit"),a.find(":focusable").attr("tabindex","-1"),c.hide();var e=location.href;console.log(e),$('[data-toggle="popover"]').popover("show"),t("first-view"),$(".first-view h2").on("click",function(){s.showPopovers()}),$(window).resize(function(){s.hidePopovers(),clearTimeout(window.resizedFinished),window.resizedFinished=setTimeout(function(){s.showPopovers()},800)}),$("#unitDetailTabs a").click(function(e){e.preventDefault(),$(this).tab("show")}),$(".carousel").carousel();var s={navigateTabs:function(){o.removeClass("active-tab")},navigateToFirstView:function(){s.hidePopovers(),p.removeClass("view-change-1 view-change-2"),s.showPopovers(),s.navigateTabs(),h.addClass("active-tab"),setTimeout(function(){s.showPopovers()},800)},navigateToSecondView:function(){p.hasClass("view-change-1")||(p.addClass("view-change-1").removeClass("view-change-2"),s.navigateTabs(),w.addClass("active-tab"),s.hidePopovers(),setTimeout(function(){s.showPopovers()},800))},navigateToSecondExpandedView:function(){p.addClass("view-change-1").removeClass("view-change-2"),s.navigateTabs(),u.addClass("active-tab"),y.trigger("click"),$('[data-toggle="popover"]').popover("show")},navigateToThirdView:function(){p.addClass("view-change-1 view-change-2"),s.navigateTabs(),f.addClass("active-tab"),k.addClass("expanded-view-with-detail")},showFirstStack:function(){k.removeClass("second-view__part2 second-view__part3"),k.addClass("second-view__part1"),V.addClass("boxbutton--disabled"),L.removeClass("boxbutton--disabled"),C.addClass("first-stack-displayed"),C.removeClass("second-stack-displayed third-stack-displayed"),S.text("Floors 1 - 4 (Lower Third)")},showSecondStack:function(){k.removeClass("second-view__part1 second-view__part3"),k.addClass("second-view__part2"),L.removeClass("boxbutton--disabled"),V.removeClass("boxbutton--disabled"),C.addClass("second-stack-displayed"),C.removeClass("first-stack-displayed third-stack-displayed"),S.text("Floors 5 - 8 (Middle Third)")},showThirdStack:function(){k.removeClass("second-view__part1 second-view__part2"),k.addClass("second-view__part3"),L.addClass("boxbutton--disabled"),V.removeClass("boxbutton--disabled"),C.addClass("third-stack-displayed"),C.removeClass("first-stack-displayed second-stack-displayed"),S.text("Floors 9 - 12 (Upper Third)")},showPopovers:function(){T.popover("show")},hidePopovers:function(){T.popover("hide")},showLevel:function(){M=$("[data-levelnum]").length,A.addClass("levels--open levels--selected-"+D),s.navigateTabs(),u.addClass("active-tab"),I=S.text();var e=$(".level--current").attr("data-floor");S.text("Floor "+e).css("color","#04b5fd"),_.addClass("hidden"),P.removeClass("hidden"),s.setNavigationState(),U=!0},setNavigationState:function(){1===D?V.addClass("boxbutton--disabled"):V.removeClass("boxbutton--disabled"),D===M?L.addClass("boxbutton--disabled"):L.removeClass("boxbutton--disabled")},showStackedLevels:function(){if(!U)return!1;U=!1,A.removeClass("levels--open levels--selected-"+D),$(".level--current").removeClass("level--current"),_.removeClass("hidden"),P.addClass("hidden"),s.navigateTabs(),w.addClass("active-tab"),k.hasClass("second-view__part1")?S.text("Floors 1 - 4 (Lower Third)"):k.hasClass("second-view__part2")?S.text("Floors 5 - 8 (Middle Third)"):k.hasClass("second-view__part3")&&S.text("Floors 9 - 12 (Upper Third)"),S.css("color","")},navigate:function(e){if(!U)return!1;N=!0,console.log("selectedLevel is "+D);var t=D;console.log("prevSelectedLevel "+t),console.log(E);var a=$(".level--"+D);if(console.log(a),"Up"===e&&t>1)--D,console.log("selectedLevel-- is "+D);else{if(!("Down"===e&&t<M))return N=!1,!1;++D,console.log("selectedLevel++ is "+D)}s.setNavigationState(),a.addClass("level--moveOut"+e);var o=D;console.log("nextLevelNum is "+o);var i=$(".level--"+o);console.log(i),i.addClass("level--current"),a.removeClass("level--moveOut"+e),setTimeout(function(){a.removeClass("level--current")},60),A.removeClass("levels--selected-"+t),A.addClass("levels--selected-"+D),S.text("Floor "+D),N=!1},expandFilters:function(){a.hasClass("open")?(l.animate({opacity:0},200,function(){a.removeClass("open").addClass("hidden-from-interaction"),s.showPopovers()}),i.text("+ More Filters"),a.find(":focusable").attr("tabindex","-1")):(a.addClass("open").removeClass("hidden-from-interaction").find(":focusable").attr("tabindex","0").eq(0).focus(),$(this).text("- Less Filters"),l.delay(200).animate({opacity:1},200),s.hidePopovers())},resetFilters:function(){$("#more-filters").find(":input",":checkbox").val("").prop("checked",!1).prop("selected",!1),$("#any-ba").prop("checked",!0),c.slideUp(),s.expandFilters()},applyFilters:function(){s.expandFilters(),c.slideDown(300).html(""),s.buildActiveFiltersList()},buildActiveFiltersList:function(){r='<ul class="filter-selections__ul flex-container">',v=0;var e=$("#filter-bedrooms"),s=$("#filter-max-rent"),t=$("#filter-bathrooms"),a=$("#filter-available-date"),o=$("#rush-only"),i=$("#specials-only"),l=$("#amenities-list");"all"!==e.val()&&(r+="<li>"+e.val()+"</li>",v++),""!==s.val()&&(r+="<li>Max Rent: $"+s.val()+"</li>",v++),"all"!==t.val()&&(r+="<li>"+t.val()+"</li>",v++),"all"!==a.val()&&(r+="<li> Move In Date: "+a.find("option:selected").text()+"</li>",v++),$("#more-filters input[type=checkbox]").each(function(){$(this).is(":checked")&&(console.log(this),r+="<li>"+$(this).parent().text()+"</li>",v++)}),r+="</ul>",0===v?(r=void 0,c.append('<p class="m-l-md blue text-uppercase">You did not select any filters.</p>')):c.append(r)}};o.on("click",s.navigateTabs),i.on("click",s.expandFilters),n.on("click",s.resetFilters),d.on("click",s.applyFilters),h.on("click",s.navigateToFirstView),w.on("click",function(){U?s.showStackedLevels():s.navigateToSecondView()}),u.on("click",s.navigateToSecondExpandedView),f.on("click",s.navigateToThirdView),x.on({hover:function(){var e=$(this).attr("id"),s=e.substr(e.length-1);$("#popover"+s).find(".popover-title").addClass("in-focus")},mouseout:function(){$(".first-view-popovers .popover-title").removeClass("in-focus")}}),x.on("click",function(){U&&s.showStackedLevels(),"link0"===$(this).attr("id")?s.showThirdStack():"link1"===$(this).attr("id")&&s.showSecondStack(),"link2"===$(this).attr("id")&&s.showFirstStack(),s.navigateToSecondView()}),$(".first-view-popovers").on("click",function(){"popover0"===$(this).attr("id")?s.showThirdStack():"popover1"===$(this).attr("id")&&s.showSecondStack(),"popover2"===$(this).attr("id")&&s.showFirstStack(),U&&s.showStackedLevels(),s.navigateToSecondView()}),_.on("click",function(){U?s.showStackedLevels():$(window).width()>=1400?(s.navigateToSecondView(),k.removeClass("expanded-view-with-detail")):(s.navigateToFirstView(),k.removeClass("expanded-view-with-detail"))}),E.on("click",function(){$(this).addClass("level--current"),D=parseInt($(this).attr("data-levelnum"),10),console.log("selectedLevel is "+D),s.showLevel()}),L.on("click",function(){U?s.navigate("Down"):k.hasClass("second-view__part1")?s.showSecondStack():k.hasClass("second-view__part2")&&s.showThirdStack()}),V.on("click",function(){U?s.navigate("Up"):k.hasClass("second-view__part3")?s.showSecondStack():k.hasClass("second-view__part2")&&s.showFirstStack()}),P.on("click",function(){s.showStackedLevels(),s.navigateToSecondView()}),O.on("click",function(e){e.stopPropagation(),$(".second-view").addClass("expanded-view-with-detail"),s.navigateToThirdView()})}function s(){}function t(e){z=$("."+e).find(".popover").addClass("first-view-popovers"),x.each(function(e){$(this).attr("id","link"+e)}),z.each(function(e){$(this).attr("id","popover"+e)})}var a,o,i,l,n,d,c,r,v,p,h,w,u,f,b,C,k,g,m,x,T,_,S,F,y,L,V,P,D,M,U,N,z,A,E,I,O;$(document).ready(e)}(jQuery);