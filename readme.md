# StarterFrontEnd GULP/SASS/TWIG/BABELIFY
Voici les étapes à suivre pour procéder a l'installation et le développement du projet.
## Installation
Voici les différents logiciels à installer pour faire fonctionner l'application.
  - https://git-scm.com/downloads
  - https://nodejs.org/en/download/  

>Node va nous permettre d'utiliser NPM (le Node Package Manager) qui nous sert a installer de nouveaux modules développés par la communauté notamment Gulp et bien d'autres encore.

>Git, c'est un gestionnaire de versions décentralisé. Cela permet à chaque développeur de posséder sa propre copie du projet, chez lui, localement sur son pc. Il permet également de pouvoir facilement partager son code avec les autres contributeurs du projet grace a un serveur de dépôt git. En l'occurence nous utiliserons Framagit.

### Installer Gulp

Dès que Node.js est installé, ouvrez un terminal de commande n'importe où, et tapez :

```sh
$ npm install gulp -g
```

> Cette instruction aura pour effet d'installer Gulp de manière globale sur votre ordinateur, et une fois pour toutes, cela ne se fait qu'une seule fois.

**Si vous êtes sur Mac, vous aurez sans doute besoin de faire précéder cette syntaxe d'un sudo afin de disposer des droits suffisants, ce qui donnera:  `sudo npm install gulp -g`**

### Configuration de Git
Une des premières choses a faire, c'est de paramétrer Git avec votre nom et votre adresse e-mail : 
```sh
$ git config --global user.name "Prénom Nom"
$ git config --global user.email "exemple@exemple.fr"
```

### Récupération du projet

Afin d'obtenir une copie d'un dépôt Git existant, il suffit de taper dans un terminal la commande `git clone` suivi du lien correspondant au projet git.
```sh
$ cd monDossier
$ git clone https://github.com/Matteo-Peronnet/starter-front-end.git
```
> Attention, il faut se déplacer avec le terminal avec la commande `cd` afin de se rendre dans dossier que vous connaissez

### Installation des modules NPM

Maintenant que vous avez récupérer le projet, déplacez-vous a la racine du projet a l'aide de la commande `cd` , vous devriez trouver une arborescence ressemblant à celle ci.
```txt
..
├── gulpfile.js
├── package.json
├── readme.md
├── src
```
> Pour afficher l'arborescence, il suffit de taper la commande `ls` sur Mac et `dir` sur Windows

Il faut maintenant installer les dépendances du projet pour cela exécutez cette commande :
```sh
$ npm install
```

**Vous avez maintenant terminé l'étape d'installation du projet.**

## Développement

### Gulp

Gulp est un **"Automatiseur de tâches"**, c'est à dire qu'il est capable de lancer des bouts de scripts qui vont permettre d'automatiser des fonctionalitées à notre place.
* Minification du CSS
* Autoprefixer CSS
* Uglification du JS
* Minification des Images
* Compilation SASS
* Serveur de développement
* LiveReload (Rechargement à chaud)
* Mise en Production
* Moteur de Template TWIG

Toutes ces fonctionnalités sont configuré sur le projet afin d'aider au développement.

### Utilisation

Pour lancer le serveur Web, il suffit de se rendre dans le dossier du projet toujours a l'aide de la commande `cd` puis de taper la commande :
```sh
$ gulp serve
```
Le terminal reste figé et vous donnes l'adresse du serveur local : `http://localhost:3000`
Vous pouvez accéder au site depuis cette url.

## Intégration

### Architecture
Pour la partie Intégration, comme je l'ai dis précédemment nous utilisons **SASS**, c'est un préprocesseur CSS qui permet de générer dynamiquement des fichiers CSS. L’objectif est d’améliorer l’écriture de ces fichiers, en apportant plus de flexibilité au développeur web. [Voir toutes les fonctionnalités de SASS]

Le développement du CSS s’effectue depuis les différents fichiers comportant l'extension **.scss** que vous trouverez dans le dossier SCSS. Voici l'arborescence générale. 
```tree
    └── scss 
        ├── components // Ce Dossier contient la mise en forme des composants du site
        │   ├── _buttons.scss
        │   ├── _forms.scss
        ├── layout // Ce Dossier contient la Mise en page générale
        │   ├── _footer.scss
        │   ├── _general.scss
        │   ├── _header.scss
        │   ├── _menu.scss
        │   └── pages // Ce Dossier conteint la Mise en page des Pages du site
        ├── style.scss // Ce Fichier qui importe tous les autres fichiers
        └── utilities // Ce Dossier contient les style utilitaires
            ├── _classes.scss
            ├── _function.scss
            ├── _grid.scss
            ├── _media-query.scss
            ├── _mixins.scss
            ├── _reset.scss
            └── _variables.scss
```
> Comme vous pouvez le voir **un seul fichier** ne comporte de **"_"** devant son nom, il s'agit du fichier **style.scss**. En effet, tous les fichiers ne possédant pas cet underscore, vont être généré en sortie par SASS. Nous ne voulons **qu'un seul fichier en sortie**, c'est pourquoi il est le seul.

Le fichier style.scss importe tous les autres fichiers, donc à chaque création de nouveau fichier, il est **NÉCESSAIRE** de l'importer dans ce fichier afin qu'il soit généré dans le `"style.css"` !

### Création
Pour chacune des pages, il faut créer son fichier SASS correspondant, dans le dossier pages du dossier Layout.
Exemple : 
*   `"_contact.scss"`
*   `"_equipe.scss"`

> **ATTENTION ! Ne pas oublier le "_" dans devant son nom et de l'importer dans le fichier style.scss**


## Moteur de Template TWIG

### Introduction
Nous allons utiliser un moteur de template PHP en l’occurence, j'ai choisi TWIG. Il va nous aider dans la lisibilité et la logique du projet en général, de son code en particulier. 

> Avant, on écrivait du `HTML` dans nos pages `.html`, jusqu'à la tout va bien. Le principal soucis, était que lorsque nous avions des éléments communs a toutes nos pages il fallait le répéter à chaques fois, et pour chaques modifications il fallait également le modifier sur toutes ces pages.
`**TWIG EST LA SOLUTION**`

### Mise en place
Nous allons pouvoir séparer nos codes `HTML` dans des fichiers `.twig`. Certains sont déjà intégré au projet comme vous pouvez le voir dans l'aborescence suivante.
```
└── src
    ├── build
    ├── css
    ├── fonts
    ├── img
    ├── js
    └── twig // Ce dossier contient toutes nos pages html 
        ├── index.twig // Page D'acceuil
        └── template
            └── layout.twig // Conteneur Général
            └── header.twig // Template Header
            └── footer.twig // Template Footer
            └── menu.twig // Template Menu
```

> Les fichiers Twig comporte l'extension `.twig` ils sont situés dans le dossier `src/twig`

Comme vous pouvez le voir nous avons un premier fichier nommé `index.twig`, c'est nôtre page d'acceuil. 

Éxaminons le code de ce fichier : 
```twig
# Fichier : index.twig
{% extends "template/layout.twig" %}
 
{% block page %}
    <p>Je suis le Texte de la Page</p>
{% endblock %}
```

> Ce fichier étend une page via la commande "extends" et lui injecte des données via la commande "block".

Voici à quoi correspond le fichier auquel nous étendons : 

```twig
# Fichier : layout.twig
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <link href="css/style.css" rel="stylesheet" type="text/css">
    <title>Titre de la page</title>
 
</head>
<body>
    {% block page %}{% endblock %}
</body>
</html>
```

L'ensemble des données situé dans le bloc page du fichier `index.twig` ont été injecté dans le bloc page du fichier `template.twig`.

> À chaques nouveau fichier nous allons rajouter cette ligne au début, cela va nous éviter de déclarer tout le `!DOCTYPE` l'entête `HEAD` à toutes nos pages etc .. 

Dans le fichier `template.twig` on va même pouvoir y inclure le `header` et le `footer` ou même le `menu`, on va y mettre tous les éléments communs à chaques page. Voilà une des grandes utilitées que nous offres `TWIG`.

### Rappels commandes TWIG

`{% extends "filename.twig" %}` : **Permet de pouvoir remplacer le contenu d'un ou des blocs du fichier étendu**

`{% include "filename.twig" %}` : **Permet d'inclure le contenu du fichier**

### Coloration syntaxique

#### SublimeText

1. Ouvrir SublimeText
2. Menu Preferences
3. Package Control
4. Tapez : Install Package
5. Tapez : PHP-Twig
6. Redémarrer SublimeText

#### Bracket

1. Téléchargez : https://github.com/Athorcis/brackets-twig/archive/master.zip
2. Ouvrez Bracket
3. Menu Help
4. Show Extension Folder
5. Copier le dossier télécharger dans le dossier ouvert par Bracket
6. Redémarrer Bracket

## Babelify

L’idée de Browserify est de permettre aux développeurs front d’organiser leur code comme il le ferait pour développer leur code Back-end via l’utilisation de la gestion de module Node.js.
On aura donc un fichier JavaScript principal `src/js/app.js` dans lequel on importera les modules dont il dépend qui peuvent eux même dépendre d’autres modules etc.
Browserify interprétera ces chargements/imports de modules pour construire le fichier final le tout en utilisant les nouveaux standards JavaScript (`ES2015/ES2015`).


### Exemple

Lorsque vous avez besoin d'un plugin externe à l'application, il est parfois éprouvant de devoir le l'installer, vérifier les versions, les compatibilitées etc ...

Grâce au système de Module, par le simple ajout du plugin dans les dépendances du projet via la commande `n
pm install NomDuPlugin`, vous pouvez directement l'importer dans le projet.

Dans le StarterPack, j'ai fais un éxemple en utilisant `Jquery`.

```sh
$ npm install jquery
```
> J'ai au préalable éffectuer cette commande qui a permi d'installer le plugin `Jquery` dans le dossier `node_modules`. 

```javascript
# Fichier : src/js/app.js
var $ = require('jquery');
```
> Grâce à l'ajout de cette ligne dans le fichier `src/js/app.js`, `Jquery` va être automatiquement charger dans le fichier. Nous pouvons maintenant installer n'importe qu'elle dépendance dans le projet, ainsi l'intégrer facilement avec la commande `require("NomDuPlugin")` à la suite du fichier.


[Voir toutes les fonctionnalités de SASS]: <https://www.alsacreations.com/article/lire/1717-les-preprocesseurs-css-c-est-sensass.html>
