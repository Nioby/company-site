<?php
    // единожды берутся данные из файла "login.php"
    require_once 'login.php';

    // создается подключение к базе данных, используя параметры из файла
    $connection = mysqli_connect($db_hostname, $db_username, $db_password, $db_database)
        or die("Нет подключения к серверу");

    // устанавливается кодировка utf8
    mysqli_query($connection, "SET NAMES utf8");

    // определяется, было ли установлено значение в поле для ввода телефона
    if (isset($_POST['tel_number'])) {
        // создается переменная $tel_number, которой присваивается номер телефона
        $tel_number = $_POST['tel_number'];
    }

    // определяется, было ли установлено значение в поле для ввода времени
    if (isset($_POST['time_to_call'])) {
        // создается переменная  $time_to_call, которой присваивается значение времени
        $time_to_call = $_POST['time_to_call'];
    }

    // определяется, было ли установлено значение в поле для ввода даты
    if (isset($_POST['date_to_call'])) {
        // создается переменная  $date_to_call, которой присваивается значение даты
        $date_to_call = $_POST['date_to_call'];
    }

    // объявляется переменная запроса к базе данных
    $query = "INSERT INTO tablica (tel_number, time_to_call, date_to_call)
    VALUES ('$tel_number', '$time_to_call', '$date_to_call')";

    // создается переменная результата запроса к БД
    $result = mysqli_query($connection, $query);

    // производится отключение от БД
    mysqli_close($connection);
   
?>