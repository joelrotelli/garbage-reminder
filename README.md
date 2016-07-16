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
- Renommer le fichier example.pushover.json en pushover.json et renseigner les valeurs "user" et "token" par les données fournies par Pushover.net


## @TODO
- Affichage pour mobile
- Factoriser le code (et améliorer, ceci est ma première app nodejs)
- Rendre paramétrable les jours de sortie car différent selon la rue / la ville
- Gérer le cas où le Samedi est ferié : reporter l'alerte au Dimanche soir pour sortir le Lundi
- Afficher la prochaine date de collecte
