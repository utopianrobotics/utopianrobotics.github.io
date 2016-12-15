function smartHeader()
{
	var scrollTop     = $(window).scrollTop(),
	headerOffset = $('.header').offset().top;
	var landing_end = $("#landing").height() - 70;

	if (headerOffset > landing_end) 
	{
		$("#mobile-header").addClass("fill");
		$(".bread").addClass("fill");
		$("#desktop-header").addClass("fill");
	}
	else {
		$("#mobile-header").removeClass("fill");
		$("#desktop-header").removeClass("fill");
		$(".bread").removeClass("fill");
	}
	
	$(window).on("scroll", function () {
		if ($(this).scrollTop() > landing_end ) {
			$("#mobile-header").addClass("fill");
			$("#desktop-header").addClass("fill");
			$(".bread").addClass("fill");
		}
		else {
			$("#mobile-header").removeClass("fill");
			$("#desktop-header").removeClass("fill");
			$(".bread").removeClass("fill");
		}
	});
}

$(document).ready(function(){

	// $(function() {
	// 	$('a[href*="#"]:not([href="#"])').click(function() {
	// 		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	// 			var target = $(this.hash);
	// 			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	// 			if (target.length) {
	// 				$('html, body').animate({
	// 					scrollTop: target.offset().top
	// 				}, 800);
	// 				return false;
	// 			}
	// 		}
	// 	});
	// });


	$(function() {
		$('a[href*="#"]:not([href="#"])').click(function() {
			document.querySelector('.hello').scrollIntoView({ 
				behavior: 'smooth' 
			});	
		});
	});

	// function scrollToAnchor(aid){
	//     var aTag = $("a[name='"+ aid +"']");
	//     $('html,body').animate({scrollTop: aTag.offset().top},'slow');
	// }

	// $("#totop").click(function() {
 //   		scrollToAnchor('linktotop');
 //   		return false;
	// });

	// $("#toabout").click(function() {
 //   		scrollToAnchor('linktoabout');
 //   		return false;
	// });



	smartHeader();

	$( "form" ).submit(function( event ) {

		var data = $(this).serializeArray().reduce(function(obj, item) {
			if (item.value == ""){	return; }
			obj[item.name] = item.value;
			return obj;
		}, {});

		if ($("#message").val() == "") {return;}

		data["msg"] = $("#message").val()

		dson = JSON.stringify(data);
		event.preventDefault();

		$('#send-button').prop('value','Sending')
		jQuery.post("https://v1wesefrvk.execute-api.eu-central-1.amazonaws.com/prod/sendContactForm", dson, function (data) {$('#contact-form').hide(); $('#contact-success').show();},"json");
		
	});

});

$(window).on("orientationchange",function(event){
	smartHeader();
});

window.onresize = function(event) {
   smartHeader(); 
};