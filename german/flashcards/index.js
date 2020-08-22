var output;
$.getJSON( "./wordlist.json", function() {
    console.log( "success" );
  })
  .done(function(data){
      output = data;
  })

  $.each(output.items, function(i, item){
    console.log(item);
  })