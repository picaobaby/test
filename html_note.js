/*************************************************
	Parts 
*************************************************/ 

// accordion 
// addresses
// allelements 


// banner 
div >> div >> div >> a >> img 
div .banner
div .container 
div .row 
a 
img .img-responsive  (1170x65) 


// box 


// breadcrumb 
.breadcrumb > a + span ... a + span + xx 
	a.home > i.icon-home
	span.navigation-pipe
	span.navigation_page, xxx 


// button 
// colorsize ---- color && size ??
// errors
// form 
// header_links ??
// hlist
// icons 
// loading 


// minicart




// myaccount --- ??


// newsletter
div >> h4 ++ div 
div >> form 
form >> div >> input ++ button 
-----------
div #newsletter_block_left .block 
	h4 
	div .block_content 
		form 
			div.form-group
				input .newsletter-input
				button >> span 







// paging ---- paging && sorting, 2 ??
	// first do layout, then detail of the 2 parts
div >> div ++ div 
div.xxx 
	div.xxx 
	div.xxx 

div.sortPagiBar >> ul ++ form 
	ul >> li >> a >> i ++ xxx 
		ul.xx 
		li.display-title || #grid || #list
		a >> li.icon-xxx 

	form >> div >> label ++ select 
		form #productSortForm
		div.select .selecor1
		label 
		select .selectProductSort

div.top-pagination-content >> form ++ div ++ div
	form.compare-form >> button >> span -------// .bt_compare
	div.pagination, || .pagination_bottom
	div.product-count




// search 
div >> form >> input ++ button 
div #search_block_top
form #searchbox
	input .search_query .form-control #search_query_top
	button .button-search >> span 




// sitemap --- ?? tree
h1 ++ div.row ++ div.row 
h1 .page-heading 
div.row #sitemap_content 
	div.col-xx-xx
		div >> h3 ++ ul 
		div .sitemap_block .box 
			h3 .page-subheading 
			ul >> li >> a  
	div.col-xx-xx 
		div >> h3 ++ ul 
		div .XX .box 
			h3 .xxx 
			ul >> li >> a 

div.row #listpage_content
	div.col-xx-xx 
	div.col-xx-xx





// social 
section >> ul ++ h4
ul >> li >> a >> span 
section #social_block 
	ul 
		li .xxx  // facebook, twitter, rss
		a 	// _blank 
		span 
	h4 




// table ---- @@ TODO, ps classname 
table >> thead ++ tfoot ++ tbody 
table .std 
	thead >> tr >> th
	tfooter >> tr >> td
	tbody >> tr >> td





// tabs ----- @@ TODO
div >> ul ++ div ++ div ++ div 
div .xxx 
	ul .xxx >> li >> a 
		li, li.current 
			a, href='#tab2'
	div.xxx #tab1
	div.xxx #tab2
	div.xxx #tab3






// thumbnails 
div >> div >> ul >> li >> a >> img 
div #views_block 
	div #thumbs_list 
		ul #thumbs_list_frame 
			li, li.last
				a .fancybox .shown*
					img .img-responsive






// topmenu ---- @@@ TODO ... firebug first !! 
div >> div ++ ul 
ul >> li >> a ++ ul 
div .sf-contener, #block_top_menu 
	div .cat-title 
	ul .sf-menu .menu-content
		li, li.sfHoverforce 
			a 
			ul 
				li, li #category-thumbnail 
					a ++ ul ...........






// userinfo --- @@ need more for logged in (logout, welcome etc) 
div >> a 
div .header_user_info 
	a .login 






// vlist 
div >> ul >> li >> a 
div .vlist_container 
	ul .vlist 
		li, li.selected  
			a 





/*************************************************
	Pages - layout
*************************************************/ 
// header ?? -- layout
// list 
// detail 
// cart
// checkout 




/*************************************************
	List - parts
*************************************************/ 
// scene 
// subcategories 
// title 
// sorting_paging, paging_bottom **
// items








/*************************************************
	Detail - parts
*************************************************/ 

// add_to_cart
// add_to_wishlist 
// attributes
// avail 
// comments
// condition 
// data_sheet
// description_short 
// image_block 



// min qty 
p >> xxx ++ b
p #minimal_quantity_wanted_p 
	b #minimal_quantity_label



// more info 
section >> h3 ++ div 
section .page-product-box 
	h3 .page-product-heading 
	div .rte >> p 



// oosHook 
div #oosHook 	// display:none



// price
// qty_avail 
// qty_wanted 
// reduce_price
// ref
// resetimg 
// review 



// socialsharing 
p >> button >> i ++ xx 
p .socialsharing_product 	// .list-inline .no-print 
button .btn .btn-default .btn-facebook || .btn-xxx 
i.icon-xx 		// twitter, facebook, google-plus, pinterest
xxx 



// thumbnails 
div >> div >> ul >> li >> a >> img
div #views_block
div #hunb_list 
ul #thumb_list_frame
li  ||  li.last			// #thumbnail_xxx
a.fancybox && .shown*   // href (thickbox imagefile)
img.img-responsive		// #thumb_xxx




// usefull_link
ul >> li >> a + div*
ul #usefull_link 	// .clearfix .no-print
li.sendtofriend >> a #send_friend_button 
li.print 		>> a  
----------
@@ should create another part, sendtofriend






/*************************************************
	Cart 
*************************************************/ 
// cart_title 
// items_table 
// last_added
// navigation 
// steps 












/*************************************************
	Checkout 
*************************************************/ 
// carriercompare
// order-opc















/*************************************************
	Homepage 
*************************************************/ 
// featured 
// slider 
