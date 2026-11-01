// Défi supplémentaire — écran Expo (View + Text, sans navigation)
import { View, Text, StyleSheet } from "react-native";

const produitsParDefaut = [
  { id: 1, nom: "Clavier", categorie: "Accessoires", prix: 120, stock: 5 },
  { id: 2, nom: "Souris", categorie: "Accessoires", prix: 80, stock: 8 },
  { id: 3, nom: "Écran", categorie: "Informatique", prix: 900, stock: 0 },
  { id: 4, nom: "Casque", categorie: "Accessoires", prix: 240, stock: 3 },
];

export default function CatalogueScreen({ produits = produitsParDefaut }) {
  const disponibles = produits.filter(({ stock }) => stock > 0);
  const valeurStock = produits.reduce(
    (total, { prix, stock }) => total + prix * stock,
    0
  );

  return (
    <View style={styles.conteneur}>
      <Text style={styles.titre}>Catalogue produits</Text>

      <View style={styles.carte}>
        <Text style={styles.libelle}>Produits disponibles</Text>
        <Text style={styles.valeur}>{disponibles.length}</Text>
      </View>

      <View style={styles.carte}>
        <Text style={styles.libelle}>Valeur totale du stock</Text>
        <Text style={styles.valeur}>{valeurStock} MAD</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f5f7fa",
  },
  titre: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#1f2937",
  },
  carte: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  libelle: {
    fontSize: 15,
    color: "#6b7280",
    marginBottom: 4,
  },
  valeur: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2563eb",
  },
});
