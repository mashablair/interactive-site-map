!function($){"use strict";function e(){function e(){console.log("available units: "+se.length)}function re(){}t=$("#more-filters"),i=$("#more-filters-btn"),o=$(".more-filters-container"),s=$("#clear-all-filters"),n=$("#apply-filters-btn"),se=$(".available-unit"),ne=$(".all-available-units"),r=$(".svg-container__part3 .available-unit").length,c=$(".svg-container__part2 .available-unit").length,d=$(".svg-container__part1 .available-unit").length,l=$("#filter-bedrooms"),_=$(".filter-selections"),C=$("#filter-max-rent"),P=$("#filter-bathrooms"),L=$("#filter-available-date"),le=!1,a=$(".nav-icon"),N=$("#interactive-site-map"),V=$(".first-view-btn"),A=$(".second-view-btn"),U=$(".second-expanded-view-btn"),D=$(".third-view-btn"),R=$(".views"),z=$(".first-view"),B=$(".second-view"),E=$(".first-view svg"),O=$(".link-for-blocks"),j=$(".first-view .link-for-blocks"),q=$(".back-btn"),Q=$(".second-view-header"),G=$(".level--1"),Y=$(".levelnav"),H=$(".levelnav__button--up"),J=$(".levelnav__button--down"),K=$(".levelnav__button--all-levels"),Z=!1,ee=!1,ae=$(".levels"),ie=$(".level"),e(),t.find(":focusable").attr("tabindex","-1"),_.hide(),$('[data-toggle="popover"]').popover("show"),$(".first-view h2").on("click",function(){ce.showPopovers()}),$(window).resize(function(){ce.hidePopovers(),clearTimeout(window.resizedFinished),window.resizedFinished=setTimeout(function(){ce.showPopovers()},800)}),$("#unitDetailTabs a").click(function(e){e.preventDefault(),$(this).tab("show")}),$(".carousel").carousel();var ce={navigateTabs:function(){a.removeClass("active-tab")},navigateToFirstView:function(){ce.hidePopovers(),N.removeClass("view-change-1 view-change-2"),ce.showPopovers(),ce.navigateTabs(),V.addClass("active-tab"),setTimeout(function(){ce.showPopovers()},800)},navigateToSecondView:function(){N.hasClass("view-change-1")||(N.addClass("view-change-1").removeClass("view-change-2"),ce.navigateTabs(),A.addClass("active-tab"),ce.hidePopovers(),setTimeout(function(){ce.showPopovers()},800))},navigateToSecondExpandedView:function(){N.addClass("view-change-1").removeClass("view-change-2"),ce.navigateTabs(),U.addClass("active-tab"),G.trigger("click"),$('[data-toggle="popover"]').popover("show")},navigateToThirdView:function(){N.addClass("view-change-1 view-change-2"),ce.navigateTabs(),D.addClass("active-tab"),B.addClass("expanded-view-with-detail")},showFirstStack:function(){B.removeClass("second-view__part2 second-view__part3"),B.addClass("second-view__part1"),J.addClass("boxbutton--disabled"),H.removeClass("boxbutton--disabled"),z.addClass("first-stack-displayed"),z.removeClass("second-stack-displayed third-stack-displayed"),Q.text("Floors 1 - 4 (Lower Third)")},showSecondStack:function(){B.removeClass("second-view__part1 second-view__part3"),B.addClass("second-view__part2"),H.removeClass("boxbutton--disabled"),J.removeClass("boxbutton--disabled"),z.addClass("second-stack-displayed"),z.removeClass("first-stack-displayed third-stack-displayed"),Q.text("Floors 5 - 8 (Middle Third)")},showThirdStack:function(){B.removeClass("second-view__part1 second-view__part2"),B.addClass("second-view__part3"),H.addClass("boxbutton--disabled"),J.removeClass("boxbutton--disabled"),z.addClass("third-stack-displayed"),z.removeClass("first-stack-displayed second-stack-displayed"),Q.text("Floors 9 - 12 (Upper Third)")},setPopovers:function(e){te=$("."+e).find(".popover").addClass("first-view-popovers"),O.each(function(e){$(this).attr("id","link"+e)}),te.each(function(e){$(this).attr("id","popover"+e)})},showPopovers:function(){j.popover("show"),le?ce.updatePopoversFilteredNumbers():ce.setInitialPopoversNumbers()},getInitialRentPricesRange:function(){var e=[],t=[],a=[];$(".svg-container__part3 [data-rentprice]").each(function(){e.push($(this).attr("data-rentprice"))}),$(".svg-container__part2 [data-rentprice]").each(function(){t.push($(this).attr("data-rentprice"))}),$(".svg-container__part1 [data-rentprice]").each(function(){a.push($(this).attr("data-rentprice"))}),k=Math.min.apply(Math,a),y=Math.min.apply(Math,t),T=Math.min.apply(Math,e),F=Math.max.apply(Math,a),S=Math.max.apply(Math,t),M=Math.max.apply(Math,e)},resetAllAvailability:function(){ne.each(function(){$(this).attr("class","map__space all-available-units available-unit"),$(this).removeAttr("data-filter")})},setInitialPopoversNumbers:function(){ce.resetAllAvailability(),$("#popover0 .popover-availability span").text(r),$("#popover1 .popover-availability span").text(c),$("#popover2 .popover-availability span").text(d),$("#popover0 .min-rent").text(T),$("#popover0 .max-rent").text(M),$("#popover1 .min-rent").text(y),$("#popover1 .max-rent").text(S),$("#popover2 .min-rent").text(k),$("#popover2 .max-rent").text(F)},hidePopovers:function(){j.popover("hide")},showLevel:function(){X=$("[data-levelnum]").length,ae.addClass("levels--open levels--selected-"+W),ce.navigateTabs(),U.addClass("active-tab"),oe=Q.text();var e=$(".level--current").attr("data-floor");Q.text("Floor "+e).css("color","#04b5fd"),q.addClass("hidden"),K.removeClass("hidden"),ce.setNavigationState(),Z=!0},setNavigationState:function(){1===W?J.addClass("boxbutton--disabled"):J.removeClass("boxbutton--disabled"),W===X?H.addClass("boxbutton--disabled"):H.removeClass("boxbutton--disabled")},showStackedLevels:function(){if(!Z)return!1;Z=!1,ae.removeClass("levels--open levels--selected-"+W),$(".level--current").removeClass("level--current"),q.removeClass("hidden"),K.addClass("hidden"),ce.navigateTabs(),A.addClass("active-tab"),B.hasClass("second-view__part1")?Q.text("Floors 1 - 4 (Lower Third)"):B.hasClass("second-view__part2")?Q.text("Floors 5 - 8 (Middle Third)"):B.hasClass("second-view__part3")&&Q.text("Floors 9 - 12 (Upper Third)"),Q.css("color","")},navigate:function(e){if(!Z)return!1;ee=!0,console.log("selectedLevel is "+W);var t=W;console.log("prevSelectedLevel "+t),console.log(ie);var a=$(".level--"+W);if(console.log(a),"Up"===e&&t>1)--W,console.log("selectedLevel-- is "+W);else{if(!("Down"===e&&t<X))return ee=!1,!1;++W,console.log("selectedLevel++ is "+W)}ce.setNavigationState(),a.addClass("level--moveOut"+e);var i=W;console.log("nextLevelNum is "+i);var o=$(".level--"+i);console.log(o),o.addClass("level--current"),a.removeClass("level--moveOut"+e),setTimeout(function(){a.removeClass("level--current")},60),ae.removeClass("levels--selected-"+t),ae.addClass("levels--selected-"+W),Q.text("Floor "+W),ee=!1},expandFilters:function(){t.hasClass("open")?(o.animate({opacity:0},200,function(){t.removeClass("open").addClass("hidden-from-interaction")}),i.text("+ More Filters"),t.find(":focusable").attr("tabindex","-1"),I>0&&_.slideDown()):(t.addClass("open").removeClass("hidden-from-interaction").find(":focusable").attr("tabindex","0").eq(0).focus(),$(this).text("- Less Filters"),o.delay(200).animate({opacity:1},200),_.slideUp())},resetFilters:function(){t.find(":input",":checkbox").val("").prop("checked",!1).prop("selected",!1),$("#any-ba").prop("checked",!0),_.slideUp().html(""),I=0},applyFilters:function(){ce.expandFilters(),_.slideDown(300).html(""),ce.buildActiveFiltersList()},buildActiveFiltersList:function(){x='<ul class="filter-selections__ul flex-container">',I=0,""!==C.val()&&(x+="<li>Max Rent: $"+C.val()+' <button class="delete-filter-btn delete-filter-btn__max-rent transparent-btn"><i class="iconm-cancel-circle2 close-tag-icon"></i></button></li>',I++),"all"!==P.val()&&(x+="<li>"+P.val()+' <button class="delete-filter-btn delete-filter-btn__bathrooms transparent-btn"><i class="iconm-cancel-circle2 close-tag-icon"></i></button></li>',I++),"all"!==L.val()&&(x+="<li> Move In Date: "+L.find("option:selected").text()+' <button class="delete-filter-btn delete-filter-btn__move-date transparent-btn"><i class="iconm-cancel-circle2 close-tag-icon"></i></button></li>',I++),t.find("input[type=checkbox]").each(function(){$(this).is(":checked")&&(console.log($(this).val()),x+="<li>"+$(this).val()+' <button class="delete-filter-btn delete-filter-btn__checkbox transparent-btn"><i class="iconm-cancel-circle2 close-tag-icon"></i></button></li>',I++)}),x+="</ul>",0===I?(x=void 0,_.append('<button id="close-filter-msg" class="transparent-btn m-b-sm"><i class="iconm-cancel-circle2 close-tag-icon"></i></button><p class="m-b-none blue text-uppercase" style="line-height:29px">You did not select any filters.</p>').css("display","flex")):_.append(x)},calculateFilteredBedrooms:function(e){le=!0,ce.resetAllAvailability(),console.log("recalculate all available units before applying filter: "+se.length),console.log("number of data-filter elems: "+$("[data-filter]").length),v=$('.svg-container__part3 .available-unit[data-bedroom="'+e+'"]'),p=$('.svg-container__part2 .available-unit[data-bedroom="'+e+'"]'),h=$('.svg-container__part1 .available-unit[data-bedroom="'+e+'"]'),v.each(function(){$(this).attr("data-filter","true")}),p.each(function(){$(this).attr("data-filter","true")}),h.each(function(){$(this).attr("data-filter","true")}),console.log("number of units with active filter: "+$("[data-filter]").length),$(".second-view .all-available-units").not("[data-filter]").each(function(){$(this).attr("class","map__space all-available-units")})},calculateFilteredMaxRent:function(e){le=!0,ce.resetAllAvailability(),v=$(".svg-container__part3 .available-unit[data-rentprice]").filter(function(){return parseInt($(this).attr("data-rentprice"))<=parseInt(e)}).attr("data-filter","true"),p=$(".svg-container__part2 .available-unit[data-rentprice]").filter(function(){return parseInt($(this).attr("data-rentprice"))<=parseInt(e)}).attr("data-filter","true"),h=$(".svg-container__part1 .available-unit[data-rentprice]").filter(function(){return parseInt($(this).attr("data-rentprice"))<=parseInt(e)}).attr("data-filter","true"),$(".second-view .all-available-units").not("[data-filter]").each(function(){$(this).attr("class","map__space all-available-units")}),console.log("number of units with active filter: "+$("[data-filter]").length)},updatePopoversFilteredNumbers:function(){$("#popover0 .popover-availability span").text(v.length),$("#popover1 .popover-availability span").text(p.length),$("#popover2 .popover-availability span").text(h.length);var e=[],t=[],a=[];$(".svg-container__part3 [data-filter]").each(function(){e.push($(this).attr("data-rentprice")),console.log(e)}),$(".svg-container__part2 [data-filter]").each(function(){t.push($(this).attr("data-rentprice")),console.log(t)}),$(".svg-container__part1 [data-filter]").each(function(){console.log($(this)),a.push($(this).attr("data-rentprice"))}),u=Math.min.apply(Math,e),f=Math.min.apply(Math,t),b=Math.min.apply(Math,a),m=Math.max.apply(Math,e),w=Math.max.apply(Math,t),g=Math.max.apply(Math,a),0===v.length?$("#popover0 .min-rent, #popover0 .max-rent").text("0"):($("#popover0 .min-rent").text(u),$("#popover0 .max-rent").text(m)),0===p.length?$("#popover1 .min-rent, #popover1 .max-rent").text("0"):($("#popover1 .min-rent").text(f),$("#popover1 .max-rent").text(w)),0===h.length?$("#popover2 .min-rent, #popover2 .max-rent").text("0"):($("#popover2 .min-rent").text(b),$("#popover2 .max-rent").text(g))}};ce.setPopovers("first-view"),ce.getInitialRentPricesRange(),ce.setInitialPopoversNumbers(),a.on("click",ce.navigateTabs),i.on("click",ce.expandFilters),s.on("click",function(){le=!1,ce.resetFilters(),ce.expandFilters(),ce.setInitialPopoversNumbers()}),n.on("click",ce.applyFilters),_.on("click","#close-filter-msg",function(){_.slideUp().html("")}),_.on("click",".delete-filter-btn",function(){if($(this).parent().remove(),I--,0===I&&(_.slideUp().html(""),ce.resetFilters()),$(this).hasClass("delete-filter-btn__checkbox")){var e=$(this).parent().text();t.find(":checkbox[value='"+$.trim(e)+"']").prop("checked",!1)}else $(this).hasClass("delete-filter-btn__max-rent")?C.val(""):$(this).hasClass("delete-filter-btn__bathrooms")?P.find("option:selected").prop("selected",!1):$(this).hasClass("delete-filter-btn__move-date")&&L.find("option:selected").prop("selected",!1)}),l.on("change",function(){var e=this.value;"all"!==e?(le=!0,ce.calculateFilteredBedrooms(e),ce.updatePopoversFilteredNumbers()):(le=!1,ce.setInitialPopoversNumbers())}),C.on("change",function(){var e=this.value;console.log(e),""!==e?(le=!0,ce.calculateFilteredMaxRent(e),ce.updatePopoversFilteredNumbers()):(le=!1,ce.setInitialPopoversNumbers())}),V.on("click",ce.navigateToFirstView),A.on("click",function(){Z?ce.showStackedLevels():ce.navigateToSecondView()}),U.on("click",ce.navigateToSecondExpandedView),D.on("click",ce.navigateToThirdView),O.on({hover:function(){var e=$(this).attr("id"),t=e.substr(e.length-1);$("#popover"+t).find(".popover-title").addClass("in-focus")},mouseout:function(){$(".first-view-popovers .popover-title").removeClass("in-focus")}}),O.on("click",function(){Z&&ce.showStackedLevels(),"link0"===$(this).attr("id")?ce.showThirdStack():"link1"===$(this).attr("id")&&ce.showSecondStack(),"link2"===$(this).attr("id")&&ce.showFirstStack(),ce.navigateToSecondView()}),$(".first-view-popovers").on("click",function(){console.log("popover clicked"),"popover0"===$(this).attr("id")?ce.showThirdStack():"popover1"===$(this).attr("id")&&ce.showSecondStack(),"popover2"===$(this).attr("id")&&ce.showFirstStack(),Z&&ce.showStackedLevels(),ce.navigateToSecondView()}),q.on("click",function(){Z?ce.showStackedLevels():$(window).width()>=1400?(ce.navigateToSecondView(),B.removeClass("expanded-view-with-detail")):(ce.navigateToFirstView(),B.removeClass("expanded-view-with-detail"))}),ie.on("click",function(){$(this).addClass("level--current"),W=parseInt($(this).attr("data-levelnum"),10),console.log("selectedLevel is "+W),ce.showLevel()}),H.on("click",function(){Z?ce.navigate("Down"):B.hasClass("second-view__part1")?ce.showSecondStack():B.hasClass("second-view__part2")&&ce.showThirdStack()}),J.on("click",function(){Z?ce.navigate("Up"):B.hasClass("second-view__part3")?ce.showSecondStack():B.hasClass("second-view__part2")&&ce.showFirstStack()}),K.on("click",function(){ce.showStackedLevels(),ce.navigateToSecondView()}),se.on("click",function(e){e.stopPropagation(),$(".second-view").addClass("expanded-view-with-detail"),ce.navigateToThirdView()})}var t,a,i,o,s,n,l,r,c,d,v,p,h,u,f,b,m,w,g,_,x,C,k,y,T,F,S,M,P,L,I,N,V,A,U,D,R,z,B,E,O,j,q,Q,Y,G,H,J,K,W,X,Z,ee,te,ae,ie,oe,se,ne,le;$(document).ready(e)}(jQuery);