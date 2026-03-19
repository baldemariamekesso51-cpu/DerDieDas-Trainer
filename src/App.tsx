/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Play, RotateCcw, Home, BookOpen, Zap, Target, ArrowRight, Volume2, VolumeX } from 'lucide-react';

type Article = 'der' | 'die' | 'das';

interface VocabItem {
  id: number;
  lesson: number;
  german: string;
  french: string;
  article: Article;
}

// Données : Liste de vocabulaire fournie pour la leçon 1
const vocabData: VocabItem[] = [
  { id: 1, lesson: 1, german: "Kurs", french: "le cours", article: "der" },
  { id: 2, lesson: 1, german: "Bild", french: "l'image", article: "das" },
  { id: 3, lesson: 1, german: "Gespräch", french: "la conversation", article: "das" },
  { id: 4, lesson: 1, german: "Frage", french: "la question", article: "die" },
  { id: 5, lesson: 1, german: "Wort", french: "le mot", article: "das" },
  { id: 6, lesson: 1, german: "Lektion", french: "la leçon", article: "die" },
  { id: 7, lesson: 1, german: "Antwort", french: "la réponse", article: "die" },
  { id: 8, lesson: 1, german: "Tabelle", french: "le tableau", article: "die" },
  { id: 9, lesson: 1, german: "Partner", french: "le partenaire", article: "der" },
  { id: 10, lesson: 1, german: "Partnerin", french: "la partenaire", article: "die" },
  { id: 11, lesson: 1, german: "Text", french: "le texte", article: "der" },
  { id: 12, lesson: 1, german: "Zahl", french: "le nombre", article: "die" },
  { id: 13, lesson: 1, german: "Satz", french: "la phrase", article: "der" },
  { id: 14, lesson: 1, german: "Kursleiter", french: "l'enseignant", article: "der" },
  { id: 15, lesson: 1, german: "Kursleiterin", french: "l'enseignante", article: "die" },
  { id: 16, lesson: 1, german: "Kärtchen", french: "la petite carte", article: "das" },
  { id: 17, lesson: 1, german: "Gruppe", french: "le groupe", article: "die" },
  { id: 18, lesson: 1, german: "Foto", french: "la photo", article: "das" },
  { id: 19, lesson: 1, german: "Film", french: "le film", article: "der" },
  { id: 20, lesson: 1, german: "Name", french: "le nom", article: "der" },
  { id: 21, lesson: 1, german: "Deutsch", french: "l'allemand", article: "das" },
  { id: 22, lesson: 1, german: "Herr", french: "le monsieur", article: "der" },
  { id: 23, lesson: 1, german: "Kind", french: "l'enfant", article: "das" },
  { id: 24, lesson: 1, german: "Abend", french: "le soir", article: "der" },
  { id: 25, lesson: 1, german: "Dame", french: "la dame", article: "die" },
  { id: 26, lesson: 1, german: "Musik", french: "la musique", article: "die" },
  { id: 27, lesson: 1, german: "Morgen", french: "le matin", article: "der" },
  { id: 28, lesson: 1, german: "Frau", french: "la femme", article: "die" },
  { id: 29, lesson: 1, german: "Nacht", french: "la nuit", article: "die" },
  { id: 30, lesson: 1, german: "Papa", french: "le papa", article: "der" },
  { id: 31, lesson: 1, german: "Entschuldigung", french: "l'excuse", article: "die" },
  { id: 32, lesson: 1, german: "Sprache", french: "la langue", article: "die" },
  { id: 33, lesson: 1, german: "Buchstabe", french: "la lettre", article: "der" },
  { id: 34, lesson: 1, german: "Alphabet", french: "l'alphabet", article: "das" },
  { id: 35, lesson: 1, german: "Moment", french: "le moment", article: "der" },
  { id: 36, lesson: 1, german: "Firma", french: "l'entreprise", article: "die" },
  { id: 37, lesson: 1, german: "Adresse", french: "l'adresse", article: "die" },
  { id: 38, lesson: 1, german: "Visitenkarte", french: "la carte de visite", article: "die" },
  { id: 39, lesson: 1, german: "Vorname", french: "le prénom", article: "der" },
  { id: 40, lesson: 1, german: "Familienname", french: "le nom de famille", article: "der" },
  { id: 41, lesson: 1, german: "Straße", french: "la rue", article: "die" },
  { id: 42, lesson: 1, german: "Stadt", french: "la ville", article: "die" },
  { id: 43, lesson: 1, german: "Land", french: "le pays", article: "das" },
  { id: 44, lesson: 1, german: "E-Mail", french: "l'e-mail", article: "die" },
  { id: 45, lesson: 1, german: "Telefon", french: "le téléphone", article: "das" },
  { id: 46, lesson: 1, german: "Formular", french: "le formulaire", article: "das" },
  { id: 47, lesson: 1, german: "Fremdsprache", french: "la langue étrangère", article: "die" },
  { id: 48, lesson: 1, german: "Anmeldung", french: "l'inscription", article: "die" },
  { id: 49, lesson: 1, german: "Postleitzahl", french: "le code postal", article: "die" },
  { id: 50, lesson: 1, german: "Polnisch", french: "le polonais", article: "das" },
  { id: 51, lesson: 1, german: "Türkisch", french: "le turc", article: "das" },
  { id: 52, lesson: 1, german: "Rumänisch", french: "le roumain", article: "das" },
  { id: 53, lesson: 1, german: "Arabisch", french: "l'arabe", article: "das" },
  { id: 54, lesson: 1, german: "Spanisch", french: "l'espagnol", article: "das" },
  { id: 55, lesson: 1, german: "Ungarisch", french: "l'hongrois", article: "das" },
  { id: 56, lesson: 1, german: "Bulgarisch", french: "le bulgare", article: "das" },
  { id: 57, lesson: 1, german: "Italienisch", french: "l'italien", article: "das" },
  { id: 58, lesson: 1, german: "Griechisch", french: "le grec", article: "das" },
  { id: 59, lesson: 1, german: "Englisch", french: "l'anglais", article: "das" },
  { id: 60, lesson: 2, german: "Park", french: "le parc", article: "der" },
  { id: 61, lesson: 2, german: "Pause", french: "la pause", article: "die" },
  { id: 62, lesson: 2, german: "Familie", french: "la famille", article: "die" },
  { id: 63, lesson: 2, german: "Vater", french: "le père", article: "der" },
  { id: 64, lesson: 2, german: "Mutter", french: "la mère", article: "die" },
  { id: 65, lesson: 2, german: "Bruder", french: "le frère", article: "der" },
  { id: 66, lesson: 2, german: "Jahr", french: "l'année", article: "das" },
  { id: 67, lesson: 2, german: "Enkel", french: "le petit-fils", article: "der" },
  { id: 68, lesson: 2, german: "Enkelin", french: "la petite-fille", article: "die" },
  { id: 69, lesson: 2, german: "Tochter", french: "la fille", article: "die" },
  { id: 70, lesson: 2, german: "Sohn", french: "le fils", article: "der" },
  { id: 71, lesson: 2, german: "Schwester", french: "la sœur", article: "die" },
  { id: 72, lesson: 2, german: "Oma", french: "la grand-mère", article: "die" },
  { id: 73, lesson: 2, german: "Mann", french: "l'homme", article: "der" },
  { id: 74, lesson: 2, german: "Opa", french: "le grand-père", article: "der" },
  { id: 75, lesson: 2, german: "Ehemann", french: "le mari", article: "der" },
  { id: 76, lesson: 2, german: "Ehefrau", french: "l'épouse", article: "die" },
  { id: 77, lesson: 2, german: "Zahl", french: "le nombre", article: "die" },
  { id: 78, lesson: 2, german: "Nummer", french: "le numéro", article: "die" },
  { id: 79, lesson: 2, german: "Geburtsort", french: "le lieu de naissance", article: "der" },
  { id: 80, lesson: 2, german: "Wohnort", french: "le domicile", article: "der" },
  { id: 81, lesson: 2, german: "Familienstand", french: "l'état civil", article: "der" },
  { id: 82, lesson: 2, german: "Alter", french: "l'âge", article: "das" },
  { id: 83, lesson: 2, german: "Norden", french: "le nord", article: "der" },
  { id: 84, lesson: 2, german: "Osten", french: "l'est", article: "der" },
  { id: 85, lesson: 2, german: "Süden", french: "le sud", article: "der" },
  { id: 86, lesson: 2, german: "Westen", french: "l'ouest", article: "der" },
  { id: 87, lesson: 2, german: "Hauptstadt", french: "la capitale", article: "die" },
  { id: 88, lesson: 3, german: "Preis", french: "le prix", article: "der" },
  { id: 89, lesson: 3, german: "Cent", french: "le centime", article: "der" },
  { id: 90, lesson: 3, german: "Prospekt", french: "le prospectus", article: "der" },
  { id: 91, lesson: 3, german: "Sonderangebot", french: "l'offre spéciale", article: "das" },
  { id: 92, lesson: 3, german: "Lebensmittel", french: "l'aliment", article: "das" },
  { id: 93, lesson: 3, german: "Kilogramm", french: "le kilogramme", article: "das" },
  { id: 94, lesson: 3, german: "Gramm", french: "le gramme", article: "das" },
  { id: 95, lesson: 3, german: "Pfund", french: "la livre", article: "das" },
  { id: 96, lesson: 3, german: "Liter", french: "le litre", article: "der" },
  { id: 97, lesson: 3, german: "Flasche", french: "la bouteille", article: "die" },
  { id: 98, lesson: 3, german: "Dose", french: "la boîte", article: "die" },
  { id: 99, lesson: 3, german: "Becher", french: "le pot", article: "der" },
  { id: 100, lesson: 3, german: "Sahne", french: "la crème", article: "die" },
  { id: 101, lesson: 3, german: "Wurst", french: "la saucisse", article: "die" },
  { id: 102, lesson: 3, german: "Hackfleisch", french: "la viande hachée", article: "das" },
  { id: 103, lesson: 3, german: "Verkäufer", french: "le vendeur", article: "der" },
  { id: 104, lesson: 3, german: "Verkäuferin", french: "la vendeuse", article: "die" },
  { id: 105, lesson: 3, german: "Kunde", french: "le client", article: "der" },
  { id: 106, lesson: 3, german: "Kundin", french: "la cliente", article: "die" },
  { id: 107, lesson: 3, german: "Laden", french: "le magasin", article: "der" },
  { id: 108, lesson: 3, german: "Obst", french: "le fruit", article: "das" },
  { id: 109, lesson: 3, german: "Gemüse", french: "le légume", article: "das" },
  { id: 110, lesson: 3, german: "Bäckerei", french: "la boulangerie", article: "die" },
  { id: 111, lesson: 3, german: "Teigtasche", french: "le ravioli", article: "die" },
  { id: 112, lesson: 3, german: "Rezept", french: "la recette", article: "das" },
  { id: 113, lesson: 3, german: "Wasser", french: "l'eau", article: "das" },
  { id: 114, lesson: 3, german: "Pfeffer", french: "le poivre", article: "der" },
  { id: 115, lesson: 3, german: "Salz", french: "le sel", article: "das" },
  { id: 116, lesson: 3, german: "Schokolade", french: "le chocolat", article: "die" },
  { id: 117, lesson: 3, german: "Banane", french: "la banane", article: "die" },
  { id: 118, lesson: 3, german: "Butter", french: "le beurre", article: "die" },
  { id: 119, lesson: 3, german: "Ei", french: "l'œuf", article: "das" },
  { id: 120, lesson: 3, german: "Milch", french: "le lait", article: "die" },
  { id: 121, lesson: 3, german: "Brot", french: "le pain", article: "das" },
  { id: 122, lesson: 3, german: "Fisch", french: "le poisson", article: "der" },
  { id: 123, lesson: 3, german: "Fleisch", french: "la viande", article: "das" },
  { id: 124, lesson: 3, german: "Käse", french: "le fromage", article: "der" },
  { id: 125, lesson: 3, german: "Apfel", french: "la pomme", article: "der" },
  { id: 126, lesson: 3, german: "Birne", french: "la poire", article: "die" },
  { id: 127, lesson: 3, german: "Brötchen", french: "le petit pain", article: "das" },
  { id: 128, lesson: 3, german: "Maultasche", french: "la maultasche", article: "die" },
  { id: 129, lesson: 3, german: "Kuchen", french: "le gâteau", article: "der" },
  { id: 130, lesson: 3, german: "Orange", french: "l'orange", article: "die" },
  { id: 131, lesson: 3, german: "Saft", french: "le jus", article: "der" },
  { id: 132, lesson: 3, german: "Joghurt", french: "le yaourt", article: "der" },
  { id: 133, lesson: 3, german: "Kartoffel", french: "la pomme de terre", article: "die" },
  { id: 134, lesson: 3, german: "Zwiebel", french: "l'oignon", article: "die" },
  { id: 135, lesson: 3, german: "Tomate", french: "la tomate", article: "die" },
  { id: 136, lesson: 3, german: "Mineralwasser", french: "l'eau minérale", article: "das" },
  { id: 137, lesson: 4, german: "Wohnung", french: "l'appartement", article: "die" },
  { id: 138, lesson: 4, german: "Lampe", french: "la lampe", article: "die" },
  { id: 139, lesson: 4, german: "Zimmer", french: "la chambre", article: "das" },
  { id: 140, lesson: 4, german: "Küche", french: "la cuisine", article: "die" },
  { id: 141, lesson: 4, german: "Bad", french: "la salle de bain", article: "das" },
  { id: 142, lesson: 4, german: "Flur", french: "le couloir", article: "der" },
  { id: 143, lesson: 4, german: "Toilette", french: "les toilettes", article: "die" },
  { id: 144, lesson: 4, german: "Balkon", french: "le balcon", article: "der" },
  { id: 145, lesson: 4, german: "Wohnzimmer", french: "le salon", article: "das" },
  { id: 146, lesson: 4, german: "Haus", french: "la maison", article: "das" },
  { id: 147, lesson: 4, german: "Arbeitszimmer", french: "le bureau", article: "das" },
  { id: 148, lesson: 4, german: "Monat", french: "le mois", article: "der" },
  { id: 149, lesson: 4, german: "Schrank", french: "l'armoire", article: "der" },
  { id: 150, lesson: 4, german: "Kühlschrank", french: "le réfrigérateur", article: "der" },
  { id: 151, lesson: 4, german: "Sofa", french: "le canapé", article: "das" },
  { id: 152, lesson: 4, german: "Tisch", french: "la table", article: "der" },
  { id: 153, lesson: 4, german: "Stuhl", french: "la chaise", article: "der" },
  { id: 154, lesson: 4, german: "Bett", french: "le lit", article: "das" },
  { id: 155, lesson: 4, german: "Fernseher", french: "le téléviseur", article: "der" },
  { id: 156, lesson: 4, german: "Dusche", french: "la douche", article: "die" },
  { id: 157, lesson: 4, german: "Herd", french: "la cuisinière", article: "der" },
  { id: 158, lesson: 4, german: "Badewanne", french: "la baignoire", article: "die" },
  { id: 159, lesson: 4, german: "Teppich", french: "le tapis", article: "der" },
  { id: 160, lesson: 4, german: "Sessel", french: "le fauteuil", article: "der" },
  { id: 161, lesson: 4, german: "Gerät", french: "l'appareil", article: "das" },
  { id: 162, lesson: 4, german: "Farbe", french: "la couleur", article: "die" },
  { id: 163, lesson: 4, german: "Zentimeter", french: "le centimètre", article: "der" },
  { id: 164, lesson: 4, german: "Kinderbett", french: "le lit d'enfant", article: "das" },
  { id: 165, lesson: 4, german: "Handy", french: "le téléphone portable", article: "das" },
  { id: 166, lesson: 4, german: "Handynummer", french: "le numéro de portable", article: "die" },
  { id: 167, lesson: 4, german: "Arbeit", french: "le travail", article: "die" },
  { id: 168, lesson: 4, german: "Anzeige", french: "l'annonce", article: "die" },
  { id: 169, lesson: 4, german: "Zeitung", french: "le journal", article: "die" },
  { id: 170, lesson: 4, german: "Ehepaar", french: "le couple", article: "das" },
  { id: 171, lesson: 4, german: "Kind", french: "l'enfant", article: "das" },
  { id: 172, lesson: 4, german: "Garten", french: "le jardin", article: "der" },
  { id: 173, lesson: 4, german: "Apartment", french: "le studio", article: "das" },
  { id: 174, lesson: 4, german: "Wohnraum", french: "la pièce à vivre", article: "der" },
  { id: 175, lesson: 4, german: "Stock", french: "l'étage", article: "der" },
  { id: 176, lesson: 4, german: "Anruf", french: "l'appel", article: "der" },
  { id: 177, lesson: 4, german: "TV", french: "la télé", article: "das" },
  { id: 178, lesson: 4, german: "Garage", french: "le garage", article: "die" },
  { id: 179, lesson: 4, german: "Quadratmeter", french: "le mètre carré", article: "der" },
  { id: 180, lesson: 4, german: "Miete", french: "le loyer", article: "die" },
  { id: 181, lesson: 4, german: "Computer", french: "l'ordinateur", article: "der" },
  { id: 182, lesson: 4, german: "Schreibtisch", french: "le bureau", article: "der" },
  { id: 183, lesson: 4, german: "Computertisch", french: "le bureau d'ordinateur", article: "der" },
  { id: 184, lesson: 4, german: "Meter", french: "le mètre", article: "der" },
  { id: 185, lesson: 4, german: "Tag", french: "le jour", article: "der" },
  { id: 186, lesson: 4, german: "Präsentation", french: "la présentation", article: "die" },
  { id: 187, lesson: 4, german: "Abendessen", french: "le dîner", article: "das" },
  { id: 188, lesson: 4, german: "Nachmittag", french: "l'après-midi", article: "der" },
  { id: 189, lesson: 4, german: "Supermarkt", french: "le supermarché", article: "der" },
  { id: 190, lesson: 5, german: "Intensivkurs", french: "le cours intensif", article: "der" },
  { id: 191, lesson: 5, german: "Deutschkurs", french: "le cours d'allemand", article: "der" },
  { id: 192, lesson: 5, german: "Viertel", french: "le quart", article: "das" },
  { id: 193, lesson: 5, german: "Uhr", french: "l'heure", article: "die" },
  { id: 194, lesson: 5, german: "Montag", french: "le lundi", article: "der" },
  { id: 195, lesson: 5, german: "Freitag", french: "le vendredi", article: "der" },
  { id: 196, lesson: 5, german: "Donnerstag", french: "le jeudi", article: "der" },
  { id: 197, lesson: 5, german: "Mittwoch", french: "le mercredi", article: "der" },
  { id: 198, lesson: 5, german: "Dienstag", french: "le mardi", article: "der" },
  { id: 199, lesson: 5, german: "Party", french: "la fête", article: "die" },
  { id: 200, lesson: 5, german: "Zeit", french: "le temps", article: "die" },
  { id: 201, lesson: 5, german: "Fußball", french: "le football", article: "der" },
  { id: 202, lesson: 5, german: "Samstag", french: "le samedi", article: "der" },
  { id: 203, lesson: 5, german: "Sonntag", french: "le dimanche", article: "der" },
  { id: 204, lesson: 5, german: "Hausaufgabe", french: "le devoir", article: "die" },
  { id: 205, lesson: 5, german: "Mama", french: "la maman", article: "die" },
  { id: 206, lesson: 5, german: "Terminkalender", french: "l'agenda", article: "der" },
  { id: 207, lesson: 5, german: "Woche", french: "la semaine", article: "die" },
  { id: 208, lesson: 5, german: "Wochenende", french: "le week-end", article: "das" },
  { id: 209, lesson: 5, german: "Mittag", french: "le midi", article: "der" },
  { id: 210, lesson: 5, german: "Morgen", french: "le matin", article: "der" },
  { id: 211, lesson: 5, german: "Abend", french: "le soir", article: "der" },
  { id: 212, lesson: 5, german: "Vormittag", french: "la matinée", article: "der" },
  { id: 213, lesson: 5, german: "Nacht", french: "la nuit", article: "die" },
  { id: 214, lesson: 5, german: "Kino", french: "le cinéma", article: "das" },
  { id: 215, lesson: 5, german: "Sport", french: "le sport", article: "der" },
  { id: 216, lesson: 5, german: "Pizza", french: "la pizza", article: "die" },
  { id: 217, lesson: 5, german: "Termin", french: "le rendez-vous", article: "der" },
  { id: 218, lesson: 5, german: "Kindergarten", french: "le jardin d'enfants", article: "der" },
  { id: 219, lesson: 5, german: "Geschäft", french: "le magasin", article: "das" },
  { id: 220, lesson: 5, german: "Bibliothek", french: "la bibliothèque", article: "die" },
  { id: 221, lesson: 5, german: "Feiertag", french: "le jour férié", article: "der" },
  { id: 222, lesson: 5, german: "Praxis", french: "le cabinet", article: "die" },
  { id: 223, lesson: 5, german: "Kita", french: "la garderie", article: "die" },
  { id: 224, lesson: 5, german: "Kindertagesstätte", french: "la garderie d'enfants", article: "die" },
  { id: 225, lesson: 5, german: "Beispiel", french: "l'exemple", article: "das" },
  { id: 226, lesson: 5, german: "Freund", french: "l'ami", article: "der" },
  { id: 227, lesson: 5, german: "Freundin", french: "l'amie", article: "die" },
  { id: 228, lesson: 5, german: "Wochentag", french: "le jour de la semaine", article: "der" },
  { id: 229, lesson: 5, german: "Alltagsaktivität", french: "l'activité quotidienne", article: "die" },
  { id: 230, lesson: 5, german: "Tipp", french: "le conseil", article: "der" },
  { id: 231, lesson: 5, german: "Wort", french: "le mot", article: "das" },
  { id: 232, lesson: 5, german: "Reihe", french: "la série", article: "die" },
  { id: 233, lesson: 6, german: "Käsemann", french: "l'homme au fromage", article: "der" },
  { id: 234, lesson: 6, german: "Ausflug", french: "l'excursion", article: "der" },
  { id: 235, lesson: 6, german: "Auto", french: "la voiture", article: "das" },
  { id: 236, lesson: 6, german: "Picknick", french: "le pique-nique", article: "das" },
  { id: 237, lesson: 6, german: "Gitarre", french: "la guitare", article: "die" },
  { id: 238, lesson: 6, german: "Wetter", french: "la météo", article: "das" },
  { id: 239, lesson: 6, german: "Sonne", french: "le soleil", article: "die" },
  { id: 240, lesson: 6, german: "Wolke", french: "le nuage", article: "die" },
  { id: 241, lesson: 6, german: "Durst", french: "la soif", article: "der" },
  { id: 242, lesson: 6, german: "Grad", french: "le degré", article: "das" },
  { id: 243, lesson: 6, german: "Wetterbericht", french: "le bulletin météo", article: "der" },
  { id: 244, lesson: 6, german: "Mitte", french: "le milieu", article: "die" },
  { id: 245, lesson: 6, german: "Temperatur", french: "la température", article: "die" },
  { id: 246, lesson: 6, german: "Küste", french: "la côte", article: "die" },
  { id: 247, lesson: 6, german: "Regen", french: "la pluie", article: "der" },
  { id: 248, lesson: 6, german: "Schnee", french: "la neige", article: "der" },
  { id: 249, lesson: 6, german: "Radio", french: "la radio", article: "das" },
  { id: 250, lesson: 6, german: "Internet", french: "l'internet", article: "das" },
  { id: 251, lesson: 6, german: "Sommer", french: "l'été", article: "der" },
  { id: 252, lesson: 6, german: "Frühling", french: "le printemps", article: "der" },
  { id: 253, lesson: 6, german: "Herbst", french: "l'automne", article: "der" },
  { id: 254, lesson: 6, german: "Winter", french: "l'hiver", article: "der" },
  { id: 255, lesson: 6, german: "Wind", french: "le vent", article: "der" },
  { id: 256, lesson: 6, german: "Speisekarte", french: "la carte", article: "die" },
  { id: 257, lesson: 6, german: "Hamburger", french: "le hamburger", article: "der" },
  { id: 258, lesson: 6, german: "Speise", french: "le plat", article: "die" },
  { id: 259, lesson: 6, german: "Portion", french: "la portion", article: "die" },
  { id: 260, lesson: 6, german: "Ketchup", french: "le ketchup", article: "das" },
  { id: 261, lesson: 6, german: "Salat", french: "la salade", article: "der" },
  { id: 262, lesson: 6, german: "Schinken", french: "le jambon", article: "der" },
  { id: 263, lesson: 6, german: "Würstchen", french: "la saucisse", article: "das" },
  { id: 264, lesson: 6, german: "Kaffee", french: "le café", article: "der" },
  { id: 265, lesson: 6, german: "Currywurst", french: "la saucisse au curry", article: "die" },
  { id: 266, lesson: 6, german: "Bier", french: "la bière", article: "das" },
  { id: 267, lesson: 6, german: "Pfannkuchen", french: "la crêpe", article: "der" },
  { id: 268, lesson: 6, german: "Getränk", french: "la boisson", article: "das" },
  { id: 269, lesson: 6, german: "Cola", french: "le cola", article: "die" },
  { id: 270, lesson: 6, german: "Hund", french: "le chien", article: "der" },
  { id: 271, lesson: 6, german: "Eis", french: "la glace", article: "das" },
  { id: 272, lesson: 6, german: "Fahrrad", french: "le vélo", article: "das" },
  { id: 273, lesson: 6, german: "Freizeit", french: "le temps libre", article: "die" },
  { id: 274, lesson: 6, german: "Hobby", french: "le hobby", article: "das" },
  { id: 275, lesson: 6, german: "Krimi", french: "le polar", article: "der" },
  { id: 276, lesson: 6, german: "Film", french: "le film", article: "der" },
  { id: 277, lesson: 6, german: "Grill", french: "le barbecue", article: "der" },
  { id: 278, lesson: 6, german: "Parfum", french: "le parfum", article: "das" },
  { id: 279, lesson: 6, german: "Beruf", french: "la profession", article: "der" },
  { id: 280, lesson: 6, german: "Foto", french: "la photo", article: "das" },
  { id: 281, lesson: 6, german: "Wolkenfoto", french: "la photo de nuage", article: "das" },
  { id: 282, lesson: 6, german: "Smartphone", french: "le smartphone", article: "das" },
  { id: 283, lesson: 6, german: "Würfel", french: "le dé", article: "der" },
  { id: 284, lesson: 6, german: "Spiel", french: "le jeu", article: "das" },
  { id: 285, lesson: 6, german: "Problem", french: "le problème", article: "das" },
  { id: 286, lesson: 6, german: "Mitspieler", french: "le partenaire de jeu", article: "der" },
  { id: 287, lesson: 7, german: "Team", french: "l'équipe", article: "das" },
  { id: 288, lesson: 7, german: "Frühstück", french: "le petit-déjeuner", article: "das" },
  { id: 289, lesson: 7, german: "Mathematik", french: "les mathématiques", article: "die" },
  { id: 290, lesson: 7, german: "Mathe", french: "la mathé", article: "die" },
  { id: 291, lesson: 7, german: "Test", french: "le test", article: "der" },
  { id: 292, lesson: 7, german: "Fall", french: "le cas", article: "der" },
  { id: 293, lesson: 7, german: "Schule", french: "l'école", article: "die" },
  { id: 294, lesson: 7, german: "Tee", french: "le thé", article: "der" },
  { id: 295, lesson: 7, german: "Lehrer", french: "l'enseignant", article: "der" },
  { id: 296, lesson: 7, german: "Bauchschmerz", french: "le mal de ventre", article: "der" },
  { id: 297, lesson: 7, german: "Sprachschule", french: "l'école de langues", article: "die" },
  { id: 298, lesson: 7, german: "Lied", french: "la chanson", article: "das" },
  { id: 299, lesson: 7, german: "Grammatik", french: "la grammaire", article: "die" },
  { id: 300, lesson: 7, german: "Übung", french: "l'exercice", article: "die" },
  { id: 301, lesson: 7, german: "Text", french: "le texte", article: "der" },
  { id: 302, lesson: 7, german: "Brief", french: "la lettre", article: "der" },
  { id: 303, lesson: 7, german: "Diktat", french: "la dictée", article: "das" },
  { id: 304, lesson: 7, german: "Buch", french: "le livre", article: "das" },
  { id: 305, lesson: 7, german: "Klavier", french: "le piano", article: "das" },
  { id: 306, lesson: 7, german: "Ski", french: "le ski", article: "der" },
  { id: 307, lesson: 7, german: "Tennis", french: "le tennis", article: "das" },
  { id: 308, lesson: 7, german: "Malen", french: "la peinture", article: "das" },
  { id: 309, lesson: 7, german: "Handstand", french: "le poirier", article: "der" },
  { id: 310, lesson: 7, german: "Kommunikation", french: "la communication", article: "die" },
  { id: 311, lesson: 7, german: "Mädchen", french: "la fille", article: "das" },
  { id: 312, lesson: 7, german: "Junge", french: "le garçon", article: "der" },
  { id: 313, lesson: 7, german: "Klasse", french: "la classe", article: "die" },
  { id: 314, lesson: 7, german: "Schwimmbad", french: "la piscine", article: "das" },
  { id: 315, lesson: 7, german: "Eintritt", french: "l'entrée", article: "der" },
  { id: 316, lesson: 7, german: "Grundschule", french: "l'école primaire", article: "die" },
  { id: 317, lesson: 7, german: "Unterricht", french: "l'enseignement", article: "der" },
  { id: 318, lesson: 7, german: "Arzt", french: "le médecin", article: "der" },
  { id: 319, lesson: 7, german: "Ärztin", french: "la femme médecin", article: "die" },
  { id: 320, lesson: 7, german: "Musik", french: "la musique", article: "die" }
];

const lessons = Array.from({ length: 14 }, (_, i) => i + 1);

const getPortions = (totalWords: number, chunkSize: number | 'all') => {
  if (chunkSize === 'all' || totalWords <= chunkSize) return [];
  const portions = [];
  for (let i = 0; i < totalWords; i += chunkSize) {
    portions.push({ start: i, end: Math.min(i + chunkSize, totalWords) });
  }
  return portions;
};

type GameState = 'onboarding' | 'menu' | 'playing' | 'results';

let audioCtx: AudioContext | null = null;

export default function App() {
  const [gameState, setGameState] = useState<GameState>('onboarding');
  const [selectedLesson, setSelectedLesson] = useState<number>(1);
  const [selectedPortion, setSelectedPortion] = useState<{ start: number; end: number } | 'all'>('all');
  
  const [timerDuration, setTimerDuration] = useState<number | 'infinite'>(60);
  const [wordsPerGame, setWordsPerGame] = useState<number | 'all'>('all');
  
  const [currentWords, setCurrentWords] = useState<VocabItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [mistakes, setMistakes] = useState<VocabItem[]>([]);

  const [isMuted, setIsMuted] = useState(false);
  const isMutedRef = useRef(isMuted);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  const playTick = () => {
    if (isMutedRef.current) return;
    try {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        audioCtx = new AudioContextClass();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      osc.type = 'sine';
      // Un son de "bip" sec et urgent (880Hz = note La)
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); 
      
      // Enveloppe de volume courte pour un effet "tic"
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
      
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
      console.log("Audio not supported or blocked");
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
        if (timerDuration !== 'infinite') {
          setTimeRemaining((prev) => {
            const newTime = prev - 1;
            
            // Déclencheur : 10 dernières secondes
            if (newTime <= 10 && newTime > 0) {
              playTick();
            }
            
            if (newTime <= 0) {
              setTimerActive(false);
              setGameState('results');
              return 0;
            }
            return newTime;
          });
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerDuration]);

  const startGame = (customWords?: VocabItem[]) => {
    let wordsToPlay = customWords;
    
    if (!wordsToPlay) {
      const wordsForLesson = vocabData.filter(w => w.lesson === selectedLesson);
      wordsToPlay = wordsForLesson;
      
      if (selectedPortion !== 'all') {
        wordsToPlay = wordsForLesson.slice(selectedPortion.start, selectedPortion.end);
      } else if (wordsPerGame !== 'all') {
        wordsToPlay = [...wordsForLesson].sort(() => Math.random() - 0.5).slice(0, wordsPerGame);
      }
    }
    
    // Shuffle words for variety
    const shuffled = [...wordsToPlay].sort(() => Math.random() - 0.5);
    
    setCurrentWords(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setTimeRemaining(timerDuration === 'infinite' ? 0 : timerDuration);
    setTimeElapsed(0);
    setTimerActive(false);
    setFeedback(null);
    setMistakes([]);
    setGameState('playing');
  };

  const handleAnswer = (article: Article) => {
    if (!timerActive && timeElapsed === 0) {
      setTimerActive(true);
    }

    const currentWord = currentWords[currentIndex];
    const isCorrect = currentWord.article === article;

    setFeedback(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) {
      setScore((prev) => prev + 1);
    } else {
      setMistakes((prev) => {
        if (!prev.find(w => w.id === currentWord.id)) {
          return [...prev, currentWord];
        }
        return prev;
      });
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex < currentWords.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setTimerActive(false);
        setGameState('results');
      }
    }, 300);
  };

  const lessonWords = vocabData.filter(w => w.lesson === selectedLesson);
  const portions = getPortions(lessonWords.length, wordsPerGame);

  const bgColor = feedback === 'correct' 
    ? 'bg-emerald-950/40' 
    : feedback === 'incorrect' 
      ? 'bg-red-950/40' 
      : 'bg-[#0B0D14]';

  return (
    <div className={`min-h-screen w-full flex flex-col items-center p-4 transition-colors duration-300 ${bgColor} font-sans text-white`}>
      <div className="w-full max-w-md flex-1 flex flex-col">
        {/* Global Header */}
        <div className="w-full flex justify-between items-center mb-4 min-h-[48px] pt-2">
          {gameState !== 'menu' ? (
            <button
              onClick={() => {
                setTimerActive(false);
                setGameState('menu');
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#151822] hover:bg-[#1A1D28] rounded-full border border-slate-800 shadow-sm text-slate-300 font-bold transition-all active:scale-95"
            >
              <Home className="w-5 h-5 text-[#FFC000]" />
              Menu
            </button>
          ) : (
            <div></div>
          )}

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="flex items-center justify-center w-11 h-11 bg-[#151822] hover:bg-[#1A1D28] rounded-full border border-slate-800 shadow-sm text-slate-300 transition-all active:scale-95"
            title={isMuted ? "Activer le son" : "Désactiver le son"}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-[#FFC000]" />}
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center w-full pb-8">
          {gameState === 'onboarding' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full bg-[#151822] rounded-[2rem] shadow-2xl border border-slate-800/50 p-8 space-y-8 relative overflow-hidden"
            >
              {/* Decorative glow */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute -top-20 -right-20 w-64 h-64 bg-[#FFC000] rounded-full mix-blend-screen filter blur-[100px]"
              />
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-3 relative z-10"
              >
                <h1 className="text-4xl font-extrabold text-white tracking-tight leading-tight">
                  DerDieDas <br/>
                  <span className="text-[#FFC000]">Trainer</span>
                </h1>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Votre Réflexe pour Der Die Das</p>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-slate-300 leading-relaxed font-medium relative z-10"
              >
                En allemand, le genre est un réflexe, pas une réflexion. Ce timer de 60 secondes vous entraîne à décider instantanément.
              </motion.p>

              <div className="space-y-5 relative z-10">
                {[
                  { icon: BookOpen, text: "Choisis ta leçon ou une portion de mots." },
                  { icon: Zap, text: "Réponds le plus vite possible aux genres." },
                  { icon: Target, text: "Suis ta progression en temps réel." }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.15 }}
                    className="flex items-start gap-4"
                  >
                    <div className="bg-[#FFC000]/10 p-3 rounded-2xl text-[#FFC000] shrink-0">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <p className="text-slate-300 font-medium pt-1">{item.text}</p>
                  </motion.div>
                ))}
              </div>

              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                onClick={() => setGameState('menu')}
                className="w-full py-4 bg-[#FFC000] hover:bg-[#FFD040] text-[#0B0D14] rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-colors shadow-[0_0_20px_rgba(255,192,0,0.3)] active:scale-[0.98] relative z-10"
              >
                C'est parti !
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}

          {gameState === 'menu' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full space-y-6"
            >
              <div className="text-center space-y-2 mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-[#FFC000]/10 text-[#FFC000] mb-4">
                  <Zap className="w-8 h-8" />
                </div>
                <h1 className="text-4xl font-extrabold text-white tracking-tight">DerDieDas</h1>
                <p className="text-sm text-[#FFC000] font-bold uppercase tracking-widest">Trainer</p>
              </div>

              <div className="bg-[#151822] rounded-[2rem] p-6 border border-slate-800/50 space-y-6 shadow-xl">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-400 uppercase tracking-wider pl-2">Choisir une leçon</label>
                  <select 
                    className="w-full p-4 bg-[#0B0D14] border border-slate-800 rounded-2xl focus:ring-2 focus:ring-[#FFC000] focus:border-[#FFC000] outline-none transition-all appearance-none font-medium text-white"
                    value={selectedLesson}
                    onChange={(e) => {
                      setSelectedLesson(Number(e.target.value));
                      setSelectedPortion('all');
                    }}
                  >
                    {lessons.map(l => (
                      <option key={l} value={l}>Leçon {l}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-400 uppercase tracking-wider pl-2">Chronomètre</label>
                  <select
                    className="w-full p-4 bg-[#0B0D14] border border-slate-800 rounded-2xl focus:ring-2 focus:ring-[#FFC000] focus:border-[#FFC000] outline-none transition-all appearance-none font-medium text-white"
                    value={timerDuration}
                    onChange={(e) => setTimerDuration(e.target.value === 'infinite' ? 'infinite' : Number(e.target.value))}
                  >
                    <option value="30">30 secondes</option>
                    <option value="60">60 secondes</option>
                    <option value="90">90 secondes</option>
                    <option value="infinite">Infini (sans chrono)</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-400 uppercase tracking-wider pl-2">Mots par partie</label>
                  <select
                    className="w-full p-4 bg-[#0B0D14] border border-slate-800 rounded-2xl focus:ring-2 focus:ring-[#FFC000] focus:border-[#FFC000] outline-none transition-all appearance-none font-medium text-white"
                    value={wordsPerGame}
                    onChange={(e) => {
                      const val = e.target.value;
                      setWordsPerGame(val === 'all' ? 'all' : Number(val));
                      setSelectedPortion('all');
                    }}
                  >
                    <option value="10">10 mots</option>
                    <option value="15">15 mots</option>
                    <option value="20">20 mots</option>
                    <option value="30">30 mots</option>
                    <option value="all">Tous les mots</option>
                  </select>
                </div>

                {portions.length > 0 && (
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-wider pl-2">Portion ({lessonWords.length} mots)</label>
                    <select
                      className="w-full p-4 bg-[#0B0D14] border border-slate-800 rounded-2xl focus:ring-2 focus:ring-[#FFC000] focus:border-[#FFC000] outline-none transition-all appearance-none font-medium text-white"
                      value={selectedPortion === 'all' ? 'all' : `${selectedPortion.start}-${selectedPortion.end}`}
                      onChange={(e) => {
                        if (e.target.value === 'all') setSelectedPortion('all');
                        else {
                          const [start, end] = e.target.value.split('-').map(Number);
                          setSelectedPortion({ start, end });
                        }
                      }}
                    >
                      <option value="all">{wordsPerGame === 'all' ? 'Toute la leçon' : `Aléatoire (${wordsPerGame} mots)`}</option>
                      {portions.map((p, i) => (
                        <option key={i} value={`${p.start}-${p.end}`}>Mots {p.start + 1} à {p.end}</option>
                      ))}
                    </select>
                  </div>
                )}

                <button 
                  onClick={() => startGame()}
                  disabled={lessonWords.length === 0}
                  className="w-full py-4 mt-4 bg-[#FFC000] hover:bg-[#FFD040] text-[#0B0D14] rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,192,0,0.2)]"
                >
                  <Play className="w-6 h-6 fill-current" />
                  Démarrer
                </button>
                {lessonWords.length === 0 && (
                  <p className="text-sm text-center text-slate-500 font-medium">Aucun mot dans cette leçon.</p>
                )}
              </div>
            </motion.div>
          )}

          {gameState === 'playing' && currentWords.length > 0 && (
            <div className="w-full flex flex-col flex-1 justify-between min-h-[60vh]">
              {/* Header */}
              <div className="space-y-6">
                <div className="flex items-start justify-between px-2">
                  <div className="flex flex-col">
                    <div className="text-xs text-[#FFC000]/70 font-black mb-1 uppercase tracking-widest flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Temps
                    </div>
                    <div className={`tabular-nums font-black text-[4.5rem] leading-none tracking-tighter ${timerDuration !== 'infinite' && timeRemaining <= 10 ? 'text-red-500 animate-pulse' : 'text-[#FFC000]'}`}>
                      {timerDuration === 'infinite' ? timeElapsed : timeRemaining}<span className="text-3xl opacity-50 ml-1">s</span>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-slate-300 bg-[#151822] px-5 py-2.5 rounded-full border border-slate-800 mt-4">
                    {currentIndex + 1} / {currentWords.length}
                  </div>
                </div>
            
                {/* Progress Bar */}
                <div className="h-2 w-full bg-[#151822] rounded-full overflow-hidden border border-slate-800/50">
                  <motion.div 
                    className="h-full bg-[#FFC000]"
                    initial={{ width: 0 }}
                    animate={{ width: `${(score / currentWords.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Center Area */}
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 my-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentWords[currentIndex].id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="bg-[#FFC000] px-8 py-12 rounded-[2.5rem] shadow-[0_20px_40px_rgba(255,192,0,0.2)] w-full max-w-[320px] relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
                    <h2 
                      lang="de"
                      className={`font-black text-[#0B0D14] tracking-tight mb-4 relative z-10 w-full break-words hyphens-auto ${
                        currentWords[currentIndex].german.length > 16 
                          ? 'text-xl sm:text-2xl' 
                          : currentWords[currentIndex].german.length > 12 
                            ? 'text-2xl sm:text-3xl' 
                            : currentWords[currentIndex].german.length > 9
                              ? 'text-3xl sm:text-4xl'
                              : 'text-4xl sm:text-5xl'
                      }`}
                    >
                      {currentWords[currentIndex].german}
                    </h2>
                    <p className="text-lg sm:text-xl text-[#0B0D14]/70 font-bold relative z-10">
                      {currentWords[currentIndex].french}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer Buttons */}
              <div className="grid grid-cols-3 gap-3 pb-4">
                <button 
                  onClick={() => handleAnswer('der')}
                  disabled={feedback !== null}
                  className="py-6 rounded-[2rem] bg-[#151822] border border-slate-700 hover:border-blue-500 hover:bg-blue-500/10 text-blue-400 font-black text-xl transition-all active:scale-95 disabled:opacity-90"
                >
                  DER
                </button>
                <button 
                  onClick={() => handleAnswer('die')}
                  disabled={feedback !== null}
                  className="py-6 rounded-[2rem] bg-[#151822] border border-slate-700 hover:border-pink-500 hover:bg-pink-500/10 text-pink-400 font-black text-xl transition-all active:scale-95 disabled:opacity-90"
                >
                  DIE
                </button>
                <button 
                  onClick={() => handleAnswer('das')}
                  disabled={feedback !== null}
                  className="py-6 rounded-[2rem] bg-[#151822] border border-slate-700 hover:border-emerald-500 hover:bg-emerald-500/10 text-emerald-400 font-black text-xl transition-all active:scale-95 disabled:opacity-90"
                >
                  DAS
                </button>
              </div>
            </div>
          )}

          {gameState === 'results' && (
            <div className="w-full space-y-6">
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-4xl font-black text-white">Terminé</h2>
                <p className="text-[#FFC000] font-bold">
                  {score === currentWords.length ? "Parfait ! 🎉" : "Voici vos résultats"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#FFC000] p-6 rounded-[2rem] shadow-[0_10px_30px_rgba(255,192,0,0.2)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                  <div className="text-xs text-[#0B0D14]/70 font-black mb-1 uppercase tracking-widest relative z-10">Score</div>
                  <div className="text-5xl font-black text-[#0B0D14] relative z-10">{score} <span className="text-2xl text-[#0B0D14]/50">/ {currentWords.length}</span></div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] shadow-[0_10px_30px_rgba(255,255,255,0.1)] relative overflow-hidden">
                  <div className="text-xs text-slate-400 font-black mb-1 uppercase tracking-widest relative z-10">Temps</div>
                  <div className="text-5xl font-black text-[#0B0D14] relative z-10">{timeElapsed}s</div>
                </div>
              </div>

              {mistakes.length > 0 && (
                <div className="text-left space-y-4 bg-[#151822] p-6 rounded-[2rem] border border-slate-800 mt-8">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-red-400" />
                    À réviser
                  </h3>
                  <ul className="space-y-3 max-h-[35vh] overflow-y-auto pr-2 custom-scrollbar">
                    {mistakes.map(m => (
                      <li key={m.id} className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#0B0D14] p-4 rounded-2xl border border-slate-800/50 gap-3">
                        <span className="text-slate-300 font-bold text-lg break-words hyphens-auto" lang="de">{m.german}</span>
                        <ArrowRight className="w-4 h-4 text-slate-600 hidden sm:block shrink-0" />
                        <span className="text-[#0B0D14] font-black bg-[#FFC000] px-4 py-2 rounded-xl text-center text-sm break-words hyphens-auto" lang="de">
                          {m.article} {m.german}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-3 pt-6">
                {mistakes.length > 0 && (
                  <button 
                    onClick={() => startGame(mistakes)}
                    className="w-full py-4 bg-[#FFC000] hover:bg-[#FFD040] text-[#0B0D14] rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-colors shadow-[0_0_20px_rgba(255,192,0,0.2)] active:scale-[0.98]"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Réessayer les erreurs
                  </button>
                )}
                <button 
                  onClick={() => startGame()}
                  className={`w-full py-4 ${mistakes.length > 0 ? 'bg-[#151822] text-white border border-slate-700' : 'bg-[#FFC000] text-[#0B0D14] shadow-[0_0_20px_rgba(255,192,0,0.2)]'} rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-colors active:scale-[0.98]`}
                >
                  <RotateCcw className="w-5 h-5" />
                  Rejouer la portion
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
