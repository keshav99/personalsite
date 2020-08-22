var output;
$.getJSON( "./wordlist.json", function( data ) {
    console.log( data);
    $.each(data.items, function(key, val) {
        alert(val.fname);
        alert(val.lname);
     })
  });