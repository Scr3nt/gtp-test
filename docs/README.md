# README

Durée du test : 1jour et demi environ

Pour ce test j'ai utilisé mon boilerplate [Blitz](https://www.blitz-rn.com) afin d'obtenir directement ma configuration ESlint, librairies etc. et mes composants de crée. (Je vous invite à aller sur le site pour voir le plein potentiel de ce boilerplate)

Pour la partie backend/database j'ai utilisé Supabase. Vous pouvez retrouver la totalité de la construction dans le dossier `supabase/migrations`.

Pour l'architecture de mon projet toutes les routes sont dans le dossier `src/app`, l'api dans `src/api`, les components dans `src/components` et les fichiers spécifiques à chaque écran sont dans le dossier `src/features`. (vous pourrez voir les `hooks`, les utilitaires dans `utils` etc.)

Pour les fonctionnalités j'ai pu mettre en place un système de création de compte qui est de type admin et depuis celui-ci on peut créer des tâches, les modifier et les supprimer mais on peut également depuis ce compte créer, modifier, supprimer les comptes employés qui seront donc reliés à cet admin.

Si on se connecte depuis un compte employé on pourra seulement voir les tâches et les employés attribué à ces dernières.

Concernant les tâches on peut y attribuer un nom, une heure de début et de fin qui ne peuvent pas être supérieurs à 8h d'écart et enfin un employé qui pourra n'avoir qu'une tâche par jour. Nous pouvons aussi les trier par libellé, heure de début ou de fin depuis l'espace accueil/calendrier.

Pour la création d'employé on peut y renseigner un nom et c'est tout.

J'ai pu gérer les cas de chargement avec des skeletons et des erreurs pour apporter une bonne expérience utilisateur en indiquant à l'utilisateur s'il faisait quelque chose de façon incorrecte à l'aide de toast.

J'aurais pu rajouter l'utilisation de i18n dans l'éventualité d'ajout d'autre langue et rajouter des tests (E2E par exemple) pour plus de sécurité.

Je vous laisse voir en vidéo ci-dessous le flow d'utilisation coté admin et coté employé ainsi que la gestion des erreurs.


https://github.com/Scr3nt/gtp-test/assets/56580186/3755bd30-1d1b-43e7-8762-6a3974d50967

