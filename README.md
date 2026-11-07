# Portfolio — Louis OLIVIER

Portfolio personnel en forme de **cockpit de TIE Fighter en 3D** : le visiteur est assis aux commandes et découvre chaque section (expérience, projets, compétences, contact) sur les panneaux autour du hublot.

- **Cockpit 3D** : `/` (français) et `/en` (anglais)
- **Version classique** (2D, accessible) : `/classique` et `/en/classique`

## Stack

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · three.js · React Three Fiber · drei

## Lancer le projet

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de production
```

## Modifier le contenu

| Quoi | Où |
|------|----|
| Textes (FR / EN) | `app/_data/content.fr.ts`, `app/_data/content.en.ts` (mêmes clés) |
| Liens, tags, dates, icônes | `app/_data/portfolio.tsx` |
| Profils GitHub / LinkedIn | `app/_data/profiles.ts` |
| CV | `public/cv-louis-olivier.pdf` |
| Sons | `public/sounds/` (voir le README du dossier) |

Le contenu alimente à la fois le cockpit, la version classique et la version texte destinée aux moteurs de recherche et aux lecteurs d'écran.

## Structure

```
app/
  (fr)/, (en)/        pages et mise en page racine de chaque langue
  _components/        page classique, version texte, composants partagés
  _data/              contenu, langues, métadonnées (SEO, aperçu de partage)
components/three/     scène 3D : cockpit, caméra, panneaux, cartes, starfield…
assets/               fichiers sources non publiés (modèle 3D d'origine, captures)
public/               fichiers servis : modèles optimisés, décodeur Draco, sons, CV
```

## Crédits

Modèle 3D : « Tie Fighter Cockpit Version 2 » by MichaelEGA, licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

Projet personnel et non commercial, inspiré de l'univers Star Wars, sans lien avec Lucasfilm ni Disney.
