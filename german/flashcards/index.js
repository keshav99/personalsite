

var loadWord = function(output){
    console.log(output);
    var ran = (Math.floor(Math.random() * 627) + 1)-1;

    var newword = output[ran];
    var sentences,color;
    for(var i=0; i<627; i++){
        if(output[i].word == newword){
            sentences = output[i].sentences;
            color = output[i].color;
            break;
        }
    }
    console.log(ran+" "+newword+" "+sentences+" "+color)
    $("#wordName").val = newword;
    sentences.forEach(e => {
        $("#sentences").append('<li>'+e+'</li>');
    });
}

$(window).load(function() {
    var output = [];
var colors = ["#5e65db", "#a448d9", "#d94871", "#d97148", "#cad948", "#48d973"]
$.getJSON( "./wordlist.json", function( data ) {

    $.each(data, function(key, val) {
        output.push({
            word: key,
            sentences: val,
            color: colors[(Math.floor(Math.random() * 6) + 1)-1]
        })
     })
  });
    loadWord(output);
});