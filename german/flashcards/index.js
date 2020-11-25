var doneWords = [];
var pointer = 0;
var mastered = true;
var a1 = true, a2 = true, b1 = true;

function getCookie(cook) {
  var result = document.cookie.match(new RegExp(cook+ '=([^;]+)'));
  console.log(result);
  result && (result = JSON.parse(result[1]));
  return result;
} 

function saveCookie(cook, cvalue) {
  var cookie = [cook, '=', JSON.stringify(cvalue), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
  document.cookie = cookie;
}

function copyToClipboard(text) {
  var dummy = document.createElement("textarea");
  var t = "";
  // to avoid breaking orgain page when copying more words
  // cant copy when adding below this code
  // dummy.style.display = 'none'
  document.body.appendChild(dummy);
  //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
  dummy.value = text;
  text.forEach(element => {
    t+='[';
    element.forEach(ele => {
      t+=',"'+ele+'"';
    });
    t+=']';
  });
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

var wordVocab1 = {}, wordVocab2 = {}, wordVocab3 = {}, wordVocab = {}, wordVocab1_en = {}, wordVocab2_en = {}, wordVocab3_en = {};


var frontorback = 1;
$(window).load(function() {
  frontorback = 1;
  
wordVocab = getCookie("wordVocabForGermanFlashcards");
console.log(wordVocab);
if(wordVocab == null){
  wordVocab = {};
}


// var imgs = [];
$.getJSON( "./wordlist_compressed.json", function( data ) {

    wordVocab1 = data["a1"];
    wordVocab2 = data["a2"];
    wordVocab3 = data["b1"];
    wordVocab1_en = data["a1_en"];
    wordVocab2_en = data["a2_en"];
    wordVocab3_en = data["b1_en"];

}).done(function(){
  loadWord();
});

$("#one").click(function(){
  a1 = $(this).is(':checked')
});
$("#two").click(function(){
  a2 = $(this).is(':checked')
});
$("#three").click(function(){
  b1 = $(this).is(':checked')
});

$("#next").click(function(){
  $("#inner").css("transform", "rotateY(0deg)");
  if(mastered)
  wordVocab[doneWords[pointer]]["mastered"] = true;
  else
  wordVocab[doneWords[pointer]]["mastered"] = false;
  mastered = true;
  
  pointer+=1;
  $("#sentences").html("");
  if(pointer>=doneWords.length)
  loadWord();
  else{
    var word = doneWords[pointer];
    var item, item_en;
    if(wordVocab1[word]){
      item = wordVocab1[word];
      item_en = get_item_en(item["num"], wordVocab1_en);
    }
    if(wordVocab2[word]){
      item = wordVocab2[word];
      item_en = get_item_en(item["num"], wordVocab2_en);
    }
    if(wordVocab3[word]){
      item = wordVocab3[word];
      item_en = get_item_en(item["num"], wordVocab3_en);
    }
    $("#wordName").text(word);
    console.log( word);
    if(typeof wordVocab[word] == 'undefined'){
      wordVocab[word] = item;
      $("#youveseen").text("You haven't seen this word before");
      $("#seenno").text(Object.keys(wordVocab).length);
      $("#mastered").text(Boolean(wordVocab[word]["mastered"]));
    }
    else{
      wordVocab[word]["seen"]++;
      $("#youveseen").text("You have seen this "+wordVocab[word]["seen"]+" time(s)");
      $("#seenno").text(Object.keys(wordVocab).length);
      $("#mastered").text(Boolean(wordVocab[word]["mastered"]));
    }
    saveCookie("wordVocabForGermanFlashcards",wordVocab);
    var i = 0;
    item["ex"].forEach(e => {
      $("#sentences").append('<li>'+e+" ("+item_en["ex"][i]+')</li>');
      // console.log(sentenceengs[item][i])
      i++;
    });
    $("#container").css('background-color', item["color"]);
    // $("#sample").attr("src",imgs[item]);
    // $("#meaning").text(wordengs[item]);
    ``
  }
});

$("#back").click(function(){
  $("#inner").css("transform", "rotateY(0deg)");
  if(pointer>0){
    if(mastered)
    wordVocab[doneWords[pointer]]["mastered"] = true;
    else
    wordVocab[doneWords[pointer]]["mastered"] = false;
    mastered = true;
    $("#inner").css("transform", "rotateY(0deg)");
    $("#sentences").html("");
    pointer--;
    var word = doneWords[pointer];
    var item, item_en;
    if(wordVocab1[word]){
      item = wordVocab1[word];
      item_en = get_item_en(item["num"], wordVocab1_en);
    }
    if(wordVocab2[word]){
      item = wordVocab2[word];
      item_en = get_item_en(item["num"], wordVocab2_en);
    }
    if(wordVocab3[word]){
      item = wordVocab3[word];
      item_en = get_item_en(item["num"], wordVocab3_en);
    }
    $("#wordName").text(word);
    
  console.log(wordVocab[word]);
    if(typeof wordVocab[word] == 'undefined'){
      wordVocab[word] = item;
      $("#youveseen").text("You haven't seen this word before");
      $("#seenno").text(Object.keys(wordVocab).length);
      $("#mastered").text(Boolean(wordVocab[word]["mastered"]));
    }
    else{
      wordVocab[word]["seen"]++;
      $("#youveseen").text("You have seen this "+wordVocab[word]["seen"]+" time(s)");
      $("#seenno").text(Object.keys(wordVocab).length);
      $("#mastered").text(Boolean(wordVocab[word]["mastered"]));
      
    }
    saveCookie("wordVocabForGermanFlashcards",wordVocab);
    var i=0;
    item["ex"].forEach(e => {
        $("#sentences").append('<li>'+e+" ("+item_en["ex"][i]+')</li>');
        i++;
    });
    $("#container").css('background-color', item["color"]);
    // $("#sample").attr("src",imgs[item]);
    $("#meaning").text();
  }
});

$("#inner").click(function(){
  mastered = false;
  console.log(frontorback);
  var word = doneWords[pointer];

  if(frontorback == 0){
    $("#inner").css("transform", "rotateY(0deg)");
    frontorback = 1;
    // wordVocab[word]["seen"++;
    if(wordVocab[word]["seen"] == 0)
    $("#youveseen").text("You haven't seen this word before");
    else
    $("#youveseen").text("You have seen this "+wordVocab[word]["seen"]+" time(s)");
    $("#seenno").text(Object.keys(wordVocab).length);
    $("#mastered").text(Boolean(wordVocab[word]["mastered"]));
  }
  else{
    $("#inner").css("transform", "rotateY(180deg)");
    frontorback = 0;
    
  }
  // alert('flipped');
});

});

function get_item_en(no, dict){
  var res = {};
  $.each(Object.keys(dict), function(i, item) {
    if(dict[item]["num"] == no){
      
      console.log(dict[item]);
      res = dict[item];
    }
  });
  return res;
}

 
 

var loadWord = function(){
    // console.log(imgs);
    
    var nums = [[], [], []];
    console.log(a1);
    console.log(a2);
    console.log(b1);


    $.each(Object.keys(wordVocab1), function(index, value){
      nums[0].push(wordVocab1[value]["num"]);
    });

    $.each(Object.keys(wordVocab2), function(index, value){
      nums[1].push(wordVocab2[value]["num"]);
    });

    $.each(Object.keys(wordVocab3), function(index, value){
      nums[2].push(wordVocab3[value]["num"]);
    });

    var levels = [];
    if(a1)
      levels.push(wordVocab1);
    if(a2)
      levels.push(wordVocab2);
    if(b1)
      levels.push(wordVocab3);

    var ranLevel = (Math.floor(Math.random() * $(levels).length) + 1)-1;
    
    var vocab = levels[ranLevel];

    var itemsInLevel = Object.keys(vocab);
    var ranword = itemsInLevel[(Math.floor(Math.random() * $(itemsInLevel).length) + 1)-1];
    var item = vocab[ranword];
    var sentences = item["ex"];
    var ranword_en = "";
    var item_eng = {};

    if(ranLevel==0){
      item_eng = get_item_en(item["num"], wordVocab1_en);
      
      ranword_en = Object.keys(wordVocab1_en).find(key => wordVocab1_en[key] == item_eng)
    }
      
    else if(ranLevel==1){
      item_eng = get_item_en(item["num"], wordVocab2_en);
      
    console.log(get_item_en(item["num"], wordVocab2_en));
      ranword_en = Object.keys(wordVocab2_en).find(key => wordVocab2_en[key] == item_eng)
    }
    else if(ranLevel==2){
      item_eng = get_item_en(item["num"], wordVocab3_en);
      
    console.log(get_item_en(item["num"], wordVocab3_en));
      ranword_en = Object.keys(wordVocab3_en).find(key => wordVocab3_en[key] == item_eng)
    }
    console.log(item_eng);
    var newword = ranword;
    // for(var i=0; i<627; i++){
    //     console.log(output[i]);
    //     if(output[i].word == newword){
    //         sentences = output[i].sentences;
    //         color = output[i].color;
    //         break;
    //     }
    // }
    doneWords.push(newword);
    $("#wordName").text(newword);
    if(typeof wordVocab[newword] == 'undefined'){
      wordVocab[newword] = item;
      $("#youveseen").text("You haven't seen this word before");
      $("#seenno").text(Object.keys(wordVocab).length);
      $("#mastered").text(Boolean(wordVocab[newword]["mastered"]));
    }
    else{
      wordVocab[newword]["seen"]++;
      // var item = words.indexOf(doneWords[pointer]);
      $("#youveseen").text("You have seen this "+wordVocab[newword]+" time(s)");
      $("#seenno").text(Object.keys(wordVocab).length);
      $("#mastered").text(Boolean(wordVocab[newword]["mastered"]));
    }
    saveCookie("wordVocabForGermanFlashcards",wordVocab);
    var j=0;
    sentences.forEach(e => {
      $("#sentences").append('<li>'+e+" ("+item_eng["ex"][j]+')</li>');
      j++;
    });
    $("#container").css('background-color', item["color"]);
    // $("#sample").attr("src",i);
    $("#meaning").text(ranword_en);
}




