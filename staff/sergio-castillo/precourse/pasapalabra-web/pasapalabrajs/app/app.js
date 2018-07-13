//Variables
var game ="";
var questions=[];
var questionsJs=[
			{ letter: "a", answer: "array", status: 0, tip: ("IT BEGINS WITH A"),question: ("A variable that can hold more than one value at a time.") },
			{ letter: "b", answer: "boolean", status: 0, tip: ("IT BEGINS WITH B"), question: ("It's a Javascript type, like integer or string, but it only has two values: true or false.") },
			{ letter: "c", answer: "console.log", status: 0, tip: ("IT BEGINS WITH C"), question: ("Is a function that prints out anything you puts in the parentheses to a screen called console.") },
	    	{ letter: "d", answer: "date", status: 0, tip: ("IT BEGINS WITH D"), question: ("It's an object used to work with dates and times.") },
	    	{ letter: "e", answer: "else", status: 0, tip: ("IT BEGINS WITH E"), question: ("A fallback to an if statement. This will only get executed if the previous statement did not") },
	    	{ letter: "f", answer: "function", status: 0, tip: ("IT BEGINS WITH F"), question: ("A javascript procedure: a set of statements that performs a task or calculates a value. It's like a reusable piece of code.") },
	    	{ letter: "g", answer: "getelementbyid", status: 0, tip: ("IT BEGINS WITH G"), question: ("Method that returns the element that has the ID attribute with the specified value. To use in Javascript an element from Html.") },
	    	{ letter: "h", answer: "push", status: 0, tip: ("CONTAINS H"), question: ("This method adds new items to the end of an array, and returns the new length.") },
	    	{ letter: "i", answer: "isnan", status: 0, tip: ("IT BEGINS WITH I"), question: ("Returns true if the given number is not a number, else returns false.") },
	    	{ letter: "j", answer: "join", status: 0, tip: ("IT BEGINS WITH J"), question: ("A method that put together the elements of an array into a string, and returns the string.") },
	    	{ letter: "k", answer: "keycode", status: 0, tip: ("IT BEGINS WITH K"), question: ("This property returns the Unicode character code of the key that triggered the onkeypress event, or the Unicode key code of the key that triggered the onkeydown or onkeyup event.") },
	    	{ letter: "l", answer: "length", status: 0, tip: ("IT BEGINS WITH L"), question: ("This property returns the number of characters of a string, or the number of elements of a number, array or object.") },
	    	{ letter: "m", answer: "math.random", status: 0, tip: ("IT BEGINS WITH M"), question: ("Returns a random number between 0 and 1.") },
	    	{ letter: "n", answer: "null", status: 0, tip: ("IT BEGINS WITH N"), question: ("It is supposed to be something that doesn't exist.") },
	    	{ letter: "ñ", answer: "", status: 0, tip: ("PRESS ENTER. THIS LETTER DON'T EXIST"), question: ("") },
	    	{ letter: "o", answer: "object", status: 0, tip: ("IT BEGINS WITH O"), question: ("It is known as a associative array. It can store sets of key and value parts.") },
	    	{ letter: "p", answer: "prompt", status: 0, tip: ("IT BEGINS WITH P"), question: ("It displays a dialog with an optional message prompting the user to input some text. If the user clicks the Cancel button, null is returned.") },
	    	{ letter: "q", answer: "jquery", status: 0, tip: ("CONTAINS Q"), question: ("") },
	    	{ letter: "r", answer: "return", status: 0, tip: ("IT BEGINS WITH R"), question: ("To send a value to the origin of the function call to be used outside of the function.") },
	    	{ letter: "s", answer: "switch", status: 0, tip: ("IT BEGINS WITH S"), question: ("Acts like a big if / else if / else chain. Checks a value against a list of cases, and executes the first case that is true.") },
	    	{ letter: "t", answer: "touppercase", status: 0, tip: ("IT BEGINS WITH T"), question: ("") },
	    	{ letter: "u", answer: "unshift", status: 0, tip: ("IT BEGINS WITG U"), question: ("") },
	    	{ letter: "v", answer: "variables", status: 0, tip: ("IT BEGINS WITH V"), question: ("In plural. Containers for storing data values.") },
	    	{ letter: "w", answer: "while", status: 0, tip: ("IT BEGINS WITH W"), question: ("You use this loop if you don't know how often you'll loop.") },
	    	{ letter: "x", answer: "tofixed", status: 0, tip: ("CONTAINS X"), question: ("This method converts a number into a string, keeping a specified number of decimals.") },
	    	{ letter: "y", answer: "symbol", status: 0, tip: ("CONTAIN Y"), question: ("A data type whose instances are unique and immutable.") },
	    	{ letter: "z", answer: "", status: 0, tip: ("PRESS ENTER. THIS LETTER DON'T EXIST"), question: ("") },
	];
	var questionsHtml5=[
			{ letter: "a", answer: "audio", status: 0, tip: ("IT BEGINS WITH A"),question: ("This tag element specifies a standard way to embed audio in a web page.") },
			{ letter: "b", answer: "button", status: 0, tip: ("IT BEGINS WITH B"), question: ("This tag defines a clickable button.") },
			{ letter: "c", answer: "canvas", status: 0, tip: ("IT BEGINS WITH C"), question: ("This tag element is used to draw graphics on a web page.") },
	    	{ letter: "d", answer: "div", status: 0, tip: ("IT BEGINS WITH D"), question: ("This tag defines a division or a section in an HTML document and is often used as a container for other HTML elements to style them with CSS or to perform certain tasks with JavaScript.") },
	    	{ letter: "e", answer: "embed", status: 0, tip: ("IT BEGINS WITH E"), question: ("This tag defines a container for an external application or interactive content (a plug-in).") },
	    	{ letter: "f", answer: "form", status: 0, tip: ("IT BEGINS WITH F"), question: ("This tag is used to create an HTML form for user input.") },
	    	{ letter: "g", answer: "strong", status: 0, tip: ("CONTAINS G"), question: ("This is a phrase tag. It defines important text.") },
	    	{ letter: "h", answer: "hypertext", status: 0, tip: ("IT BEGINS WITH H"), question: ("In the abbreviation Html, what's the meaning of HT.") },
	    	{ letter: "i", answer: "input", status: 0, tip: ("IT BEGINS WITH I"), question: ("This tag element is used to create interactive controls for web-based forms in order to accept data from the user.") },
	    	{ letter: "j", answer: "", status: 0, tip: ("PRESS ENTER. THIS LETTER DON'T EXIST"), question: ("") },
	    	{ letter: "k", answer: "keygen", status: 0, tip: ("IT BEGINS WITH K"), question: ("This tag element exists to facilitate generation of key material, and submission of the public key as part of an HTML form.") },
	    	{ letter: "l", answer: "link", status: 0, tip: ("IT BEGINS WITH L"), question: ("This tag element specifies relationships between the current document and an external resource. Possible uses for this element include defining a relational framework for navigation. This element is most used to link to style sheets.") },
	    	{ letter: "m", answer: "meta", status: 0, tip: ("IT BEGINS WITH M"), question: ("This tag provides metadata about the HTML document. Metadata will not be displayed on the page, but will be machine parsable. (We use with the attribute Charset)") },
	    	{ letter: "n", answer: "nav", status: 0, tip: ("IT BEGINS WITH N"), question: ("This tag defines a set of navigation links.") },
	    	{ letter: "ñ", answer: "", status: 0, tip: ("PRESS ENTER. THIS LETTER DON'T EXIST"), question: ("") },
	    	{ letter: "o", answer: "onclick", status: 0, tip: ("IT BEGINS WITH O"), question: ("This attribute fires on a mouse click on the element.") },
	    	{ letter: "p", answer: "placeholder", status: 0, tip: ("IT BEGINS WITH P"), question: ("This attribute specifies a short hint that describes the expected value of an input field (e.g. a sample value or a short description of the expected format).") },
	    	{ letter: "q", answer: "blockquote", status: 0, tip: ("CONTAINS Q"), question: ("This tag Element (or HTML Block Quotation Element) indicates that the enclosed text is an extended quotation. Usually, this is rendered visually by indentation. A URL for the source of the quotation may be given using the cite attribute, while a text representation of the source can be given using the <cite> element.") },
	    	{ letter: "r", answer: "article", status: 0, tip: ("CONTAINS R"), question: ("This tag specifies independent, self-contained content.") },
	    	{ letter: "s", answer: "script", status: 0, tip: ("IT BEGINS WITH S"), question: ("This tag is used to define a client-side script (JavaScript).") },
	    	{ letter: "t", answer: "title", status: 0, tip: ("IT BEGINS WITH T"), question: ("This tag defines the document's title that is shown in a browser's title bar or a page's tab. It only contains text and tags within the element are ignored.") },
	    	{ letter: "u", answer: "ul", status: 0, tip: ("IT BEGINS WITG U"), question: ("This tag element represents an unordered list of items, typically rendered as a bulleted list.") },
	    	{ letter: "v", answer: "video", status: 0, tip: ("IT BEGINS WITH V"), question: ("This tag embeds a media player which supports video playback into the document. You can use it for audio content as well, but the <audio> element may provide a more appropriate user experience.") },
	    	{ letter: "w", answer: "", status: 0, tip: ("PRESS ENTER. THIS LETTER DON'T EXIST"), question: ("") },
	    	{ letter: "x", answer: "xhtml", status: 0, tip: ("IT BEGINS WITH X"), question: ("Abbreviation for extensible hypertext markup language.") },
	    	{ letter: "y", answer: "style", status: 0, tip: ("CONTAIN Y"), question: ("This tag  element contains style information for a document, or part of a document. By default, the style instructions written inside that element are expected to be CSS.") },
	    	{ letter: "z", answer: "", status: 0, tip: ("PRESS ENTER. THIS LETTER DON'T EXIST"), question: ("") },
	];
	var questionsCSS3=[
			{ letter: "a", answer: "animation", status: 0, tip: ("IT BEGINS WITH A"),question: ("This CSS property is a shorthand property for the various animation properties.") },
			{ letter: "b", answer: "background-color", status: 0, tip: ("IT BEGINS WITH B"), question: ("This CSS property sets the background color of an element.") },
			{ letter: "c", answer: "content", status: 0, tip: ("IT BEGINS WITH C"), question: ("This CSS property is used with the ::before and ::after pseudo-elements to generate content in an element. Objects inserted are anonymous replaced elements.") },
	    	{ letter: "d", answer: "display", status: 0, tip: ("IT BEGINS WITH D"), question: ("This CSS property specifies the type of rendering box used for an element.") },
	    	{ letter: "e", answer: "em", status: 0, tip: ("IT BEGINS WITH E"), question: ("It's an unit for expressing a length. Relative to the font-size of the element.") },
	    	{ letter: "f", answer: "font-family", status: 0, tip: ("IT BEGINS WITH F"), question: ("This CSS property specifies a prioritized list of one or more font family names and/or generic family names for the selected element.") },
	    	{ letter: "g", answer: "gradient", status: 0, tip: ("IT BEGINS WITH G"), question: ("This CSS data type is a special type of <image> that consists of a progressive transition between two or more colors.") },
	    	{ letter: "h", answer: "hover", status: 0, tip: ("IT BEGINS WITH H"), question: ("This CSS pseudo-class matches when the user interacts with an element with a pointing device, but does not necessarily activate it. It is generally triggered when the user hovers over an element with the cursor (mouse pointer).") },
	    	{ letter: "i", answer: "id", status: 0, tip: ("IT BEGINS WITH I"), question: ("What kind of selector is this: #name{}") },
	    	{ letter: "j", answer: "justify-content", status: 0, tip: ("IT BEGINS WITH J"), question: ("This CSS property defines how the browser distributes space between and around content items along the main axis of their container.") },
	    	{ letter: "k", answer: "font-kerning", status: 0, tip: ("CONTAINS K"), question: ("This CSS property controls the usage of the kerning information stored in a font.") },
	    	{ letter: "l", answer: "list-style", status: 0, tip: ("IT BEGINS WITH L"), question: ("This CSS property is a shorthand for setting the individual values that define how a list is displayed: list-style-type, list-style-image, and list-style-position.") },
	    	{ letter: "m", answer: "margin", status: 0, tip: ("IT BEGINS WITH M"), question: ("This CSS property sets the margin area on all four sides of an element.") },
	    	{ letter: "n", answer: "padding", status: 0, tip: ("CONTAINS N"), question: ("This CSS property sets the padding area on all four sides of an element.") },
	    	{ letter: "ñ", answer: "", status: 0, tip: ("PRESS ENTER. THIS LETTER DON'T EXIST"), question: ("") },
	    	{ letter: "o", answer: "opacity", status: 0, tip: ("IT BEGINS WITH O"), question: ("This CSS property specifies the level of transparency of an element, that is, the degree to which the content behind the element is visible.") },
	    	{ letter: "p", answer: "position", status: 0, tip: ("IT BEGINS WITH P"), question: ("This CSS property specifies how an element is positioned in a document. The top, right, bottom, and left properties determine the final location of positioned elements.") },
	    	{ letter: "q", answer: "quotes", status: 0, tip: ("IT BEGINS WITH Q"), question: ("This CSS property indicates how user agents should render quotation marks.") },
	    	{ letter: "r", answer: "relative", status: 0, tip: ("IT BEGINS WITH R"), question: ("Type of position. The element is positioned according to the normal flow of the document, and then offset relative to itself based on the values of top, right, bottom, and left. The offset does not affect the position of any other elements; thus, the space given for the element in the page layout is the same as if position were static.") },
	    	{ letter: "s", answer: "scale", status: 0, tip: ("IT BEGINS WITH S"), question: ("This CSS function defines a transformation that resizes an element on the 2D plane. Because the amount of scaling is defined by a vector, it can resize the horizontal and vertical dimensions at different scales.") },
	    	{ letter: "t", answer: "transform", status: 0, tip: ("IT BEGINS WITH T"), question: ("This CSS property lets you rotate, scale, skew, or translate a given element. This is achieved by modifying the coordinate space of the CSS visual formatting model.") },
	    	{ letter: "u", answer: "url", status: 0, tip: ("IT BEGINS WITG U"), question: ("This CSS data type denotes a pointer to a resource, such as an image or a font.") },
	    	{ letter: "v", answer: "visibility", status: 0, tip: ("IT BEGINS WITH V"), question: ("This CSS property can show or hide an element without affecting the layout of a document (i.e., space is created for elements regardless of whether they are visible or not). The property can also hide rows or columns in a <table>.") },
	    	{ letter: "w", answer: "width", status: 0, tip: ("IT BEGINS WITH W"), question: ("This CSS property specifies the width of an element.") },
	    	{ letter: "x", answer: "box-shadow", status: 0, tip: ("CONTAINS X"), question: ("This CSS property is used to add shadow effects around an element's frame. You can specify multiple effects separated by commas if you wish to do so.") },
	    	{ letter: "y", answer: "border-style", status: 0, tip: ("CONTAIN Y"), question: ("This CSS property is a shorthand property that sets the line style for all four sides of an element's border.") },
	    	{ letter: "z", answer: "font-size", status: 0, tip: ("CONTAIN Z"), question: ("This CSS property specifies the size of the font. Setting this property may change the size of other items, too, since it is used to compute the value of em, ex, and various other relative <length> units.") },
	];
	var records=0;
	var count=0;
	var fails=0;
	var total=0;
	var pasapalabra=[];

// Functions
function selectGame(a){
	game = a;
	if (game==="javascript"){
		questions=questionsJs;
	} 
	if(game==='html5'){
		questions=questionsHtml5;
	}
	if(game==='css3'){
		questions=questionsCSS3;
	}
}
function showControls(){
	document.getElementById('playandinfo').style.display = 'none';
	document.getElementById('controls').style.display = 'block';
	document.getElementById('definition').innerHTML = "<i>"+questions[count].tip+"</i></br>"+questions[count].question;
	document.getElementById('scoreinrealtime').innerHTML = records;
	document.getElementById('failsinrealtime').innerHTML = fails;
	document.getElementById('pasapalabrainrealtime').innerHTML = pasapalabra.length;
}
function validate(b){
	var action=b;
	questions.forEach(function(obj){
		total+=obj.status;
	});
	if (total<(questions.length*2)){
		if(count<questions.length){
			if (action===1){
				var answer = document.getElementById('useranswer').value;
				answer=answer.toLowerCase();
				if(answer===questions[count].answer){
					document.getElementById('letter'+count).style.color = "green";
					questions[count].status=2;
					records=records+1;
					document.getElementById('scoreinrealtime').innerHTML = records;
					if(count<questions.length-1){
						document.getElementById('definition').innerHTML = "<i>"+questions[count+1].tip+"</i></br>"+questions[count+1].question;
					}else{
						document.getElementById('definition').innerHTML = "<i>"+questions[pasapalabra[0]].tip+"</i></br>"+questions[pasapalabra[0]].question;
					}
				}else{
					document.getElementById('letter'+count).style.color = "red";
					questions[count].status=2;
					fails=fails+1;
					document.getElementById('failsinrealtime').innerHTML = fails;
					if(count<questions.length-1){
						document.getElementById('definition').innerHTML = "<i>"+questions[count+1].tip+"</i></br>"+questions[count+1].question;
					}else{
						document.getElementById('definition').innerHTML = "<i>"+questions[pasapalabra[0]].tip+"</i></br>"+questions[pasapalabra[0]].question;
					}
				}
			}else if (action===0){
				questions[count].status=1;
				pasapalabra.push(count);
				document.getElementById('pasapalabrainrealtime').innerHTML = pasapalabra.length;
				if(count<questions.length-1){
					document.getElementById('definition').innerHTML = "<i>"+questions[count+1].tip+"</i></br>"+questions[count+1].question;
				}else{
					document.getElementById('definition').innerHTML = "<i>"+questions[pasapalabra[0]].tip+"</i></br>"+questions[pasapalabra[0]].question;
				}
			}
		}
		if (count>=questions.length){
			if(action===1){
				var answer = document.getElementById('useranswer').value;
				answer=answer.toLowerCase();
				if(answer===questions[pasapalabra[0]].answer){
					document.getElementById('letter'+pasapalabra[0]).style.color = "green";
					questions[pasapalabra[0]].status=2;
					records=records+1;
					document.getElementById('scoreinrealtime').innerHTML = records;
					pasapalabra.shift();
					if (pasapalabra.length>0){
						document.getElementById('definition').innerHTML = "<i>"+questions[pasapalabra[0]].tip+"</i></br>"+questions[pasapalabra[0]].question;
					}else{
						exit();
					}
					
				}else{
					document.getElementById('letter'+pasapalabra[0]).style.color = "red";
					questions[pasapalabra[0]].status=2;
					fails=fails+1;
					document.getElementById('failsinrealtime').innerHTML = fails;
					pasapalabra.shift();
					if (pasapalabra.length>0){
						document.getElementById('definition').innerHTML = "<i>"+questions[pasapalabra[0]].tip+"</i></br>"+questions[pasapalabra[0]].question;
					}else{
						exit();
					}
				}
			}else if (action===0){
				var letter = pasapalabra[0];
				pasapalabra.shift();
				pasapalabra.push(letter);
				document.getElementById('pasapalabrainrealtime').innerHTML = pasapalabra.length;
				document.getElementById('definition').innerHTML = "<i>"+questions[pasapalabra[0]].tip+"</i></br>"+questions[pasapalabra[0]].question;
			}
		}
		count=count+1;
	}else if(total===(questions.length*2)){
		document.getElementById('controls').style.display = 'none';
		document.getElementById('score').style.display = 'block';
		document.getElementById('score').innerHTML = "You win "+ records+ " points";
	}
	document.getElementById('useranswer').value="";
	document.getElementById('useranswer').focus();
	total=0;
}
function exit(){
	document.getElementById('controls').style.display = 'none';
	document.getElementById('score').style.display = 'block';
	document.getElementById('score').innerHTML = "You win "+ records+ " points";
}
