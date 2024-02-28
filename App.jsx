// IMPORTACIONES
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

// CODIGO
export default function App() {
  // DEFINIR VARIABLES
  const [recetasData, setRecetasData] = useState(null);
  const [error, setError] = useState(null);
  const API_KEY = "f0ee95f9076a471f9a7957b95742af3a"; 

  // DEFINIR FUNCIONES
  const getIngr = async () => {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/716429/information?apiKey=${API_KEY}&includeNutrition=false`);
      const data2 = await response.json();
      console.log(data2);
      if (data2.error) {
        setError(data2.error.message);
      } else {
        const ingredientes = data2.extendedIngredients;
        setRecetasData(ingredientes);
      }
    } catch (err) {
      setError('Error encontrando los ingredientes de la receta');
    }
  };

  // RETORNO DE LA VISTA
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={getIngr}>
        <Text style={styles.buttonText}>Ver Ingredientes</Text>
      </TouchableOpacity>
      <ScrollView>
        {error && <Text>{error}</Text>}
        {recetasData && recetasData.map((ingrediente, index) => (
          <View key={index} style={styles.ingredienteContainer}>
            <Text style={styles.ingredienteText}>{ingrediente.original}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20
  },
  ingredienteContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc"
  },
  ingredienteText: {
    fontSize: 16
  }
});
