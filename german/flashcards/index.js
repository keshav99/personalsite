

var loadWord = function(output, words){
    console.log(output);
    var ran = (Math.floor(Math.random() * 627) + 1)-1;

    var newword = words[ran];
    var sentences,color;
    // for(var i=0; i<627; i++){
    //     console.log(output[i]);
    //     if(output[i].word == newword){
    //         sentences = output[i].sentences;
    //         color = output[i].color;
    //         break;
    //     }
    // }
    sentences = output[words][0];
    color = output[words][1];
    console.log(ran+" "+newword+" "+sentences+" "+color)
    $("#wordName").val = newword;
    sentences.forEach(e => {
        $("#sentences").append('<li>'+e+'</li>');
    });
}

$(window).load(function() {
    var output = {};
var words = {}
    var colors = ["#5e65db", "#a448d9", "#d94871", "#d97148", "#cad948", "#48d973"]
$.getJSON( "./wordlist.json", function( data ) {

    $.each(data, function(key, val) {
        // output.push({
        //     word: key,
        //     sentences: val,
        //     color: colors[(Math.floor(Math.random() * 6) + 1)-1]
        // })
        output[key] = [val,colors[(Math.floor(Math.random() * 6) + 1)-1]];
        words.append(key)
     })
  });
    loadWord(output, words);
});