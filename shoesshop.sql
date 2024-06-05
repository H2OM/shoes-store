-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Июн 05 2024 г., 21:13
-- Версия сервера: 8.2.0
-- Версия PHP: 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `shoesshop`
--

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE `categories` (
  `id` int UNSIGNED NOT NULL,
  `Title` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Code` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `categories`
--

INSERT INTO `categories` (`id`, `Title`, `Code`) VALUES
(1, 'Мужчинам', 'man'),
(2, 'Женщинам', 'woman'),
(3, 'Детям', 'kids'),
(4, 'Унисекс', 'all');

-- --------------------------------------------------------

--
-- Структура таблицы `favorites`
--

CREATE TABLE `favorites` (
  `User_id` int UNSIGNED NOT NULL,
  `Goods_id` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `favorites`
--

INSERT INTO `favorites` (`User_id`, `Goods_id`) VALUES
(15, 1),
(15, 2),
(12, 4),
(11, 5),
(12, 5),
(15, 8),
(12, 13),
(12, 16),
(12, 19);

-- --------------------------------------------------------

--
-- Структура таблицы `feedbacks`
--

CREATE TABLE `feedbacks` (
  `id` int UNSIGNED NOT NULL,
  `User_id` int UNSIGNED NOT NULL,
  `Goods_id` int UNSIGNED NOT NULL,
  `Mark` enum('1','2','3','4','5') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Title` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `filters`
--

CREATE TABLE `filters` (
  `id` int UNSIGNED NOT NULL,
  `Filter` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Code` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Type` enum('Switch','Multi','Range','') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `filters`
--

INSERT INTO `filters` (`id`, `Filter`, `Code`, `Type`) VALUES
(1, 'Сортировка', 'sort', 'Switch'),
(2, 'Скидка', 'sale', 'Switch'),
(5, 'Бренд', 'brand', 'Multi'),
(6, 'Размер', 'size', 'Multi'),
(7, 'Цвет', 'color', 'Multi'),
(8, 'Тип обуви', 'type', 'Multi'),
(10, 'Цена', 'price', 'Range'),
(11, 'Категория', 'category', 'Switch');

-- --------------------------------------------------------

--
-- Структура таблицы `filters_goods`
--

CREATE TABLE `filters_goods` (
  `filter_value_id` int UNSIGNED NOT NULL,
  `goods_id` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `filters_goods`
--

INSERT INTO `filters_goods` (`filter_value_id`, `goods_id`) VALUES
(10, 1),
(36, 1),
(37, 1),
(38, 1),
(39, 1),
(40, 1),
(41, 1),
(42, 1),
(43, 1),
(44, 1),
(45, 1),
(46, 1),
(47, 1),
(48, 1),
(49, 1),
(50, 1),
(51, 1),
(52, 1),
(53, 1),
(55, 1),
(64, 1),
(10, 2),
(35, 2),
(36, 2),
(42, 2),
(43, 2),
(44, 2),
(45, 2),
(46, 2),
(47, 2),
(48, 2),
(49, 2),
(50, 2),
(51, 2),
(52, 2),
(53, 2),
(56, 2),
(64, 2),
(36, 3),
(37, 3),
(38, 3),
(39, 3),
(41, 3),
(42, 3),
(43, 3),
(44, 3),
(45, 3),
(46, 3),
(47, 3),
(48, 3),
(49, 3),
(50, 3),
(51, 3),
(52, 3),
(53, 3),
(56, 3),
(65, 3),
(70, 3),
(10, 4),
(36, 4),
(37, 4),
(38, 4),
(39, 4),
(40, 4),
(41, 4),
(42, 4),
(43, 4),
(44, 4),
(45, 4),
(46, 4),
(47, 4),
(48, 4),
(49, 4),
(50, 4),
(51, 4),
(52, 4),
(53, 4),
(57, 4),
(64, 4),
(9, 5),
(36, 5),
(37, 5),
(38, 5),
(39, 5),
(40, 5),
(41, 5),
(42, 5),
(43, 5),
(44, 5),
(45, 5),
(46, 5),
(47, 5),
(48, 5),
(49, 5),
(50, 5),
(51, 5),
(52, 5),
(53, 5),
(56, 5),
(64, 5),
(36, 6),
(37, 6),
(38, 6),
(39, 6),
(40, 6),
(41, 6),
(42, 6),
(43, 6),
(44, 6),
(45, 6),
(46, 6),
(47, 6),
(48, 6),
(49, 6),
(50, 6),
(51, 6),
(52, 6),
(53, 6),
(59, 6),
(65, 6),
(70, 6),
(36, 7),
(37, 7),
(38, 7),
(39, 7),
(40, 7),
(41, 7),
(42, 7),
(44, 7),
(45, 7),
(47, 7),
(48, 7),
(49, 7),
(50, 7),
(51, 7),
(56, 7),
(65, 7),
(70, 7),
(8, 8),
(36, 8),
(37, 8),
(38, 8),
(39, 8),
(40, 8),
(41, 8),
(42, 8),
(43, 8),
(44, 8),
(45, 8),
(48, 8),
(49, 8),
(50, 8),
(52, 8),
(53, 8),
(55, 8),
(65, 8),
(8, 9),
(39, 9),
(40, 9),
(41, 9),
(42, 9),
(43, 9),
(44, 9),
(45, 9),
(46, 9),
(47, 9),
(48, 9),
(49, 9),
(50, 9),
(63, 9),
(65, 9),
(8, 10),
(28, 10),
(30, 10),
(31, 10),
(32, 10),
(36, 10),
(37, 10),
(38, 10),
(56, 10),
(64, 10),
(12, 11),
(28, 11),
(30, 11),
(31, 11),
(32, 11),
(34, 11),
(35, 11),
(36, 11),
(38, 11),
(56, 11),
(64, 11),
(12, 12),
(28, 12),
(30, 12),
(31, 12),
(33, 12),
(37, 12),
(38, 12),
(56, 12),
(64, 12),
(10, 13),
(36, 13),
(37, 13),
(38, 13),
(40, 13),
(41, 13),
(43, 13),
(44, 13),
(45, 13),
(46, 13),
(49, 13),
(50, 13),
(51, 13),
(52, 13),
(53, 13),
(55, 13),
(64, 13),
(10, 15),
(36, 15),
(37, 15),
(38, 15),
(39, 15),
(40, 15),
(41, 15),
(42, 15),
(43, 15),
(49, 15),
(50, 15),
(51, 15),
(52, 15),
(53, 15),
(62, 15),
(64, 15),
(10, 16),
(38, 16),
(39, 16),
(40, 16),
(41, 16),
(43, 16),
(44, 16),
(45, 16),
(48, 16),
(49, 16),
(56, 16),
(64, 16),
(36, 17),
(37, 17),
(38, 17),
(39, 17),
(40, 17),
(41, 17),
(42, 17),
(43, 17),
(44, 17),
(45, 17),
(46, 17),
(47, 17),
(51, 17),
(52, 17),
(53, 17),
(63, 17),
(64, 17),
(71, 17),
(36, 18),
(37, 18),
(38, 18),
(39, 18),
(40, 18),
(41, 18),
(42, 18),
(43, 18),
(44, 18),
(45, 18),
(46, 18),
(47, 18),
(48, 18),
(49, 18),
(50, 18),
(51, 18),
(52, 18),
(53, 18),
(57, 18),
(64, 18),
(71, 18),
(36, 19),
(37, 19),
(38, 19),
(44, 19),
(45, 19),
(46, 19),
(47, 19),
(48, 19),
(49, 19),
(50, 19),
(51, 19),
(52, 19),
(53, 19),
(64, 19),
(71, 19),
(72, 19);

-- --------------------------------------------------------

--
-- Структура таблицы `filters_values`
--

CREATE TABLE `filters_values` (
  `id` int UNSIGNED NOT NULL,
  `value` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Code` varchar(28) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `filter_id` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `filters_values`
--

INSERT INTO `filters_values` (`id`, `value`, `Code`, `filter_id`) VALUES
(1, 'По возрастанию цены', 'LowToHigh', 1),
(2, 'По убыванию цены', 'HighToLow', 1),
(3, 'По популярности', 'ByPopular', 1),
(4, 'Да', 'Yes', 2),
(5, 'Больше 10%', 'More10', 2),
(6, 'Больше 30%', 'More30', 2),
(7, 'Больше 50%', 'More50', 2),
(8, 'Adidas', NULL, 5),
(9, 'PUMA', NULL, 5),
(10, 'Reebok', NULL, 5),
(11, 'Nike', NULL, 5),
(12, 'New Balance', NULL, 5),
(13, 'Under Armour', NULL, 5),
(14, 'Diesel', NULL, 5),
(15, 'Fred Perry', NULL, 5),
(16, '18', NULL, 6),
(17, '19,5', NULL, 6),
(18, '20', NULL, 6),
(19, '21', NULL, 6),
(20, '22', NULL, 6),
(21, '23', NULL, 6),
(22, '24', NULL, 6),
(23, '25,5', NULL, 6),
(24, '26', NULL, 6),
(25, '27,5', NULL, 6),
(26, '28', NULL, 6),
(27, '29,5', NULL, 6),
(28, '30', NULL, 6),
(29, '31,5', NULL, 6),
(30, '32', NULL, 6),
(31, '33,5', NULL, 6),
(32, '34', NULL, 6),
(33, '35,5', NULL, 6),
(34, '36', NULL, 6),
(35, '37,5', NULL, 6),
(36, '38', NULL, 6),
(37, '39,5', NULL, 6),
(38, '40', NULL, 6),
(39, '41,5', NULL, 6),
(40, '42', NULL, 6),
(41, '42,5', NULL, 6),
(42, '43', NULL, 6),
(43, '43,5', NULL, 6),
(44, '44', NULL, 6),
(45, '44,5', NULL, 6),
(46, '45', NULL, 6),
(47, '45,5', NULL, 6),
(48, '46', NULL, 6),
(49, '46,5', NULL, 6),
(50, '47', NULL, 6),
(51, '47,5', NULL, 6),
(52, '48', NULL, 6),
(53, '48,5', NULL, 6),
(54, '49', NULL, 6),
(55, 'Белый', 'White', 7),
(56, 'Черный', 'Black', 7),
(57, 'Бежевый', 'Beige', 7),
(58, 'Бордовый', 'Vinous', 7),
(59, 'Голубой', 'Blue', 7),
(60, 'Мультиколор', 'Multicolor', 7),
(61, 'Оранжевый', 'Orange', 7),
(62, 'Розовый', 'Pink', 7),
(63, 'Зеленый', 'Green', 7),
(64, 'Кроссовки', NULL, 8),
(65, 'Кеды', NULL, 8),
(66, 'Ботинки', NULL, 8),
(67, 'Шлепки', NULL, 8),
(70, 'Vans', NULL, 5),
(71, 'Asics', NULL, 5),
(72, 'Gray', 'Gray', 7);

-- --------------------------------------------------------

--
-- Структура таблицы `goods`
--

CREATE TABLE `goods` (
  `id` int UNSIGNED NOT NULL,
  `Title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Brand` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Type` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Article` char(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Price` float NOT NULL DEFAULT '0',
  `Price_old` float NOT NULL DEFAULT '0',
  `Image` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Untitled.jpg',
  `SliderImages` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'example.jpg,example2.jpg,example3.jpg...',
  `Description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `Category_id` int UNSIGNED NOT NULL,
  `Hit` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `goods`
--

INSERT INTO `goods` (`id`, `Title`, `Brand`, `Type`, `Article`, `Price`, `Price_old`, `Image`, `SliderImages`, `Description`, `Category_id`, `Hit`) VALUES
(1, 'Classic Leather', 'Reebok', 'Кроссовки', 'reebok100-100', 7999, 0, 'classicLether.jpg', 'classicLether2.webp,classicLether3.webp,classicLether4.webp,classicLether5.webp,classicLether6.webp', 'Всегда актуальны. Верх из мягкой кожи делает эти кроссовки максимально комфортными. Формованная промежуточная подошва из ЭВА обеспечивает амортизацию без утяжеления. Формованная полиуретановая стелька обеспечивает дополнительную амортизацию и комфорт.', 1, '1'),
(2, 'Classic Leather', 'Reebok', 'Кроссовки', 'reebok101-101', 7999, 0, 'classicLetherblack.jpg', 'classicLetherblack.jpg,classicLetherblack1.webp,classicLetherblack2.webp,classicLetherblack3.webp,classicLetherblack4.webp,classicLetherblack5.webp', 'Всегда актуальны. Верх из мягкой кожи делает эти кроссовки максимально комфортными. Формованная промежуточная подошва из ЭВА обеспечивает амортизацию без утяжеления. Формованная полиуретановая стелька обеспечивает дополнительную амортизацию и комфорт.', 1, '0'),
(3, 'Old Skool', 'Vans', 'Кеды', 'vans00100-101', 7950, 8999, 'vansOldskool.jpg', 'vansOldskool.jpg,vansOldskool2.jpg,vansOldskool3.jpg,vansOldskool4.jpg', 'Любимая обувь скейтбордистов и серферов заслуживает отдельного стеллажа в гардеробе поклонников уличной культуры. Оригинальная низкая форма из плотного текстиля дополнена замшевыми вставками в пяточной части и зоне мыска. Логотип на боковых сторонах выполнен из натуральной кожи. Вафельная резиновая подошва обеспечивает отличную амортизацию и гарантирует надежное сцепление с поверхностью. Классическое сочетание цветов позволяет комбинировать модель Vans Old Skool с любыми вещами и создавать аутфиты, которые не останутся незамеченными.', 4, '1'),
(4, 'Zig Kinetica 2.5 Edge Winter Cordura', 'Reebok', 'Кроссовки', 'reebok102-102', 18999, 0, 'ReebokZigKinetica2.5Edge1.jpg', 'ReebokZigKinetica2.5Edge1.jpg,ReebokZigKinetica2.5Edge2.jpg,ReebokZigKinetica2.5Edge3.jpg', 'Настоящие вездеходы из коллекции Reebok. Модель Zig Kinetica 2.5 Edge Winter Cordura созданы для переменчивых и сложных погодных условий. Верх пары из материала Cordura стойко переносит все внешние воздействия и надолго сохраняет свой эстетичный вид. За сохранение тепла отвечает подклад Thinsulate Thermal Management, а за комфортный отзывчивый шаг — подошва Floatride Fuel со вставкой Floatride Energy в передней части стопы. Резиновая подметка Vibram Ecostep с глубоким текстурированным протектором минимизирует скольжение и создает уверенность в каждом шаге.', 4, '1'),
(5, 'RS-Z LTH Trainers', 'PUMA', 'Кроссовки', 'puma00100-100', 9499, 11999, 'PUMARS-Z.jpg', 'PUMARS-Z.jpg,PUMARS-Z1.jpg,PUMARS-Z2.jpg,PUMARS-Z3.jpg', 'Футуристический внешний вид модели PUMA RS-Z LTH Trainers сочетается с продуманными технологическим наполнением. Верх изготовлен из кожи и отвечает за внешний вид и долговечность пары. Подошва с технологией Running System — мягкий вспененный материал IMEVA и формованная стелька снижают ударные нагрузки и обеспечивают ощущение легкости даже на длинных дистанциях. Знаменитые полосы PUMA Formstrip выделяются по структуре, дополняя многослойную конструкцию верха.', 4, '1'),
(6, 'Old Skool', 'Vans', 'Кеды', 'vans00100-102', 7999, 0, 'VansOldSkoolBlue.jpg', 'VansOldSkoolBlue.jpg,VansOldSkoolBlue1.jpg,VansOldSkoolBlue2.jpg', 'Любимая обувь скейтбордистов и серферов заслуживает отдельного стеллажа в гардеробе поклонников уличной культуры. Оригинальная низкая форма из плотного текстиля дополнена замшевыми вставками в пяточной части и зоне мыска. Логотип на боковых сторонах выполнен из натуральной кожи. Вафельная резиновая подошва обеспечивает отличную амортизацию и гарантирует надежное сцепление с поверхностью. Стильное сочетание оттенков позволяет комбинировать модель Vans Old Skool с любыми вещами и создавать аутфиты, которые не останутся незамеченными.', 4, '0'),
(7, 'Old Skool', 'Vans', 'Кеды', 'vans00100-103', 8999, 0, 'VansOldSkoolBlack.jpg', 'VansOldSkoolBlack.jpg,VansOldSkoolBlack1.jpg,VansOldSkoolBlack2.jpg', 'Любимая обувь скейтбордистов и серферов заслуживает отдельного стеллажа в гардеробе поклонников уличной культуры. Оригинальная низкая форма из плотного текстиля дополнена замшевыми вставками в пяточной части и зоне мыска. Логотип на боковых сторонах выполнен из натуральной кожи. Вафельная резиновая подошва обеспечивает отличную амортизацию и гарантирует надежное сцепление с поверхностью. Стильное сочетание оттенков позволяет комбинировать модель Vans Old Skool с любыми вещами и создавать аутфиты, которые не останутся незамеченными.', 4, '1'),
(8, 'Stan Smith', 'Adidas', 'Кеды', 'adidas100-100', 8999, 9999, 'adidasStan SmithW.jpg', 'adidasStan SmithW1.jpg,adidasStan SmithW2.jpg,adidasStan SmithW3.jpg,adidasStan SmithW4.jpg', 'Смиты стали иконой стиля для нескольких поколений. Пришла ваша очередь. Эти кроссовки внешне не отличаются от оригинальной модели. Так в чем же дело, спросите вы? В материалах. adidas серьезно относится к проблеме загрязнения окружающей среды. Так что зашнуруйте эти кроссовки и сделайте шаг навстречу экологичному будущему. В состав модели входит материал Primegreen, созданный из высокотехнологичных переработанных волокон. Верх на 50% состоит из переработанных ресурсов. Без первичного полиэстера.', 4, '1'),
(9, 'Stan Smith', 'Adidas', 'Кеды', 'adidas101-101', 9999, 0, 'adidasStan SmithG.jpg', 'adidasStan SmithG1.jpg,adidasStan SmithG2.jpg,adidasStan SmithG3.jpg,adidasStan SmithG4.jpg', 'Смиты стали иконой стиля для нескольких поколений. Пришла ваша очередь. Эти кроссовки внешне не отличаются от оригинальной модели. Так в чем же дело, спросите вы? В материалах. adidas серьезно относится к проблеме загрязнения окружающей среды. Так что зашнуруйте эти кроссовки и сделайте шаг навстречу экологичному будущему. В состав модели входит материал Primegreen, созданный из высокотехнологичных переработанных волокон. Верх на 50% состоит из переработанных ресурсов. Без первичного полиэстера.', 4, '1'),
(10, 'Ozweego', 'Adidas', 'Кроссовки', 'adidas102-102', 9999, 0, 'adidasOzweego.jpg', 'adidasOzweego.jpg,adidasOzweego1.jpg,adidasOzweego3.jpg,adidasOzweego4.jpg', 'Кроссовки, вдохновленные винтажным беговым стилем 90-х. Цельный верх из эластичного текстиля и кожи плотно облегает стопу. Легкая подошва обеспечивает максимум комфорта и амортизации.', 3, '1'),
(11, '237', 'New Balance', 'Кроссовки', 'NewBal100-100', 6999, 0, 'NewBalance237.jpg\r\n', 'NewBalance237.jpg,NewBalance2371.jpg,NewBalance2372.jpg,NewBalance2373.jpg', 'Модель New Balance 237 для юных модников ничуть не уступает по своему стилю взрослым кроссовкам. Вдохновленные классическими силуэтами 1970-х, они отлично вписываются в современный гардероб. Обтекаемый верх из замши и текстиля обеспечивает мягкость и хорошую циркуляцию воздуха. Увеличенная длина подошвы и слегка скошенный защитный мысок создают уверенность при каждом шаге и позволяют надолго сохранить эстетичный внешний вид пары. Протекторы в виде елочки отвечают за надежное сцепление с любой поверхностью.', 3, '0'),
(12, '327', 'New Balance', 'Кроссовки', 'NewBal101-101', 5890, 0, 'NewBalance327.jpg', 'NewBalance327.jpg,NewBalance3271.jpg,NewBalance3272.jpg,NewBalance3273.jpg,NewBalance3274.jpg', 'Культовый силуэт кроссовок New Balance 327, вдохновленный 1970-ми, с добавлением современных деталей в виде акцентного логотипа N на боковой стороне пары отлично смотрится с любым аутфитом. Текстильный верх с замшевыми вставками отвечает за воздухопроницаемость. Подошва в виде песочных часов обеспечивает усиленную амортизацию, а ярко выраженные протекторы — надежное сцепление с любой поверхностью.', 3, '0'),
(13, 'Zig Kinetica 2.5', 'Reebok', 'Кроссовки', 'reebok103-103', 8900, 13999, 'ZigKinetica2.5W.jpg', 'ZigKinetica2.5W.jpg,ZigKinetica2.5W1.jpg,ZigKinetica2.5W2.jpg,ZigKinetica2.5W3.jpg,ZigKinetica2.5W4.jpg', 'Беговые кроссовки можно адаптировать в ежедневный гардероб. Это доказывает модель Reebok Zig Kinetica 2.5. Комбинация пеноматериалов FLOATRIDE ENERGY и FLOATRIDE FUEL в промежуточной подошве обеспечивает легкую и отзывчивую амортизацию, а также гасит ударные нагрузки. Инновационные полоски Zig Energy Bands отвечают за сохранение и возвращение энергии. Стильный футуристичный силуэт и сочетание лаконичных светлых оттенков позволяют носить пару каждый день и не сомневаться в их комфорте. Контрастная петелька сзади перекликается с яркими акцентами и делает ежедневную эксплуатацию пары особенно приятной.', 2, '1'),
(15, 'Zig Kinetica 2.5', 'Reebok', 'Кроссовки', 'reebok104-104', 8900, 13999, 'ZigKinetica2.5P.jpg', 'ZigKinetica2.5P.jpg,ZigKinetica2.5P1.jpg,ZigKinetica2.5P2.jpg,ZigKinetica2.5P3.jpg', 'Беговые кроссовки можно адаптировать в ежедневный гардероб. Это доказывает модель Reebok Zig Kinetica 2.5. Комбинация пеноматериалов FLOATRIDE ENERGY и FLOATRIDE FUEL в промежуточной подошве обеспечивает легкую и отзывчивую амортизацию, а также гасит ударные нагрузки. Инновационные полоски Zig Energy Bands отвечают за сохранение и возвращение энергии. Стильный футуристичный силуэт и сочетание лаконичных светлых оттенков позволяют носить пару каждый день и не сомневаться в их комфорте. Контрастная петелька сзади перекликается с яркими акцентами и делает ежедневную эксплуатацию пары особенно приятной.', 2, '0'),
(16, 'Zig Kinetica 2.5 Edge Winter Cordura', 'Reebok', 'Кроссовки', 'reebok105-105', 19999, 0, 'ReebokZigKinetica2.5EdgeB.jpg', 'ReebokZigKinetica2.5EdgeB.jpg,ReebokZigKinetica2.5EdgeB1.jpg,ReebokZigKinetica2.5EdgeB2.jpg,ReebokZigKinetica2.5EdgeB3.jpg,ReebokZigKinetica2.5EdgeB4.jpg', 'Настоящие вездеходы из коллекции Reebok. Модель Zig Kinetica 2.5 Edge Winter Cordura созданы для переменчивых и сложных погодных условий. Верх пары из материала Cordura стойко переносит все внешние воздействия и надолго сохраняет свой эстетичный вид. За сохранение тепла отвечает подклад Thinsulate Thermal Management, а за комфортный отзывчивый шаг — подошва Floatride Fuel со вставкой Floatride Energy в передней части стопы. Резиновая подметка Vibram Ecostep с глубоким текстурированным протектором минимизирует скольжение и создает уверенность в каждом шаге.', 4, '1'),
(17, 'HS4-S Gel-Sonoma 15-50 Gore-Tex', 'ASICS ', 'Кроссовки', 'asics0100-100', 14999, 21999, 'ASICSHS4- Gel-Sonoma15-50.jpg', 'ASICSHS4- Gel-Sonoma15-50.jpg,ASICSHS4- Gel-Sonoma15-501.jpg,ASICSHS4- Gel-Sonoma15-502.jpg,ASICSHS4- Gel-Sonoma15-503.jpg,ASICSHS4- Gel-Sonoma15-504.jpg,ASICSHS4- Gel-Sonoma15-505.jpg', 'Цветовая палитра модели ASICS HS4-S Gel-Sonoma 15-50 Gore-Tex создана для ярких приключений и покорения новых вершин. Кроссовки изготовлены с использованием современных технологий, поэтому отлично подходят не только для городских маршрутов, но и смелых исследований за пределами мегаполиса. Мембрана GORE-TEX™ защищает от непогоды и сохраняет стопы сухими в любых условиях. Технология FF BLAST™ PLUS отвечает за амортизацию — она сглаживает удары и уменьшает негативное воздействие на суставы. Подошва с множеством протекторов позволяет чувствовать себя уверенно независимо от рельефа. Верх пары на 75% состоит из переработанных материалов, что еще раз доказывает возможность тесного взаимодействия технологий и эко-направленности.', 1, '1'),
(18, 'Gel-Sonoma 15-50', 'ASICS ', 'Кроссовки', 'asics0101-101', 13999, 19999, 'ASICSGel-Sonoma15-50.jpg', 'ASICSGel-Sonoma15-50.jpg,ASICSGel-Sonoma15-501.jpg,ASICSGel-Sonoma15-502.jpg,ASICSGel-Sonoma15-503.jpg', 'Вдохновленная шиповками 15-50™, модель ASICS Gel-Sonoma 15-50 изначально была разработана для бега по пересеченной местности, но современные технологии позволяют кроссовкам отлично маневрировать на горных тропах и в городских джунглях. Стабилизация пяточной зоны поддерживает стопу и делает шаг более сбалансированным. Технология FF BLAST™ PLUS отвечает за интенсивную амортизацию, а подошва AHAR™ повышает долговечность пары. Многослойный верх, который на 75% изготовлен из переработанных материалов, отлично проводит воздух и обеспечивает комфорт.', 1, '0'),
(19, 'Gel-Nimbus 9', 'ASICS ', 'Кроссовки', 'asics0102-102', 13999, 21499, 'ASICSGel-Nimbus9.jpg', 'ASICSGel-Nimbus9.jpg,ASICSGel-Nimbus91.jpg,ASICSGel-Nimbus92.jpg,ASICSGel-Nimbus93.jpg,ASICSGel-Nimbus94.jpg,ASICSGel-Nimbus95.jpg', 'Кроссовки ASICS Gel-Nimbus 9, от которых сложно оторвать взгляд. Все из-за оригинальных материалов и многообразия деталей, которые создают стильные акценты. Изначально модель была создана для бегунов, но, благодаря современным технологиям, кроссовки с легкостью можно адаптировать в повседневные аутфиты. Мембранный дышащий верх создает особый комфорт. Специальные гелевые вставки позволяют минимизировать нагрузку на суставы, поглощая удары. Футуристический силуэт из эпохи Y2K идеально вписывается в современный гардероб. Стильный экземпляр в коллекцию настоящего сникерхэда.', 4, '1');

-- --------------------------------------------------------

--
-- Структура таблицы `goods_related`
--

CREATE TABLE `goods_related` (
  `Goods_id` int UNSIGNED NOT NULL,
  `Related_id` int UNSIGNED NOT NULL,
  `Goods_Article` char(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Related_Article` char(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `goods_related`
--

INSERT INTO `goods_related` (`Goods_id`, `Related_id`, `Goods_Article`, `Related_Article`) VALUES
(1, 2, 'reebok100-100', 'reebok101-101'),
(1, 4, 'reebok100-100', 'reebok102-102'),
(2, 4, 'reebok101-101', 'reebok102-102'),
(3, 6, 'vans00100-101', 'vans00100-102'),
(3, 7, 'vans00100-101', 'vans00100-103'),
(6, 7, 'vans00100-102', 'vans00100-103'),
(8, 3, 'adidas100-100', 'vans00100-101'),
(10, 3, 'adidas102-102', 'vans00100-101'),
(11, 10, 'NewBal100-100', 'adidas102-102'),
(11, 12, 'NewBal100-100', 'NewBal101-101'),
(12, 10, 'NewBal101-101', 'adidas102-102'),
(13, 4, 'reebok103-103', 'reebok102-102'),
(13, 15, 'reebok103-103', 'reebok104-104'),
(13, 16, 'reebok103-103', 'reebok105-105'),
(15, 4, 'reebok104-104', 'reebok102-102'),
(16, 4, 'reebok105-105', 'reebok102-102'),
(16, 15, 'reebok105-105', 'reebok104-104'),
(17, 18, 'asics0100-100', 'asics0101-101'),
(17, 19, 'asics0100-100', 'asics0102-102'),
(18, 19, 'asics0101-101', 'asics0102-102');

-- --------------------------------------------------------

--
-- Структура таблицы `goods_variations`
--

CREATE TABLE `goods_variations` (
  `Base_id` int UNSIGNED NOT NULL,
  `Variation_id` int UNSIGNED NOT NULL,
  `Base_Article` char(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Variation_Article` char(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `goods_variations`
--

INSERT INTO `goods_variations` (`Base_id`, `Variation_id`, `Base_Article`, `Variation_Article`) VALUES
(1, 2, 'reebok100-100', 'reebok101-101'),
(3, 6, 'vans00100-101', 'vans00100-102'),
(3, 7, 'vans00100-101', 'vans00100-103'),
(4, 16, 'reebok102-102', 'reebok105-105'),
(6, 7, 'vans00100-102', 'vans00100-103'),
(8, 9, 'adidas100-100', 'adidas101-101'),
(13, 15, 'reebok103-103', 'reebok104-104');

-- --------------------------------------------------------

--
-- Структура таблицы `news`
--

CREATE TABLE `news` (
  `id` int UNSIGNED NOT NULL,
  `Text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Image` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `news`
--

INSERT INTO `news` (`id`, `Text`, `Image`) VALUES
(4, 'Новая модель Reebok - Zig Kinetica! Zig Kinetica – модель с беговой историей, ставшая иконой уличного стиля. Сегодня технологии Reebok на страже повседневного комфорта. Дополнительные свойства: Зигзагообразный ТПУ каркас ZIG ENERGY SHELL обеспечивающий стабилизацию, направляя и возвращая кинетическую энергию. Комбинация пеноматериалов FLOATRIDE ENERGY и FLOATRIDE FUEL в промежуточной подошве обеспечивает легкую и отзывчивую амортизацию, а также гасит ударные нагрузки. Дышащий комбинированный верх выполнен с использованием двухслойной сетки и обеспечивает превосходную циркуляцию воздуха. Инновационные резиновые полоски ZIG ENERGY BANDS на подметке сжимаются и разжимаются, усиливая возврат энергии с каждым шагом.', 'img/info1.jpg'),
(5, 'Кроссовки PUMA RS-Z LTH Trainers. Футуристический внешний вид модели PUMA RS-Z LTH Trainers сочетается с продуманными технологическим наполнением. Верх изготовлен из кожи и отвечает за внешний вид и долговечность пары. Подошва с технологией Running System — мягкий вспененный материал IMEVA и формованная стелька снижают ударные нагрузки и обеспечивают ощущение легкости даже на длинных дистанциях. Знаменитые полосы PUMA Formstrip выделяются по структуре, дополняя многослойную конструкцию верха.', 'png/info3.png'),
(6, 'Зарегистрируйтесь на нашем сайте и получите бонус в виде промокода на первый заказ.', 'png/info2.png'),
(7, 'Новый интернет-магазин обуви - Shoes!', 'png/info4.png');

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id` int UNSIGNED NOT NULL,
  `Number` char(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Status` enum('0','1','2','3') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0',
  `User_id` int UNSIGNED NOT NULL,
  `Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Change_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Delivery_date` timestamp NOT NULL,
  `Comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`id`, `Number`, `Status`, `User_id`, `Date`, `Change_date`, `Delivery_date`, `Comment`) VALUES
(1, 'A10000-A00001', '0', 5, '2023-11-29 18:05:16', '2023-11-29 18:05:16', '2023-11-29 19:40:19', NULL),
(2, 'A10001-A00002', '0', 5, '2023-11-29 18:06:16', '2023-11-29 18:06:16', '2023-11-29 19:40:19', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `orders_goods`
--

CREATE TABLE `orders_goods` (
  `Order_id` int UNSIGNED NOT NULL,
  `Goods_id` int UNSIGNED NOT NULL,
  `Size` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `orders_goods`
--

INSERT INTO `orders_goods` (`Order_id`, `Goods_id`, `Size`) VALUES
(1, 1, '42'),
(2, 1, '43,5'),
(2, 2, '43');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int UNSIGNED NOT NULL,
  `FirstName` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `SecondName` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Age` int UNSIGNED NOT NULL,
  `Gender` enum('male','female') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Email` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Phone` char(18) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Password` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `FirstName`, `SecondName`, `Age`, `Gender`, `Email`, `Phone`, `Password`) VALUES
(5, 'Дмитрий', 'Заболотнов', 19, 'male', 'dima.zabolotnov.02@mail.ru', '+7 (918) 219-55-84', '$2y$10$j3VsuFxHcIeTuCy/9yPfS.2BVzi/4AXy1KB4/nr14q/JUt6NlWiti'),
(11, 'Дмитрий', 'Заболотнов', 12, 'male', 'dima.za2232@mail.ru', '+7 (918) 294-25-22', '$2y$10$t56uGoskE/jLBmrpzMlm3.ZkZ1yukDyHwk8Rar3YaTT7jrMx6GmS2'),
(12, 'Дмитрий', 'Заболотнов', 43, 'male', 'dima.za423@mail.ru', '+7 (918) 111-11-12', '$2y$10$TwK3UYpWGj2UvUwjS0OMMuWchiJIFh.AOH.Zxr52S9deifhtbTj16'),
(13, 'Дмитрий', 'Заболотнов', 43, 'male', 'dima.za425@mail.ru', '+7 (918) 222-22-22', '$2y$10$4xPK6YnY.oRFQZU6Kbe/6.ljQXGH17unMsp1vjACibDCwhRsoTQwK'),
(14, 'Дмитрий', 'Коваленко', 22, 'female', 'danvbcsf@mail.ru', '+7 (124) 151-51-54', '$2y$10$czay3zomMM5UuR2aNjcQye2Uol3ai3IzPv6k4bMxbazPIbm5b9jtm'),
(15, 'Дмитрий', 'Коваленко', 22, 'male', 'dima.za2512@mail.ru', '+7 (151) 515-15-11', '$2y$10$zx/B7DdeJlYiRLl4JNRUNuNggsYtInO0y91qSnt3d3Jky6QGjrlw6');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`User_id`,`Goods_id`),
  ADD KEY `FavGoodsCall` (`Goods_id`);

--
-- Индексы таблицы `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_id` (`User_id`,`Goods_id`),
  ADD KEY `FitToGoodsCall` (`Goods_id`);

--
-- Индексы таблицы `filters`
--
ALTER TABLE `filters`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `filters_goods`
--
ALTER TABLE `filters_goods`
  ADD PRIMARY KEY (`filter_value_id`,`goods_id`),
  ADD KEY `FilterToGoodsCall` (`goods_id`),
  ADD KEY `filter_value_id` (`filter_value_id`);

--
-- Индексы таблицы `filters_values`
--
ALTER TABLE `filters_values`
  ADD PRIMARY KEY (`id`),
  ADD KEY `filterCall` (`filter_id`);

--
-- Индексы таблицы `goods`
--
ALTER TABLE `goods`
  ADD PRIMARY KEY (`id`,`Article`),
  ADD UNIQUE KEY `Article` (`Article`),
  ADD KEY `Title` (`Title`),
  ADD KEY `CategoryCall` (`Category_id`);

--
-- Индексы таблицы `goods_related`
--
ALTER TABLE `goods_related`
  ADD PRIMARY KEY (`Goods_id`,`Related_id`,`Goods_Article`,`Related_Article`),
  ADD KEY `Goods_id` (`Goods_id`,`Goods_Article`),
  ADD KEY `Related_id` (`Related_id`,`Related_Article`);

--
-- Индексы таблицы `goods_variations`
--
ALTER TABLE `goods_variations`
  ADD PRIMARY KEY (`Base_id`,`Variation_id`,`Base_Article`,`Variation_Article`),
  ADD KEY `Base_id` (`Base_id`,`Base_Article`),
  ADD KEY `Variation_id` (`Variation_id`,`Variation_Article`);

--
-- Индексы таблицы `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `news` ADD FULLTEXT KEY `Text` (`Text`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Number` (`Number`),
  ADD KEY `User_id` (`User_id`);

--
-- Индексы таблицы `orders_goods`
--
ALTER TABLE `orders_goods`
  ADD PRIMARY KEY (`Goods_id`,`Order_id`),
  ADD KEY `OrderGToOrders` (`Order_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD UNIQUE KEY `Phone` (`Phone`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `feedbacks`
--
ALTER TABLE `feedbacks`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `filters`
--
ALTER TABLE `filters`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT для таблицы `filters_values`
--
ALTER TABLE `filters_values`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT для таблицы `goods`
--
ALTER TABLE `goods`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT для таблицы `news`
--
ALTER TABLE `news`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `FavGoodsCall` FOREIGN KEY (`Goods_id`) REFERENCES `goods` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `FavUserCall` FOREIGN KEY (`User_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD CONSTRAINT `FitToGoodsCall` FOREIGN KEY (`Goods_id`) REFERENCES `goods` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `FitToUserCall` FOREIGN KEY (`User_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `filters_goods`
--
ALTER TABLE `filters_goods`
  ADD CONSTRAINT `filters_goods_ibfk_1` FOREIGN KEY (`filter_value_id`) REFERENCES `filters_values` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FilterToGoodsCall` FOREIGN KEY (`goods_id`) REFERENCES `goods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `filters_values`
--
ALTER TABLE `filters_values`
  ADD CONSTRAINT `filterCall` FOREIGN KEY (`filter_id`) REFERENCES `filters` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `goods`
--
ALTER TABLE `goods`
  ADD CONSTRAINT `CategoryCall` FOREIGN KEY (`Category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `goods_related`
--
ALTER TABLE `goods_related`
  ADD CONSTRAINT `goods_related_ibfk_1` FOREIGN KEY (`Goods_id`,`Goods_Article`) REFERENCES `goods` (`id`, `Article`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `goods_related_ibfk_2` FOREIGN KEY (`Related_id`,`Related_Article`) REFERENCES `goods` (`id`, `Article`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `goods_variations`
--
ALTER TABLE `goods_variations`
  ADD CONSTRAINT `goods_variations_ibfk_1` FOREIGN KEY (`Base_id`,`Base_Article`) REFERENCES `goods` (`id`, `Article`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `goods_variations_ibfk_2` FOREIGN KEY (`Variation_id`,`Variation_Article`) REFERENCES `goods` (`id`, `Article`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `OrderToUser` FOREIGN KEY (`User_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `orders_goods`
--
ALTER TABLE `orders_goods`
  ADD CONSTRAINT `OrderGToGoods` FOREIGN KEY (`Goods_id`) REFERENCES `goods` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `OrderGToOrders` FOREIGN KEY (`Order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
