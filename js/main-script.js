var scrollParam,
	scrollTimeParam = 0,
	scrollIdParam = 0,
	munuLi,
	slickParams,
	contentBlock1El,
	seaContentEls;

document.addEventListener( "DOMContentLoaded", ready );

function ready( event ) {
	slickParams = {
		dots: true,
		infinite: true,
		speed: 600,
		slidesToShow: 1,
		adaptiveHeight: true,
		autoplay: true,
  		autoplaySpeed: 4000,
  		pauseOnFocus: false,
	};
	$( "#home-page-slider" ).slick( slickParams );
	
	
	var parallaxSlider = $( '.home-page-slider-slide' );
	$(window).scroll( function( event ) {
		parallax( parallaxSlider );
	});
	
	scrollEl = document.querySelectorAll( ".nav-link" );
	if ( scrollEl ) 
		for ( var i = 0; i < scrollEl.length; i++ )
			scrollEl[ i ].addEventListener( "click", scrollingFunc );
		
	var headerEl = document.querySelector( "header" ),
		headerBobMenuBt = document.querySelector( "#header-bob-menu-bt" );
		
	if ( headerEl && headerBobMenuBt ) {
		headerBobMenuBt.addEventListener( "click", function( event ) {
			if ( headerEl.classList.contains( "active" ) ) {
				headerEl.classList.remove( "active" );
				document.body.style = "";
			}
			else {
				headerEl.classList.add( "active" );
				document.body.style.overflow = "hidden";
			}
		} );
	}
	
	var sitebarFixed = document.querySelector( "#sitebar-fixed" ),
		sitebarFixed2 = document.querySelector( "#sitebar-fixed-2" );
	if ( sitebarFixed ) {
		posFixed( sitebarFixed );
		$(window).scroll( function( event ) {
			posFixed( sitebarFixed );
		});
	}
	if ( sitebarFixed2 ) {
		posFixed( sitebarFixed2 );
		$(window).scroll( function( event ) {
			posFixed( sitebarFixed2 );
		});
	}
	
	munuLi = document.querySelectorAll( ".sea-nav li a" );
	
	var inA = document.querySelectorAll( ".in > a" );
	if ( inA ) {
		for ( var i = 0; i < inA.length; i++ ) {
			inA[ i ].addEventListener( "click", function( event ) {
				if ( ! this.classList.contains( "open" ) ) {
					event.preventDefault();
					this.classList.add( "open" );
					this.nextElementSibling.classList.add( "active" );
				}
			} );
		}
	}
	
	var headerPageTitle = document.querySelector( ".header-page-title" );
	if ( headerPageTitle ) {
		var headerPageTitleMob = document.querySelector( ".header-bottom-page-title" );
		if ( headerPageTitleMob ) {
			headerPageTitleMob.innerHTML = headerPageTitle.innerHTML;
		}
	}
	
	var headerInEl = document.querySelectorAll( "header .header-navigation" );
	if ( headerInEl[1] ) {
		headerInEl = headerInEl[ 1 ].querySelector( ".in" );
		if ( headerInEl )
			headerInEl.classList.remove( "in" );
	}
	
	/* map */
	var mapHoverBlock = document.querySelector( "#map-hover-block" ),
		mapBlockSpans = document.querySelectorAll( ".map-block div > span" );
	
	if ( mapHoverBlock && mapBlockSpans[ 0 ] ) {
		for ( var i = 0; i < mapBlockSpans.length; i++ ) {
			mapBlockSpans[ i ].addEventListener( "mouseover", function( event ) {
				if ( document.documentElement.clientWidth <= 900 )
					return;
				mapHoverBlock.style.top = this.offsetTop - 83 + "px";
				if ( this.classList.contains( "left-location" ) ) {
					mapHoverBlock.style.left = "auto";
					mapHoverBlock.style.right = "0";
					mapHoverBlock.style.overflow = "hidden";
				}
				else {
					mapHoverBlock.style.left = this.offsetLeft - 16 + "px";
					mapHoverBlock.style.right = "auto";
					mapHoverBlock.style.overflow = "visible";
				}
				
				mapHoverBlock.innerHTML = "<p><strong>" + this.dataset.title + "</strong><br /><br />" + this.dataset.text + "</p>";
				mapHoverBlock.style.display = "block";
				this.innerHTML = "";
			} );
			mapBlockSpans[ i ].addEventListener( "mouseout", function( event ) {
				if ( event.relatedTarget.id == "map-hover-block" )
					return;
				mapHoverBlock.style.display = "none";
			} );
			mapHoverBlock.addEventListener( "mouseout", function( event ) {
				if ( event.relatedTarget.id == "map-hover-block" )
					return;
				mapHoverBlock.style.display = "none";
			} );
			
			mapHoverFunc( mapBlockSpans );
			window.addEventListener( "resize", function( event ) {
				mapHoverFunc( mapBlockSpans );
			} )
		}
	}
	
	/* Animation */
	
	contentBlock1El = document.querySelectorAll( ".content .content-block-1" );
	if ( contentBlock1El.length > 0 ) {
		contentBlock1ElAnim();
		window.addEventListener( "scroll", function() {
			contentBlock1ElAnim();
		} );
		window.addEventListener( "resize", function() {
			contentBlock1ElAnim();
		} );
	}
	
	isMobile = {
	    Android: function() {
	        return navigator.userAgent.match(/Android/i);
	    },
	    BlackBerry: function() {
	        return navigator.userAgent.match(/BlackBerry/i);
	    },
	    iOS: function() {
	        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	    },
	    Opera: function() {
	        return navigator.userAgent.match(/Opera Mini/i);
	    },
	    Windows: function() {
	        return navigator.userAgent.match(/IEMobile/i);
	    },
	    any: function() {
	        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	    }
	};
	// с помощью регулярок проверяем наличие текста,
	// соответствующие тому или иному браузеру
	if (isMobile.iOS()) {
		var safariBgBlocks = document.querySelectorAll( "body .image-bg-top-block, .block-image-bg" );
		if ( safariBgBlocks ) {
			for ( var i = 0; i < safariBgBlocks.length; i++ )
				safariBgBlocks[ i ].style.backgroundAttachment = "scroll";
		}
	};
	
	/* Sea animation */
	seaContentEls = document.querySelectorAll( ".sea-content" );
	seaAnim();
	window.addEventListener( "scroll", seaAnim );
	window.addEventListener( "resize", seaAnim );
	
	/* PopUp */
	
	var popLinkEl = document.querySelectorAll( '.pop-link' );
	
	if ( popLinkEl[ 0 ] && popData ) {
		var popUpBg = document.querySelector( "#popUpBg" ),
			popUp = document.querySelector( "#popUp" );
			
		if ( popUpBg && popUp ) {
			for ( var i = 0; i < popLinkEl.length; i++ ) {
				popLinkEl[ i ].addEventListener( "click", function( event ) {
					event.preventDefault();
					
					popUp.innerHTML = popData[ this.dataset.id ] + "<button id='popUpCloseBtBottom' class='def-bt hover-trans-05'>CLOSE</button>";
					
					popUpBg.className = "open";
					setTimeout( function() {
						popUpBg.className = "active";
					}, 10 );
				} );
				
				popLinkEl[ i ].addEventListener( "mouseover", function( event ) {
					if ( this.parentNode.className == 'image-block' )
						return;
					if ( document.documentElement.clientWidth <= 900 )
						return;
					event.preventDefault();
					
					popUp.innerHTML = popData[ this.dataset.id ] + "<button id='popUpCloseBtBottom' class='def-bt hover-trans-05'>CLOSE</button>";
					
					popUpBg.className = "open";
					setTimeout( function() {
						popUpBg.className = "active";
					}, 10 );
				} );
			}
			
			popUpBg.addEventListener( "click", function( event ) {
				event.preventDefault();
				var elId = event.target.id;
				if ( elId != "popUpBg" && elId != "popUpCloseBtBottom" && elId != "popUpCloseBtTop" )
					return;
				
				popUpBg.className = "close";
				setTimeout( function() {
					popUpBg.className = "";
				}, 503 );
			} );
		}
	}
}

window.addEventListener( "scroll", function() {
	if ( munuLi.length > 0 )
		menuFunction();
} );

window.addEventListener( "resize", function() {
	if ( munuLi.length > 0 )
		menuFunction();
		$( "#home-page-slider" ).slick("unslick");
		$( "#home-page-slider" ).slick( slickParams );
} );

function seaAnim( event ) {
	if ( ! seaContentEls[ 0 ] )
		return;
	var nowPageScroll = window.pageYOffset;
	var p = 150;
	for ( var i = 0; i < seaContentEls.length; i++ ) {
		if ( nowPageScroll >= getCoords( seaContentEls[ i ] ).top - p - document.documentElement.clientHeight / 2 )
			seaContentEls[ i ].style.opacity = "1";
		else
			seaContentEls[ i ].style.opacity = "0";
	}

}

function mapHoverFunc( els ) {
	if ( ! els[ 0 ] )
		return;
	for ( var i = 0; i < els.length; i++ ) {
		if ( document.documentElement.clientWidth <= 900 )
			els[ i ].innerHTML = els[ i ].dataset.text;
		else
			els[ i ].innerHTML = "";
	}
}

function contentBlock1ElAnim() {
	var h1 = 60,
		h2 = 86,
		h3 = 86;
	
	var scrolled = $( window ).scrollTop(),
		pageHeight = document.documentElement.clientHeight + 200;
	if ( ! scrolled && scrolled != 0 )
		return;
	
	if ( document.documentElement.clientWidth <= 700 ) {
		return;
	}
	
	var h1_100 = h1 / 100,
		h2_100 = h2 / 100,
		h3_100 = h3 / 100,
		ph_100 = pageHeight / 100;
	
	for ( var i = 0; i < contentBlock1El.length; i++ ) {
		var el = contentBlock1El[ i ],
			elCoords = getCoords( el ).top,
			elHeight = el.clientHeight;
		if ( el.classList.contains( "left" ) ) {
			if ( scrolled + pageHeight > elCoords && scrolled < elCoords ) {
				var el_100 = ( ( elCoords ) - scrolled ) / 100 * ph_100;
				if ( el_100 > 100 )
					el_100 = 100;
				else if ( el_100 < 0 )
					el_100 = 0;
				el.style.marginTop = h2_100 * el_100 + "px";
			}
			else if ( scrolled + pageHeight <= elCoords ) {
				el.style.marginTop = h2 + "px";
			}
			else {
				el.style.marginTop = 0 + "px";
			}
		}
		else if ( el.classList.contains( "right" ) ) {
			if ( scrolled + pageHeight > elCoords && scrolled < elCoords ) {
				var el_100 = ( ( elCoords ) - scrolled ) / 100 * ph_100;
				if ( el_100 > 100 )
					el_100 = 100;
				else if ( el_100 < 0 )
					el_100 = 0;
				el.style.marginTop = h3 - ( h3_100 * el_100 ) + "px";
			}
			else if ( scrolled + pageHeight <= elCoords ) {
				el.style.marginTop = 0 + "px";
			}
			else {
				el.style.marginTop = h3 + "px";
			}
		}
		else {
			if ( scrolled + pageHeight > elCoords && scrolled < elCoords ) {
				var el_100 = ( ( elCoords ) - scrolled ) / 100 * ph_100;
				if ( el_100 > 100 )
					el_100 = 100;
				else if ( el_100 < 0 )
					el_100 = 0;
				el.style.marginTop = h1_100 * el_100 + 60 + "px";
			}
			else if ( scrolled + pageHeight <= elCoords ) {
				el.style.marginTop = h1 + "px";
			}
			else {
				el.style.marginTop = 0 + "px";
			}
		}
	}
	
	var elCoords = getCoords( el ).top,
		elParentCoords = getCoords( el.parentNode ).top;
	if ( ! elCoords )
		return;
	
	if ( document.documentElement.clientWidth <= 900 ) {
		el.classList.remove( "active" );
		return;
	}
	
	if ( scrolled >= elParentCoords - 20 ) {
		el.classList.add( "active" );
		el.style.top = ( scrolled - elParentCoords + 20 ) + "px";
	}
	else
		el.classList.remove( "active" );
}

function menuFunction() {
	if ( ! munuLi )
		return;
	var nowPageScroll = window.pageYOffset;
	//console.log( "nowPageScroll = " + nowPageScroll );
	//console.log( "getCoords = " + getCoords( document.querySelector( "#block-1" ) ).top );
	var p = 150;
	if ( nowPageScroll >= getCoords( document.querySelector( "#sea-content-2018" ) ).top - p ) {
		if ( munuLi[ 10 ].className != "active" ) {
			for ( var i = 0; i < munuLi.length; i++ ) {
				munuLi[ i ].className = "";
			}
			munuLi[ 10 ].className = "active";
		}
	}
	else if ( nowPageScroll >= getCoords( document.querySelector( "#sea-content-2017" ) ).top - p ) {
		if ( munuLi[ 9 ].className != "active" ) {
			for ( var i = 0; i < munuLi.length; i++ ) {
				munuLi[ i ].className = "";
			}
			munuLi[ 9 ].className = "active";
		}
	}
	else if ( nowPageScroll >= getCoords( document.querySelector( "#sea-content-2016" ) ).top - p ) {
		if ( munuLi[ 8 ].className != "active" ) {
			for ( var i = 0; i < munuLi.length; i++ ) {
				munuLi[ i ].className = "";
			}
			munuLi[ 8 ].className = "active";
		}
	}
	else if ( nowPageScroll >= getCoords( document.querySelector( "#sea-content-2015" ) ).top - p ) {
		if ( munuLi[ 7 ].className != "active" ) {
			for ( var i = 0; i < munuLi.length; i++ ) {
				munuLi[ i ].className = "";
			}
			munuLi[ 7 ].className = "active";
		}
	}
	else if ( nowPageScroll >= getCoords( document.querySelector( "#sea-content-2014" ) ).top - p ) {
		if ( munuLi[ 6 ].className != "active" ) {
			for ( var i = 0; i < munuLi.length; i++ ) {
				munuLi[ i ].className = "";
			}
			munuLi[ 6 ].className = "active";
		}
	}
	else if ( nowPageScroll >= getCoords( document.querySelector( "#sea-content-2013" ) ).top - p ) {
		if ( munuLi[ 5 ].className != "active" ) {
			for ( var i = 0; i < munuLi.length; i++ ) {
				munuLi[ i ].className = "";
			}
			munuLi[ 5 ].className = "active";
		}
	}
	else if ( nowPageScroll >= getCoords( document.querySelector( "#sea-content-2012" ) ).top - p ) {
		if ( munuLi[ 4 ].className != "active" ) {
			for ( var i = 0; i < munuLi.length; i++ ) {
				munuLi[ i ].className = "";
			}
			munuLi[ 4 ].className = "active";
		}
	}
	else if ( nowPageScroll >= getCoords( document.querySelector( "#sea-content-2010" ) ).top - p ) {
		if ( munuLi[ 3 ].className != "active" ) {
			for ( var i = 0; i < munuLi.length; i++ ) {
				munuLi[ i ].className = "";
			}
			munuLi[ 3 ].className = "active";
		}
	}
	else if ( nowPageScroll >= getCoords( document.querySelector( "#sea-content-2008" ) ).top - p ) {
		if ( munuLi[ 2 ].className != "active" ) {
			for ( var i = 0; i < munuLi.length; i++ ) {
				munuLi[ i ].className = "";
			}
			munuLi[ 2 ].className = "active";
		}
	}
	else if ( nowPageScroll >= getCoords( document.querySelector( "#sea-content-2007" ) ).top - p ) {
		if ( munuLi[ 1 ].className != "active" ) {
			for ( var i = 0; i < munuLi.length; i++ ) {
				munuLi[ i ].className = "";
			}
			munuLi[ 1 ].className = "active";
		}
	}
	else if ( nowPageScroll >= 0 ) {
		if ( munuLi[ 0 ].className != "active" ) {
			for ( var i = 0; i < munuLi.length; i++ ) {
				munuLi[ i ].className = "";
			}
			munuLi[ 0 ].className = "active";
		}
	}
	else {
		for ( var i = 0; i < munuLi.length; i++ ) {
			munuLi[ i ].className = "";
		}
	}
}

function parallax( el ){
	var scrolled = $( window ).scrollTop();
	if ( window.pageYOffset > 120 ) {
		el.css( 'background-position', '0 ' + ( scrolled * 1 - 120 ) + 'px' );
	}
	else {
		el.css( 'background-position', '0 0' );
	}
}

function posFixed( el ) {
	if ( ! el )
		return;
		
	var elCoords = getCoords( el ).top,
		elParentCoords = getCoords( el.parentNode ).top;
	if ( ! elCoords )
		return;
		
	var scrolled = $( window ).scrollTop();
	if ( ! scrolled )
		return;
	
	if ( document.documentElement.clientWidth <= 900 ) {
		if ( el.parentNode.id != "boat" ) {
			el.classList.remove( "active" );
			return;
		}
	}
	
	if ( scrolled >= elParentCoords - 20 - 160 ) {
		el.classList.add( "active" );
		el.style.top = ( scrolled - elParentCoords + 20 + 160 ) + "px";
	}
	else
		el.classList.remove( "active" );
}

function scrollingFunc( event, s_max, scrollLength, scrollId, IdParam ) {
	//if ( document.documentElement.clientWidth <= 970 )
		//return;
	if ( ! s_max && s_max != 0 ) {
		//console.log( 1 );
		scrollTimeParam = 1;
		
		IdParam = scrollIdParam;
		scrollIdParam++;
		setTimeout( function() {
			scrollTimeParam = 0;
		}, 1001 );
		var scrollIdOb = this.attributes[ "href" ]
		if ( scrollIdOb )
			scrollId = scrollIdOb.value;
		if ( ! scrollId ) {
			scrollId = this.dataset.href;
			if ( ! scrollId )
				return;
		}
			
		scrollParam = scrollId;
		var el = document.querySelector( scrollId );
		//console.log( "el", el );
		if ( ! el )
			return;
		if ( document.documentElement.clientWidth > 700 )
			s_max = getCoords( el ).top - 50 - 100;
		else
			s_max = getCoords( el ).top - 50 - 30;
		s_max = s_max.toFixed( 0 );
		if ( s_max < 0 )
			s_max = 0;
		//console.log( "s_max", s_max );
		if ( ! s_max && s_max != 0 )
			return;
	}
	
	if ( scrollParam != scrollId )
		return;
	
	var scrollNow = window.pageYOffset;
	if ( ! scrollNow && scrollNow != 0 )
		return;
	
	if ( ! scrollLength ) {
		var scrollAbs = Math.abs( scrollNow - s_max );
		scrollLength = scrollAbs / 100;
		//console.log( "scrollLength", scrollLength );
	}
	
	if ( scrollNow > s_max ) {
		scrollNow -= scrollLength;
		if ( scrollNow < s_max )
			scrollNow = s_max;
	}
	else if ( scrollNow < s_max ) {
		scrollNow += scrollLength;
		if ( scrollNow > s_max )
			scrollNow = s_max;
	}
	else
		return;
	
	scrollTo( 0, scrollNow );
	setTimeout( function() {
		if ( scrollTimeParam == 1 )
			scrollingFunc( event, s_max, scrollLength, scrollId, IdParam );
		else
			scrollTo( 0, s_max );
			//console.log( 2 );
	}, 2 );
	
	event.preventDefault();
}

function getCoords(elem) {
	var box = elem.getBoundingClientRect();
	
	return {
		top: box.top + pageYOffset,
		left: box.left + pageXOffset
	};
}