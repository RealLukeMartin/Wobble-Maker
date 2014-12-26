var keyboard = ['c','cs','d','ds','e','f','fs','g','gs','a','as','b'];
var a = (Math.pow(2, 1/12));
var keyArr = [];
var keyVar = [];

for (i=0; i<keyboard.length; i++) { 
   keyArr[i] = 130.81 * Math.pow(a,i);
}



console.log(keyboard[0] + ' ' + keyboard[2]);

