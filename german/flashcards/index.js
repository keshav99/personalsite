var output;
$.getJSON( "./wordlist.json", function() {
    console.log( "success" );
  })
  .done(function( data ) {
    $.each( data.items, function( i, item ) {
      print(item);
    });
  });