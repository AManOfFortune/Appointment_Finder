-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 28. Apr 2022 um 15:14
-- Server-Version: 10.4.21-MariaDB
-- PHP-Version: 8.0.12

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
  `closes_on` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `appointment`
--

INSERT INTO `appointment` (`appointment_ID`, `name`, `Description`, `public/private_Flag`, `closed_flag`, `closes_on`) VALUES
(1, 'Heute treffen?', 'Beschreibung', 0, 1, '2022-04-29'),
(2, 'Heute treffen?', 'Beschreibung', 0, 1, '2022-04-29');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `table termin`
--

CREATE TABLE `table termin` (
  `Termin_ID` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` datetime NOT NULL,
  `FK_appointmentID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `termin-user`
--

CREATE TABLE `termin-user` (
  `FK_Termin` int(11) NOT NULL,
  `FK_User` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(1, 'Hans Wurst', 'Kommentar', 1),
(2, 'Hans Wurst', 'Kommentar', 1);

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
  MODIFY `appointment_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT für Tabelle `table termin`
--
ALTER TABLE `table termin`
  MODIFY `Termin_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `users_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
