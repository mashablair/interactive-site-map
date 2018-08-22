!function($){"use strict";function e(){function e(){console.log("available units: "+Q.length)}function Y(){}t=$("#more-filters"),i=$("#more-filters-btn"),s=$(".more-filters-container"),l=$("#clear-all-filters"),o=$("#apply-filters-btn"),Q=$(".available-unit"),R=$(".all-available-units"),c=$(".svg-container__part3 .available-unit").length,r=$(".svg-container__part2 .available-unit").length,d=$(".svg-container__part1 .available-unit").length,n=$("#filter-bedrooms"),v=$(".filter-selections"),h=$("#filter-max-rent"),u=$("#filter-bathrooms"),b=$("#filter-available-date"),a=$(".nav-icon"),w=$("#interactive-site-map"),g=$(".first-view-btn"),m=$(".second-view-btn"),_=$(".second-expanded-view-btn"),C=$(".third-view-btn"),k=$(".views"),x=$(".first-view"),T=$(".second-view"),S=$(".first-view svg"),y=$(".link-for-blocks"),F=$(".first-view .link-for-blocks"),L=$(".back-btn"),P=$(".second-view-header"),N=$(".level--1"),V=$(".levelnav"),U=$(".levelnav__button--up"),A=$(".levelnav__button--down"),D=$(".levelnav__button--all-levels"),z=!1,B=!1,O=$(".levels"),j=$(".level"),e(),t.find(":focusable").attr("tabindex","-1"),v.hide(),$('[data-toggle="popover"]').popover("show"),$(".first-view h2").on("click",function(){G.showPopovers()}),$(window).resize(function(){G.hidePopovers(),clearTimeout(window.resizedFinished),window.resizedFinished=setTimeout(function(){G.showPopovers()},800)}),$("#unitDetailTabs a").click(function(e){e.preventDefault(),$(this).tab("show")}),$(".carousel").carousel();var G={navigateTabs:function(){a.removeClass("active-tab")},navigateToFirstView:function(){G.hidePopovers(),w.removeClass("view-change-1 view-change-2"),G.showPopovers(),G.navigateTabs(),g.addClass("active-tab"),setTimeout(function(){G.showPopovers()},800)},navigateToSecondView:function(){w.hasClass("view-change-1")||(w.addClass("view-change-1").removeClass("view-change-2"),G.navigateTabs(),m.addClass("active-tab"),G.hidePopovers(),setTimeout(function(){G.showPopovers()},800))},navigateToSecondExpandedView:function(){w.addClass("view-change-1").removeClass("view-change-2"),G.navigateTabs(),_.addClass("active-tab"),N.trigger("click"),$('[data-toggle="popover"]').popover("show")},navigateToThirdView:function(){w.addClass("view-change-1 view-change-2"),G.navigateTabs(),C.addClass("active-tab"),T.addClass("expanded-view-with-detail")},showFirstStack:function(){T.removeClass("second-view__part2 second-view__part3"),T.addClass("second-view__part1"),A.addClass("boxbutton--disabled"),U.removeClass("boxbutton--disabled"),x.addClass("first-stack-displayed"),x.removeClass("second-stack-displayed third-stack-displayed"),P.text("Floors 1 - 4 (Lower Third)")},showSecondStack:function(){T.removeClass("second-view__part1 second-view__part3"),T.addClass("second-view__part2"),U.removeClass("boxbutton--disabled"),A.removeClass("boxbutton--disabled"),x.addClass("second-stack-displayed"),x.removeClass("first-stack-displayed third-stack-displayed"),P.text("Floors 5 - 8 (Middle Third)")},showThirdStack:function(){T.removeClass("second-view__part1 second-view__part2"),T.addClass("second-view__part3"),U.addClass("boxbutton--disabled"),A.removeClass("boxbutton--disabled"),x.addClass("third-stack-displayed"),x.removeClass("first-stack-displayed second-stack-displayed"),P.text("Floors 9 - 12 (Upper Third)")},setPopovers:function(e){E=$("."+e).find(".popover").addClass("first-view-popovers"),y.each(function(e){$(this).attr("id","link"+e)}),E.each(function(e){$(this).attr("id","popover"+e)})},showPopovers:function(){F.popover("show"),G.setInitialAvailabilityNumbers()},setInitialAvailabilityNumbers:function(){$("#popover0 .popover-availability span").text(c),$("#popover1 .popover-availability span").text(r),$("#popover2 .popover-availability span").text(d),R.each(function(){$(this).attr("class","map__space all-available-units available-unit")}),console.log("initial count of all available units before any filtering is: "+Q.length)},hidePopovers:function(){F.popover("hide")},showLevel:function(){M=$("[data-levelnum]").length,O.addClass("levels--open levels--selected-"+I),G.navigateTabs(),_.addClass("active-tab"),q=P.text();var e=$(".level--current").attr("data-floor");P.text("Floor "+e).css("color","#04b5fd"),L.addClass("hidden"),D.removeClass("hidden"),G.setNavigationState(),z=!0},setNavigationState:function(){1===I?A.addClass("boxbutton--disabled"):A.removeClass("boxbutton--disabled"),I===M?U.addClass("boxbutton--disabled"):U.removeClass("boxbutton--disabled")},showStackedLevels:function(){if(!z)return!1;z=!1,O.removeClass("levels--open levels--selected-"+I),$(".level--current").removeClass("level--current"),L.removeClass("hidden"),D.addClass("hidden"),G.navigateTabs(),m.addClass("active-tab"),T.hasClass("second-view__part1")?P.text("Floors 1 - 4 (Lower Third)"):T.hasClass("second-view__part2")?P.text("Floors 5 - 8 (Middle Third)"):T.hasClass("second-view__part3")&&P.text("Floors 9 - 12 (Upper Third)"),P.css("color","")},navigate:function(e){if(!z)return!1;B=!0,console.log("selectedLevel is "+I);var t=I;console.log("prevSelectedLevel "+t),console.log(j);var a=$(".level--"+I);if(console.log(a),"Up"===e&&t>1)--I,console.log("selectedLevel-- is "+I);else{if(!("Down"===e&&t<M))return B=!1,!1;++I,console.log("selectedLevel++ is "+I)}G.setNavigationState(),a.addClass("level--moveOut"+e);var i=I;console.log("nextLevelNum is "+i);var s=$(".level--"+i);console.log(s),s.addClass("level--current"),a.removeClass("level--moveOut"+e),setTimeout(function(){a.removeClass("level--current")},60),O.removeClass("levels--selected-"+t),O.addClass("levels--selected-"+I),P.text("Floor "+I),B=!1},expandFilters:function(){t.hasClass("open")?(s.animate({opacity:0},200,function(){t.removeClass("open").addClass("hidden-from-interaction"),G.showPopovers()}),i.text("+ More Filters"),t.find(":focusable").attr("tabindex","-1"),f>0&&v.slideDown()):(t.addClass("open").removeClass("hidden-from-interaction").find(":focusable").attr("tabindex","0").eq(0).focus(),$(this).text("- Less Filters"),s.delay(200).animate({opacity:1},200),G.hidePopovers(),v.slideUp())},resetFilters:function(){t.find(":input",":checkbox").val("").prop("checked",!1).prop("selected",!1),$("#any-ba").prop("checked",!0),v.slideUp().html(""),f=0},applyFilters:function(){G.expandFilters(),v.slideDown(300).html(""),G.buildActiveFiltersList()},buildActiveFiltersList:function(){p='<ul class="filter-selections__ul flex-container">',f=0,""!==h.val()&&(p+="<li>Max Rent: $"+h.val()+' <button class="delete-filter-btn delete-filter-btn__max-rent transparent-btn"><i class="iconm-cancel-circle2 close-tag-icon"></i></button></li>',f++),"all"!==u.val()&&(p+="<li>"+u.val()+' <button class="delete-filter-btn delete-filter-btn__bathrooms transparent-btn"><i class="iconm-cancel-circle2 close-tag-icon"></i></button></li>',f++),"all"!==b.val()&&(p+="<li> Move In Date: "+b.find("option:selected").text()+' <button class="delete-filter-btn delete-filter-btn__move-date transparent-btn"><i class="iconm-cancel-circle2 close-tag-icon"></i></button></li>',f++),t.find("input[type=checkbox]").each(function(){$(this).is(":checked")&&(console.log($(this).val()),p+="<li>"+$(this).val()+' <button class="delete-filter-btn delete-filter-btn__checkbox transparent-btn"><i class="iconm-cancel-circle2 close-tag-icon"></i></button></li>',f++)}),p+="</ul>",0===f?(p=void 0,v.append('<button id="close-filter-msg" class="transparent-btn m-b-sm"><i class="iconm-cancel-circle2 close-tag-icon"></i></button><p class="m-b-none blue text-uppercase" style="line-height:29px">You did not select any filters.</p>').css("display","flex")):v.append(p)},calculateBedrooms:function(e){R.each(function(){$(this).attr("class","map__space all-available-units available-unit"),$(this).removeAttr("data-filter")}),console.log("recalculate all available units before applying filter: "+Q.length),console.log("number of data-filter elems: "+$("[data-filter]").length);var t=$('.svg-container__part3 .available-unit[data-bedroom="'+e+'"]');t.each(function(){$(this).attr("data-filter","true")}),$("#popover0 .popover-availability span").text(t.length);var a=$('.svg-container__part2 .available-unit[data-bedroom="'+e+'"]');a.each(function(){$(this).attr("data-filter","true")}),$("#popover1 .popover-availability span").text(a.length);var i=$('.svg-container__part1 .available-unit[data-bedroom="'+e+'"]');i.each(function(){$(this).attr("data-filter","true")}),$("#popover2 .popover-availability span").text(i.length),console.log("number of units with active filter: "+$("[data-filter]").length),$(".second-view .all-available-units").not("[data-filter]").each(function(){$(this).attr("class","map__space all-available-units")})}};n.on("change",function(){var e=this.value;"all"!==e?G.calculateBedrooms(e):G.setInitialAvailabilityNumbers()}),a.on("click",G.navigateTabs),i.on("click",G.expandFilters),l.on("click",function(){G.resetFilters(),G.expandFilters()}),o.on("click",G.applyFilters),v.on("click","#close-filter-msg",function(){v.slideUp().html("")}),v.on("click",".delete-filter-btn",function(){if($(this).parent().remove(),f--,0===f&&(v.slideUp().html(""),G.resetFilters()),$(this).hasClass("delete-filter-btn__checkbox")){var e=$(this).parent().text();t.find(":checkbox[value='"+$.trim(e)+"']").prop("checked",!1)}else $(this).hasClass("delete-filter-btn__max-rent")?h.val(""):$(this).hasClass("delete-filter-btn__bathrooms")?u.find("option:selected").prop("selected",!1):$(this).hasClass("delete-filter-btn__move-date")&&b.find("option:selected").prop("selected",!1)}),g.on("click",G.navigateToFirstView),m.on("click",function(){z?G.showStackedLevels():G.navigateToSecondView()}),_.on("click",G.navigateToSecondExpandedView),C.on("click",G.navigateToThirdView),y.on({hover:function(){var e=$(this).attr("id"),t=e.substr(e.length-1);$("#popover"+t).find(".popover-title").addClass("in-focus")},mouseout:function(){$(".first-view-popovers .popover-title").removeClass("in-focus")}}),y.on("click",function(){z&&G.showStackedLevels(),"link0"===$(this).attr("id")?G.showThirdStack():"link1"===$(this).attr("id")&&G.showSecondStack(),"link2"===$(this).attr("id")&&G.showFirstStack(),G.navigateToSecondView()}),$(".first-view-popovers").on("click",function(){"popover0"===$(this).attr("id")?G.showThirdStack():"popover1"===$(this).attr("id")&&G.showSecondStack(),"popover2"===$(this).attr("id")&&G.showFirstStack(),z&&G.showStackedLevels(),G.navigateToSecondView()}),L.on("click",function(){z?G.showStackedLevels():$(window).width()>=1400?(G.navigateToSecondView(),T.removeClass("expanded-view-with-detail")):(G.navigateToFirstView(),T.removeClass("expanded-view-with-detail"))}),j.on("click",function(){$(this).addClass("level--current"),I=parseInt($(this).attr("data-levelnum"),10),console.log("selectedLevel is "+I),G.showLevel()}),U.on("click",function(){z?G.navigate("Down"):T.hasClass("second-view__part1")?G.showSecondStack():T.hasClass("second-view__part2")&&G.showThirdStack()}),A.on("click",function(){z?G.navigate("Up"):T.hasClass("second-view__part3")?G.showSecondStack():T.hasClass("second-view__part2")&&G.showFirstStack()}),D.on("click",function(){G.showStackedLevels(),G.navigateToSecondView()}),Q.on("click",function(e){e.stopPropagation(),$(".second-view").addClass("expanded-view-with-detail"),G.navigateToThirdView()}),G.setPopovers("first-view"),G.setInitialAvailabilityNumbers()}var t,a,i,s,l,o,n,c,r,d,v,p,h,u,b,f,w,g,m,_,C,k,x,T,S,y,F,L,P,V,N,U,A,D,I,M,z,B,E,O,j,q,Q,R;$(document).ready(e)}(jQuery);