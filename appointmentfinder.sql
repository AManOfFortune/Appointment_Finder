-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 29. Apr 2022 um 06:03
-- Server-Version: 10.4.22-MariaDB
-- PHP-Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `appointmentfinder`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `appointment`
--

CREATE TABLE `appointment` (
  `appointment_ID` int(11) NOT NULL,
  `name` text NOT NULL,
  `Description` text NOT NULL,
  `public/private_Flag` tinyint(1) NOT NULL,
  `closed_flag` tinyint(1) NOT NULL,
  `closes_on` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `appointment`
--

INSERT INTO `appointment` (`appointment_ID`, `name`, `Description`, `public/private_Flag`, `closed_flag`, `closes_on`) VALUES
(35, 'Novarock Festival', 'This is the official vote for the Novarock Festival! Please be nice and dont spam!', 0, 0, '2022-05-31 00:00:00'),
(36, 'Super Secret Meeting', 'Noone will know of this meeting, MUAHAHA!', 1, 0, '2022-05-07 05:00:00'),
(37, 'Creation of the universe', 'Very much in the past.', 0, 0, '0001-01-01 00:00:00');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `table termin`
--

CREATE TABLE `table termin` (
  `Termin_ID` int(11) NOT NULL,
  `time` datetime NOT NULL,
  `FK_appointmentID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `table termin`
--

INSERT INTO `table termin` (`Termin_ID`, `time`, `FK_appointmentID`) VALUES
(46, '2022-05-01 02:00:00', 35),
(47, '2022-05-15 02:00:00', 35),
(48, '2022-05-20 02:00:00', 35),
(49, '2022-05-10 10:30:00', 36),
(50, '2022-05-10 11:30:00', 36),
(51, '0001-01-01 00:10:00', 37);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `termin-user`
--

CREATE TABLE `termin-user` (
  `FK_Termin` int(11) NOT NULL,
  `FK_User` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `termin-user`
--

INSERT INTO `termin-user` (`FK_Termin`, `FK_User`) VALUES
(46, 4),
(46, 5),
(46, 7),
(47, 5),
(48, 5),
(48, 6),
(50, 8);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE `users` (
  `users_ID` int(11) NOT NULL,
  `username` text NOT NULL,
  `comment` text NOT NULL,
  `FK_appointment` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`users_ID`, `username`, `comment`, `FK_appointment`) VALUES
(4, 'Peter', 'I would like to have free drinks!', 35),
(5, 'Bob', 'Dont care when, as long as it happens!', 35),
(6, 'Emily', '', 35),
(7, 'Reginald', 'Is weed legal here?', 35),
(8, 'Sam Secret', '', 36);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`appointment_ID`);

--
-- Indizes für die Tabelle `table termin`
--
ALTER TABLE `table termin`
  ADD PRIMARY KEY (`Termin_ID`),
  ADD KEY `FK_appointmentID` (`FK_appointmentID`);

--
-- Indizes für die Tabelle `termin-user`
--
ALTER TABLE `termin-user`
  ADD PRIMARY KEY (`FK_Termin`,`FK_User`),
  ADD KEY `FK_Termin` (`FK_Termin`),
  ADD KEY `FK_User` (`FK_User`);

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`users_ID`),
  ADD KEY `FK_appointmentID` (`FK_appointment`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `appointment`
--
ALTER TABLE `appointment`
  MODIFY `appointment_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT für Tabelle `table termin`
--
ALTER TABLE `table termin`
  MODIFY `Termin_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `users_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
