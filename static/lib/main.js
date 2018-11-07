"use strict";

$(document).ready(function() {
	function getUrlVars()
	{
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(var i = 0; i < hashes.length; i++)
		{
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return hashes[0];
	}

	function updateURL(x) {
		if (history.pushState) {
			var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?'+x;
			window.history.pushState({path:newurl},'',newurl);
		}
	  }
	function appendEvents() {
		$(".js-dogewiki-contentswitch").click(function() {
			$(this)
				.parent()
				.find(".dogewiki__page-selector.-active")
				.removeClass("-active");
			$(this).addClass("-active");
			var x = $(this).data("wiki-link");
			var notClicked = $("section.dogewiki-section[data-wiki-link]").filter(function () {
						if($(this).data("wiki-link") == x)  {
							$(this).show();
							updateURL(x);
						}
						else {
							return $(this).data("wiki-link") != x;
						}
                       
			});
			$(notClicked).hide();
		});
		var loadedParams = $('section.dogewiki-section').map(function() {
			return $(this).data('wiki-link');
		}).get();
		var urlParams = getUrlVars();
		if(	loadedParams.includes(urlParams)) {
			var x = urlParams;
			var notClicked = $("section.dogewiki-section[data-wiki-link]").filter(function () {
						if($(this).data("wiki-link") == x)  {
							$(this).show();
							updateURL(x);
						}
						else {
							return $(this).data("wiki-link") != x;
						}
			});
			$(notClicked).hide();
			$(`.js-dogewiki-contentswitch[data-wiki-link=${x}]`).addClass("-active");
		}else {
		$(".js-dogewiki-contentswitch:first-child").trigger("click");
		$("section.dogewiki-section:not(:first)").hide();
		}
	



		$(".screen-it-up").click(function() {
			let a = $(this).closest("#content");
			if(a.hasClass('wiki-content')) {
				a.removeClass('wiki-content');
			}else {
				a.addClass('wiki-content')
			}
		});

	}
	$(window).on('action:ajaxify.end', function(ev,data) {
		var regex = /^wiki\//g;
		//Check if page is part of wiki-subpages & load content !
		if(regex.test(data.url)) {
			var wl = window.location;
		var apiURL = wl.protocol +"//"+ wl.host + "/api"+ wl.pathname;
		var htmlFolderURL = wl.protocol +"//"+ wl.host + "/assets/nodebb-plugin-wiki/"
		$.getJSON(apiURL, function( data ) {
			var n = data.url.lastIndexOf('/');
			var id = data.url.substring(n + 1);

			$.ajax({url: htmlFolderURL + id + ".html", dataType: 'html', success: function(response) {

				var trimedResponse = $.trim(response);
				var html = $.parseHTML(trimedResponse)

				var sectionList = $($(html)).filter(function(obj) {
					if($(this).is("section")) {
						return $(this).data("wiki-link");
					}
				});
				var dataList = [];
				$(sectionList).each(function(index) {
					var a = $(this).data("wiki-link");
					var subCategoryTemplate =  "<a  class=\"js-dogewiki-contentswitch dogewiki__page-selector\" data-wiki-link="+a+">"
					var parsedLink = $.parseHTML(subCategoryTemplate +( index +1 )+". "+ a.replace(/-/g, ' ') + "</a>");
					$("#js-dogewiki__sidebar").append(parsedLink);
					dataList.push(a);
				});
				$("#dogewiki-content").append(html);
				contentLoaded();
				appendEvents();
			},error: function(jqXHR, status, err) {
				if(jqXHR.status == 404) {
					//HTML not found
					console.log(jqXHR.status);
					$(".js-wiki-warning").html("<span class=\"text-warning\">Warning: </span>HTML content not found, contact administrator for him to add it !");
					$(".js-wiki-content").css("display","none");
					$(".lds-ellipsis").css("display","none");
				}
			
			} } );

		});
		}else {
			//console.log("isn't wiki !");
		}
		function contentLoaded() {
			$(".js-wiki-content").css("display","flex");
			$(".lds-ellipsis").css("display","none");
		}
	 });
});

