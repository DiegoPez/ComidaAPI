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
  const [error, setError] = useState(null);

  API_KEY = "f0ee95f9076a471f9a7957b95742af3a"

  // DEFINIR FUNCIONES

  const GABO = (id) => {
    console.log("GABO");
    console.log(id);
  }

  const getRecipes = async () => {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=apples,+flour,+sugar&number=2`);
      const data = await response.json();
      if (data.error) {
        setError(data.error.message);
      } else {
        setRecetasData(data);
        console.log(data);
      }
    } catch (err) {
      setError('Error finding recetas data');
    }
  };

  // RETORNO DE LA VISTA
  return (
    <View style={styles.container}>

      <Text style = {styles.title}>Recetas</Text>

      <TouchableOpacity style={styles.button} onPress={getRecipes}>
      <Text style={styles.buttonText}>Get recipes</Text>
      </TouchableOpacity>

      <ScrollView style={styles.recetas}>
      {error && <Text>{error}</Text>}
      {recetasData && recetasData.map((receta, index) => (
        <TouchableOpacity style={styles.recetaContainer} key={index} onPress={() => GABO(receta.id)}>
          <View style={styles.recetaContent}>
            <Image
              style={styles.recetaImage}
              source={{ uri: receta.image }}
            />
            <View style={styles.recetaDetails}>
              <Text style={styles.recetaTitle}>{receta.title}</Text>
              <Text style={styles.recetaIngredientsTitle}>Ingredientes faltantes:</Text>
              {receta.missedIngredients.map((ingrediente, ingredienteIndex) => (
                <Text key={ingredienteIndex} style={styles.recetaIngredients}>{ingrediente.original}</Text>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      ))}
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
  title: {
    paddingTop: 50,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20
  }, 
  recetas: {
    width: "100%",
    padding: 20,
    margin: 20,
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
  recetaContainer: {
    alignItems: 'left',
  },
  recetaImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  recetaTitle: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});