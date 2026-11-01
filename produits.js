// TP2 autonome — Gestion d'un catalogue de produits
/* ------------------------------------------------------------------ */
/* 1. Données de départ                                               */

const produits = [
  { id: 1, nom: "Clavier", categorie: "Accessoires", prix: 120, stock: 5 },
  { id: 2, nom: "Souris", categorie: "Accessoires", prix: 80, stock: 8 },
  { id: 3, nom: "Écran", categorie: "Informatique", prix: 900, stock: 0 },
  { id: 4, nom: "Casque", categorie: "Accessoires", prix: 240, stock: 3 },
];
/* 2. Fonctions de logique métier                                     */

// Défi : vérifier que le prix et le stock sont des nombres finis et non négatifs.
function estValide(produit) {
  const { prix, stock } = produit;
  return (
    Number.isFinite(prix) &&
    Number.isFinite(stock) &&
    prix >= 0 &&
    stock >= 0
  );
}

// 1. Affichage du catalogue : nom et prix de chaque produit.
function afficherCatalogue(liste) {
  console.log("=== Catalogue ===");
  liste.forEach(({ nom, prix }) => {
    console.log(`${nom} : ${prix} MAD`);
  });
}

// 2. Disponibilité : nouveau tableau des produits dont stock > 0.
function filtrerDisponibles(liste) {
  return liste.filter(({ stock }) => stock > 0);
}

// 3. Valeur du stock : somme des prix × stocks.
function calculerValeurStock(liste) {
  return liste.reduce((total, { prix, stock }) => total + prix * stock, 0);
}

// 4. Prix minimal : produit disponible le moins cher, ou null si aucun.
function trouverProduitMoinsCher(listeDisponible) {
  if (listeDisponible.length === 0) {
    return null;
  }

  return listeDisponible.reduce((moinsCher, produit) =>
    produit.prix < moinsCher.prix ? produit : moinsCher
  );
}

// 5. Résumé : une ligne de texte par produit.
function creerResume(liste) {
  return liste.map(
    ({ nom, prix, stock }) => `${nom} - ${prix} MAD - ${stock} unités`
  );
}

// Synthèse complète demandée par le TP.
function afficherSynthese(liste) {
  afficherCatalogue(liste);

  const disponibles = filtrerDisponibles(liste);
  console.log(`\nProduits disponibles : ${disponibles.length}`);

  const valeurStock = calculerValeurStock(liste);
  console.log(`Valeur du stock : ${valeurStock} MAD`);

  const moinsCher = trouverProduitMoinsCher(disponibles);
  if (moinsCher === null) {
    console.log(
      "Aucun produit disponible : impossible de déterminer le prix minimal."
    );
  } else {
    const { nom, prix } = moinsCher;
    console.log(`Produit disponible le moins cher : ${nom} (${prix} MAD)`);
  }

  console.log("\n=== Résumé ===");
  creerResume(liste).forEach((ligne) => console.log(ligne));
}

/* ------------------------------------------------------------------ */
/* 3. Programme principal                                             */
/* ------------------------------------------------------------------ */

afficherSynthese(produits);

/* ------------------------------------------------------------------ */
/* 4. Cas de test imposés                                             */
/* ------------------------------------------------------------------ */

console.log("\n=== Cas de test ===");

let testsReussis = 0;
let testsEchoues = 0;

function verifier(intitule, condition) {
  if (condition) {
    testsReussis += 1;
    console.log(`[OK] ${intitule}`);
  } else {
    testsEchoues += 1;
    console.log(`[ÉCHEC] ${intitule}`);
  }
}

// Test 1 : l'Écran (stock nul) n'apparaît pas dans la liste disponible.
const nomsDisponibles = filtrerDisponibles(produits).map(({ nom }) => nom);
verifier(
  "Écran à stock nul : absent de la liste disponible",
  !nomsDisponibles.includes("Écran") && nomsDisponibles.length === 3
);

// Test 2 : tous les stocks mis à zéro (copie, sans modifier les objets d'origine).
const produitsSansStock = produits.map((produit) => ({ ...produit, stock: 0 }));
const disponiblesSansStock = filtrerDisponibles(produitsSansStock);
verifier(
  "Tous les stocks à zéro : aucun produit disponible",
  disponiblesSansStock.length === 0
);
verifier(
  "Tous les stocks à zéro : prix minimal = null (aucun plantage)",
  trouverProduitMoinsCher(disponiblesSansStock) === null
);

// Test 3 : catalogue vide.
const catalogueVide = [];
verifier(
  "Catalogue vide : valeur totale du stock = 0",
  calculerValeurStock(catalogueVide) === 0
);
verifier(
  "Catalogue vide : aucun produit disponible, aucun plantage",
  filtrerDisponibles(catalogueVide).length === 0 &&
    trouverProduitMoinsCher(catalogueVide) === null
);

// Test 4 : vérification des données.
verifier(
  "Produit valide (prix et stock numériques, non négatifs)",
  estValide({ id: 5, nom: "Test", categorie: "Test", prix: 120, stock: 5 })
);
verifier("Prix négatif refusé", !estValide({ prix: -1, stock: 5 }));
verifier("Stock négatif refusé", !estValide({ prix: 10, stock: -3 }));
verifier("Prix infini refusé", !estValide({ prix: Infinity, stock: 5 }));
verifier("Stock NaN refusé", !estValide({ prix: 10, stock: NaN }));
verifier("Prix sous forme de texte refusé", !estValide({ prix: "120", stock: 5 }));

console.log(`\nBilan des tests : ${testsReussis} réussi(s), ${testsEchoues} échoué(s)`);
