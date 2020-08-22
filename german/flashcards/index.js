$(window).load(function() {
    var output = {};
var words = []
var sentences = [];
var wordcolors = [];
var colors = ["#5e65db", "#a448d9", "#d94871", "#d97148", "#cad948", "#48d973"];
var imgs = [];
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
        $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
        {
          tags: $(key).val(),
          tagmode: "any",
          format: "json"
        },
        function(data) {
          $.each(data.items, function(i,item){
            // $("<img/>").attr("src", item.media.m).prependTo("#results");
            imgs.push(item.media.m);
            return;
            
          });
        });
      });
     })
  })
  .done(function(){
    console.log("issa done")
    console.log(words[5]);
    loadWord(words, sentences, wordcolors, imgs);
  });
    
});

var loadWord = function(words, sentences, wordcolors, imgs){
    console.log(imgs);
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
    i = imgs[ran];
    console.log(ran+" "+newword+" "+s+" "+c)
    $("#wordName").text(newword);
    s.forEach(e => {
        $("#sentences").append('<li>'+e+'</li>');
    });
    $(".banner").css('background-color', c);
    $("#sample").attr("src",i);
}

