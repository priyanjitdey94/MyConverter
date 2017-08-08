// 1.Check if million appeared. Disable thousand
// 2.Make ordinal cardinal fix



//Class that carries out all the conversion work
var Converter = function () {
  this.num = 0;
  this.numText = '';
  this.onePlace = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  this.tenPlace = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  this.oneInTenPlace = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  this.mileStone = ['', 'thousand', 'million', 'billion', 'hundred'];
  this.pMileStone=['','thousands','1000s','millions','1000000s','billions','1000000000s','hundreds','100s'];
  this.cOnePlace = ['', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eigth', 'ninth'];
  this.cOneInTenPlace = ['tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth',
    'seventeenth', 'eighteenth', 'nineteenth'];
  this.cTenPlace = ['', '', 'twentieth', 'thirteeth', 'fortieth', 'fiftieth', 'sixtieth', 'seventieth',
    'eightieth', 'ninetieth'];
  this.cMileStone = ['', 'thousandth', 'millionth', 'billionth', 'hundredth'];
  this.punctuation=['.',',','/','?',';',':','[','{',']','}','|','+','-','*','(',')','^','&','%','$','#','!','@','~','`','=','\'','\"',];
};

//class to set this.num and this.numText
Converter.prototype.setAttr = function (_num, _numText) {
  if (_num !== undefined) {
    this.num = _num;
  }
  if (_numText !== undefined) {
    this.numText = _numText;
  }
};

//Check if str is cardinal
Converter.prototype.checkForCardinal = function (str) {
  var i, j, k;
  for (i = 0; i < this.cOnePlace.length; i++) {
    if (str === this.cOnePlace[i]) {
      return this.onePlace[i];
    }
  }
  for (i = 0; i < this.cTenPlace.length; i++) {
    if (str === this.cTenPlace[i]) {
      return this.tenPlace[i];
    }
  }
  for (i = 0; i < this.cOneInTenPlace.length; i++) {
    if (str === this.cOneInTenPlace[i]) {
      return this.oneInTenPlace[i];
    }
  }
  for (i = 0; i < this.cMileStone.length; i++) {
    if (str === this.cMileStone[i]) {
      return this.mileStone[i];
    }
  }
  return str;
};

//check if str is ordinal
Converter.prototype.checkForOrdinal = function (str) {
  var i, j, k;
  for (i = 0; i < this.onePlace.length; i++) {
    if (str === this.onePlace[i]) {
      return this.cOnePlace[i];
    }
  }
  for (i = 0; i < this.tenPlace.length; i++) {
    if (str === this.tenPlace[i]) {
      return this.cTenPlace[i];
    }
  }
  for (i = 0; i < this.oneInTenPlace.length; i++) {
    if (str === this.oneInTenPlace[i]) {
      return this.cOneInTenPlace[i];
    }
  }
  for (i = 0; i < this.mileStone.length; i++) {
    if (str === this.mileStone[i]) {
      return this.cMileStone[i];
    }
  }
};

Converter.prototype.toHundredPlace = function (x, y, z) {
  var str = '';
  if (x > 0) {
    str += this.onePlace[x] + ' hundred ';
  }

  if (y === 1) {
    // console.log(typeof this.oneInTenPlace[z]);
    str += this.oneInTenPlace[z] + ' ';
  } else if (y > 1) {
    str += this.tenPlace[y] + ' ';
    str += this.onePlace[z] + '';
  } else {
    str += this.onePlace[z] + '';
  }
  return str;
};

//convert number to text
Converter.prototype.numberToText = function (_num) {
  if (_num !== undefined) {
    this.num = _num;
  }
  // console.log("j");
  // if(this.num===NaN || typeof this.num=='number'){
  //    return "Incorrect arguement";
  // }
  if(this.num===0){
    return 'zero';
  }
  var temp = this.num,
    numArray = [],
    i,
    j,
    k;

  while (temp > 0) {
    numArray.push(temp % 10);
    temp /= 10;
    temp = Math.floor(temp);
  }
  if (numArray.length % 3 !== 0) {
    numArray.push(0);
  }
  if (numArray.length % 3 !== 0) {
    numArray.push(0);
  }
  var str = [];
  for (i = 2, j = 0; i < numArray.length; i += 3, j++) {
    var tempStr = this.toHundredPlace(numArray[i], numArray[i - 1], numArray[i - 2]);
    if (tempStr.trim() !== '') {
      str.push(tempStr + ' ' + this.mileStone[j]);
    }
  }
  var finalStr = '';
  for (i = str.length - 1; i >= 0; i--) {
    finalStr += str[i] + ' ';
  }
  // document.getElementById('answer').innerHTML = finalStr;
  return finalStr.trim();
};

Converter.prototype.presentInOnePlace = function (str) {
  var i,
    j,
    k;
  for (i = 0; i < this.onePlace.length; i++) {
    if (str === this.onePlace[i]) {
      return i;
    }
  }
  return -1;
};

Converter.prototype.presentInTenPlace = function (str) {
  var i,
    j,
    k;
  for (i = 0; i < this.tenPlace.length; i++) {
    if (str === this.tenPlace[i]) {
      return i * 10;
    }
  }
  return -1;
};

Converter.prototype.presentInOneInTenPlace = function (str) {
  var i,
    j,
    k;
  for (i = 0; i < this.oneInTenPlace.length; i++) {
    if (str === this.oneInTenPlace[i]) {
      return 10 + i;
    }
  }
  return -1;
};

Converter.prototype.presentInMilestone = function (str) {
  if (str === 'million') {
    return 1000000;
  } else if (str === 'billion') {
    return 1000000000;
  } else if (str === 'thousand') {
    return 1000;
  } else return 1;
};

Converter.prototype.presentInArray=function(num,str){
  for(var i=0;i<str.length;i++){
    if(num===str[i]){
      return true;
    }
  }
  return false;
}

Converter.prototype.fit=function(s){
  var i,j,k;
  for(i=0;i<this.onePlace.length;i++){
    if(s===this.onePlace[i]){
      return 0;
    }
  }
  for(i=0;i<this.tenPlace.length;i++){
    if(s===this.tenPlace[i]){
      return 1;
    }
  }
  for(i=0;i<this.oneInTenPlace.length;i++){
    if(s===this.oneInTenPlace[i]){
      return 2;
    }
  }
  if(s==='hundred'){
    return 3;
  }else if(s==='thousand'){
    return 4;
  }else if(s==='million'){
    return 5;
  }else if(s==='billion'){
    return 6;
  }
  return -1;
}
Converter.prototype.breakIntoSubset=function(str){
  console.log('breakIntoSubset '+str);
  var i,j,k,highest=0;
  var ar=[];
  var tempAr=[];
  var graph=[];
  var breaker=[];
  tempAr=str.toLowerCase().split(' ');
  for(i=0;i<tempAr.length;i++){
    if(tempAr[i]==='' || tempAr[i]===' '){
      continue;
    }
    ar.push(tempAr[i]);
  }
  graph.push(this.fit(ar[ar.length-1]));k=0;
  highest=graph[k];
  if(ar.length===1){
    return this.textToNumber(ar[0])+' ';
  }
  breaker.push(ar.length-1);
  for(i=ar.length-2;i>=0;i--){
    highest=Math.max(graph[k],highest);
    if(graph[k]===0){
      j=this.fit(ar[i]);
      graph.push(j);k++;
      if(j>=4 && j<highest){
        breaker.push(i+1);
        breaker.push(i);
        highest=j;
        continue;
      }
      if(j===0 || j===2){
        breaker.push(i+1);
        breaker.push(i);
        highest=j;
      }
    }else if(graph[k]===1){
      j=this.fit(ar[i]);
      graph.push(j);k++;
      if(j>=4 && j<highest){
        breaker.push(i+1);
        breaker.push(i);
        highest=j;
        continue;
      }
      if(j===0 || j===1 || j===2){
        breaker.push(i+1);
        breaker.push(i);
        highest=j;
      }
    }else if(graph[k]===2){
      j=this.fit(ar[i]);
      graph.push(j);k++;
      if(j>=4 && j<highest){
        breaker.push(i+1);
        breaker.push(i);
        highest=j;
        continue;
      }
      if(j===0 || j===1 || j===2){
        breaker.push(i+1);
        breaker.push(i);
        highest=j;
      }
    }else if(graph[k]===3){
      j=this.fit(ar[i]);
      graph.push(j);k++;
      if(j>=4 && j<highest){
        breaker.push(i+1);
        breaker.push(i);
        highest=j;
        continue;
      }
      if(j===0){
      }else{
        breaker.push(i+1);
        breaker.push(i);
        highest=j;
      }
    }else if(graph[k]===4 || graph[k]===5 || graph[k]===6){
      j=this.fit(ar[i]);
      graph.push(j);k++;
      console.log(j+' '+highest);
      if(j>=4 && j<highest){
        breaker.push(i+1);
        breaker.push(i);
        highest=j;
        continue;
      }
      if(j===4 || j===5 || j===6){
        breaker.push(i+1);
        breaker.push(i);
        highest=j;
      }
    }
  }
  breaker.push(0);
  console.log(graph);console.log(breaker);
  graph=[];
  breaker.reverse();
  for(i=0;i<breaker.length;i+=2){
    var temp='';
    tempAr=ar.slice(breaker[i],breaker[i+1]+1);
    for(j=0;j<tempAr.length;j++){
      temp+=(tempAr[j]+' ');
    }
    graph.push(this.textToNumber(temp.trim()));
  }
  console.log(graph);
  var temp='';
  for(i=0;i<graph.length;i++){
    temp+=(graph[i]+' ');
  }
  return temp;
}

//Convert text to number
Converter.prototype.textToNumber = function (_str) {
  if (_str !== undefined) {
    this.numText = _str;
  }
  if (this.numText === '' || typeof this.numText !== 'string') {
    return 'Illegal arguement';
  }
  var textArray = [],
    i,
    j,
    k;

  // console.log('t2n '+_str);
  textArray = this.numText.split(' ');
  if(textArray[0]==='thousand' || textArray[0]==='million' || textArray[0]==='billion'){
    this.numText='one '+this.numText;
  }
  textArray=this.numText.split(' ');
  // console.log(textArray);
  var finalNum = 0,
    tempNum,
    factor = 1;
  for (i = textArray.length - 1; i >= 0;) {
    if(textArray[i]==='hundred'){
      if (i === 0) {
        tempNum = 100;
        finalNum += 100 * factor;
        i--;
      } else {
        tempNum = this.presentInOnePlace(textArray[i - 1]);
        if (tempNum > 0) {
          finalNum += tempNum * 100 * factor;
          // console.log(tempNum * 100 * factor);
          i -= 2;
        } else {
          finalNum += 100 * factor;
          i--;
        }
      }
      continue;
    }
    
    tempNum = this.presentInOnePlace(textArray[i]);
    if (tempNum > 0) {
      // console.log(tempNum*factor);
      finalNum += tempNum * factor;
      i--;
      continue;
    }
    tempNum = this.presentInTenPlace(textArray[i]);
    if (tempNum > 0) {
      // console.log(tempNum*factor);
      finalNum += (tempNum * factor);
      i--;
      continue;
    }
    tempNum = this.presentInOneInTenPlace(textArray[i]);
    if (tempNum > 0) {
      // console.log(tempNum*factor);
      finalNum += (tempNum * factor);
      i--;
      continue;
    }
    tempNum = this.presentInMilestone(textArray[i]); i--;
    factor = tempNum;
  }
  // console.log(finalNum);
  // document.getElementById('answer2').innerHTML = finalNum;
  return finalNum;
};

//convert ordinal to cardinal
Converter.prototype.ordinalToCardinal = function (_str) {
  var str = _str.slice(0, _str.length - 2), num;
  if (isNaN(parseInt(str)) || str.match(/[a-zA-z]/i)) {
    return 'Illegal arguement';
  } else {
    num = parseInt(str);
  }
  var text = this.numberToText(num);
  console.log(text);
  var convertedString = text.split(' ');
  var lastWord = convertedString.pop();
  lastWord = this.checkForOrdinal(lastWord);
  convertedString.push(lastWord);
  var temp = '';
  for (var i = 0; i < convertedString.length; i++) {
    temp += convertedString[i] + ' ';
  }
  temp = temp.trim();
  return (temp);
};

// export default Converter;
