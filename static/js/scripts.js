$(document).ready(function() {
    $(".date1, .date2").datepicker({
        monthNames:["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        dayNamesMin:["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        firstDay:1,
        dateFormat:"dd.mm.yy"
    });
    $(".slider").slider({
        min: 0,
        max: 1000,
        values: [0,1000],
        range: true
    });
    $( "#slider-range" ).slider({
        range: true,
        min: 0,
        max: 500,
        values: [ 75, 300 ],
    });
});