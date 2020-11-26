var doneWords = [];
var pointer = 0;
var mastered = true;
var a1 = true, a2 = true, b1 = false;
var correctword = "", firstchance = false;


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
$.getJSON( "./wordlist_c.json", function( data ) {

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
  pointer++;
  $("#sentences").html("");
  $("#meaning").html("");
  if(pointer>=doneWords.length)
  loadQuiz();
  else{
    var word = doneWords[pointer];
    var item, item_en;
    var level = "";
    if(wordVocab1[word]){
      item = wordVocab1[word];
      word_en = get_item_en(item["num"], wordVocab1_en)
      item_en = wordVocab1_en[word_en];
      level = "a1";
    }
    if(wordVocab2[word]){
      item = wordVocab2[word];
      word_en = get_item_en(item["num"], wordVocab2_en)
      item_en = wordVocab2_en[word_en];
      level = "a2";
    }
    if(wordVocab3[word]){
      item = wordVocab3[word];
      word_en = get_item_en(item["num"], wordVocab3_en)
      item_en = wordVocab3_en[word_en];
      level = "b1";
    }
    $("#wordName").text(word);
    console.log( word);
    if(typeof wordVocab[word] == 'undefined'){
      wordVocab[word] = item;
      wordVocab[word]["level"] = level;
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
    $("#meaning").text(word_en);
    
  }
});

$("#option1").click(function(){
  if(correctword == $(this).text())
  $("option1").css("text", "green");
  else
  $("option1").css("text", "red");
});

$("#option2").click(function(){
  if(correctword == $(this).text())
  $("option2").css("text", "green");
  else
  $("option2").css("text", "red");
});

$("#option3").click(function(){
  if(correctword == $(this).text())
  $("option3").css("text", "green");
  else
  $("option3").css("text", "red");
});

$("#option4").click(function(){
  if(correctword == $(this).text())
  $("option4").css("text", "green");
  else
  $("option4").css("text", "red");
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
    $("#meaning").html("");
    pointer--;
    var word = doneWords[pointer];
    var item, item_en, word_en;
    var level = "";
    if(wordVocab1[word]){
      item = wordVocab1[word];
      word_en = get_item_en(item["num"], wordVocab1_en)
      item_en = wordVocab1_en[word_en];
      level = "a1";
    }
    if(wordVocab2[word]){
      item = wordVocab2[word];
      word_en = get_item_en(item["num"], wordVocab2_en)
      item_en = wordVocab2_en[word_en];
      level = "a2";
    }
    if(wordVocab3[word]){
      item = wordVocab3[word];
      word_en = get_item_en(item["num"], wordVocab3_en)
      item_en = wordVocab3_en[word_en];
      level = "b1";
    }
    $("#wordName").text(word);
    
  console.log(wordVocab[word]);
    if(typeof wordVocab[word] == 'undefined'){
      wordVocab[word] = item;
      wordVocab[word]["level"] = level;
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
    $("#meaning").text(word_en);
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
      res = item;
    }
  });
  return res;
}

function get_random_word_sentence(poswords){
  var ranword = poswords[(Math.floor(Math.random() * $(poswords).length) + 1)-1];
  if(wordVocab[ranword]["ex"].length <= 0)
  get_random_word_sentence(poswords);
  else{
    var ransentence = wordVocab[ranword]["ex"][(Math.floor(Math.random() * $(wordVocab[ranword]["ex"]).length) + 1)-1];
    var color = wordVocab[ranword]["color"];
    ranword = ranword.replace(",","").replace("-","").replace("der ","").replace("das ","").replace("die ","");
    
    if(ransentence.indexOf(ranword) == -1)
    get_random_word_sentence(poswords);
    else{
      otherwords = [];
      var ran1 = Object.keys(wordVocab)[(Math.floor(Math.random() * $(Object.keys(wordVocab)).length) + 1)-1].replace(",","").replace("-","").replace("der ","").replace("das ","").replace("die ","");;
      var ran2 = Object.keys(wordVocab)[(Math.floor(Math.random() * $(Object.keys(wordVocab)).length) + 1)-1].replace(",","").replace("-","").replace("der ","").replace("das ","").replace("die ","");;
      var ran3 = Object.keys(wordVocab)[(Math.floor(Math.random() * $(Object.keys(wordVocab)).length) + 1)-1].replace(",","").replace("-","").replace("der ","").replace("das ","").replace("die ","");;
      return [ranword, ransentence, [ran1, ran2, ran3], color];
    }
    
  }
  
}

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}

var loadQuiz = function(){
  if(Object.keys(wordVocab).length<10)
    loadWord();
  else{
    var wordorquiz = ["word", "word", "word", "word", "word", "word", "word", "quiz", "quiz", "quiz"]
    var ran = wordorquiz[(Math.floor(Math.random() * $(wordorquiz).length) + 1)-1];
    console.log(ran);
    if(ran === "word")
    loadWord();
    else{
      pointer-=1;
      console.log("Quiz started");
      $("#inner").css("visibility", "hidden");
      $("#quiz").css("visibility", "visible");
      var poslevels = [];
      if(a1)
        poslevels.push("a1");
      if(a2)
        poslevels.push("a2");
      if(b1)
        poslevels.push("b1");
      var poswords = [];
      console.log(poswords);
      $.each(Object.keys(wordVocab), function(i, v){
        if(poslevels.includes(wordVocab[v]["level"]))
          poswords.push(v);
      });
     
      var randoms =  get_random_word_sentence(poswords);
      correctword = randoms[0];
      var wordsTodisp = shuffle([correctword, randoms[2][0], randoms[2][1], randoms[2][2]]);
      $("#qsent").text(randoms[1].replace(correctword, "________"));
      $("#option1").text(wordsTodisp[0]);
      $("#option2").text(wordsTodisp[1]);
      $("#option3").text(wordsTodisp[2]);
      $("#option4").text(wordsTodisp[3]);
      $("#container").css("background",color); 
    }
    
  }
}
 

var loadWord = function(){
    // console.log(imgs);
    $("#inner").css("visibility", "visible");
    $("#quiz").css("visibility", "hidden");


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
    var item_eng = {}, word_eng;
    var level = "";

    if(vocab==wordVocab1){
      word_eng = get_item_en(item["num"], wordVocab1_en);
      item_eng = wordVocab1_en[word_eng];
      level = "a1";
    }
      
    else if(vocab==wordVocab2){
      word_eng = get_item_en(item["num"], wordVocab2_en);
      item_eng = wordVocab2_en[word_eng];
      level = "a2";
    }
    else if(vocab==wordVocab3){
      word_eng = get_item_en(item["num"], wordVocab3_en);
      item_eng = wordVocab3_en[word_eng];
      level = "b1";
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
      wordVocab[newword]["level"] =  level;
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
    $("#meaning").text(word_eng);
}




