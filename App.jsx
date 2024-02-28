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
import React, {useState, useEffect} from "react";
import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";


// CODIGO
export default function App() {
  // DEFINIR VARIABLES
  const [recetasData, setRecetasData] = useState(null);
  const [ingredientesData, setIngredientesData] = useState(null);
  const [error, setError] = useState(null);
  const API_KEY = "992c574ca70e456b855c88bf9d47e861"; 

  // DEFINIR FUNCIONES

  const getRecipes = async () => {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=apples`);
      const data = await response.json();
      if (data.error) {
        setError(data.error.message);
      } else {
        setRecetasData(data);
      }
    } catch (err) {
      setError('Error encontrando los ingredientes de la receta');
    }
  };

  const getIngr = async (id) => {
    try {
      const response2 = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=false`);
      const data2 = await response2.json();
      //console.log(data2);
      if (data2.error) {
        setError(data2.error.message);
      } else {
        const ingredientes = data2.extendedIngredients;
        setIngredientesData(ingredientes);
      }
    } catch (err) {
      setError('Error encontrando los ingredientes de la receta');
    }
  };

  // RETORNO DE LA VISTA
  return (
    <View style={styles.container}>
      
      <Text style = {styles.title}>Recetas</Text>

      <TouchableOpacity style={styles.button} onPress={getRecipes}>
      <Text style={styles.buttonText}>Get recipes</Text>
      </TouchableOpacity>

      <ScrollView style={styles.recetas} horizontal={true}>
      {error && <Text>{error}</Text>}
      {recetasData && recetasData.map((receta, index) => (
        <View style={styles.recetaContainer} key={index}>
        <View style={styles.recetaContent}>
          <TouchableOpacity onPress={() => getIngr(receta.id)}>
          <Image
            style={styles.recetaImage}
            source={{ uri: receta.image }}
          />
          </TouchableOpacity>
          <View style={styles.recetaDetails}>
            <TouchableOpacity onPress={() => getIngr(receta.id)}>
            <Text style={styles.recetaTitle}>{receta.title}</Text>
            </TouchableOpacity>
            <ScrollView style={styles.recetaIngredientesfaltantes}>
            <Text style={styles.recetaIngredientsTitle}>Ingredientes faltantes:</Text>
            {receta.missedIngredients.map((ingrediente, ingredienteIndex) => (
              <Text key={ingredienteIndex} style={styles.recetaIngredients}>{ingrediente.original}</Text>
            ))}
            </ScrollView>
          </View>
        </View>
        </View>
      ))}
      </ScrollView>
      
      <ScrollView>
        {error && <Text>{error}</Text>}
        {ingredientesData && ingredientesData.map((ingrediente, index) => (
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
  title: {
    paddingTop: 50,
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 20,
  }, 
  recetas: {
    width: "100%",
    padding: 20,
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20
  },
  recetaContainer: {
    marginBottom: 100,
    height: 10,
    marginRight: 20,
  },
  recetaContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  recetaImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 5,
    marginRight: 20,
  },
  recetaDetails: {
    flex: 1,
  },
  recetaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  recetaIngredientsTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  recetaIngredients: {
    fontSize: 16,
  },
  recetaIngredientesfaltantes: {
    
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