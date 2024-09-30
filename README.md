# app-TP

# Spartan

### Ce projet construit en Springboot/Angular avec une base de données Postgres est un petit logiciel de gestion de chiffre d'affaire pour très petite entreprise.

## Création du repo et choix du workflow

- main
- develop
- test
- us

## Authentication

La page de login permet à l'utilisateur d'obtenir un jeton JWT qui va lui permettre d'accéder à l'application si il a un compte utilisateur valide.

Si son token est périmé ou invalide alors l'utilisateur est automatiquement redirigé vers la page de login.

     L'utilisateur doit simplement renseigner ses identifiants et si ils sont correctes alors il à accès aux autres pages de l'application

Il peut également se déconnecté lui-même en cliquant sur le logo de l'application ou sur le bouton déconnection de la navbar.

Le token est stocké avec grâce aux cookies HTTP only.
