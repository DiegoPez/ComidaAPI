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
import { View, Image, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from "react-native";
import { Feather, Entypo } from '@expo/vector-icons';

const API_KEY = "0b2347a9c6674bc0bcdf869edf120a40";

export default function App() {
  const [recetasData, setRecetasData] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [ingredientes, setIngredientes] = useState([]);

  const getRecipes = async () => {
    try {
      
      const ingredientString = ingredientes.join(',+');
      const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientString}&number=10&apiKey=${API_KEY}`);
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
      const response = await fetch(`https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=${API_KEY}&query=${searchTerm}&number=3`);
      const data = await response.json();

      if (data.error) {
        setError(data.error.message);
      } else {
       
        const ingredientNames = data.map(item => item.name);
        setSearchTerm(ingredientNames);
      }
    } catch (err) {
      setError('Error finding Ingredient data');
    }
  };

  const handleIngredientSelect = (newIngredient) => {
    
    if (!ingredientes.includes(newIngredient)) {
      setIngredientes(prevIngredientes => [...prevIngredientes, newIngredient]);
    }
  };

  const handleIngredientRemoval = (ingredientToRemove) => {
    setIngredientes(prevIngredientes => prevIngredientes.filter(ingredient => ingredient !== ingredientToRemove));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={getRecipes}>
        <Text style={styles.buttonText}>Get recipes</Text>
      </TouchableOpacity>

      <View style={styles.searchRow}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar Ingredientes..."
        onChangeText={setSearchTerm} 
        onSubmitEditing={SubmitBuscar}
      />
        <TouchableOpacity style={styles.button} onPress={getIngredients}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.selectedIngredient}>Seleccione el ingrediente deseado: </Text>
      {searchTerm && typeof searchTerm === 'object' && searchTerm.length > 0 && (
        <View style={styles.ingredientList}>
          {searchTerm.map((name, index) => (
            <TouchableOpacity key={index} style={styles.ingredientOption} onPress={() => handleIngredientSelect(name)}>
              <Text style={styles.ingredientItemName}>{name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Text style={styles.selectedIngredient}>Ingredientes seleccionados: </Text>
      {ingredientes.length > 0 && (
        <View style={styles.ingredientList}>
          {ingredientes.map((name, index) => (
            <View key={index} style={styles.ingredientItem}>
              <View style={styles.searchRow}>
              <Text style={styles.ingredientItemName}>{name}</Text>
              <TouchableOpacity style={styles.removeButton} onPress={() => handleIngredientRemoval(name)}>
                <Feather name="x" size={24} color="red" />
              </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}

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
                  <ScrollView>
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
  searchRow: {
    flexDirection: 'row', // Change to row for horizontal placement
    alignItems: 'center',
    justifyContent: 'space-between', // Distribute evenly
    width: '100%' // Stretch to full width
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
  searchInput: {
    width: "60%",
    padding: 10,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  ingredientList: {
    marginTop: 20,
    width: "70%",
  },
  buttonbusqueda: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
    marginTop: 20,
  },
    
  
});