var output = [];
var colors = ["#5e65db", "#a448d9", "#d94871", "#d97148", "#cad948", "#48d973"]
$.getJSON( "./wordlist.json", function( data ) {
    console.log( data);
    $.each(data, function(key, val) {
        console.log(key+" "+val);
        output.push({
            word: key,
            sentences: val,
            color: colors[(Math.floor(Math.random() * 6) + 1)-1]
        })
     })
  });
  console.log("Printing output");
  console.log(output);