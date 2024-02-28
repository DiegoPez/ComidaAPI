/* COMANDOS
git branch     --Ver en que rama estas
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
import SearchBar from 'react-native-searchbar'; 

// CODIGO
export default function App() {

  // DEFINIR VARIABLES
  const [recetasData, setRecetasData] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  API_KEY = "f0ee95f9076a471f9a7957b95742af3a"

  // DEFINIR FUNCIONES

  const getRecipes = async () => {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=apples,+flour,+sugar&number=2`);
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

  const getIngredients = async () => {
    try {
      const response = await fetch(`https://api.spoonacular.com/food/ingredients/autocomplete?query=${searchTerm}`);
      const data = await response.json();
      console.log(data);
      if (data.error) {
        setError(data.error.message);
      } else {
        // Update searchTerm state variable instead of recetasData
        setSearchTerm(data); // Assuming data contains the ingredients suggestions
      }
    } catch (err) {
      setError('Error finding Ingredient data');
    }
  };

  // RETORNO DE LA VISTA
  return (

      <View style={styles.container}>
      

      <TouchableOpacity style={styles.button} onPress={getRecipes}>
      <Text style={styles.buttonText}>Get recipes</Text>
      </TouchableOpacity>

      <SearchBar 
      style={styles.SearchBar}
      placeholder="Search recipes..."
      onChangeText={(text) => setSearchTerm(text) && getIngredientes(text)} // Call getIngredientes on each change
      value={searchTerm}
      />
      

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
    borderRadius: 5
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
  },
  SearchBar: {
    width: "100%",
    padding: 20,
    borderRadius: 5
  }
  
});