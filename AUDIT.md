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

## Problème 1.

### Problème identifié

### Reproduction

### Comportement attendu

### Correction à apporter

Après réalisation, précisez ici la correction effectuée et le résultat de votre vérification.

Dupliquez ces quatre rubriques pour chacun des six problèmes.

## Composant créé

Expliquez vos principaux choix d’accessibilité et les manipulations réalisées pour les vérifier.

## Mini-test

Indiquez le fichier, le résultat et ce que le test permet de vérifier.
