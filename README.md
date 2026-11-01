# tp2-catalogue

TP2 autonome — Gestion d'un catalogue de produits (JavaScript / Node.js).

## Fichiers du dépôt

| Fichier | Rôle |
| --- | --- |
| `produits.js` | Logique métier complète + cas de test imposés |
| `CatalogueScreen.js` | Défi supplémentaire : écran Expo avec `View` et `Text` |
| `.gitignore` | Empêche la publication des documents et captures locales |

Le compte rendu (PDF/DOCX), les captures d'écran, l'énoncé du TP et le compte rendu de référence restent uniquement dans le dossier local `tp2-catalogue`. Ils ne sont pas versionnés et ne sont pas publiés sur GitHub.

## Exécution

```bash
cd tp2-catalogue
node produits.js
```

## Résultats obtenus

- Produits disponibles : **3** (Clavier, Souris, Casque)
- Valeur du stock : **1 960 MAD**
- Produit disponible le moins cher : **Souris — 80 MAD**
- Cas de test : **11/11 réussis**

## Structure de `produits.js`

1. `produits` : tableau d'objets `{ id, nom, categorie, prix, stock }`.
2. `estValide(produit)` : prix et stock finis et non négatifs (défi).
3. `afficherCatalogue(liste)` : nom et prix de chaque produit (`forEach`).
4. `filtrerDisponibles(liste)` : produits avec `stock > 0` (`filter`).
5. `calculerValeurStock(liste)` : Σ(prix × stock) (`reduce`).
6. `trouverProduitMoinsCher(liste)` : minimum ou `null` si liste vide.
7. `creerResume(liste)` : lignes `Nom - prix MAD - stock unités` (`map`).
8. `afficherSynthese(liste)` : affichage complet demandé par le TP.
9. Cas de test : écran à stock nul, tous stocks à zéro, catalogue vide, validation des données.

Aucun objet de départ n'est modifié : les tableaux sont créés par `filter`, `map` et `reduce`, et les variantes de test utilisent des copies (`{ ...produit }`).

## Documents locaux (non publiés)

- `Compte_Rendu_TP2_Catalogue.pdf` et `Compte_Rendu_TP2_Catalogue.docx`
- `capture tp2/` (captures d'écran)
- `capture-console.txt` (sortie console)
- `reference/` (compte rendu de référence)

Les réponses aux quatre questions sont intégrées dans la partie 1 du compte rendu local ; aucun fichier `reponses.md` séparé n'est livré.
