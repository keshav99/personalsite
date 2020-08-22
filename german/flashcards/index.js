var output;
$.getJSON( "./wordlist.json", function( data ) {
    console.log( data);
    $.each(data, function(key, val) {
        console.log(key+" "+val);
     })
  });