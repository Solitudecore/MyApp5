import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { ProductContext } from "../context/ProductContext";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function ProductDetailsScreen() {
  const context = useContext(ProductContext);
  const router = useRouter();

  const params = useLocalSearchParams();

  const id = params.id as string;
  const [name, setName] = useState((params.name as string) || "");
  const [price, setPrice] = useState((params.price as string) || "");
  const [description, setDescription] = useState(
    (params.description as string) || "",
  );
  const imageUrl = params.imageUrl as string | null;

  const handleUpdate = () => {
    if (!name || !price) {
      alert("Name and price are required!");
      return;
    }
    context?.updateProduct({ id, name, price, description, imageUrl });
    router.back();
  };

  const handleDelete = () => {
    Alert.alert("Delete Product", "Are you sure you want to delete this?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          context?.deleteProduct(id);
          router.back();
        },
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.imageText}>No Image</Text>
          </View>
        )}

        <Text style={styles.label}>Product Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.label}>Price ($)</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <TouchableOpacity
          style={[
            styles.saveButton,
            {
              backgroundColor: Platform.select({
                ios: "#34C759",
                android: "#2196F3",
                default: "#34C759",
              }),
            },
          ]}
          onPress={handleUpdate}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Delete Product</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  scroll: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    marginBottom: 20,
    resizeMode: "cover",
  },
  placeholderImage: {
    width: "100%",
    height: 220,
    backgroundColor: "#E5E5EA",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginBottom: 20,
  },
  imageText: {
    color: "#8E8E93",
    fontSize: 16,
    fontWeight: "600",
  },
  label: {
    fontSize: 14,
    color: "#1C1C1E",
    marginBottom: 6,
    fontWeight: "600",
    marginLeft: 4,
  },
  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  saveButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
    backgroundColor: "#FF3B30",
  },
  deleteButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
