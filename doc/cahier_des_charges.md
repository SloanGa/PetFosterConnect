# Cahier des charges Pet Foster Connect

## Présentation du projet

Pet Foster Connect est une application permettant de mettre en relation des familles d’accueil pour les animaux et des associations de protection animale.

## Les besoins : 

- Difficulté de la part des associations pour trouver des familles d'accueil
- Désengorger les associations
- Manque de visibilité des associations
- Difficulté pour les bénévoles à trouver toutes les associations demandeuses

## Les objectifs : 

- Permettre la mise en relation entre famille d'accueil et association
- Centraliser les informations sur les besoins des associations


## Les fonctionnalités : 

### MVP  

- Page d'accueil :
  - Présentation du site
  - Afficher quelques animaux
  - Header / Nav : connexion et inscription, lien vers les associations, lien vers les animaux à accueillir 

- Page publique associations: 
  - possibilité de les afficher toutes ou par critères (localisation, par département)

- Page publique UNE association :
  - Liste des animaux
  - Infos sur l'association (description, adresse)
  - Bouton pour contacter l'association (mailto)

- Pages publique animaux :
  - possibilité de les afficher tous ou par critères (localisation, par département, type, espèce, mâle/femelle, âge, sociabilité ...)

- Page publique UN animal :
  - Infos sur l'animal
  - L'association où il se trouve
  - demande d'accueil : ajouter la demande sur tableau de bord association

- Page privée profil d'une famille d'accueil  :
  - Pouvoir modifier ses informations 
  - Pouvoir supprimer son profil 
  - Voir ses demandes, annuler une demande 
  - Voir la page de profil pour les associations 

- Page privée tableau de bord association :
  - une page d'administration des animaux 
  - une page pour afficher tous les animaux des l'association
  - page profil de l'association avec possibilité d'édition et suppression
  - une page de gestion des demandes

### Evolutions

- possibilité de mettre des animaux en avant (urgence, "sos", etc.)
- possibilité d'utiliser la géolocalisation 
- Envoie de mail à l'association en cas de demande
- Messagerie : discussion entre utilisateur et association
- Alerte / notification pour les familles (ajout d'un nouvel animal correspondant à leurs critères)
- Tableau de bord admin (gestion des utilisateurs, modérations ...)
- fonctionnalité contact : accessible à tous pour contacter les modérateurs du site
- Gestion des disponibilités (famille d'accueil peut indiquer ses disponibilités)

### Les technologies utilisées : 

- Environnement de developpment et outils :
  - Docker : uniformiser l'environnement de développement, et de déploiement
  - Git : versionner le projet et faciliter le travail en équipe
  - Swagger : documenter l'API

- Front-end : 
  - React + Vite : afin d'optimiser le temps d'affichage / composants à réutiliser
  - SPA / React Router : avoir une fluidité dans l'utilisation de l'application
  - Typescript : afin d'avoir un code plus robuste  
  - SASS / CSS : faciliter la syntaxe CSS 
  - Reset CSS : uniformiser le style sur les différents navigateurs
  - Librairie de composants : Gain de temps, optimisation du code 
  - Responsive, mobile-first : facilité de développement, rendre le site accessible aux mobiles (largement utilisés)
  - Sanitize-html : Simplifier la validation des données utilisateur (failles XSS)

- Back-end : 
  - API Rest avec Insomnia : adaptée pour la gestion des associations (ajouter des animaux, éditer, supprimer = opérations CRUD) et pour les bénévoles. Toutes les informations seront contenues en BDD. Outil de développement pour tester les routes (format JSON). 

  - PostgreSQL : base de données relationnelle afin de faciliter les associations
  - Sequelize : ORM pour faciliter les requêtes SQL, eviter les injections SQL(Requètes preparées), modele Active Record
  - Express.js : framework avec un cadre de travail qui facilite le développement
  - Dotenv : gérer les variables d'environnement (PORT, URL, connexion base de donnée, Secret, ...)
  - Joi : Simplifier la validation des données utilisateur
  - Cors : Autoriser les requêtess vers le back de certaines URL seulement (API non publique)
  - Authentification avec JWT et cookies : permet d'échanger des informations de manières sécurisé. Ideal pour de l'authentification via cookies (cookie HTTPOnly)

### Le public visé : 

- Public adulte, toutes les tranches d'âge. Design simple, clair et neutre (pas de visée commerciale)
- Les associations (gestion rapide au niveau des inscriptions et édition des informations)

### L'arborescense de l'application : 

#### Routes Front-end

- Page d'accueil
- Page des associations (recherche + filtres)
- Page d'une association
- Page des animaux (recherche + filtres)
- Page d'un animal
- Page connexion
- Page inscription 
- Page de profil pour les familles connectées
- Tableau de bord pour les associations connectées
  - Liste des animaux : modifier un animal / supprimer un animal
  - Ajouter un animal
  - Liste des demandes : accepter / refuser / voir la page de la famille
  - Page profil association : éditer, supprimer
- Mentions légales
- Politique de confidentialité
- Gestion des cookies ?
- Plan du site
- Page erreur 404

#### Routes Back-end

## Homepage

| Verbe | Chemin            | Request Body | Response Body            | Code (succès) |
| ----- | ----------------- | ------------ | ----------------------   | --------------- |
| GET   | /                 |              | une liste de X animaux   | 200             |

#### Associations

| Verbe | Chemin                                 | Request Body | Response Body                         | Code (succès) |
| ----- | -------------------------------------- | -------------| ------------------------------------- |-------------- |
| GET   | /associations                          |              | la liste de toutes les assocations    | 200           |
| GET   | /associations/:id                      |              | les données d'une association         | 200           |
| GET   | associations/recherche?filtre={filtre} |              |liste des associations selon un filtre | 200           |

#### Animaux

| Verbe | Chemin                             | Request Body                                | Response Body                    | Code (succès) |
| ----- | ---------------------------------- | ------------------------------------------- | -------------------------------- | ------------- |
| GET   | /animaux                           |                                             | la liste de tous les animaux     | 200           |
| GET   | /animaux/:id                       |                                             | les données d'un animal          | 200           |
| GET   | /animaux/recherche?filtre={filtre} |                                             | liste des animaux selon un filtre| 200           |
| POST  | /animaux/demande                   | id de l'asso, de la famille et de l'animal  | demande                          | 201           |

#### Dashboard 

| Verbe | Chemin                             | Request Body | Response Body                      | Code (succès)
|-------|------------------------------------|--------------|------------------------------------|-------------|
| GET   | /admin/association                 |              | liste des animaux de l'association | 200         |
| POST  | /admin/association/ajouter         |              | animal ajouté                      | 201         |
| PATCH | /admin/association/modifier        |              | animal modifié                     | 200         |
| DELETE| /admin/association/supprimer       |              |                                    | 204         |
| GET   | /admin/association/profil          |              | les données de l'association       | 200         |
| PATCH | /admin/association/profil          |              | les données de l'association       | 200         |
| DELETE| admin/association/profil/supprimer |              |                                    | 204         |
| GET   | /admin/association/demandes        |              | les demandes                       | 200         |
| PATCH | /admin/association/demande/:id     |              | la demande                         | 200         |

#### Famille

| Verbe | Chemin                     | Request Body | Response Body                      | Code (succès)
|-------|----------------------------|--------------|------------------------------------|-------------|
| GET   | /famille-accueil/:id       |              | les infos sur la famille/demandes  | 200         |
| PATCH | /famille-accueil/:id       |              | les infos sur la famille           | 200         |
| DELETE| /famille-accueil/:id       |              |                                    | 204         |

#### Inscription

| Verbe | Chemin                   | Request Body | Response Body           | Code (succès) |
| ----- | ------------------------ | ------------ | ----------------------  | ------------- |
|POST   | /inscription/association |              | Inscription association | 201           |
|POST   | /inscription/famille     |              | Inscription famille     | 201           |

#### Connexion

| Verbe | Chemin            | Request Body | Response Body            | Code (succès) |
| ----- | ----------------- | ------------ | ----------------------   | --------------- |
| POST  | /connexion        |              |                          | 200             |

#### Deconnexion

| Verbe | Chemin            | Request Body | Response Body            | Code (succès) |
| ----- | ----------------- | ------------ | ----------------------   | --------------- |
| POST  | /deconnexion      |              |                          | 200             |

### Les users stories : 

| En tant que    |Je veux                                          | Dans le but                                                             |  Sprint        |
| -----          | ----------------------------------------------- | ------------------------------------------------------------------------| ---------------|  
| Visiteur       | Consulter la page d'accueil                     |                                                                         |                | 
| Visiteur       | Consulter la liste des animaux                  | De voir les animaux disponibles                                         |                | 
| Visiteur       | Consulter la liste des associations             | De voir les associations                                                |                | 
| Visiteur       | Effectuer une recherche d'animaux               | Voir les animaux correspondants à ses critères                          |                | 
| Visiteur       | Effectuer une recherche d'associations          | Voir les assos correspondants à ses critères                            |                | 
| Visiteur       | Voir les mentions légales                       | Lire les mentions légales                                               |                | 
| Visiteur       | Voir le plan du site                            | De connaitre l'arboresence du site                                      |                | 
| Visiteur       | Voir la politique de confidentialité            | Lire la politique de confidentialité                                    |                | 
| Visiteur       | M'inscrire en tant que famille / association    | Accéder aux fonctionnalités des différents rôles                        |                | 
| Visiteur       | Me connecter                                    | Accéder aux fonctionnalités des familles ou associations                |                | 
| Association    | Accéder au tableau de bord de l'association     | Voir les animaux de mon asso et accéder aux fonctionnalités de gestion  |                |
| Association    | Administrer les animaux                         | D'ajouter, de modifier et de supprimer un animal                        |                | 
| Association    | Administrer les demandes                        | De lire et repondre aux demandes                                        |                | 
| Association    | Visualiser les informations de l'association    | Consulter ses informations                                              |                | 
| Association    | Modifier les informations de l'association      | D'actualiser les informations de l'association                          |                | 
| Association    | Supprimer mon association                       | Effacer mon association et ses animaux de l'application                 |                | 
| Association    | Voir la page d'une famille                      | Voir les informations pour valider ou non la demande                    |                | 
| Association    | Me déconnecter                                  | De sécuriser mon compte                                                 |                | 
| Famille        | Consulter le profil                            | Verifier les informations et mes demandes de prise en charge             |                | 
| Famille        | Faire une demande                              | Accueillir un animal                                                     |                | 
| Famille        | Supprimer une demande                          | Annuler la proposition d'accueil de l'animal                             |                | 
| Famille        | Contacter une association                      | Obtenir des informations                                                 |                | 
| Famille        | Modifier les informations de la famille        | D'actualiser les informations de la famille                              |                | 
| Famille        | Supprimer le profil                            | Effacer le profil                                                        |                | 
| Famille        | Me déconnecter                                 | De sécuriser mon compte                                                  |                | 

### L'équipes :

- Camille : Lead dev Front
- Clara : Lead dev Back
- Phillipe : Product Owner
- Sloan : Scrum Master