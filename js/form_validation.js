// функция для передачи параметров php-скрипту без перезагрузки главной страницы
function AjaxFormRequest(id_form,url) {
    jQuery.ajax({
        // адрес, на который отправляется запрос
        url:      url,
        // тип запроса
        type:     "POST",
        // тип данных
        dataType: "html",
        // данные формы
        data: jQuery("#"+id_form).serialize(),
    });
        // удаление первого всплывающего окна
        document.getElementById("popup_id").style.display = "none";

        // отображение второго всплывающего окна
        document.getElementById("popup_2_id").style.display = "block";
        return false;
}

// функция проверки полей ввода контактной формы
function ValidateForm(){

    // объявляются новые переменные для вывода ошибок под каждым элементом
    var err_tel=document.getElementById("err_tel");
    var err_time=document.getElementById("err_time");
    var err_date=document.getElementById("err_date");

    // новым переменным приравниваются введенные значения телефона, времени и даты
    var tel=document.forms["main_form"]["tel_number"].value;
    var time_to_call=document.forms["main_form"]["time_to_call"].value;
    var date_to_call=document.getElementById('date_field').valueAsDate;

    // создается новая переменная времени
    var now = new Date();

    // новой переменной правнивается значение системного времени в виде дд.мм.гггг
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // настройка времени (+ 3 часа)
    today.setHours(today.getHours() + 3);

    // создание переменной часов
    var h = now.getHours();

    // создание переменной минут
    var m = now.getMinutes();

    // корректировка значений часов и минут
    if (h < 10) {h = "0" + h }
    if (m < 10) {m = "0" + m }

    // новая переменная времени в виде чч:мм
    var current_time = h +':'+ m;

    // объявляются переменные для определения цвета границы элемента при ошибках
    var err_border_tel =  document.getElementById('tel_field');
    var err_border_time =  document.getElementById('time_field');
    var err_border_date =  document.getElementById('date_field');

    // если длина номера телефона меньше 11 или пустая
    if (tel.length < 11) {
        err_tel.innerHTML = 'Введите корректный номер телефона';
        err_border_tel.style.border = '2px solid red';

            // если введена прошедшая дата и поле "Время" сброшено
            if ((date_to_call < today) & (time_to_call == "")) {
                err_date.innerHTML =
                 'Укажите действительную дату звонка';
                err_border_date.style.border = '2px solid red';
                err_time.innerHTML = 'Укажите действительное время звонка' ;
                err_border_time.style.border = '2px solid red';
                return false;

            // если введена прошедшая дата
            } else if (date_to_call < today) {
                err_date.innerHTML = 'Укажите действительную дату звонка';
                err_time.innerHTML = '' ;
                err_border_date.style.border = '2px solid red';
                err_border_time.style.border = '';
                return false;
            } else {
                err_date.innerHTML = '' ;
                err_border_date.style.border = '';

                // если значение поля "Время" сброшено
                if (time_to_call == "")  {
                    err_time.innerHTML = 'Укажите действительное время звонка' ;
                    err_border_time.style.border = '2px solid red';
                    return false;

                // если введено время, которое меньше системного и дата выбрана сегодняшней
                } else if ((time_to_call <= current_time)
                & ((date_to_call.getDate() - today.getDate()) == 0)) {
                    err_time.innerHTML = 'Укажите действительное время звонка' ;
                    err_date.innerHTML = '' ;
                    err_border_time.style.border = '2px solid red';
                    err_border_date.style.border = '';
                    return false;
                } else {
                    err_time.innerHTML = '' ;
                    err_border_time.style.border = '';
                }
            }
        return false;
    }

    // если длина номера телефона равна 11
    else {
        err_tel.innerHTML = '' ;
        err_border_tel.style.border = '';

        // если введена прошедшая дата и значение поля "Время" сброшено
        if ((date_to_call < today) & (time_to_call == "")) {
            err_date.innerHTML = 'Укажите действительную дату звонка';
            err_border_date.style.border = '2px solid red';
            err_time.innerHTML = 'Укажите действительное время звонка' ;
            err_border_time.style.border = '2px solid red';
            return false;

        // если введена прошедшая дата
        } else if (date_to_call < today) {
            err_date.innerHTML = 'Укажите действительную дату звонка';
            err_time.innerHTML = '' ;
            err_border_date.style.border = '2px solid red';
            err_border_time.style.border = '';
            return false;
        } else {
            err_date.innerHTML = '' ;
            err_border_date.style.border = '';

            // если значение поля "Время" сброшено
            if (time_to_call == "")  {
                err_time.innerHTML = 'Укажите действительное время звонка' ;
                err_border_time.style.border = '2px solid red';
                return false;

            // если введено время, которое меньше системного и дата выбрана сегодняшней
            } else if ((time_to_call <= current_time)
            & ((date_to_call.getDate() - today.getDate()) == 0)) {
                err_time.innerHTML = 'Укажите действительное время звонка' ;
                err_date.innerHTML = '' ;
                err_border_time.style.border = '2px solid red';
                err_border_date.style.border = '';
                return false;
            } else {
                err_time.innerHTML = '' ;
                err_border_time.style.border = '';

                // когда все поля формы заполнены верно, возвращается функция,
                // которая передает параметры php-скрипту без перезагрузки страницы
                return AjaxFormRequest('id_form', 'save_user.php');
            }
        }
    }
}