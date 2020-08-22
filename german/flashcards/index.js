var jqxhr = $.getJSON( "./wordlist.json", function() {
    console.log( "success" );
  }).responseJSON;

console.log(jqxhr);