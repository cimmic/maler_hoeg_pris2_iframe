//1/6/2016
//Kim Høg

var definedData;
var kvmInputBox = [];
var priceParagraph = [], sumParagraph;
var validInputs = "0123456789,.";//If a char that isn't in this string is inputted, the char will not be displayed.
var filteredInput;
var temp;
var prisFor, prisBelob;
var standardPrefix = "Skriv kvadratmeter for ";
var output;
var sum = [];

function preload(){
  loadJSON("https://raw.githubusercontent.com/cimmic/maler_hoeg_pris2/master/pris.json", gotData, 'json');
}

function gotData(data){
  definedData = data.pris;
  println(definedData.length);
  for(var  i = 0; i < definedData.length; i++){
    sum[i] = 0;
  }
}

function setup() {
  noCanvas();
  for(var i = 0; i < definedData.length; i++){
    createP(standardPrefix + definedData[i].prisFor + ":")
    kvmInputBox[i] = createInput(standardPrefix + definedData[i].prisFor).style("color", "#9F9F9F");
    createP("<br>")
    kvmInputBox[i].input(inputEvent);
  }
  for(var i = 0; i < definedData.length; i++){
    priceParagraph[i] = createP("");
  }
  sumParagraph = createP("");
  
}

function calculatePart(dataDefinedIndex){
  for(var i = 0; i < filteredInput.length; i++){//Changes comma to dot, so it can be calculated.
    if(filteredInput.charAt(i) == ","){
      filteredInput = "" + filteredInput.substr(0,i) + "." + filteredInput.substr(i+1,filteredInput.length);
    }
  }
  
  sum[dataDefinedIndex] = (filteredInput * definedData[dataDefinedIndex].beloeb)
  
  for(var i = 0; i < filteredInput.length; i++){//Changes dot to comma, so it can be calculated.
    if(filteredInput.charAt(i) == "."){
      filteredInput = "" + filteredInput.substr(0,i) + "," + filteredInput.substr(i+1,filteredInput.length);
    }
  }
  
  output += sum[dataDefinedIndex].toFixed(2);
  
  for(var i = 0; i < output.length; i++){//Changes dot to comma, so it can be calculated.
    if(output.charAt(i) == "."){
      output = "" + output.substr(0,i) + "," + output.substr(i+1,output.length);
    }
  }
  
  output += " kr.";
  
  
}
function calculateSum(){
  temp = 0;
  for(var i = 0; i < sum.length; i++){
    if(sum[i] == "NaN"){
      println("sum[i] is NaN");
    }
    temp += sum[i];
    
  }
  
  
  output = "Sum: " + temp.toFixed(2) + " kr.";
  
  for(var i = 0; i < output.length; i++){//Changes dot to comma, so it can be calculated.
    if(output.charAt(i) == "."){
      output = "" + output.substr(0,i) + "," + output.substr(i+1,output.length);
    }
  }
}


function inputEvent(){
  
  
  for(var i = 0; i < definedData.length; i++){
    output = "";
    filteredInput = "";
    temp = kvmInputBox[i].value();
    
    for(var j = 0; j < kvmInputBox[i].value().length; j++){ //This ensures that only numbers, commas and points will be entered.
      for(var k = 0; k < validInputs.length; k++){
        if(temp.charAt(j) == validInputs.charAt(k)){
          filteredInput = filteredInput + kvmInputBox[i].value()[j];
          
          
        }
      }
    }
    
    if(kvmInputBox[i].value() != standardPrefix + definedData[i].prisFor){//This only happens if something is entered to the input
      output = definedData[i].prisFor + "spris: ";
      
      
      calculatePart(i);
      println(output);
      priceParagraph[i].html(output);
      kvmInputBox[i].value(filteredInput).style("color", "#000000");
    }
    
    if(i == definedData.length-1){
      calculateSum();
      println(output);
      sumParagraph.html("<b>" + output + "<b>");
    }
    
  }


}