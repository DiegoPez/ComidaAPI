/* COMANDOS
git branch     --Ver en que rama git estas
git checkout     --Cambiar de rama

git merge nombredelarama     --Unir ramas ESTANDO EN LA RAMA A LA QUE VAS A METER LOS CAMBIOS SELECCIONAS DE LA QUE LOS VAS A SACAR
git pull

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
  
  const API_KEY = "f0ee95f9076a471f9a7957b95742af3a"; // Declarar API_KEY correctamente
  
  // DEFINIR FUNCIONES
  
  const getRecipes = async () => {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=apples,+flour,+sugar&number=2`);
      const data = await response.json();
      if (data.error) {
        setError(data.error.message);
      } else {
        setRecetasData(data);
      }
    } catch (err) {
      setError('Error finding recetas data');
    }
  };
  
  const getIngr = async () => {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/716429/information?apiKey=${API_KEY}&includeNutrition=false`);
      const data2 = await response.json();
      console.log(data2);
      if (data2.error) { 
        setError(data2.error.message); 
      } else {
        const ingredientes = data2.extendIngredients;
        console.log(ingredientes);
        setRecetasData(data2);
      }
    } catch (err) {
      setError('Error encontrando los ingredientes de la receta');
    }
  };

  // RETORNO DE LA VISTA
  return (
    <View style={styles.container}>


      <TouchableOpacity style={styles.button} onPress={getRecipes}>
      <Text style={styles.buttonText}>Get recipes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={getIngr}>
      <Text style={styles.buttonText}>Ingredientes</Text>
      </TouchableOpacity>

      <ScrollView>
      {error && <Text>{error}</Text>}
      {recetasData && (

          <View>
           <Image
           style={styles.recetaImage}
           source={{uri: recetasData[0].image}  }
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
    borderRadius: 5,
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20
  },
  recetaImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover', // Ajusta la imagen para que cubra toda su área
    borderRadius: 5,
  }
});