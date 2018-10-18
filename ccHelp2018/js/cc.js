$(function(){
	$('.close').on('click',function(e){
		e.stopPropagation();
		$('.nav-wrapper').removeClass("show");
	});
	
	var loading = $('<div class="loading"></div>');
	$('.nav-wrapper').append(loading);
	setTimeout(function(){
		$('.loading').remove();
	},500)
	
	$('#OK').on('click',function(){
		setTimeout(function(){
			$('.was-article').css('display','none');
		},200);
		setTimeout(function(){
			$('.thanks').removeClass('hide');
		},400);
	});
	
	$('#NO').on('click',function(){
		setTimeout(function(){
			$('.was-article').css('display','none');
		},200);
		setTimeout(function(){
			$('.really').removeClass('hide');
		},400);
	});
});

(function(owner){
	/**
	 * searchlist show
	 */
	owner.searchBarShow = function(e){
		$('.search-input').on('focus',function(){
			setTimeout(function(){
				$('.search-list').css({
					'display':'block'
				}).addClass('slideInDown');
			},1000)
		});
		$('.search-input').on('blur',function(){
			$('.search-list').css({
				'display':'none'
			})
		})
	}
	
	/**
	 * nav list 切换
	 */
	owner.leftNavigation = function(e){
		$('.nav-menu-item').on('click',function(){
			var navOne = $(this).parent('.nav-one');
			var navTwo = $(this).parent('.nav-two');
			if(navOne){
				navOne.removeClass('nav-list-active').siblings('.nav-two').addClass('nav-list-active fadeInRight');
			}
			if(navTwo){
				navTwo.removeClass('nav-list-active').siblings('.nav-three').addClass('nav-list-active fadeInRight');
			}
		})
	}
	
	owner.rightNavigation = function(){
		$('.back').on('click',function(e){
			var parentsTwo = $(this).parent('.nav-two').context.isConnected;
			var parentsThree = $(this).parent('.nav-three').context.isConnected;
			if(parentsTwo){
				$(this).parent('.nav-two').removeClass('nav-list-active').siblings('.nav-one').addClass('nav-list-active');
			}
		})
	}
	
	owner.responsiveMenu = function(){
		$('.responsive-menu .icon-show').on('click',function(){
			$('.nav-wrapper').toggleClass("show");
		});
	}
}(window.F = {}));

F.searchBarShow();
F.leftNavigation();
F.rightNavigation();
F.responsiveMenu();
