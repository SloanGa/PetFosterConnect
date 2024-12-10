# Cahier des charges Pet Foster Connect

## Présentation du projet

Pet Foster Connect est une application permettant de mettre en relation des familles d’accueil pour les animaux et des
associations de protection animale.

## Les besoins :

-   Difficulté de la part des associations pour trouver des familles d'accueil
-   Désengorger les associations
-   Manque de visibilité des associations
-   Difficulté pour les bénévoles à trouver toutes les associations demandeuses

## Les objectifs :

-   Permettre la mise en relation entre famille d'accueil et association
-   Centraliser les informations sur les besoins des associations

## Les fonctionnalités :

### MVP

-   Page d'accueil :

    -   Présentation du site
    -   Afficher quelques animaux
    -   Header / Nav : connexion et inscription, lien vers l'accueil, lien vers les associations, lien vers les animaux à
        accueillir, lien vers profil ou tableau de bord

-   Page publique associations:

    -   possibilité de les afficher toutes ou par critères (localisation, type d'animaux)

-   Page publique UNE association :

    -   Infos sur l'association (description, adresse, contact)
    -   Bouton pour contacter l'association (mailto)
    -   Lien vers la liste des animaux

-   Pages publique animaux :

    -   possibilité de les afficher tous ou par critères (localisation (par département), type (chien ou chat), espèce,
        mâle/femelle, âge)

-   Page publique UN animal :

    -   Infos sur l'animal
    -   L'association où il se trouve
    -   Si famille connectée : bouton pour demande d'accueil --> ajoute la demande sur le tableau de bord association et sur le profil de la famille (+ envoi d'un email à l'association)

-   Page privée profil d'une famille d'accueil (si famille connectée):

    -   Pouvoir modifier ses informations
    -   Pouvoir supprimer son profil
    -   Voir ses demandes, annuler une demande
    -   Une association connectée peut accéder à la page de profil des familles pour voir leurs informations

-   Page privée tableau de bord association :

    -   une page d'administration des animaux (ajouter, modifier, supprimer) qui affiche tous les animaux de l'association
    -   page profil de l'association avec possibilité d'édition et suppression
    -   une page de gestion des demandes

-   Page inscription

    -   Pouvoir s'inscrire en tant que famille ou association

-   Page connexion

-   Pouvoir se connecter en tant que famille ou association
-   Fonctionnalité mot de passe oublié avec envoi d'un email contenant un lien de réinitialisation du mot de passe

### Evolutions

-   Possibilité de mettre des animaux en avant (urgence, "sos", etc.)
-   Possibilité d'utiliser la géolocalisation
-   Conformation de l'email pour l'inscription
-   Messagerie : discussion entre famille et association
-   Alerte / notification pour les familles (ajout d'un nouvel animal correspondant à leurs critères)
-   Tableau de bord admin (gestion des utilisateurs, modérations ...)
-   fonctionnalité contact : accessible à tous pour contacter les modérateurs du site
-   Gestion des disponibilités (famille d'accueil peut indiquer ses disponibilités)

### Les technologies utilisées :

-   Environnement de développement et outils :

    -   Docker : uniformiser l'environnement de développement, et de déploiement
    -   Git : versionner le projet et faciliter le travail en équipe
    -   Insomnia : Outils de développement pour tester les routes (format JSON)

-   Front-end :

    -   React + Vite : afin d'optimiser le temps d'affichage / composants à réutiliser
    -   SPA / React Router : avoir une fluidité dans l'utilisation de l'application
    -   Typescript : afin d'avoir un code plus robuste
    -   SASS / CSS : faciliter la syntaxe CSS
    -   Reset CSS : uniformiser le style sur les différents navigateurs
    -   Librairie de composants : Gain de temps, optimisation du code (Bootstrap React)
    -   Responsive, mobile-first : facilité de développement, rendre le site accessible aux mobiles (largement utilisés)

-   Back-end :

    -   API Rest : adaptée pour la gestion des associations (ajouter des animaux, éditer, supprimer = opérations CRUD) et
        pour les bénévoles. Toutes les informations seront contenues en BDD.
    -   PostgreSQL : base de données relationnelle afin de faciliter les associations
    -   Sequelize : ORM pour faciliter les requêtes SQL, éviter les injections SQL (Requêtes préparées), modèle Active
        Record
    -   Express.js : framework avec un cadre de travail qui facilite le développement
    -   Dotenv : gérer les variables d'environnement (PORT, URL, connexion base de donnée, Secret, ...)
    -   Joi : Simplifier la validation des données utilisateur
    -   Sanitize-html : Nettoyer les données utilisateur (failles XSS)
    -   Cors : Autoriser les requêtes vers le back de certaines URL seulement (API non publique)
    -   Authentification avec JWT : permet d'échanger des informations de manières sécurisé.

### Le public visé :

-   Public adulte, toutes les tranches d'âge. Design simple, clair et neutre (pas de visée commerciale)
-   Les associations (gestion rapide au niveau des inscriptions et édition des informations)

### L'arborescence de l'application :

#### Routes Front-end

-   Page d'accueil
-   Page des associations (recherche + filtres)
-   Page d'une association
-   Page des animaux (recherche + filtres)
-   Page d'un animal
-   Page connexion
-   Page inscription
-   Page de profil pour les familles connectées (et accessible aux associations)
-   Tableau de bord pour les associations connectées
    -   Liste des animaux : ajouter / modifier / supprimer un animal
    -   Liste des demandes : modifier le status d'une demande, voir le mail de la famille et lien vers la page de la famille
    -   Page profil association : éditer, supprimer
-   Mentions légales
-   Politique de confidentialité
-   Plan du site
-   Contact (MVP : lien mailto)
-   Page erreur 404

| Pages                                                 | Chemins                                   |
| ----------------------------------------------------- | ----------------------------------------- |
| Page d'accueil                                        | /                                         |
| Page des associations                                 | /associations                             |
| Page d'une association                                | /associations/:slug                       |
| Page d'une famille                                    | /famille/:slug                            |
| Page des animaux                                      | /animaux                                  |
| Page d'un animal                                      | /animaux/:slug                            |
| Page d'inscription famille / association              | /inscription                              |
| Page de connexion famille / association               | /connexion                                |
| Page des mentions légales                             | /mentions-legales                         |
| Page politique de confidentialité                     | /politique-confidentialite                |
| Page du plan du site                                  | /plan-du-site                             |
| Page tableau de bord association - Liste des animaux  | /tableau-de-bord                          |
| Page tableau de bord association - Liste des demandes | /tableau-de-bord/demandes                 |
| Page tableau de bord association - Profil             | /tableau-de-bord/profil-association/:slug |
| Page d'erreur 404                                     | /erreur                                   |

#### Routes Back-end

## Associations

| Verbe | Chemin                               | Request Body | Response Body                          | Code (succès) |
| ----- | ------------------------------------ | ------------ | -------------------------------------- | ------------- |
| GET   | /associations                        |              | la liste de toutes les associations    | 200           |
| GET   | /associations/:id                    |              | les données d'une association          | 200           |
| GET   | /associations/search?filtre={filtre} |              | liste des associations selon un filtre | 200           |

## Animaux

| Verbe | Chemin                          | Request Body | Response Body                           | Code (succès) |
| ----- | ------------------------------- | ------------ | --------------------------------------- | ------------- |
| GET   | /animals                        |              | la liste de tous les animaux            | 200           |
| GET   | /animals/:id                    |              | les données d'un animal                 | 200           |
| GET   | /animals/search?filtre={filtre} |              | liste des animaux selon le(s) filtre(s) | 200           |

## Dashboard

| Verbe  | Chemin                             | Request Body                      | Response Body                      | Code (succès) |
| ------ | ---------------------------------- | --------------------------------- | ---------------------------------- | ------------- |
| GET    | /dashboard/association/animals     |                                   | liste des animaux de l'association | 200           |
| POST   | /dashboard/association/animals/    | data et image de l'animal         | animal ajouté                      | 201           |
| PATCH  | /dashboard/association/animals/:id | data (+/- image) de l'animal      | animal modifié                     | 200           |
| DELETE | /dashboard/association/animals/:id |                                   |                                    | 204           |
| GET    | /dashboard/association/profile     |                                   | les données de l'association       | 200           |
| PATCH  | /dashboard/association/profile     | data (+/- image) de l'association | les données de l'association       | 200           |
| DELETE | /dashboard/association/profile     |                                   |                                    | 204           |

NB : association_id dans le JWT (header de la requête) pour toutes les routes /dashboard

## Famille

| Verbe  | Chemin      | Request Body                  | Response Body                      | Code (succès) |
| ------ | ----------- | ----------------------------- | ---------------------------------- | ------------- |
| GET    | /family/:id |                               | les données de la famille/demandes | 200           |
| PATCH  | /family     | data de la famille +/\_ image | les données de la famille          | 200           |
| DELETE | /family     |                               |                                    | 204           |

NB : family_id dans le JWT (header de la requête) pour toutes les méthode PATCH ET DELETE sur la route /family

## Les demandes

| Verbe  | Chemin                     | Request Body                 | Response Body                                  | Code (succès) |
| ------ | -------------------------- | ---------------------------- | ---------------------------------------------- | ------------- |
| GET    | /requests/family           |                              | la liste des demande de la famille             | 200           |
| POST   | /requests/family           | association_id, animal_id    | La demande créée                               | 201           |
| DELETE | /requests/family/:id       |                              |                                                | 204           |
| GET    | /requests/associations     |                              | la liste des demandes concernant l'association | 200           |
| PATCH  | /requests/associations/:id | nouveau statut de la demande | La demande modifiée                            | 200           |

NB : family_id ou association_id dans le JWT (header de la requête) pour toutes les routes /requests

## Authentification

| Verbe | Chemin                           | Request Body                                                      | Response Body                         | Code (succès) |
| ----- | -------------------------------- | ----------------------------------------------------------------- | ------------------------------------- | ------------- |
| POST  | /auth/register/:type             | data de la famille ou association (+ image obligatoire pour asso) | L'utilisateur créé                    | 201           |
| POST  | /auth/login                      | email + mot de passe                                              | L'utilisateur                         | 200           |
| GET   | /auth/family/:familyId           |                                                                   | L'utilisateur                         | 200           |
| GET   | /auth/association/:associationId |                                                                   | L'utilisateur                         | 200           |
| POST  | /auth/resetpassword              | email                                                             | Message "Email envoyé"                | 200           |
| GET   | /auth/resetpassword/confirm      |                                                                   | Le token décodé                       | 200           |
| PATCH | /auth/updatepassword/:email      | mot de passe et confirmation du mot de passe                      | Message "Modification prise en compte | 200           |

NB : type = "family" ou "association"

## Département

| Verbe | Chemin       | Request Body | Response Body                            | Code (succès) |
| ----- | ------------ | ------------ | ---------------------------------------- | ------------- |
| GET   | /departments |              | Liste de tous les départements de France | 200           |

### Les users stories :

| En tant que | Je veux                                      | Dans le but                                                                    | Sprint |
| ----------- | -------------------------------------------- | ------------------------------------------------------------------------------ | ------ |
| Visiteur    | Consulter la page d'accueil                  |                                                                                | 1      |
| Visiteur    | Consulter la liste des animaux               | De voir les animaux disponibles                                                | 1      |
| Visiteur    | Consulter la liste des associations          | De voir les associations                                                       | 1      |
| Visiteur    | Effectuer une recherche d'animaux            | Voir les animaux correspondants à ses critères                                 | 1      |
| Visiteur    | Effectuer une recherche d'associations       | Voir les associations correspondants à ses critères                            | 1      |
| Visiteur    | Consulter la page d'un animal                | Voir les informations d'un animal                                              | 2      |
| Visiteur    | Consulter la page d'une association          | Voir les informations d'une association                                        | 2      |
| Visiteur    | Voir les mentions légales                    | Lire les mentions légales                                                      | 1      |
| Visiteur    | Voir le plan du site                         | De connaître l'arborescence du site                                            | 1      |
| Visiteur    | Voir la politique de confidentialité         | Lire la politique de confidentialité                                           | 1      |
| Visiteur    | M'inscrire en tant que famille / association | Accéder aux fonctionnalités des différents rôles                               | 2      |
| Visiteur    | Me connecter                                 | Accéder aux fonctionnalités des familles ou associations                       | 2      |
| Association | Accéder au tableau de bord de l'association  | Voir les animaux de mon associations et accéder aux fonctionnalités de gestion | 2      |
| Association | Ajouter un animal                            | Ajouter un animal à la liste des animaux de l'association                      | 2      |
| Association | Modifier un animal                           | Modifier les informations d'un animal                                          | 2      |
| Association | Supprimer un animal                          | Supprimer un animal de la liste des animaux de l'association                   | 2      |
| Association | Voir les demandes                            | Consulter les demandes faites à l'association                                  | 3      |
| Association | Modifier le statut d'une demande             | Valider ou refuser une demande                                                 | 3      |
| Association | Voir la page d'une famille                   | Voir les informations pour valider ou non la demande                           | 3      |
| Association | Visualiser les informations de l'association | Consulter ses informations                                                     | 3      |
| Association | Modifier les informations de l'association   | D'actualiser les informations de l'association                                 | 3      |
| Association | Supprimer mon association                    | Effacer mon association et ses animaux de l'application                        | 3      |
| Association | Me déconnecter                               | De sécuriser mon compte                                                        | 2      |
| Famille     | Consulter le profil                          | Verifier les informations et mes demandes de prise en charge                   | 3      |
| Famille     | Faire une demande                            | Accueillir un animal                                                           | 2      |
| Famille     | Supprimer une demande                        | Annuler la proposition d'accueil de l'animal                                   | 3      |
| Famille     | Modifier les informations de la famille      | D'actualiser les informations de la famille                                    | 3      |
| Famille     | Supprimer le profil                          | Effacer le profil                                                              | 3      |
| Famille     | Me déconnecter                               | De sécuriser mon compte                                                        | 2      |

### L'équipe :

-   Camille : Lead dev Front
-   Clara : Scrum Master
-   Philippe : Lead dev Back
-   Sloan : Product Owner + Git Master
