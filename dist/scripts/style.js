function getParameterByName(e,t){var n="[\\?&]"+t+"=([^&#]*)",r=new RegExp(n),i=r.exec(e);t=t.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");return i===null?"":decodeURIComponent(i[1].replace(/\+/g," "))}function gotoToC(){var e="/d2l/lms/content/home.d2l?ou="+getParameterByName(window.parent.location.href,"ou")+"&showTOC=1";top.location.href=e}function gotoGrades(){var e="/d2l/lms/grades/my_grades/main.d2l?ou="+getParameterByName(window.parent.location.href,"ou");top.location.href=e}function gotoDropbox(){var e="/d2l/lms/dropbox/user/folders_list.d2l?ou="+getParameterByName(window.parent.location.href,"ou");top.location.href=e}function gotoDiscussions(){var e="/d2l/lms/discussions/admin/forum_topics_list.d2l?ou="+getParameterByName(window.parent.location.href,"ou");top.location.href=e}$(document).ready(function(){function e(){($("abbr").length||$(".with-tooltip").length)&&t();$(".with-popover").length&&n();$(".with-tabs").length&&r();$(".with-accordion").length&&i();$(".with-subnav").length&&s()}function t(){$("abbr, .with-tooltip").on("mouseover",function(){var e=$(this).attr("title"),t=$(this).position();$(this).attr("title","").css("position","relative");if($(this).hasClass("top")){$(this).before('<div class="tooltip in top"><div class="tooltip-inner">'+e+'</div><div class="tooltip-arrow"></div></div>');$(".tooltip").css({top:t.top-28+"px",left:t.left+"px"})}else if($(this).hasClass("bottom")){$(this).after('<div class="tooltip in bottom"><div class="tooltip-inner">'+e+'</div><div class="tooltip-arrow"></div></div>');$(".tooltip").css({bottom:t.bottom+28+"px",left:t.left+"px"})}else if($(this).hasClass("right")){$(this).before('<div class="tooltip in right"><div class="tooltip-inner">'+e+'</div><div class="tooltip-arrow"></div></div>');$(".tooltip").css({top:t.top+"px",left:t.left+$(this).width()+"px"})}else if($(this).hasClass("left")){$(this).before('<div class="tooltip in left"><div class="tooltip-inner">'+e+'</div><div class="tooltip-arrow"></div></div>');$(".tooltip").css({top:t.top+"px",left:t.left-($(".tooltip").width()+8)+"px"})}else{$(this).before('<div class="tooltip in"><div class="tooltip-inner">'+e+'</div><div class="tooltip-arrow"></div></div>');$(".tooltip").css({top:t.top-28+"px",left:t.left+"px"})}$("abbr, .with-tooltip").on("mouseout",function(){$(this).attr("title",$(".tooltip.in .tooltip-inner").html()).css("position","static");$(".tooltip").remove()})})}function n(){$(".with-popover").each(function(e){var t=$(this).attr("data-title"),n=$(this).position();console.log(n);if($(this).hasClass("top")){$("body").append('<div class="popover top"><div class="popover-content">'+t+'</div><div class="arrow"></div></div>');$(".popover:eq("+e+")").css({top:n.top-($(".popover:eq("+e+")").innerHeight()+8)+"px",left:n.left+"px"})}else if($(this).hasClass("bottom")){$("body").append('<div class="popover bottom"><div class="popover-content">'+t+'</div><div class="arrow"></div></div>');$(".popover:eq("+e+")").css({top:n.top+$(this).height()+4+"px",left:n.left+"px"})}else if($(this).hasClass("right")){$("body").append('<div class="popover right"><div class="popover-content">'+t+'</div><div class="arrow"></div></div>');$(this).is("img")?$(".popover:eq("+e+")").css({top:n.top+$(this).height()/2+"px",left:n.left+$(this).width()+3+"px"}):$(".popover:eq("+e+")").css({top:n.top-$(this).height()+"px",left:n.left+$(this).width()+3+"px"})}else if($(this).hasClass("left")){$("body").append('<div class="popover left"><div class="popover-content">'+t+'</div><div class="arrow"></div></div>');$(this).is("img")?$(".popover:eq("+e+")").css({top:n.top+$(this).height()/2+"px",left:n.left-$(".popover").width()+100+"px"}):$(".popover:eq("+e+")").css({top:n.top-$(this).height()+"px",left:n.left-$(".popover").width()-5+"px"})}else{$("body").append('<div class="popover"><div class="popover-content">'+t+'</div><div class="arrow"></div></div>');$(".popover:eq("+e+")").css({top:n.top-($(".popover:eq("+e+")").innerHeight()+8)+"px",left:n.left+"px"})}});$(".with-popover").on("click",function(){var e=$(".with-popover").index(this);if($(this).hasClass("active")){$(this).removeClass("active");$(".popover:eq("+e+")").removeClass("in")}else{$(this).addClass("active");$(".popover:eq("+e+")").addClass("in")}})}function r(){$(".with-tabs").each(function(e){$(this).attr("data-id",e);$(".with-tabs[data-id='"+e+"'] .tabs li").on("click",function(){var t=$(".with-tabs[data-id='"+e+"'] .tabs li").index(this);$(".with-tabs[data-id='"+e+"'] .tabs li").each(function(){$(".with-tabs[data-id='"+e+"'] .tabs li").hasClass("active")&&$(this).removeClass("active")});$(this).addClass("active");$(".with-tabs[data-id='"+e+"'] .tab-contents section").each(function(){$(".with-tabs[data-id='"+e+"'] .tab-contents section").hasClass("active")&&$(this).removeClass("active")});$(".with-tabs[data-id='"+e+"'] .tab-contents section:eq("+t+")").addClass("active");return!1})})}function i(){$(".with-accordion").each(function(e){$(this).attr("id","ai"+e);$("#ai"+e).prepend('<div class="accordion-controls"><a class="closeAll" href="javascript:void(0)">Close All</a> <a class="openAll" href="javascript:void(0)">Open All</a></div>');$("#ai"+e+" .closeAll").on("click",function(){$("#ai"+e+" .accordion-title").each(function(t){$(this).hasClass("active")&&$("#ai"+e+" > .accordion-content:eq("+t+")").slideUp("fast",function(){$("#ai"+e+" > .accordion-title:eq("+t+")").removeClass("active")})})});$("#ai"+e+" .openAll").on("click",function(){$("#ai"+e+" .accordion-title").each(function(t){$(this).hasClass("active")||$("#ai"+e+" > .accordion-content:eq("+t+")").slideDown("fast",function(){$("#ai"+e+" > .accordion-title:eq("+t+")").addClass("active")})})});$("#ai"+e+" .accordion-title").each(function(t){$(this).hasClass("active")&&$("#ai"+e+" > .accordion-content:eq("+t+")").show()});$("#ai"+e+" .accordion-title").on("click",function(){var t=$("#ai"+e+" .accordion-title").index(this);$(this).hasClass("active")?$("#ai"+e+" > .accordion-content:eq("+t+")").slideUp("fast",function(){$("#ai"+e+" > .accordion-title:eq("+t+")").removeClass("active")}):$("#ai"+e+" .accordion-title").each(function(n){if($(this).hasClass("active")){$(this).removeClass("active");$("#ai"+e+" > .accordion-content:eq("+n+")").slideUp("fast",function(){$("#ai"+e+" > .accordion-title:eq("+t+")").addClass("active");$("#ai"+e+" > .accordion-content:eq("+t+")").slideDown()})}else if(n===t){$("#ai"+e+" > .accordion-title:eq("+t+")").addClass("active");$("#ai"+e+" > .accordion-content:eq("+t+")").slideDown()}});return!1})})}function s(){var e='<ul class="page-subnav">';$(".with-subnav h2").each(function(t){$(this).before('<a class="anchor" id="nav'+t+'" href="#"></a>');e+='<li><a href="#nav'+t+'">'+$(this).html()+"</a></li>"});e+="</ul>";$(".with-subnav").prepend(e);$("body").css("padding-top",$(".page-subnav").innerHeight());$(".anchor").css({display:"block",position:"relative",top:$(".page-subnav").innerHeight()*-1+"px",visibility:"hidden"})}e()});

/*********************************************
SCROLL TO TOP JS
*********************************************/
/*

 scrollup v2.1.0
 Author: Mark Goodyear - http://markgoodyear.com
 Git: https://github.com/markgoodyear/scrollup

 Copyright 2013 Mark Goodyear.
 Licensed under the MIT license
 http://www.opensource.org/licenses/mit-license.php

 Twitter: @markgdyr

 */
!function(a,b,c){a.fn.scrollUp=function(b){a.data(c.body,"scrollUp")||(a.data(c.body,"scrollUp",!0),a.fn.scrollUp.init(b))},a.fn.scrollUp.init=function(d){var e=a.fn.scrollUp.settings=a.extend({},a.fn.scrollUp.defaults,d),f=e.scrollTitle?e.scrollTitle:e.scrollText,g=a("<a/>",{id:e.scrollName,href:"#top",title:f}).appendTo("body");e.scrollImg||g.html(e.scrollText),g.css({display:"none",position:"fixed",zIndex:e.zIndex}),e.activeOverlay&&a("<div/>",{id:e.scrollName+"-active"}).css({position:"absolute",top:e.scrollDistance+"px",width:"100%",borderTop:"1px dotted"+e.activeOverlay,zIndex:e.zIndex}).appendTo("body"),scrollEvent=a(b).scroll(function(){switch(scrollDis="top"===e.scrollFrom?e.scrollDistance:a(c).height()-a(b).height()-e.scrollDistance,e.animation){case"fade":a(a(b).scrollTop()>scrollDis?g.fadeIn(e.animationInSpeed):g.fadeOut(e.animationOutSpeed));break;case"slide":a(a(b).scrollTop()>scrollDis?g.slideDown(e.animationInSpeed):g.slideUp(e.animationOutSpeed));break;default:a(a(b).scrollTop()>scrollDis?g.show(0):g.hide(0))}}),g.click(function(b){b.preventDefault(),a("html, body").animate({scrollTop:0},e.topSpeed,e.easingType)})},a.fn.scrollUp.defaults={scrollName:"scrollUp",scrollDistance:300,scrollFrom:"top",scrollSpeed:300,easingType:"linear",animation:"fade",animationInSpeed:200,animationOutSpeed:200,scrollText:"Scroll to top",scrollTitle:!1,scrollImg:!1,activeOverlay:!1,zIndex:2147483647},a.fn.scrollUp.destroy=function(d){a.removeData(c.body,"scrollUp"),a("#"+a.fn.scrollUp.settings.scrollName).remove(),a("#"+a.fn.scrollUp.settings.scrollName+"-active").remove(),a.fn.jquery.split(".")[1]>=7?a(b).off("scroll",d):a(b).unbind("scroll",d)},a.scrollUp=a.fn.scrollUp}(jQuery,window,document);