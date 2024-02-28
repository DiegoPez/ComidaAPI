/* COMANDOS
git branch Ver en que rama estas
git checkout Cambiar de rama


PARA SUBIR
git add .
git commit -m "Mensaje"
git push
*/
// IMPORTACIONES	
import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

// CODIGO
export default function App() {

  // DEFINIR VARIABLES
  const [recetasData, setRecetasData] = useState(null);
  const [error, setError] = useState(null);

  API_KEY = "f0ee95f9076a471f9a7957b95742af3a"

  // DEFINIR FUNCIONES

  const getRecipes = async () => {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=pasta&maxFat=25&number=2`);
      const data = await response.json();
      console.log(data);
      if (data.error) {
        setError(data.error.message);
      } else {
        setRecetasData(data);
      }
    } catch (err) {
      setError('Error finding recetas data');
    }
  };

  // RETORNO DE LA VISTA
  return (
    <View style={styles.container}>


      <TouchableOpacity style={styles.button} onPress={getRecipes}>
      <Text style={styles.buttonText}>Get recipes</Text>
      </TouchableOpacity>

      <ScrollView>
      {error && <Text>{error}</Text>}
      {recetasData && (

          <View>
            <Text>{recetasData.results[0].title}</Text>

           <Image
           style={styles.recetaImage}
           source={{uri: recetasData.results[0].image}  }
           />

          </View>
        )}
      {error && <Text>{error}</Text>}
      </ScrollView>

    </View>
  );
}

// ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20
  },
  recetaImage: {
    width: "100%",
    height: 200
  }
});