import React, { useContext, useState } from "react";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  TextInput,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { ProductContext } from "../context/ProductContext";

import { useRouter } from "expo-router";

import { Ionicons } from "@react-native-vector-icons/ionicons";
export default function HomeScreen() {
  const context = useContext(ProductContext);
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  if (!context) return null;
  const { products } = context;

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() =>
        router.push({ pathname: "/product-details", params: item })
      }
    >
      <View style={styles.imageContainer}>
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
        ) : (
          <Ionicons name="image-outline" size={32} color="#C7C7CC" />
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.description} numberOfLines={1}>
          {item.description ? item.description : "No description"}
        </Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={24}
        color="#C7C7CC"
        style={styles.arrowIcon}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.topHeader}>
            <View>
              <Text style={styles.greetingSubtitle}>Good morning,</Text>
              <Text style={styles.greetingTitle}>Store Manager</Text>
            </View>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#1C1C1E"
              />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>

          <View style={styles.searchRow}>
            <View style={styles.searchContainer}>
              <Ionicons
                name="search"
                size={20}
                color="#8E8E93"
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search products..."
                placeholderTextColor="#8E8E93"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name="options-outline" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Inventory</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {filteredProducts.length} items
            </Text>
          </View>
        </View>

        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="cube-outline" size={64} color="#D1D1D6" />
              <Text style={styles.emptyText}>
                {searchQuery
                  ? "No matching products found."
                  : "No products available."}
              </Text>
            </View>
          }
        />

        <TouchableOpacity
          style={styles.fab}
          activeOpacity={0.8}
          onPress={() => router.push("/add-product")}
        >
          <Ionicons name="add" size={32} color="#FFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  container: {
    flex: 1,
  },

  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 10,
  },
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greetingSubtitle: {
    fontSize: 14,
    color: "#8E8E93",
    fontWeight: "500",
  },
  greetingTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1C1C1E",
    marginTop: 2,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F2F2F7",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationDot: {
    position: "absolute",
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF3B30",
    borderWidth: 1,
    borderColor: "#F2F2F7",
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F7",
    borderRadius: 16,
    height: 50,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1C1C1E",
    height: "100%",
  },
  filterButton: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: Platform.select({
      ios: "#007AFF",
      android: "#4CAF50",
      default: "#007AFF",
    }),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },

  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1C1C1E",
  },
  badge: {
    backgroundColor: "#E5E5EA",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1C1C1E",
  },

  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 12,
    marginBottom: 16,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    width: 76,
    height: 76,
    borderRadius: 16,
    marginRight: 16,
    backgroundColor: "#F2F2F7",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1C1C1E",
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: "#8E8E93",
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "800",
    color: Platform.select({
      ios: "#007AFF",
      android: "#4CAF50",
      default: "#007AFF",
    }),
  },
  arrowIcon: {
    marginLeft: 8,
  },

  fab: {
    position: "absolute",
    right: 20,
    bottom: Platform.OS === "ios" ? 40 : 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Platform.select({
      ios: "#007AFF",
      android: "#4CAF50",
      default: "#007AFF",
    }),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  emptyContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  emptyText: {
    fontSize: 16,
    color: "#8E8E93",
    marginTop: 12,
    fontWeight: "500",
  },
});
