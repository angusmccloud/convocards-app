**** App.JS: ****
import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import CategoriesScreen from './screens/CategoriesScreen';
import QuestionCardScreen from './screens/QuestionCardScreen';

export default function App() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showQuestionCard, setShowQuestionCard] = useState(false);

  const handleCategorySelection = (categories) => {
    setSelectedCategories(categories);
  };

  const handleStart = () => {
    setShowQuestionCard(true);
  };

  return (
    <View style={styles.container}>
      {!showQuestionCard ? (
        <CategoriesScreen onSelection={handleCategorySelection} onStart={handleStart} />
      ) : (
        <QuestionCardScreen selectedCategories={selectedCategories} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


**** Categories Screen ****
import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';

const categories = ['Category 1', 'Category 2', 'Category 3']; // Add your categories here

const CategoriesScreen = ({ onSelection, onStart }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryPress = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleStartPress = () => {
    onSelection(selectedCategories);
    onStart();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Categories</Text>
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.category,
            selectedCategories.includes(category) && styles.selectedCategory,
          ]}
          onPress={() => handleCategoryPress(category)}
        >
          <Text style={styles.categoryText}>{category}</Text>
        </TouchableOpacity>
      ))}
      <Button title="Start" onPress={handleStartPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  // Add your styles here
});

export default CategoriesScreen;


**** Question Cards Screen ****
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Dummy data for questions
const questions = {
  'Category 1': ['Question 1', 'Question 2'],
  'Category 2': ['Question 3', 'Question 4'],
  'Category 3': ['Question 5', 'Question 6'],
};

const QuestionCardScreen = ({ selectedCategories }) => {
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    // Load a question from the selected categories
    const availableQuestions = selectedCategories
      .map((category) => questions[category])
      .flat();
    setCurrentQuestion(availableQuestions[0]); // You can randomize or set a different logic
  }, [selectedCategories]);

  const handleNext = () => {
    // Logic to go to the next question
  };

  const handleFavorite = () => {
    // Logic to favorite the current question
  };

  const handleThumbsDown = () => {
    // Logic to mark question to 'never show again'
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.question}>{currentQuestion}</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={handleNext}>
          <Text>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFavorite}>
          <Text>Favorite</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleThumbsDown}>
          <Text>Thumbs Down</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Add your styles here
});

export default QuestionCardScreen;


**** Categories Screen V2 ****
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  category: {
    width: '100%',
    padding: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
  },
  selectedCategory: {
    backgroundColor: '#add8e6',
  },
  categoryText: {
    fontSize: 18,
  },
});



**** Question Card Screen V2 ****
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    minHeight: 200,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});


**** Question Card Screen V2 ****
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
    console.log(e);
  }
};

const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.log(e);
  }
};

const addFavorite = async (questionId) => {
  const favorites = (await getData('favorites')) || [];
  if (!favorites.includes(questionId)) {
    favorites.push(questionId);
    await storeData('favorites', favorites);
  }
};

const addThumbsDown = async (questionId) => {
  const thumbsDowns = (await getData('thumbsDowns')) || [];
  if (!thumbsDowns.includes(questionId)) {
    thumbsDowns.push(questionId);
    await storeData('thumbsDowns', thumbsDowns);
  }
};


**** Handle Favorites ****
const handleFavorite = () => {
  // Assuming each question has a unique ID
  addFavorite(currentQuestion.id);
};

const handleThumbsDown = () => {
  addThumbsDown(currentQuestion.id);
  handleNext(); // Automatically move to the next question after thumbs down
};


**** Question Card Screen ****
useEffect(() => {
  // Load a question from the selected categories
  const loadQuestions = async () => {
    const thumbsDowns = (await getData('thumbsDowns')) || [];
    const availableQuestions = selectedCategories
      .map((category) => questions[category].filter(q => !thumbsDowns.includes(q.id)))
      .flat();
    setCurrentQuestion(availableQuestions[0]); // You can randomize or set a different logic
  };
  loadQuestions();
}, [selectedCategories]);






