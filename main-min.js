!function($){"use strict";function t(){function t(){console.log("available units: "+lt.length)}function mt(){}e=$("#more-filters"),i=$("#more-filters-btn"),s=$(".more-filters-container"),o=$("#clear-all-filters"),n=$("#apply-filters-btn"),nt=$("[data-filter]"),lt=$(".all-available-units"),r=$(".svg-container__part3 .all-available-units").length,d=$(".svg-container__part2 .all-available-units").length,c=$(".svg-container__part1 .all-available-units").length,l=$("#filter-bedrooms"),w=$(".filter-selections"),g=$("#filter-max-rent"),N=$("#filter-bathrooms"),P=$("#filter-available-date"),a=$(".nav-icon"),I=$("#interactive-site-map"),L=$(".first-view-btn"),V=$(".second-view-btn"),R=$(".second-expanded-view-btn"),D=$(".third-view-btn"),B=$(".views"),U=$(".first-view"),q=$(".second-view"),z=$(".first-view svg"),E=$(".link-for-blocks"),O=$(".first-view .link-for-blocks"),j=$(".back-btn"),Q=$(".back-to-single-plate__btn"),Y=$(".second-view-header"),H=$(".level--1"),G=$(".levelnav"),J=$(".levelnav__button--up"),K=$(".levelnav__button--down"),W=$(".levelnav__button--all-levels"),tt=!1,et=!1,it=$(".levels"),st=$(".level"),rt=$(".pin"),ct=$(".unit-number"),vt=$(".unit-floor"),pt=$(".unit-bed-count"),ht=$(".unit-bath-count"),ut=$(".unit-sq-ft"),bt=$(".unit-price"),ft=$(".deposit-amount"),t(),e.find(":focusable").attr("tabindex","-1"),w.hide(),$('[data-toggle="popover"]').popover("show"),$(".first-view h2").on("click",function(){xt.showPopovers()}),$(window).resize(function(){xt.hidePopovers(),clearTimeout(window.resizedFinished),window.resizedFinished=setTimeout(function(){xt.showPopovers()},800)}),$("#unitDetailTabs a").click(function(t){t.preventDefault(),$(this).tab("show")}),$(".carousel").carousel();var xt={navigateTabs:function(){a.removeClass("active-tab")},navigateToFirstView:function(){xt.hidePopovers(),I.removeClass("view-change-1 view-change-2"),xt.showPopovers(),xt.navigateTabs(),a.addClass("boxbutton--disabled"),q.removeClass("expanded-view-with-detail"),L.addClass("active-tab").removeClass("boxbutton--disabled"),setTimeout(function(){xt.showPopovers()},800)},navigateToSecondView:function(){I.addClass("view-change-1").removeClass("view-change-2"),xt.navigateTabs(),V.addClass("active-tab"),V.removeClass("boxbutton--disabled"),R.addClass("boxbutton--disabled"),D.addClass("boxbutton--disabled"),q.removeClass("expanded-view-with-detail"),xt.hidePopovers(),setTimeout(function(){xt.showPopovers()},800),tt&&xt.showStackedLevels()},navigateToSecondExpandedView:function(){I.addClass("view-change-1").removeClass("view-change-2"),xt.navigateTabs(),R.addClass("active-tab").removeClass("boxbutton--disabled"),D.addClass("boxbutton--disabled"),q.removeClass("expanded-view-with-detail"),rt.removeClass("pin--active"),$(".all-available-units").removeAttr("data-active"),setTimeout(function(){xt.showPopovers()},800)},navigateToThirdView:function(){q.addClass("expanded-view-with-detail"),I.addClass("view-change-1 view-change-2"),xt.navigateTabs(),D.addClass("active-tab"),a.removeClass("boxbutton--disabled")},showFirstStack:function(){q.removeClass("second-view__part2 second-view__part3"),q.addClass("second-view__part1"),xt.setNavigationStateStacks(),U.addClass("first-stack-displayed"),U.removeClass("second-stack-displayed third-stack-displayed"),Y.text("Floors 1 - 4 (Lower Third)")},showSecondStack:function(){q.removeClass("second-view__part1 second-view__part3"),q.addClass("second-view__part2"),xt.setNavigationStateStacks(),U.addClass("second-stack-displayed"),U.removeClass("first-stack-displayed third-stack-displayed"),Y.text("Floors 5 - 8 (Middle Third)")},showThirdStack:function(){q.removeClass("second-view__part1 second-view__part2"),q.addClass("second-view__part3"),xt.setNavigationStateStacks(),U.addClass("third-stack-displayed"),U.removeClass("first-stack-displayed second-stack-displayed"),Y.text("Floors 9 - 12 (Upper Third)")},setPopovers:function(t){at=$("."+t).find(".popover").addClass("first-view-popovers"),E.each(function(t){$(this).attr("id","link"+t)}),at.each(function(t){$(this).attr("id","popover"+t)})},showPopovers:function(){O.popover("show"),lt.length!==$("[data-filter]").length?xt.updatePopoversFilteredNumbers():xt.setInitialPopoversNumbers()},getInitialRentPricesRange:function(){var t=[],e=[],a=[];$(".svg-container__part3 [data-rentprice]").each(function(){t.push($(this).attr("data-rentprice"))}),$(".svg-container__part2 [data-rentprice]").each(function(){e.push($(this).attr("data-rentprice"))}),$(".svg-container__part1 [data-rentprice]").each(function(){a.push($(this).attr("data-rentprice"))}),k=Math.min.apply(Math,a),y=Math.min.apply(Math,e),F=Math.min.apply(Math,t),S=Math.max.apply(Math,a),T=Math.max.apply(Math,e),M=Math.max.apply(Math,t)},resetAllAvailability:function(){lt.each(function(){$(this).attr("data-filter",!0),rt.removeClass("hidden")})},setInitialPopoversNumbers:function(){xt.resetAllAvailability(),$("#popover0 .popover-availability span").text(r),$("#popover1 .popover-availability span").text(d),$("#popover2 .popover-availability span").text(c),$("#popover0 .min-rent").text(F),$("#popover0 .max-rent").text(M),$("#popover1 .min-rent").text(y),$("#popover1 .max-rent").text(T),$("#popover2 .min-rent").text(k),$("#popover2 .max-rent").text(S)},hidePopovers:function(){O.popover("hide")},showLevel:function(t){$(t).addClass("level--current"),X=parseInt($(t).attr("data-levelnum"),10),$(t).find(".level__pins").addClass("level__pins--active"),Z=$(".level--current").closest(".svg-container").find("[data-levelnum]").length,it.addClass("levels--open levels--selected-"+X),xt.navigateTabs(),R.addClass("active-tab"),R.removeClass("boxbutton--disabled"),ot=Y.text();var e=$(".level--current").attr("data-floor");Y.text("Floor "+e).css("color","#04b5fd"),j.addClass("hidden"),W.removeClass("hidden"),xt.setNavigationState(),tt=!0},setNavigationState:function(){1===X?K.addClass("boxbutton--disabled"):K.removeClass("boxbutton--disabled"),X===Z?J.addClass("boxbutton--disabled"):J.removeClass("boxbutton--disabled")},setNavigationStateStacks:function(){q.hasClass("second-view__part1")?(K.addClass("boxbutton--disabled"),J.removeClass("boxbutton--disabled")):q.hasClass("second-view__part2")?(J.removeClass("boxbutton--disabled"),K.removeClass("boxbutton--disabled")):q.hasClass("second-view__part3")&&(J.addClass("boxbutton--disabled"),K.removeClass("boxbutton--disabled"))},showStackedLevels:function(){if(!tt)return!1;tt=!1,it.removeClass("levels--open levels--selected-"+X);var t=$(".level--current");$(".level__pins").removeClass("level__pins--active"),t.removeClass("level--current"),j.removeClass("hidden"),W.addClass("hidden"),xt.navigateTabs(),V.addClass("active-tab"),R.addClass("boxbutton--disabled"),xt.setNavigationStateStacks(),q.hasClass("second-view__part1")?Y.text("Floors 1 - 4 (Lower Third)"):q.hasClass("second-view__part2")?Y.text("Floors 5 - 8 (Middle Third)"):q.hasClass("second-view__part3")&&Y.text("Floors 9 - 12 (Upper Third)"),Y.css("color","")},navigate:function(t){if(!tt)return!1;et=!0;var e=X,a=$(".level--"+X);if(console.log(a),"Up"===t&&e>1)--X,console.log("selectedLevel-- is "+X);else{if(!("Down"===t&&e<Z))return et=!1,!1;++X}xt.setNavigationState(),a.addClass("level--moveOut"+t);var i=X,s=$(".level--"+i);s.addClass("level--current"),s.find(".level__pins").addClass("level__pins--active"),a.removeClass("level--moveOut"+t),setTimeout(function(){a.removeClass("level--current")},60),it.removeClass("levels--selected-"+e),it.addClass("levels--selected-"+X),Y.text("Floor "+X),et=!1,a.removeClass("level__pins--active")},expandFilters:function(){e.hasClass("open")?(s.animate({opacity:0},200,function(){e.removeClass("open").addClass("hidden-from-interaction")}),i.text("+ More Filters"),e.find(":focusable").attr("tabindex","-1"),A>0&&w.slideDown()):(e.addClass("open").removeClass("hidden-from-interaction").find(":focusable").attr("tabindex","0").eq(0).focus(),$(this).text("- Less Filters"),s.delay(200).animate({opacity:1},200),w.slideUp())},resetFilters:function(){e.find(":input",":checkbox").val("").prop("checked",!1).prop("selected",!1),$("#any-ba").prop("checked",!0),w.slideUp().html(""),A=0},applyFilters:function(){q.hasClass("expanded-view-with-detail")&&Q.trigger("click"),xt.expandFilters(),w.slideDown(300).html(""),xt.buildActiveFiltersList()},buildActiveFiltersList:function(){C='<ul class="filter-selections__ul flex-container">',A=0,""!==g.val()&&(C+="<li>Max Rent: $"+g.val()+' <button class="delete-filter-btn delete-filter-btn__max-rent transparent-btn"><i class="iconm-cancel-circle2 close-tag-icon"></i></button></li>',A++),"all"!==N.val()&&(C+="<li>"+N.val()+' <button class="delete-filter-btn delete-filter-btn__bathrooms transparent-btn"><i class="iconm-cancel-circle2 close-tag-icon"></i></button></li>',A++),"all"!==P.val()&&(C+="<li> Move In Date: "+P.find("option:selected").text()+' <button class="delete-filter-btn delete-filter-btn__move-date transparent-btn"><i class="iconm-cancel-circle2 close-tag-icon"></i></button></li>',A++),e.find("input[type=checkbox]").each(function(){$(this).is(":checked")&&(console.log($(this).val()),C+="<li>"+$(this).val()+' <button class="delete-filter-btn delete-filter-btn__checkbox transparent-btn"><i class="iconm-cancel-circle2 close-tag-icon"></i></button></li>',A++)}),C+="</ul>",0===A?(C=void 0,w.append('<button id="close-filter-msg" class="transparent-btn m-b-sm"><i class="iconm-cancel-circle2 close-tag-icon"></i></button><p class="m-b-none blue text-uppercase" style="line-height:29px">You did not select any filters.</p>').css("display","flex")):w.append(C)},calculateFilteredBedrooms:function(t){xt.resetAllAvailability();var e=parseInt(g.val());if(isNaN(e)){if("all"===t)return xt.setInitialPopoversNumbers(),xt.setFloorLabelAvailabilityNumber(),!1;lt.each(function(){$(this).attr("data-bedroom")!==t&&($(this).removeAttr("data-filter"),dt=$(this).attr("data-space"),$('.pin[data-space="'+dt+'"]').addClass("hidden"))}),v=$('.svg-container__part3 [data-bedroom="'+t+'"]'),p=$('.svg-container__part2 [data-bedroom="'+t+'"]'),h=$('.svg-container__part1 [data-bedroom="'+t+'"]')}else $("[data-filter]").each(function(){parseInt($(this).attr("data-rentprice"))>e&&($(this).removeAttr("data-filter"),dt=$(this).attr("data-space"),$('.pin[data-space="'+dt+'"]').addClass("hidden"))}),xt.filterByMaxRent(e),"all"!==l.val()&&(console.log("if maxRent filter is active AND Bedroom filter is active"),$("[data-filter]").each(function(){$(this).attr("data-bedroom")!==t&&($(this).removeAttr("data-filter"),dt=$(this).attr("data-space"),$('.pin[data-space="'+dt+'"]').addClass("hidden"))}),v=$('.svg-container__part3 [data-filter][data-bedroom="'+t+'"]'),p=$('.svg-container__part2 [data-filter][data-bedroom="'+t+'"]'),h=$('.svg-container__part1 [data-filter][data-bedroom="'+t+'"]'));xt.updatePopoversFilteredNumbers(),xt.setFloorLabelAvailabilityNumber()},calculateFilteredMaxRent:function(t){"all"===l.val()?(xt.resetAllAvailability(),isNaN(t)?xt.setInitialPopoversNumbers():(lt.each(function(){parseInt($(this).attr("data-rentprice"))>t&&($(this).removeAttr("data-filter"),dt=$(this).attr("data-space"),$('.pin[data-space="'+dt+'"]').addClass("hidden"))}),xt.filterByMaxRent(t))):(xt.calculateFilteredBedrooms(l.val()),isNaN(t)||(console.log("if bedroom filter IS active AND maxRent filter is active"),$("[data-filter]").each(function(){parseInt($(this).attr("data-rentprice"))>t&&($(this).removeAttr("data-filter"),dt=$(this).attr("data-space"),$('.pin[data-space="'+dt+'"]').addClass("hidden"))}),xt.filterByMaxRent(t))),xt.updatePopoversFilteredNumbers(),xt.setFloorLabelAvailabilityNumber()},filterByMaxRent:function(t){v=$(".svg-container__part3 [data-filter]").filter(function(){return parseInt($(this).attr("data-rentprice"))<=t}),p=$(".svg-container__part2 [data-filter]").filter(function(){return parseInt($(this).attr("data-rentprice"))<=t}),h=$(".svg-container__part1 [data-filter]").filter(function(){return parseInt($(this).attr("data-rentprice"))<=t})},updatePopoversFilteredNumbers:function(){$("#popover0 .popover-availability span").text(v.length),$("#popover1 .popover-availability span").text(p.length),$("#popover2 .popover-availability span").text(h.length);var t=[],e=[],a=[];$(".svg-container__part3 [data-filter]").each(function(){t.push($(this).attr("data-rentprice"))}),$(".svg-container__part2 [data-filter]").each(function(){e.push($(this).attr("data-rentprice"))}),$(".svg-container__part1 [data-filter]").each(function(){a.push($(this).attr("data-rentprice"))}),u=Math.min.apply(Math,t),b=Math.min.apply(Math,e),f=Math.min.apply(Math,a),m=Math.max.apply(Math,t),x=Math.max.apply(Math,e),_=Math.max.apply(Math,a),0===v.length?$("#popover0 .min-rent, #popover0 .max-rent").text("0"):($("#popover0 .min-rent").text(u),$("#popover0 .max-rent").text(m)),0===p.length?$("#popover1 .min-rent, #popover1 .max-rent").text("0"):($("#popover1 .min-rent").text(b),$("#popover1 .max-rent").text(x)),0===h.length?$("#popover2 .min-rent, #popover2 .max-rent").text("0"):($("#popover2 .min-rent").text(f),$("#popover2 .max-rent").text(_))},setFloorLabelAvailabilityNumber:function(){$(".level").each(function(){var t=$(this).find("[data-filter]").length,e=$(this).find(".floor-labels");e.find("span").text(t),0===t?e.removeClass("available-units"):e.addClass("available-units")})}};xt.setPopovers("first-view"),xt.getInitialRentPricesRange(),xt.setInitialPopoversNumbers(),xt.setFloorLabelAvailabilityNumber(),lt.each(function(){"0"===$(this).attr("data-bedroom")?($(this).attr("data-bathroom",1),$(this).attr("data-sqft",536),$(this).attr("data-deposit",500)):"1"===$(this).attr("data-bedroom")?($(this).attr("data-bathroom",1),$(this).attr("data-sqft",779),$(this).attr("data-deposit",1e3)):"2"===$(this).attr("data-bedroom")&&($(this).attr("data-bathroom",2),$(this).attr("data-sqft",952),$(this).attr("data-deposit",1500))}),i.on("click",xt.expandFilters),o.on("click",function(){xt.resetFilters(),xt.expandFilters(),xt.setInitialPopoversNumbers()}),n.on("click",xt.applyFilters),w.on("click","#close-filter-msg",function(){w.slideUp().html("")}),w.on("click",".delete-filter-btn",function(){if($(this).parent().remove(),A--,0===A&&(w.slideUp().html(""),xt.resetFilters()),$(this).hasClass("delete-filter-btn__checkbox")){var t=$(this).parent().text();e.find(":checkbox[value='"+$.trim(t)+"']").prop("checked",!1)}else $(this).hasClass("delete-filter-btn__max-rent")?g.val(""):$(this).hasClass("delete-filter-btn__bathrooms")?N.find("option:selected").prop("selected",!1):$(this).hasClass("delete-filter-btn__move-date")&&P.find("option:selected").prop("selected",!1);xt.calculateFilteredBedrooms(l.val())}),l.on("change",function(){var t=this.value;xt.calculateFilteredBedrooms(t)}),g.on("change",function(){var t=parseInt(this.value);xt.calculateFilteredMaxRent(t)}),L.on("click",xt.navigateToFirstView),V.on("click",function(){if($(this).hasClass("boxbutton--disabled"))return!1;xt.navigateToSecondView()}),R.on("click",function(){if($(this).hasClass("boxbutton--disabled"))return!1;xt.navigateToSecondExpandedView(),R.removeClass("boxbutton--disabled")}),D.on("click",function(){if($(this).hasClass("boxbutton--disabled"))return!1;xt.navigateToThirdView()}),E.on({hover:function(){var t=$(this).attr("id"),e=t.substr(t.length-1);$("#popover"+e).find(".popover-title").addClass("in-focus")},mouseout:function(){$(".first-view-popovers .popover-title").removeClass("in-focus")}}),E.on("click",function(){tt&&xt.showStackedLevels(),"link0"===$(this).attr("id")?xt.showThirdStack():"link1"===$(this).attr("id")&&xt.showSecondStack(),"link2"===$(this).attr("id")&&xt.showFirstStack(),xt.navigateToSecondView()}),$(".first-view-popovers").on("click",function(){console.log("popover clicked"),"popover0"===$(this).attr("id")?xt.showThirdStack():"popover1"===$(this).attr("id")&&xt.showSecondStack(),"popover2"===$(this).attr("id")&&xt.showFirstStack(),tt&&xt.showStackedLevels(),xt.navigateToSecondView()}),j.on("click",function(){tt?xt.showStackedLevels():xt.navigateToFirstView()}),Q.on("click",function(){xt.navigateToSecondExpandedView(),q.removeClass("expanded-view-with-detail")}),st.on("click",function(){var t=this;xt.showLevel(t)}),J.on("click",function(){tt?xt.navigate("Down"):q.hasClass("second-view__part1")?xt.showSecondStack():q.hasClass("second-view__part2")&&xt.showThirdStack()}),K.on("click",function(){tt?xt.navigate("Up"):q.hasClass("second-view__part3")?xt.showSecondStack():q.hasClass("second-view__part2")&&xt.showFirstStack()}),W.on("click",function(){xt.showStackedLevels()}),nt.on("click",function(t){tt&&(t.stopPropagation(),dt=$(this).attr("data-space"),console.log(dt),$('.pin[data-space="'+dt+'"]').addClass("pin--active"),xt.navigateToThirdView())}),$(".level").on("click",".level__pins--active .pin",function(t){t.preventDefault(),rt.removeClass("pin--active"),t.stopPropagation(),dt=$(this).attr("data-space"),$(this).addClass("pin--active"),$(".all-available-units").removeAttr("data-active"),$('.all-available-units[data-space="'+dt+'"]').attr("data-active","true"),xt.navigateToThirdView(),ct.text(dt),vt.text($('.all-available-units[data-space="'+dt+'"]').closest("[data-floor]").attr("data-floor")),pt.text($('.all-available-units[data-space="'+dt+'"]').attr("data-bedroom")),ht.text($('.all-available-units[data-space="'+dt+'"]').attr("data-bathroom")),ut.text($('.all-available-units[data-space="'+dt+'"]').attr("data-sqft")),bt.text("$"+$('.all-available-units[data-space="'+dt+'"]').attr("data-rentprice")),ft.text($('.all-available-units[data-space="'+dt+'"]').attr("data-deposit"))})}var e,a,i,s,o,n,l,r,d,c,v,p,h,u,b,f,m,x,_,w,C,g,k,y,F,S,T,M,N,P,A,I,L,V,R,D,B,U,q,z,E,O,j,Q,Y,G,H,J,K,W,X,Z,tt,et,at,it,st,ot,nt,lt,rt,dt,ct,vt,pt,ht,ut,bt,ft;$(document).ready(t)}(jQuery);