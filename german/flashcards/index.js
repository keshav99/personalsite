var doneWords = [];
var pointer = 0;
var a1 = true, a2 = true, b1 = true;

function getCookie(cook) {
  var result = document.cookie.match(new RegExp(cook+ '=([^;]+)'));
  console.log(result);
  result && (result = JSON.parse(result[1]));
  return result;
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
$.getJSON( "./wordlist.json", function( data ) {

    wordVocab1 = data;
 

});
$.getJSON( "./wordlist2_clean.json", function( data ) {

  wordVocab2 = data;


});
$.getJSON( "./wordlist3_clean.json", function( data ) {

  wordVocab3 = data;


});
$.getJSON( "./wordlist_eng.json", function( data ) {

  wordVocab1_en = data;


});
$.getJSON( "./wordlist2_eng.json", function( data ) {

  wordVocab2_en = data;


});
$.getJSON( "./wordlist3_eng.json", function( data ) {

  wordVocab3_en = data;
  $.done(function(){
    loadWord();
  });

});

});

var get_item_en = function(no, dict){
  $.each(Object.keys(dict), function(i, item) {
    if(dict[item]["num"] == no){
      return dict[item];
    }
  });
}

  $("#next").click(function(){
    $("#inner").css("transform", "rotateY(0deg)");


    pointer+=1;
    $("#sentences").html("");
    if(pointer>=doneWords.length)
    loadWord();
    else{
      var word = doneWords[pointer];
      var item, item_en;
      if(wordVocab1[word]){
        item = wordVocab1[word];
        item_en = get_item_en(wordVocab1[no], wordVocab1_en);
      }
      if(wordVocab2[word]){
        item = wordVocab2[word];
        item_en = get_item_en(wordVocab2[no], wordVocab2_en);
      }
      if(wordVocab3[word]){
        item = wordVocab3[word];
        item_en = get_item_en(wordVocab3[no], wordVocab3_en);
      }
      $("#wordName").text(word);
      console.log( word);
      if(typeof wordVocab[word] == 'undefined'){
        wordVocab[word] = item;
        $("#youveseen").text("You haven't seen this word before");
        $("#seenno").text(Object.keys(wordVocab).length);
      }
      else{
        wordVocab[word]["seen"]++;
        $("#youveseen").text("You have seen this "+wordVocab[word]["seen"]+" time(s)");
        $("#seenno").text(Object.keys(wordVocab).length);
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
      $("#inner").css("transform", "rotateY(0deg)");
      $("#sentences").html("");
      pointer--;
      var word = doneWords[pointer];
      var item, item_en;
      if(wordVocab1[word]){
        item = wordVocab1[word];
        item_en = get_item_en(wordVocab1[no], wordVocab1_en);
      }
      if(wordVocab2[word]){
        item = wordVocab2[word];
        item_en = get_item_en(wordVocab1[no], wordVocab2_en);
      }
      if(wordVocab3[word]){
        item = wordVocab3[word];
        item_en = get_item_en(wordVocab1[no], wordVocab3_en);
      }
      $("#wordName").text(word);
      
    console.log(wordVocab[word]);
      if(typeof wordVocab[word] == 'undefined'){
        wordVocab[word] = item;
        $("#youveseen").text("You haven't seen this word before");
        $("#seenno").text(Object.keys(wordVocab).length);
  
      }
      else{
        
        $("#youveseen").text("You have seen this "+wordVocab[word]["seen"]+" time(s)");
        $("#seenno").text(Object.keys(wordVocab).length);
        wordVocab[word]["seen"]++;
      }
      saveCookie("wordVocabForGermanFlashcards",wordVocab);
      var i=0;
      sentences[item].forEach(e => {
          $("#sentences").append('<li>'+e+" ("+item_en["ex"][i]+')</li>');
          i++;
      });
      $("#container").css('background-color', item["color"]);
      // $("#sample").attr("src",imgs[item]);
      $("#meaning").text();
    }
  });

  $("#inner").click(function(){
    console.log(frontorback);
    var word = doneWords[pointer];

    if(frontorback == 0){
      $("#inner").css("transform", "rotateY(0deg)");
      frontorback = 1;
      // wordVocab[word]["seen"++;
      $("#youveseen").text("You have seen this "+wordVocab[word]["seen"]+" time(s)");
      $("#seenno").text(Object.keys(wordVocab).length);
    }
    else{
      $("#inner").css("transform", "rotateY(180deg)");
      frontorback = 0;
      
    }
    // alert('flipped');
  });
 

var loadWord = function(){
    // console.log(imgs);
    
    var nums = [[], [], []];
    $.each(Object.keys(wordVocab1), function(index, value){
      nums[0].push(wordVocab1[value]["num"]);
    });

    $.each(Object.keys(wordVocab2), function(index, value){
      nums[1].push(wordVocab2[value]["num"]);
    });

    $.each(Object.keys(wordVocab1), function(index, value){
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
    console.log(ranLevel);
    console.log(wordVocab1);
    console.log(wordVocab2);
    console.log(wordVocab3);
    var vocab = levels[ranLevel];

    var itemsInLevel = Object.keys(vocab);
    var ranword = itemsInLevel[(Math.floor(Math.random() * $(itemsInLevel).length) + 1)-1];
    var item = vocab[ranword];
    var sentences = item["ex"];
    var ranword_en = "";

    if(ranLevel==0){
      item_en = get_item_en(vocab[no], wordVocab1_en);
      ranword_en = Object.keys(wordVocab1_en).find(key => wordVocab1_en[key] == item_en)
    }
      
    else if(ranLevel==1){
      item_en = get_item_en(vocab[no], wordVocab2_en);
      ranword_en = Object.keys(wordVocab2_en).find(key => wordVocab2_en[key] == item_en)
    }
    else if(ranLevel==2){
      item_en = get_item_en(vocab[no], wordVocab3_en);
      ranword_en = Object.keys(wordVocab3_en).find(key => wordVocab3_en[key] == item_en)
    }
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
    }
    else{
      wordVocab[newword]["seen"]++;
      // var item = words.indexOf(doneWords[pointer]);
      $("#youveseen").text("You have seen this "+wordVocab[newword]+" time(s)");
      $("#seenno").text(Object.keys(wordVocab).length);
    }
    saveCookie("wordVocabForGermanFlashcards",wordVocab);
    var j=0;
    sentences.forEach(e => {
      $("#sentences").append('<li>'+e+" ("+item_en["ex"][j]+')</li>');
      j++;
    });
    $("#container").css('background-color', item["color"]);
    $("#sample").attr("src",i);
    $("#meaning").text(ranword_en);
}



function saveCookie(cook, cvalue) {
  var cookie = [cook, '=', JSON.stringify(cvalue), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
  document.cookie = cookie;
}
