import { useCallback } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Store } from "../Store/Store";

export default function CartScreen() {
  const list = Store((state) => state.list);
  const removeItem = Store((state) => state.removeItem);

  const handleRemove = useCallback(
    (dog) => {
      Alert.alert("Remove Item", `Remove ${dog.name} from cart?`, [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",

          onPress: () => removeItem(dog.id),
        },
      ]);
    },
    [removeItem],
  );

  const total = list.reduce((sum, dog) => {
    const num = parseInt(dog.price.replace(/[₹,]/g, ""), 10);
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f0eb" }}>
        <View style={styles.headerRow}>
          <Text style={styles.header}> My Cart</Text>
          <Text style={styles.count}>
            {list.length} item{list.length !== 1 ? "s" : ""}
          </Text>
        </View>

        {list.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyText}>Your cart is empty</Text>
            <Text style={styles.emptySubtext}>
              Go to the shop and add some pets!
            </Text>
          </View>
        ) : (
          <>
            <ScrollView
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 120,
              }}
              showsVerticalScrollIndicator={false}
            >
              {list.map((dog) => (
                <View key={dog.id} style={styles.card}>
                  <Image
                    source={dog.image}
                    style={styles.image}
                    resizeMode="cover"
                  />

                  <View style={styles.content}>
                    <Text style={styles.name}>{dog.name}</Text>
                    <Text style={styles.breed}>{dog.breed}</Text>
                    <Text style={styles.price}>{dog.price}</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => handleRemove(dog)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.removeBtnText}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>

            <View style={styles.footer}>
              <View>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalAmount}>
                  ₹{total.toLocaleString("en-IN")}
                </Text>
              </View>
              <TouchableOpacity style={styles.checkoutBtn}>
                <Text style={styles.checkoutText}>Checkout →</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  header: { fontSize: 24, fontWeight: "800", color: "#2d2d2d" },
  count: { fontSize: 14, color: "#888", fontWeight: "600" },

  emptyWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  emptyIcon: { fontSize: 64 },
  emptyText: { fontSize: 20, fontWeight: "700", color: "#555" },
  emptySubtext: { fontSize: 14, color: "#aaa" },

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
  name: { fontSize: 16, fontWeight: "700", color: "#333" },
  breed: { fontSize: 13, color: "#888", marginTop: 2 },
  price: { fontSize: 15, fontWeight: "600", color: "#4CAF50", marginTop: 4 },

  removeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#ffebee",
    alignItems: "center",
    justifyContent: "center",
  },
  removeBtnText: { color: "#e53935", fontSize: 16, fontWeight: "700" },

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 10,
  },
  totalLabel: { fontSize: 13, color: "#aaa", fontWeight: "600" },
  totalAmount: {
    fontSize: 22,
    fontWeight: "800",
    color: "#2d2d2d",
    marginTop: 2,
  },
  checkoutBtn: {
    backgroundColor: "#ff7043",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
  },
  checkoutText: { color: "#fff", fontWeight: "800", fontSize: 16 },
});
