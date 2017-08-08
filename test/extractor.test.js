
describe('Extractor',function(){
	it('should run setAttr and initialize',function(){
		var ext=new Extractor();
		expect(ext.setAttr('random text')).toBe(undefined);
		expect(ext.setAttr()).toBe(undefined);
		expect(ext.initialize()).toBe(undefined);
	});
	it('should run cleanText',function(){
		var ext=new Extractor();
		ext.setAttr('Fusioncharts')
		expect(ext.cleanText(5)).toBe('illegal arguement');
		expect(ext.cleanText('One  thousand')).toEqual(['One','thousand']);
	});
	it('should run findNum and isPresent',function(){
		var ext=new Extractor();
		ext.setAttr('I am twenty four years old'); 
		expect(ext.findNum()).toEqual(['twenty four ']);
		ext.initialize();
		ext.setAttr('I am twenty four    years old'); 
		expect(ext.findNum()).toEqual(['twenty four ']);
		ext.initialize();
		ext.setAttr('I am fourth boy'); 
		expect(ext.findNum()).toEqual(['fourth ']);
		ext.initialize();
		ext.setAttr('Eleven thousand fourth'); 
		expect(ext.findNum()).toEqual(['Eleven thousand fourth ']);
		ext.initialize();
		ext.setAttr('I am twenty \tfour    years old'); 
		expect(ext.findNum()).toEqual(['twenty four ']);
		ext.initialize();
		ext.setAttr('four'); 
		expect(ext.findNum()).toEqual(['four ']);
		ext.initialize();
		ext.setAttr('Eleven thousand'); 
		expect(ext.findNum()).toEqual(['Eleven thousand ']);
		ext.initialize();
		ext.setAttr('one fourth'); 
		expect(ext.findNum()).toEqual(['one ','fourth ']);
		expect(ext.isPresent('')).toEqual(false);
	});
	it('should run global and window functions',function(){
		expect(window.startS2N()).toBe(undefined);
		expect('str'.print()).toBe(undefined);
	});
	it('should run toNumber,replaceText and getOrdinalSuffix',function(){
		var ext=new Extractor();
		ext.setAttr('I am twenty four years old');
		ext.findNum();
		expect(ext.toNumber()).toEqual([24]);
		expect(ext.replaceText()).toBe(undefined);

		ext.initialize();
		ext.setAttr('My position is fourth in class. I am fifty four kgs.');
		ext.findNum();
		ext.toNumber();
		expect(ext.replaceText()).toBe(undefined);

		ext.initialize();
		ext.setAttr('My position is fifty second in class. I am fifty four kgs.');
		ext.findNum();
		ext.toNumber();
		expect(ext.replaceText()).toBe(undefined);

		ext.initialize();
		ext.setAttr('My position is first in class. I am fifty four kgs.');
		ext.findNum();
		ext.toNumber();
		expect(ext.replaceText()).toBe(undefined);

		ext.initialize();
		ext.setAttr('My position is third in class. I am fifty four kgs.');
		ext.findNum();
		ext.toNumber();
		expect(ext.replaceText()).toBe(undefined);

		ext.initialize();
		ext.setAttr('My position is two hundredth in class. I am fifty four kgs.');
		ext.findNum();
		ext.toNumber();
		expect(ext.replaceText()).toBe(undefined);

		ext.initialize();
		ext.setAttr('My position is fortieth in class. I am fifty four kgs.');
		ext.findNum();
		ext.toNumber();
		expect(ext.replaceText()).toBe(undefined);

		ext.initialize();
		ext.setAttr('My position is eleventh in class. I am fifty four kgs.');
		ext.findNum();
		ext.toNumber();
		expect(ext.replaceText()).toBe(undefined);
	});
});