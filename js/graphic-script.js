var graphs,
	graphs2r,
	graphs2l;

document.addEventListener( "DOMContentLoaded", ready );

function ready( event ) {
	graphs = document.querySelectorAll( ".graphic-type-1-block .graph" );
	
	if ( graphs[ 0 ] ) {
		scroll();
		window.addEventListener( "scroll", scroll );
	}
	
	graphs2r = document.querySelectorAll( ".graphic-type-2 .graph-2-r" );
	graphs2l = document.querySelectorAll( ".graphic-type-2 .graph-2-l" );
	
	if ( graphs2r[ 0 ] ) {
		scroll_2();
		window.addEventListener( "scroll", scroll_2 );
	}
	
	if ( graphs2l[ 0 ] ) {
		scroll_3();
		window.addEventListener( "scroll", scroll_3 );
	}
		
}

function scroll() {
	var nowPageScroll = window.pageYOffset + document.documentElement.clientHeight;
	for ( var i = 0; i < graphs.length; i++ ) {
		if ( nowPageScroll >= getCoords(  graphs[ i ] ).top + 300 )  {
			var els = graphs[ i ].querySelectorAll( ".green, .blue, .extra-blue" );
			if ( els[ 0 ] ) {
				for ( var j = 0; j < els.length; j++ ) {
					els[ j ].style.height = els[ j ].dataset.height + "px";
				}
			}
		}
	}
}

function scroll_2() {
	var nowPageScroll = window.pageYOffset + document.documentElement.clientHeight;
	for ( var i = 0; i < graphs2r.length; i++ ) {
		if ( nowPageScroll >= getCoords(  graphs2r[ i ] ).top + 100 )  {
			graphs2r[ i ].style.width = graphs2r[ i ].dataset.width + "px";
		}
	}
}

function scroll_3() {
	var nowPageScroll = window.pageYOffset + document.documentElement.clientHeight;
	for ( var i = 0; i < graphs2l.length; i++ ) {
		if ( nowPageScroll >= getCoords(  graphs2l[ i ] ).top + 100 )  {
			graphs2l[ i ].style.width = graphs2l[ i ].dataset.width + "px";
			graphs2l[ i ].style.marginLeft = "-" + graphs2l[ i ].dataset.width + "px";
		}
	}
}