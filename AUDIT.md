# Audit AtelierLocal

## Binôme et environnement

- Membres : rayan.laroussi szymon.guzek
- Navigateur et version : brave/chrome

## Problème 1 — le bouton détails de l'atelier n'est pas utilisable au clavier

### Problème identifié

dans src/components/WorkshopCard.tsx, le déclencheur des détails est un <div> avec un onclick. 
<div className="details-trigger" onClick={() => setExpanded(value => !value)}>
  Détails de l'atelier <span aria-hidden="true">{expanded ? "−" : "+"}</span>
</div>

### Reproduction
npm run dev.
Naviguer avec Tab : le focus passe de la recherche directement au bouton "M’inscrire à" en sautant "Détails de l’atelier".

### Comportement attendu

Le déclencheur doit être atteignable avec Tab, s’activer avec Entrée et Espace, et annoncer son état (plié ou déplié)
Lorsque le panneau est fermé, son contenu ne doit être ni visible, ni atteignable au clavier, ni lu par un lecteur d’écran.

### Correction à apporter

Remplacer le `div` par un vrai `<button type="button">`, cet élément fournit le focus, l’activation par Entrée et Espace et le rôle bouton. 
Ajouter `aria-expanded` pour annoncer l’état, et `aria-controls` pour relier le bouton au panneau qu’il commande. 
Remplacer `aria-hidden` par `inert` sur le panneau fermé, afin de le retirer à la fois de l’ordre de tabulation et de l’arbre d’accessibilité.

### Correction effectuée

WorkshopCard.tsx :
le `div` est remplacé par un `<button type="button" className="details-trigger">` avec `aria-expanded={expanded}` et `aria-controls={panelId}`
l’identifiant du panneau est généré avec `useId()`, ce qui garantit un `id` unique pour les trois cartes
le panneau reçoit `id={panelId}` et `inert={!expanded}` à la place de `aria-hidden={!expanded}`. L’attribut `inert` est pris en charge nativement par React 19.

---

## Problème 2 - le champ de recherche n’a pas de libellé associé

### Problème identifié

Le texte "Rechercher un atelier" est dans un <p className="search-label">Rechercher un atelier</p> qui n'est pas relier avec son input. Erreur identifier grâce à lighthouse : « Form elements do not have associated labels ». Ce qui rend complexe l'identification pour les malvoyants.


### Reproduction

Tab jusqu'à arriver sur l'input en dessous de Rechercher un atelier avec un lecteur d'écran (ex sous windows : win + ctrl + entrée), on n'a pas d'informations concernant le but du champ


### Comportement attendu

Le champ doit avoir un nom compris par les technologies d’assistance, et cliquer sur le libellé doit activer le champ.

### Correction à apporter

Remplacer le `<p>` par un <label className="search-label" htmlFor="workshop-search">Rechercher un atelier</label>
ce qui relie le texte au champ, permettant d'être identifier par le lecteur.

---

## Problème 3 - une image n’a pas d’attribut `alt`

### Problème identifié



### Reproduction



### Comportement attendu



### Correction à apporter



---

## Composant créé

Expliquez vos principaux choix d’accessibilité et les manipulations réalisées pour les vérifier.

## Mini-test

Indiquez le fichier, le résultat et ce que le test permet de vérifier.
