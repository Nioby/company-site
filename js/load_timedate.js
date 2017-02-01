// функция для отображения времени и даты в полях контактной формы
function LoadTimeDate() {
    // объявляется переменная времени
    var date = new Date();

    // настройка времени (+ 3 часа)
    date.setHours(date.getHours() + 3);

    // объявляется другая переменная времени
    var new_d = new Date();

    // создание переменной часов
    var h = new_d.getHours();

    // создание переменной минут
    var m = new_d.getMinutes();

    // корректировка значений часов и минут
    if (h < 10) {h = "0" + h }
    if (m < 10) {m = "0" + m }

    //  отображение текущего времени в форме
    var current_time = document.forms["main_form"]["time_to_call"].value =
    h +':'+ m;

    //  отображение текущей даты в форме
    var current_date = document.getElementById('date_field').valueAsDate = date;
}