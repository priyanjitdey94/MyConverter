
describe('Converter',function(){
	beforeAll(function(){
		var tempHTML='<div id="container">'+
					'<textarea id="input1" class="textBox" placeholder="Enter your text here..."></textarea>'+
					'<button id="convertB" class="convert" onclick="startS2N()">CONVERT</button>'+
					'<textarea id="input2" class="textBox"></textarea>'+
					'</div>'+
					'<link rel="stylesheet" type="text/css" href="./css/style.css">'+
					'<script type="text/javascript" src="./js/converter.js"></script>'+
					'<script type="text/javascript" src="./js/extractor.js"></script>';
		document.body.insertAdjacentHTML('afterbegin',tempHTML);
	});

	it('should check numberToText',function(){
		var conv=new Converter();
		conv.setAttr(12);
		expect(conv.numberToText(12)).toEqual('twelve');
		conv.setAttr(2);
		expect(conv.numberToText(2)).toEqual('two');
		conv.setAttr(112);
		expect(conv.numberToText(112)).toEqual('one Hundred twelve');
		conv.setAttr(122);
		expect(conv.numberToText(122)).toEqual('one Hundred twenty two');
	});

	it('should check textToNumber',function(){
		var conv=new Converter();
		conv.setAttr(0,'hundred');
		expect(conv.textToNumber()).toEqual(100);
		expect(conv.textToNumber('hundred')).toEqual(100);
		expect(conv.textToNumber(23232)).toEqual('Illegal arguement');
		expect(conv.textToNumber('one hundred')).toEqual(100);
		expect(conv.textToNumber('two thousand hundred')).toEqual(2100);
		expect(conv.textToNumber('one billion two hundred thirty four million five hundred sixty seven thousand eight hundred ninety')).toEqual(1234567890);
		expect(conv.textToNumber('two thousand hundred twelve')).toEqual(2112);
	});

	it('should check ordinalToCardinal',function(){
		var con=new Converter();
		expect(con.ordinalToCardinal('1232424th')).toEqual('one million two Hundred thirty two thousand four Hundred twenty fourth');
		expect(con.ordinalToCardinal('2d4th')).toEqual('Illegal arguement');
		expect(con.ordinalToCardinal('1000000th')).toEqual('one millionth');
		expect(con.ordinalToCardinal('1000011th')).toEqual('one million eleventh');
		expect(con.ordinalToCardinal('20th')).toEqual('twentieth');
	});
});