import { useCallback } from "react";
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Store } from "../Store/Store";
import { Pets } from "../Store/data";

export default function HomeScreen() {

  const addItem = Store((state) => state.addItem);
  const list    = Store((state) => state.list);

  const isInCart = useCallback(
    (id) => list.some((item) => item.id === id),
    [list]
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f0eb" }}>
        <ScrollView
          contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 16 }}
          showsVerticalScrollIndicator={false}
        >
          
          <Text style={styles.header}>Pet Shop</Text>

          {Pets.map((pet) => {
            const added = isInCart(pet.id);
            return (
              <View key={pet.id} style={styles.card}>
                <Image
                  source={pet.image}
                  style={styles.image}
                  resizeMode="cover"
                />

                <View style={styles.content}>
                  <Text style={styles.name}>{pet.name}</Text>
                  <Text style={styles.breed}>{pet.breed}</Text>
                  <Text style={styles.price}>{pet.price}</Text>
                </View>

              
                <TouchableOpacity
                  style={[styles.buyBtn, added && styles.buyBtnAdded]}
                  onPress={() => !added && addItem(pet)}
                  activeOpacity={added ? 1 : 0.7}
                >
                  <Text style={styles.buyBtnText}>{added ? " Added" : "Buy"}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "800",
    color: "#2d2d2d",
    textAlign: "center",
    paddingVertical: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    marginVertical: 7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 10,
    backgroundColor: "#eee",
  },
  content: { flex: 1, marginHorizontal: 12 },
  name:  { fontSize: 16, fontWeight: "700", color: "#333" },
  breed: { fontSize: 13, color: "#888", marginTop: 2 },
  price: { fontSize: 15, fontWeight: "600", color: "#4CAF50", marginTop: 4 },

  buyBtn: {
    backgroundColor: "#ff7043",
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  buyBtnAdded: {
    backgroundColor: "#bdbdbd", 
  },
  buyBtnText: { color: "#fff", fontWeight: "700", fontSize: 14 },
});