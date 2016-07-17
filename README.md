# Garbage Reminder

L'application Garbage Reminder sert de rappel à la sortie des bacs d'ordures :

- Affiche et envoie une notification push la veille de collecte des bacs en fonction du calendrier prédéfini
- En cas de jour ferié, la collecte est reportée au lendemain

## Détails de l'application
- Node.js / Express.js
- Pushover.net
- Twig
- Moment.js
- https://github.com/DepthFrance/moment-ferie-fr : gestion des jours feriés

## Installation
- Cloner le dépot
- npm install
- Créer un compte sur http://pushover.net
- Créer une application sur Pushover.net
- Définir les variables d'environnement : 
  process.env['PUSHOVER_USER'] = 'YOUR_USER_KEY';
  process.env['PUSHOVER_TOKEN'] =  'YOUR_APP_TOKEN_KEY';

## @TODO
- Factoriser le code (et améliorer, ceci est ma première app nodejs)
- Rendre paramétrable les jours de sortie car différent selon la rue / la ville
- Gérer le cas où le Samedi est ferié : reporter l'alerte au Dimanche soir pour sortir le Lundi
- Afficher la prochaine date de collecte
