// ------------------------------------------------------------------------------------------------------------------ 
//Description:Geht die markierten Bilder durch und fragt nach einem neuen Namen für die Bilddatei
// [Ver. 1.1]  
// [Autor: Gerald Singelmann. ] 
// [Lang: DE/EN]  
// [Getestet mit: InDesign CC2019]  
// [Creat: 19-11-04]  
// [Mod: 23-02-04]
// Bugs & Feedback : gs@cuppascript.com 
// www.cuppascript.com 
// [Localization by Jeff Potter, CreativePro Network, 2023-02-04. Added localization and English translation, error notification for invalid links] 
// ------------------------------------------------------------------------------------------------------------------ 

// enable localization
$.localize = true;

// create a localization object (for 2 locales)
var locMsgRename = {
    en: "Rename the image file",
    de: "Neuer Name für die Bilddatei"  // from original source code
    };

var locMsgInvalid = {
		en: "Invalid link\nTo rename the file, InDesign needs to know its location",
		de: "Ungültiger Link\nUm eine Bilddatei umzubenennen, muss ihr Speicherort bekannt sein"  //From Google Translate
		};

if ( app.selection.length )
	main();

function main() {
	var sels = [];
	for ( var ns = 0; ns < app.selection.length; ns++) sels[ns] = app.selection[ns];
	for ( var ns = 0; ns < sels.length; ns++) {
		var s = sels[ns];
		for ( var ng = 0; ng < s.allGraphics.length; ng++ ) {
			var g = s.allGraphics[ng];
			app.select(g);
			var l = g.itemLink;
			if ( l.isValid ) {
				var nm = l.name.split(".");
				var ext = nm.pop();
				nm = nm.join(".");
				var fp = l.filePath;
				var f = (fp instanceof File) ? fp : new File( fp );
				// var ls = prop( LinkStatus, l.status );
				var ls = l.status.toString();
				if ( ls.toLowerCase() == "normal" ) {
					var nu_nm = prompt (locMsgRename, nm);
					if ( nu_nm != null && nu_nm != nm ) {
						var done = f.rename( nu_nm + "." + ext );
						if ( done ) {
							l.relink( f );
						}	// did rename
					}		// neuer name
				}			// link status normal
				else {
					alert(locMsgInvalid);
				}
			}				// link valid
		}					// graphics loop
	}						// selection loop
	app.select( sels );
}
function prop (base, value) {
   var props = base.reflect.properties;
   var array = [];
   for (var i = 0; i < props.length; i++)
   {
    if (base[props[i].name] == value) return props[i].name;
   }
   return String(value);
}