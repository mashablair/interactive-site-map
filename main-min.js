!function($){"use strict";function e(){function e(){}t=$("#more-filters"),s=$(".nav-icon"),a=$("#more-filters-btn"),i=$(".more-filters-container"),o=$("#clear-all-filters"),l=$("#apply-filters-btn"),n=$(".filter-selections"),d=$("#filter-max-rent"),r=$("#filter-bathrooms"),v=$("#filter-available-date"),h=$("#interactive-site-map"),u=$(".first-view-btn"),b=$(".second-view-btn"),f=$(".second-expanded-view-btn"),w=$(".third-view-btn"),m=$(".views"),C=$(".first-view"),g=$(".second-view"),k=$(".first-view svg"),_=$(".link-for-blocks"),x=$(".first-view .link-for-blocks"),T=$(".back-btn"),S=$(".second-view-header"),y=$(".level--1"),F=$(".levelnav"),L=$(".levelnav__button--up"),P=$(".levelnav__button--down"),V=$(".levelnav__button--all-levels"),N=!1,A=!1,z=$(".levels"),E=$(".level"),O=$(".available-unit"),t.find(":focusable").attr("tabindex","-1"),n.hide(),$('[data-toggle="popover"]').popover("show"),$(".first-view h2").on("click",function(){j.showPopovers()}),$(window).resize(function(){j.hidePopovers(),clearTimeout(window.resizedFinished),window.resizedFinished=setTimeout(function(){j.showPopovers()},800)}),$("#unitDetailTabs a").click(function(e){e.preventDefault(),$(this).tab("show")}),$(".carousel").carousel();var j={navigateTabs:function(){s.removeClass("active-tab")},navigateToFirstView:function(){j.hidePopovers(),h.removeClass("view-change-1 view-change-2"),j.showPopovers(),j.navigateTabs(),u.addClass("active-tab"),setTimeout(function(){j.showPopovers()},800)},navigateToSecondView:function(){h.hasClass("view-change-1")||(h.addClass("view-change-1").removeClass("view-change-2"),j.navigateTabs(),b.addClass("active-tab"),j.hidePopovers(),setTimeout(function(){j.showPopovers()},800))},navigateToSecondExpandedView:function(){h.addClass("view-change-1").removeClass("view-change-2"),j.navigateTabs(),f.addClass("active-tab"),y.trigger("click"),$('[data-toggle="popover"]').popover("show")},navigateToThirdView:function(){h.addClass("view-change-1 view-change-2"),j.navigateTabs(),w.addClass("active-tab"),g.addClass("expanded-view-with-detail")},showFirstStack:function(){g.removeClass("second-view__part2 second-view__part3"),g.addClass("second-view__part1"),P.addClass("boxbutton--disabled"),L.removeClass("boxbutton--disabled"),C.addClass("first-stack-displayed"),C.removeClass("second-stack-displayed third-stack-displayed"),S.text("Floors 1 - 4 (Lower Third)")},showSecondStack:function(){g.removeClass("second-view__part1 second-view__part3"),g.addClass("second-view__part2"),L.removeClass("boxbutton--disabled"),P.removeClass("boxbutton--disabled"),C.addClass("second-stack-displayed"),C.removeClass("first-stack-displayed third-stack-displayed"),S.text("Floors 5 - 8 (Middle Third)")},showThirdStack:function(){g.removeClass("second-view__part1 second-view__part2"),g.addClass("second-view__part3"),L.addClass("boxbutton--disabled"),P.removeClass("boxbutton--disabled"),C.addClass("third-stack-displayed"),C.removeClass("first-stack-displayed second-stack-displayed"),S.text("Floors 9 - 12 (Upper Third)")},setPopovers:function(e){M=$("."+e).find(".popover").addClass("first-view-popovers"),_.each(function(e){$(this).attr("id","link"+e)}),M.each(function(e){$(this).attr("id","popover"+e)})},showPopovers:function(){x.popover("show"),j.updateAvailabilityNumbers()},updateAvailabilityNumbers:function(){var e=$(".svg-container__part3 .available-unit").length;$("#popover0 .popover-availability span").text(e);var t=$(".svg-container__part2 .available-unit").length;$("#popover1 .popover-availability span").text(t);var s=$(".svg-container__part1 .available-unit").length;$("#popover2 .popover-availability span").text(s)},hidePopovers:function(){x.popover("hide")},showLevel:function(){D=$("[data-levelnum]").length,z.addClass("levels--open levels--selected-"+U),j.navigateTabs(),f.addClass("active-tab"),I=S.text();var e=$(".level--current").attr("data-floor");S.text("Floor "+e).css("color","#04b5fd"),T.addClass("hidden"),V.removeClass("hidden"),j.setNavigationState(),N=!0},setNavigationState:function(){1===U?P.addClass("boxbutton--disabled"):P.removeClass("boxbutton--disabled"),U===D?L.addClass("boxbutton--disabled"):L.removeClass("boxbutton--disabled")},showStackedLevels:function(){if(!N)return!1;N=!1,z.removeClass("levels--open levels--selected-"+U),$(".level--current").removeClass("level--current"),T.removeClass("hidden"),V.addClass("hidden"),j.navigateTabs(),b.addClass("active-tab"),g.hasClass("second-view__part1")?S.text("Floors 1 - 4 (Lower Third)"):g.hasClass("second-view__part2")?S.text("Floors 5 - 8 (Middle Third)"):g.hasClass("second-view__part3")&&S.text("Floors 9 - 12 (Upper Third)"),S.css("color","")},navigate:function(e){if(!N)return!1;A=!0,console.log("selectedLevel is "+U);var t=U;console.log("prevSelectedLevel "+t),console.log(E);var s=$(".level--"+U);if(console.log(s),"Up"===e&&t>1)--U,console.log("selectedLevel-- is "+U);else{if(!("Down"===e&&t<D))return A=!1,!1;++U,console.log("selectedLevel++ is "+U)}j.setNavigationState(),s.addClass("level--moveOut"+e);var a=U;console.log("nextLevelNum is "+a);var i=$(".level--"+a);console.log(i),i.addClass("level--current"),s.removeClass("level--moveOut"+e),setTimeout(function(){s.removeClass("level--current")},60),z.removeClass("levels--selected-"+t),z.addClass("levels--selected-"+U),S.text("Floor "+U),A=!1},expandFilters:function(){t.hasClass("open")?(i.animate({opacity:0},200,function(){t.removeClass("open").addClass("hidden-from-interaction"),j.showPopovers()}),a.text("+ More Filters"),t.find(":focusable").attr("tabindex","-1"),p>0&&n.slideDown()):(t.addClass("open").removeClass("hidden-from-interaction").find(":focusable").attr("tabindex","0").eq(0).focus(),$(this).text("- Less Filters"),i.delay(200).animate({opacity:1},200),j.hidePopovers(),n.slideUp())},resetFilters:function(){t.find(":input",":checkbox").val("").prop("checked",!1).prop("selected",!1),$("#any-ba").prop("checked",!0),n.slideUp().html(""),p=0},applyFilters:function(){j.expandFilters(),n.slideDown(300).html(""),j.buildActiveFiltersList()},buildActiveFiltersList:function(){c='<ul class="filter-selections__ul flex-container">',p=0,""!==d.val()&&(c+="<li>Max Rent: $"+d.val()+' <button class="delete-filter-btn delete-filter-btn__max-rent transparent-btn"><i class="iconm-cancel-circle2 close-tag-icon"></i></button></li>',p++),"all"!==r.val()&&(c+="<li>"+r.val()+' <button class="delete-filter-btn delete-filter-btn__bathrooms transparent-btn"><i class="iconm-cancel-circle2 close-tag-icon"></i></button></li>',p++),"all"!==v.val()&&(c+="<li> Move In Date: "+v.find("option:selected").text()+' <button class="delete-filter-btn delete-filter-btn__move-date transparent-btn"><i class="iconm-cancel-circle2 close-tag-icon"></i></button></li>',p++),t.find("input[type=checkbox]").each(function(){$(this).is(":checked")&&(console.log($(this).val()),c+="<li>"+$(this).val()+' <button class="delete-filter-btn delete-filter-btn__checkbox transparent-btn"><i class="iconm-cancel-circle2 close-tag-icon"></i></button></li>',p++)}),c+="</ul>",0===p?(c=void 0,n.append('<button id="close-filter-msg" class="transparent-btn m-b-sm"><i class="iconm-cancel-circle2 close-tag-icon"></i></button><p class="m-b-none blue text-uppercase" style="line-height:29px">You did not select any filters.</p>').css("display","flex")):n.append(c)}};s.on("click",j.navigateTabs),a.on("click",j.expandFilters),o.on("click",function(){j.resetFilters(),j.expandFilters()}),l.on("click",j.applyFilters),n.on("click","#close-filter-msg",function(){n.slideUp().html("")}),n.on("click",".delete-filter-btn",function(){if($(this).parent().remove(),p--,0===p&&(n.slideUp().html(""),j.resetFilters()),$(this).hasClass("delete-filter-btn__checkbox")){var e=$(this).parent().text();t.find(":checkbox[value='"+$.trim(e)+"']").prop("checked",!1)}else $(this).hasClass("delete-filter-btn__max-rent")?d.val(""):$(this).hasClass("delete-filter-btn__bathrooms")?r.find("option:selected").prop("selected",!1):$(this).hasClass("delete-filter-btn__move-date")&&v.find("option:selected").prop("selected",!1)}),u.on("click",j.navigateToFirstView),b.on("click",function(){N?j.showStackedLevels():j.navigateToSecondView()}),f.on("click",j.navigateToSecondExpandedView),w.on("click",j.navigateToThirdView),_.on({hover:function(){var e=$(this).attr("id"),t=e.substr(e.length-1);$("#popover"+t).find(".popover-title").addClass("in-focus")},mouseout:function(){$(".first-view-popovers .popover-title").removeClass("in-focus")}}),_.on("click",function(){N&&j.showStackedLevels(),"link0"===$(this).attr("id")?j.showThirdStack():"link1"===$(this).attr("id")&&j.showSecondStack(),"link2"===$(this).attr("id")&&j.showFirstStack(),j.navigateToSecondView()}),$(".first-view-popovers").on("click",function(){"popover0"===$(this).attr("id")?j.showThirdStack():"popover1"===$(this).attr("id")&&j.showSecondStack(),"popover2"===$(this).attr("id")&&j.showFirstStack(),N&&j.showStackedLevels(),j.navigateToSecondView()}),T.on("click",function(){N?j.showStackedLevels():$(window).width()>=1400?(j.navigateToSecondView(),g.removeClass("expanded-view-with-detail")):(j.navigateToFirstView(),g.removeClass("expanded-view-with-detail"))}),E.on("click",function(){$(this).addClass("level--current"),U=parseInt($(this).attr("data-levelnum"),10),console.log("selectedLevel is "+U),j.showLevel()}),L.on("click",function(){N?j.navigate("Down"):g.hasClass("second-view__part1")?j.showSecondStack():g.hasClass("second-view__part2")&&j.showThirdStack()}),P.on("click",function(){N?j.navigate("Up"):g.hasClass("second-view__part3")?j.showSecondStack():g.hasClass("second-view__part2")&&j.showFirstStack()}),V.on("click",function(){j.showStackedLevels(),j.navigateToSecondView()}),O.on("click",function(e){e.stopPropagation(),$(".second-view").addClass("expanded-view-with-detail"),j.navigateToThirdView()}),j.setPopovers("first-view"),j.updateAvailabilityNumbers()}var t,s,a,i,o,l,n,c,d,r,v,p,h,u,b,f,w,m,C,g,k,_,x,T,S,F,y,L,P,V,U,D,N,A,M,z,E,I,O;$(document).ready(e)}(jQuery);