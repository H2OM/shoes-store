<?php

namespace app\core\enums;

enum ResponseMessage: string {
    case ERROR_PRODUCT_NOT_FOUND = 'Товар не найден';
    case ERROR_CATALOG_NOT_FOUND = 'Товары не найдены';
    case ERROR_NOT_ENOUGH_DATA = 'Не достаточно данных';
    case ERROR_DATA = 'Некорректные данные';
    case ERROR_GET_DATA = 'Ошибка при получении данных';
    case ERROR_NEW_USER = 'Ошибка при добавлении нового пользователя';
    case ERROR_AUTH = 'Неверный логин или пароль';
    case ERROR_UPDATE = 'Не удалось обновить данные';
    case ERROR_ADD = 'Не удалось добавить данные';
    case ERROR_DUPLICATE = 'Не удалось добавить данные. Позиция уже существует!';
    case ERROR_NOT_AUTH = 'Не авторизирован';
    case ERROR_USER_PHONE_ISSET = 'Пользователь с таким номером зарегистрирован!';
    case SUCCESS_SUBSCRIBE = 'Вы успешно подписаны на обновления!';
    case SUCCESS_FORM = 'Ваша заявка в обработке';
    case SUCCESS_AUTH = 'Успешная авторизация';
    case SUCCESS_LOGOUT = 'Успешная деавторизация';
    case SUCCESS_ADD = 'Успешное добавление';
    case SUCCESS_ADD_BASKET = 'Товар добавлен в корзину';
    case SUCCESS_ADD_FAVORITES = 'Товар добавлен в избранное';
    case SUCCESS_REMOVE = 'Успешное удаление';
    case SUCCESS_REMOVE_BASKET = 'Товар удален из корзины';
    case SUCCESS_REMOVE_FAVORITES = 'Товар удален из избранного';
    case SUCCESS_CLEAR_FAVORITES = 'Избранное отчищено!';
    case SUCCESS_EDIT = 'Данные отредактированы';
    case USER_ALREADY = 'Пользователь уже авторизован';
}