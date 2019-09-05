require('jquery-ui')
require('jquery-ui-bundle')

let add = (a, b) =>  a+b
console.log(add(200000,3))

$(function(){
    $("input[id^=ui-datepicker]").datepicker({dateFormat: 'dd-mm-yy'}).attr({"autocomplete":"off"});
    

    
    $( "#slider-range" ).slider({
        range: true,
        min: 0,
        max: 500,
        values: [ 75, 300 ],
        slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
        }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
        " - $" + $( "#slider-range" ).slider( "values", 1 ) );
});

