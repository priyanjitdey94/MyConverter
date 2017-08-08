// import Converter from './converter.js';

var converterObj = new Converter();
converterObj.setAttr(0, '');

//Class to handle all the processing of text.
var Extractor = function () {
  this.text = '';
  this.convertedText = '';
  this.textArray = [];
  this.tempArray=[];
  this.points = [];
  this.numberFound = [];
  this.numberConverted = [];
};

//Set attribute of this.text.
Extractor.prototype.setAttr = function (_str) {
  this.text = _str;
};

//Initialize everything
Extractor.prototype.initialize = function () {
  this.text = '';
  this.convertedText = '';
  this.textArray = [];
  this.tempArray=[];
  this.points = [];
  this.numberFound = [];
  this.numberConverted = [];
};

//Remove any newline space and tabs
Extractor.prototype.cleanText = function (_str) {
  if (_str !== undefined) {
    if (typeof _str !== 'string') {
      return 'illegal arguement';
    }
    this.text = _str;
  }
  this.text = this.text.replace(/(\n\r|\n|\r)/gm, ' ');
  this.text = this.text.replace(/\t+/g, '');
  var str = this.text.split(' ');
  this.textArray = [];
  for (var i = 0; i < str.length; i++) {
    if (str[i] === '' || str[i] === ' ') {
      continue;
    }
    this.textArray.push(str[i]);
  }
  return this.textArray;
};

Extractor.prototype.isPunctuation=function(c){
  var i,j;
  for(i=0;i<converterObj.punctuation.length;i++){
    if(c===converterObj.punctuation[i]){
      return true;
    }
  }
  return false;
}

//Check if str is a number
Extractor.prototype.isPresent = function (str, mode) {
  var i;
  if (str === '') {
    return false;
  }
  str = str.toLowerCase();
  // console.log(str);
  for (i = 0; i < converterObj.onePlace.length; i++) {
    if (str === converterObj.onePlace[i] || str === converterObj.cOnePlace[i]) {
      return true;
    }
  }
  for (i = 0; i < converterObj.tenPlace.length; i++) {
    if (str === converterObj.tenPlace[i] || str === converterObj.cTenPlace[i]) {
      return true;
    }
  }
  for (i = 0; i < converterObj.oneInTenPlace.length; i++) {
    if (str === converterObj.oneInTenPlace[i] || str === converterObj.cOneInTenPlace[i]) {
      return true;
    }
  }
  for (i = 0; i < converterObj.mileStone.length; i++) {
    if (str === converterObj.mileStone[i] || str === converterObj.cMileStone[i]) {
      return true;
    }
  }
  return false;
};

//check if str is number
Extractor.prototype.isNum=function(str){
  var i,j;
  for(i=0;i<str.length;i++){
    if(isNaN(parseInt(str.charAt(i)))){
      return false;
    }
  }
  return true;
}

//check if str is ordinal
Extractor.prototype.isOrdinal=function(str){
  var i,j,temp='';
  temp=str.charAt(str.length-2)+str.charAt(str.length-1);
  if(temp!=='rd' && temp !=='th' && temp!=='nd' && temp!=='st'){
    return false;
  }
  for(i=0;i<str.length-2;i++){
    if(isNaN(parseInt(str[i]))){
      // console.log(parseInt(str[i]));
      return false;
    }
  }
  return true;
}

Extractor.prototype.breakAndClean=function(str){
  var i,j,k;
  var st=[];
  i=0;
  for(i=0;i<str.length;i++){
    if(this.isPunctuation(str.charAt(i))){
      j=i+1;
      if(j===str.length){
        st.push(str.substr(i,j-i+1));
        i=j;  
        break;
      }
      while(j<str.length){
        if(!this.isPunctuation(str.charAt(j))){
          // console.log(i+' '+j+' '+str.substr(i,j-i));
          st.push(str.substr(i,j-i));
          i=j-1;
          break;
        }else{
          j++;
          if(j==str.length){
            st.push(str.substr(i,j-i));
            i=j;
            break;
          }
        }
      }
    }else if(this.isNum(str.charAt(i))){
      j=i+1;
      if(j===str.length){
        st.push(str.substr(i,j-i));
        i=j
        break;
      }
      while(j<str.length){
        if(!this.isNum(str.charAt(j))){
          st.push(str.substr(i,j-i));
          i=j-1;
          break;
        }else{
          j++;
          if(j===str.length){
            st.push(str.substr(i,j-i));
            i=j;
            break;
          }
        }
      }
    }else{
      j=i+1;
      if(j==str.length){
        st.push(str.substr(i,j-i));
        i=j;
        break;
      }
      while(j<str.length){
        if(this.isNum(str.charAt(j)) || this.isPunctuation(str.charAt(j))){
          st.push(str.substr(i,j-i));
          i=j-1;
          break;
        }else{
          j++;
          if(j==str.length){
            st.push(str.substr(i,j-i));
            i=j;
            break;
          }
        }
      }
    }
  }

  // console.log('st:'+st);
  return st;
}

/*
* 0 - S to N
* 1 - C to O
* 2 - N to S
* 3 - O to C
*/

Extractor.prototype.findNum = function () {
  this.tempArray = this.cleanText();
  this.textArray=[];
  // console.log(this.textArray);
  var i, j, str;
  for(i=0;i<this.tempArray.length;i++){
    if(this.tempArray[i]===''){
      continue;
    }
    if(this.isNum(this.tempArray[i].trim())){
      this.textArray.push(this.tempArray[i]);
      this.textArray.push(' ');
    }else if(this.isOrdinal(this.tempArray[i].trim())){
      this.textArray.push(this.tempArray[i]);
      this.textArray.push(' ');
    }else{
      var temp=this.breakAndClean(this.tempArray[i]);
      for(j=0;j<temp.length;j++){
        if(j<temp.length-1 && this.isNum(temp[j]) &&(temp[j+1]==='st' || temp[j+1]==='nd' ||temp[j+1]==='rd' ||temp[j+1]==='th')){
          var t=temp[j]+'';
          t+=(temp[j+1]+'');
          this.textArray.push(t);j++;
        }else this.textArray.push(temp[j]);
      }
      this.textArray.push(' ');
    }
  }
  // console.log(this.textArray);
  for (i = 0; i < this.textArray.length; i++) {
    if (this.textArray[i] === ' ') {
      continue;
    }
    if(this.isNum(this.textArray[i].trim())){
      this.points.push(i);
      this.points.push(i);
      this.points.push(2);
      continue;
    }
    if(this.isOrdinal(this.textArray[i].trim())){
      this.points.push(i);
      this.points.push(i);
      this.points.push(3);
      continue;
    }

    var option=document.getElementsByName('textnum');
    if(this.textArray[i].toLowerCase().trim()==='hundreds' && option[0].checked){
      this.textArray[i]='100s';continue;
    }else if(this.textArray[i].toLowerCase().trim()==='thousands' && option[0].checked){
      this.textArray[i]='1000s';continue;
    }else if(this.textArray[i].toLowerCase().trim()==='millions' && option[0].checked){
      this.textArray[i]='1000000s';continue;
    }else if(this.textArray[i].toLowerCase().trim()==='billions' && option[0].checked){
      this.textArray[i]='1000000000s';continue;
    }
    // this.textArray[i]=this.breakAndClean(this.textArray[i]);
    str = converterObj.checkForCardinal(this.textArray[i]);
    // console.log(j);
    if (str === this.textArray[i] && this.isPresent(this.textArray[i])) {
      j = i + 1;
      // console.log(j);
      if (j === this.textArray.length) {
        // console.log(i+"i");
        this.points.push(i);
        this.points.push(i);
        this.points.push(0);
      }
      while (j < this.textArray.length) {
        if(this.textArray[j]===' '){
          j++;
          if (j === this.textArray.length) {
            // console.log(i+" "+j);
            this.points.push(i);
            this.points.push(j - 1);
            this.points.push(0);
            i = j;
          }
          continue;
        }
        if(this.textArray[i].toLowerCase().trim()==='hundreds' && option[0].checked){
          this.textArray[i]='100s';
          this.points.push(i);this.points.push(j-1);this.points.push(0);
          this.points.push(j);this.points.push(j);this.points.push(0);i=j;
          break;
        }else if(this.textArray[i].toLowerCase().trim()==='thousands' && option[0].checked){
          this.textArray[i]='1000s';
          this.points.push(i);this.points.push(j-1);this.points.push(0);
          this.points.push(j);this.points.push(j);this.points.push(0);i=j;
          break;
        }else if(this.textArray[i].toLowerCase().trim()==='millions' && option[0].checked){
          this.textArray[i]='1000000s';
          this.points.push(i);this.points.push(j-1);this.points.push(0);
          this.points.push(j);this.points.push(j);this.points.push(0);i=j;
          break;
        }else if(this.textArray[i].toLowerCase().trim()==='billions' && option[0].checked){
          this.textArray[i]='1000000000s';
          this.points.push(i);this.points.push(j-1);this.points.push(0);
          this.points.push(j);this.points.push(j);this.points.push(0);i=j;
          break;
        }
        str = converterObj.checkForCardinal(this.textArray[j]);
        // console.log(str);
        if (str === this.textArray[j] && this.isPresent(str)) {
          j++;
          if (j === this.textArray.length) {
            // console.log(i+" "+j);
            this.points.push(i);
            this.points.push(j - 1);
            this.points.push(0);
            i = j;
          }
          continue;
        } else if (this.isPresent(str)) {
          // console.log('here');
          str = this.textArray[j];
          if (converterObj.presentInOnePlace(str) === -1 && str !== 'ten') {
            this.points.push(i);
            this.points.push(j);
            this.points.push(1);
          } else {
            this.points.push(i); this.points.push(j - 1); this.points.push(0);
            this.points.push(j); this.points.push(j); this.points.push(1);
          }
          i = j;
          break;
        } else {
          this.points.push(i);
          this.points.push(j - 1);
          this.points.push(0);
          i = j - 1;
          break;
        }
      }
    } else if (str !== this.textArray[i] && this.isPresent(this.textArray[i])) {
      this.points.push(i);
      this.points.push(i);
      this.points.push(1);
    }
  }
  // console.log(this.points);
  for (i = 0; i < this.points.length; i += 3) {
    var temp = '';
    for (j = this.points[i]; j <= this.points[i + 1]; j++) {
      // console.log(this.textArray[j]);
      temp += this.textArray[j];
    }
    this.numberFound.push(temp);
  }
  // console.log(this.numberFound);
  // console.log(this.points);
  return this.numberFound;
};

//Conversion taking place here
Extractor.prototype.toNumber = function () {
  var i, j;
  // console.log(this.points);
  for (i = 0; i < this.points.length; i += 3) {
    var temp = '';
    var option=document.getElementsByName('textnum');
    if(this.points[i+2]===2){
      if(option[1].checked){
        this.numberConverted.push(converterObj.numberToText(parseInt(this.textArray[this.points[i]])));
      }else{
        this.numberConverted.push(this.textArray[this.points[i]]);
      }
    }else if(this.points[i+2]===0){
      temp='';
      for(j=this.points[i];j<=this.points[i+1];j++){
        temp+=this.textArray[j]+' ';
      }
      if(option[0].checked){
        temp=temp.toLowerCase();
        this.numberConverted.push(converterObj.breakIntoSubset(temp.trim()));
      }else{
        this.numberConverted.push(temp.trim()+' ');
      }
    }
    
    option=document.getElementsByName('cardinalOrdinal');
    if(this.points[i+2]===1){
      this.textArray[this.points[i+1]]=converterObj.checkForCardinal(this.textArray[this.points[i+1]]);
      for(j=this.points[i];j<=this.points[i+1];j++){
        temp+=this.textArray[j];
      }
      if(option[0].checked){
        temp=temp.toLowerCase();
        this.numberConverted.push(converterObj.breakIntoSubset(temp.trim())+' ');  
      }else{
        this.numberConverted.push(temp.trim());
      }
    }else if(this.points[i+2]===3){
      temp='';
      temp+=this.textArray[this.points[i]];
      temp=temp.toLowerCase();
      
      if(option[1].checked){
        //console.log('change'+temp);
        this.numberConverted.push(converterObj.ordinalToCardinal(temp.trim()));
      }else{
        this.numberConverted.push(temp.trim());
      }
    }
  }
  // console.log(this.numberConverted);
  return this.numberConverted;
};

//Find accurate suffix for ordinal and cardinal number
Extractor.prototype.getOrdinalSuffix = function (num) {
  var i,j,k;
  // console.log(num);
  if(isNaN(parseInt(num))){
    var temp=num.split(' ');
    //console.log(temp);
    var s=temp.pop();
    //console.log(temp);
    temp.push(converterObj.checkForOrdinal(s));
    var str='';
    for(i=0;i<temp.length;i++){
      str+=(temp[i]+' ');
    }
    return str.trim();
  }
  if(typeof parseInt(num) === 'number'){
    //  num=converterObj.numberToText(num);
    if(num===11){
      return 'eleventh';
    }else if(num===12){
      return 'twelfth';
    }else if(num===13){
      return 'thirteenth';
    }
    var lsn = num % 10;
    if (lsn === 1) {
      return num.trim()+'st';
    } else if (lsn === 2) {
      return num.trim()+'nd';
    } else if (lsn === 3) {
      return num.trim()+'rd';
    } else return num.trim()+'th';
  }
  

};
//Replace in original text
Extractor.prototype.replaceText = function () {
  var i, j, k;
  j = 0;
  k = 0;
  this.convertedText = '';
  //console.log(this.numberConverted);
  for (i = 0; i < this.textArray.length;) {
    if (i === this.points[j]) {
      if (this.points[j + 2] === 1) {
        var suffix = this.getOrdinalSuffix(this.numberConverted[k]);
        // console.log(suffix+'..');
        this.convertedText += (suffix);
      } else if(this.points[j+2] ===3){
        this.convertedText += (this.numberConverted[k]);
      } else {
        this.convertedText += (this.numberConverted[k]);
      }
      k++;
      j += 3;
      i = this.points[j - 2] + 1;
    } else {
      this.convertedText += (this.textArray[i]); i++;
    }
  }
  // console.log(this.convertedText);
  document.getElementById('input2').value = this.convertedText;
};

var extractor = new Extractor();

//extractor.breakAndClean('two.');

// Adding methods to globals classes
Object.prototype.print = function () {
  console.log(this.valueOf());
};


window.startS2N = function () {
  var _str = document.getElementById('input1').value;
  extractor.initialize();
  extractor.setAttr(_str);
  extractor.findNum();
  extractor.toNumber();
  extractor.replaceText();
};
