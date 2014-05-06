'use strict';

module.exports = function(grunt) {
	grunt.registerTask('step2', '', function() {

		// Class - CssDef
		function CssDef(str) {
			this.str = str; 
			this.data = {};
			// this.data = {width:'200px', height:'200px', display:'block', color:'#333'}
		}

		CssDef.prototype = {
			matchPropertyName: function(match) {
				var mapPropertyName = {
					'w'		: 'width',
					'h'		: 'height',
					'm'		: 'margin',
					'p'		: 'padding',
					'f'		: 'float',
					'v'		: 'visibility',
					't' 	: 'top',
					'b' 	: 'bottom',
					'l' 	: 'left',
					'r' 	: 'right',
					'ml'	: 'margin-left',
					'mr'	: 'margin-right',			
					'mt'	: 'margin-top',
					'mb'	: 'margin-bottom',
					'bg'	: 'background',
					'bd'	: 'border',
					'pos'	: 'position',
					'dis'	: 'display',
					'col'	: 'color',
					'grad' 	: 'gradient',
				};
				return mapPropertyName[match] ? mapPropertyName[match] : match; 
			}, 

			matchPropertyValue: function(match) {
				var mapPropertyValue = {
					'b'		: 'block',
					'n'		: 'none',
					'ab'	: 'absolute',  // dis=ab
					'rel'	: 'relative',  // dis=rel
					'h'		: 'hidden',
					'l' 	: 'left',
					'r' 	: 'right',					
				}; 
				return mapPropertyValue[match] ? mapPropertyValue[match] : match; 
			},

			initData: function() {
				// need to parse the string, and create object, with matched string for each key/value
				// this.str = 'w:200px; h:200px; dis:b; col:#333;';
				// this.data = {width:'200px', height:'200px', display:'block', color:'#333'};

				var str = this.str, 
					data = {}, 
					strPair = '', 
					arrPair = [], 
					propertyName = '', 
					propertyValue = '', 
					self = this; 

				str.split(';').forEach( function(pair) {
					strPair = pair.trim();
					if (strPair.length != 0 ) {
						arrPair = strPair.split(':');
						arrPair[0] = arrPair[0] ? arrPair[0] : '';
						arrPair[1] = arrPair[1] ? arrPair[1] : '';

						propertyName = arrPair[0].replace(arrPair[0], self.matchPropertyName);
						propertyValue = arrPair[1].replace(arrPair[1], self.matchPropertyValue);
						data[propertyName] = propertyValue;
					}
				});
				this.data = data; 
			}, 

			toScssString: function(hasChild) {
				// default, no child, create #xx {}
				// header_right, pass in true, will not create closing '}'
				if (typeof(hasChild) === 'undefined') hasChild = false;

				var data = this.data, 
					str = '{';
				Object.keys(data).forEach( function(key) {
					str += key + ':' + data[key] + '; ';
				}); 
				return (hasChild) ? str : str+'}';
			}, 

			// no {}, for parts/pages scss 
			toScssStringParts: function() {
				var data = this.data, 
					str = ''; 
				Object.keys(data).forEach( function(key) {
					str += key + ':' + data[key] + '; ';
				});
				return str;
			}
		}

		// Class - Design
		function Design(str, type) {
			this.str = str; 
			this.type = type ? type : 'layout';
			this.id = '';

			this.items 			= {}; 
			this.items_all 		= []; 
			this.items_modules 	= []; 
			this.items_nonmodules = []; // ?? need this	
		}

		Design.prototype = {
			matchHtmlTag: function(match) {
				var mapHtmlTag = {
					'search'		: '<!-- start search --> <div id="search_block_top">SEARCH </div><!-- end search -->',
					'header_links'	: '<!-- start header_links --> <ul id="header_links">HEADER_LINKS </ul> <!-- end header_links -->',
					'userinfo'		: '<!-- start userinfo --> <div id="header_user">HEADER_USER</div><!-- end userinfo -->',
					'topmenu'		: '<!-- start topmenu --> <div class="sf-contener clearfix">SUPERFISH_MENU</div> <!-- end topmenu -->',
					'minicart'		: '<!-- start minicart --> <div id="cart_block" class="block exclusive">MINICART</div> <!-- end minicart -->',
					'lang'			: '<!-- start lang --> <div id="languages_block_top">LANGUAGES</div> <!-- end lang -->',
					'curr'			: '<!-- start curr --> <div id="currencies_block_top">CURRENCIES</div> <!-- end curr -->',			
					'socials'		: '<!-- start socials --> <div id="social_block_top">SOCIALS</div> <!-- end socials -->' // ??
				}; 	
				return mapHtmlTag[match] ? mapHtmlTag[match] : match;
			},			

			matchCssClass: function(match) {
				var mapCssClass = {
					'search'		: '#search_block_top', 
					'header_links' 	: '#header_links', 
					'userinfo' 		: '#header_user', 
					'topmenu' 		: '.sf-contener', 
					'minicart' 		: '#cart_block', 
					'lang' 			: '#languages-block-top', // '.languages-block'
					'curr' 			: '#currencies_block_top', 
					'socials'		: '#socials_block_top',	// ??
					'body'			: 'body', 
					'page'			: '#page', 
					'header'		: '#header', 
					'header_right'	: '#header_right', 
					'columns'		: '#columns', 
					'left_column'	: '#left_column', 			
					'center_column'	: '#center_column', 
					'footer'		: '#footer', 					
				}; 
				return mapCssClass[match] ? mapCssClass[match] : match;
			}, 

			initData: function() { 
				var items = {}, 
					self = this,
					strLine = '', 
					arrLine = [], 
					elemName = '',
					elemDef = '',
					elemObj = {}, 
					str = '', 
					arr = [];

				// then create simple arrays, for modules and nonmodules, for easiler operation ?
				this.str.split('\n').forEach( function(line) {
					strLine = line.trim();

					if (strLine.length != 0) {
						arrLine = strLine.split('>>');
						arrLine[1] = arrLine[1] ? arrLine[1] : ''; 

						// elementName = arrLine[0].replace( arrLine[0], self.matchHtmlTag);
						elemName = arrLine[0].trim();
						elemDef = arrLine[1] ? arrLine[1].trim() : '';
						elemObj	 = new CssDef(elemDef);

						elemObj.initData();
						items[elemName] = elemObj; 
						// console.log(items[elemName]);
					}
				});
				this.items = items;

				// also need to create, this.items_all, and items_modules 
				Object.keys(items).forEach( function(key) {
					self.items_all.push(key);
				});
				// console.log('all === ' + this.items_all);

				var test1 = this.items_all.indexOf('header_right');
				var test2 = this.items_all.indexOf('columns');
				// console.log(test1 + ', ' + test2);

				this.items_modules = this.items_all.splice( test1+1, test2-test1-1);
				// console.log( 'modules === ' + this.items_modules);
			}, 

			// @@ change name ?? -- htmlForModules?
			htmlModules: function() {
				var str = '<!-- Dynamic Content -->\n', 
					items = this.items,
					modules = this.items_modules, 
					self = this;
				modules.forEach( function(module) {
					str += module.replace(module, self.matchHtmlTag) + '\n';
				});
				return str += '<!-- Dynamic Content Ended -->';
			}, 

			htmlLayoutInner: function() {}, 

			scssLayoutOuter: function() {
				var items = this.items,
					nonmodules = ['body', 'header', 'header_logo', 'header_right', 'columns', 'left_column', 'center_column', 'footer'],	// @@ TODO: create this, initData()
					self = this, 
					str = '', 
					className = '', 
					cssDef = '';

				nonmodules.forEach( function(key) {
					className = key.replace(key, self.matchCssClass);
					if (key == 'header_right') 
						cssDef = items[key].toScssString(true) + '\n' + self.scssLayoutInner() + '}';
					else 
						cssDef = items[key].toScssString();
					
					str += className + ' ' + cssDef + '\n';
				});
				return str;
			}, 

			scssLayoutInner: function() {
				var self = this, 
					items = this.items,
					modules = this.items_modules,
					str = '', 
					className = '', 
					cssDef = '';

				modules.forEach( function(module) {
					cssDef = items[module].toScssString();
					className = module.replace(module, self.matchCssClass);
					str += className + ' ' + cssDef + '\n';

				});
				return str;
			}, 

			scssPart: function() {
				 
			},
			// xx = design.scssPart()
		}


		// Test -- Design object methods 
		// designObj = new Design('\n body >> w:200px; h:30px; dis:b; bg:#ccc; bgimg; \n header >>p:200px;m:100px;\n header_logo \n header_right\n search >> w:200px;h:100px;dis:b;col:#ccc; ml:10px;\n header_links >> dis:none;\n minicart >> pos:ab; dis:none\n userinfo\n socials\n columns\n left_column\n center_column\n footer\n');
		// designObj.initData();
		// var inner = designObj.scssLayoutInner(); 
		// console.log('inner: \n' + inner);
		// var outer = designObj.scssLayoutOuter();
		// console.log('outer: \n' + outer);
		// var htmlmodules = designObj.htmlModules();
		// console.log(htmlmodules);


		// main 
		var filename_designdoc = 'design/designDoc.txt', 
			filecontent_designdoc, 
			designObj,
			designID, 	// @@ CHANGENAME: idDesign 
			designType, // @@ CHANGENAME: typeDesign 
			arrDesigns = [], // REMOVE? 
			htmlStr, 
			scssStr, 
			cssdefObj,

			idDesign = '', 
			typeDesign = '',
			objDesign = {}, 
			lines = [], 
			line1 = '', 
			arrLine1 = []; 

		// Testing - CssDef
		// cssdefObj = new CssDef('w:200px; h:299px; dis:b; bg:#ffcc; bgimg:url(icon.jpg);');
		// cssdefObj.initData();
		// var scss = cssdefObj.toScssStringParts();
		// console.log(scss);




		// // copy logo and bgimage, to each design folder, using one task 
		// taskCopyLogoBg(); 

		// // open resulting code and html pages 
		// taskOpenCodePages(); 


		// New -- main 
		// grunt.file.read(filename_designdoc).split('**').forEach( function(portion) {
		// 	portion = portion.trim();
		// 	if (portion.length) {
		// 		lines = portion.split('\n');
		// 		line1 = lines.shift();
		// 		portion = lines.join('\n');

		// 		arrLine1 	= line1.split('==');
		// 		idDesign 	= arrLine1[0];	// must have it in designdoc 
		// 		typeDesign 	= arrLine1[1] ? arrLine1[1] : 'layout';

		// 		// create Design obj ??
		// 		// each design, create obj, then use obj to create file contents, to save or replace existing file 
		// 		objDesign = new Design(portion, typeDesign);	// @@ need id here, as parameter ???
		// 		objDesign.initData();
		// 		createFiles(objDesign, idDesign);
		// 	}
		// });


		function createFiles(objDesign, idDesign) {
			var file_html 		= 'design/working/'+ idDesign +'/index.html', 
				file_scss 		= 'design/working/'+ idDesign +'/scss/_layout.scss', 
				file_designdoc 	= 'design/working/'+ idDesign +'/designDoc.txt';

			// create html string, replace xxx file 
			saveFile( file_html, objDesign.htmlModules(), true); // replace, instead of save, 'design/working/1/index.html'
			saveFile( file_scss, objDesign.scssLayoutOuter()); 	// 'design/working/1/scss/_layout.scss'
			saveFile( file_designdoc, objDesign.str);			// 'design/working/1/designDoc.txt'
		}

		function saveFile(filename, content, isLayoutHtml) {
			if ( typeof(isLayoutHtml) === 'undefined') 
				isLayoutHtml = false; 

			if (isLayoutHtml) {
				var oldcontent = grunt.file.read(filename),
					re = /<!-- Dynamic Content -->[\s\S]*?<!-- Dynamic Content Ended -->/gmi;

				oldcontent = oldcontent.replace(re, content);
				grunt.file.write(filename, oldcontent );
			} else {
				grunt.file.write(filename, content);
			}
		}

		// // TESTING --
		// var test = new Design('\n body >> w:200px; h:30px; dis:b; bg:#ccc; bgimg; \n header >>p:200px;m:100px;\n header_logo \n header_right\n search >> w:200px;h:100px;dis:b;col:#ccc; ml:10px;\n header_links >> dis:none;\n minicart >> pos:ab; dis:none\n userinfo\n socials\n columns\n left_column\n center_column\n footer\n');
		// test.initData();	
		// createFiles(test, 10);



		// TASK: copy logo/bg images, to each folder 
		function taskCopyLogoBg() {
		}

		// TASK: open html and scss files in sublime, open html in firefox 
		function openAll() {
			var	filename_html, 
				filename_scss, 
				target_html, 
				target_scss, 
				target_page, 
				str = '', 
				open = grunt.config.get('open'), 
				targetlist = [];


			folders.forEach( function(folder) {
				filename_html = 'design/working/'+ folder +'/index.html';
				filename_scss = 'design/working/'+ folder +'/scss/style.scss'; // @@ or, _layout.scss ??
				open['design'+folder+'html'] = {path: filename_html, app: 'sublime_text'};
				open['design'+folder+'scss'] = {path: filename_scss, app: 'sublime_text'};
				// open['design'+folder+'page'] = {path: filename_html, app: 'Firefox'};
				open['design'+folder+'page'] = {path: '<%=rootUrl%>/'+filename_html, app: 'Firefox'};

				target_html = 'open:design'+ folder +'html'; 
				target_scss = 'open:design'+ folder +'scss'; 
				target_page = 'open:design'+ folder +'page';
				targetlist.push(target_html, target_scss, target_page);
				// targetlist.push(target_page);
			});

			grunt.config.set('open', open);
			grunt.task.run(targetlist);
		}

		// TASK: compass(compile) all scss files, into css
		function compassAll() {
			var str = '', 
				self = this, 
				compass = grunt.config.get('compass'), 
				targetname = '', 
				targetlist = []; 

			grunt.file.expand({cwd:'design/working'}, '*').forEach(function(foldername) {
				// update compass.xx here 
				targetname = 'design' + foldername;
				compass[targetname] = {
					options: {
						sassDir: 'design/working/'+foldername+'/scss', 
						cssDir: 'design/working/'+foldername+'/css', 
						outputStyle: 'expanded', 
						require: ['sassy-buttons', 'font-stack', 'font-stacks'],
						debugInfo: true, 
						force: true						
					}, 
					files: {'style.css': 'style.scss'}
				};
				targetlist.push('compass:'+targetname);
			}); 

			console.log(targetlist);
			grunt.config.set('compass', compass);
			grunt.task.run(targetlist);
		}


		// Main, testing ---- 
		var folders = [];
		grunt.file.expand({cwd: 'design/working'}, '*').forEach( function(folder) {
			folders.push(folder);
		});
		
		compassAll();
		openAll();

	});
};