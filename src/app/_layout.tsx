import React from 'react';
import { Stack } from 'expo-router';
import { ProductProvider } from '../context/ProductContext';

export default function RootLayout() {
  return (
    <ProductProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Products' }} />
        <Stack.Screen name="add-product" options={{ title: 'Add Product' }} />
        <Stack.Screen name="product-details" options={{ title: 'Product Details' }} />
      </Stack>
    </ProductProvider>
  );
}