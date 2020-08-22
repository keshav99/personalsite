$(window).load(function() {
    var output = {};
var words = []
var sentences = [];
var wordcolors = []
    var colors = ["#5e65db", "#a448d9", "#d94871", "#d97148", "#cad948", "#48d973"]
$.getJSON( "./wordlist.json", function( data ) {

    $.each(data, function(key, val) {
        // output.push({
        //     word: key,
        //     sentences: val,
        //     color: colors[(Math.floor(Math.random() * 6) + 1)-1]
        // })
        words.push(key);
        sentences.push(val);
        wordcolors.push(colors[(Math.floor(Math.random() * colors.length) + 1)-1]);
     })
  })
  .done(function(){
    console.log("issa done")
    console.log(words[5]);
    loadWord(words, sentences, wordcolors);
  });
    
});

var loadWord = function(words, sentences, wordcolors){
console.log(words);
console.log(words.length);
console.log(words[5]);
    var ran = (Math.floor(Math.random() * words.length) + 1)-1;

    var newword = words[ran];
    var s,c;
    // for(var i=0; i<627; i++){
    //     console.log(output[i]);
    //     if(output[i].word == newword){
    //         sentences = output[i].sentences;
    //         color = output[i].color;
    //         break;
    //     }
    // }
    s = sentences[ran];
    c = wordcolors[ran];
    console.log(ran+" "+newword+" "+s+" "+c)
    $("#wordName").val = newword;
    sentences.forEach(e => {
        $("#sentences").append('<li>'+e+'</li>');
    });
}

