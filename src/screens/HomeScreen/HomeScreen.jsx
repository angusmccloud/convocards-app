import { useState } from "react";
import { View, Pressable, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import { Text, Icon, AnimatedFAB } from '../../components';
import { categories, questions } from "../../data";
import useStyles from './HomeScreenStyles';

export default function HomeScreen() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const theme = useTheme();
  const styles = useStyles(theme);

  const handleCategoryPress = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleStartPress = () => {
    console.log('-- LETS GO --');
  }

  return (
    <View style={styles.pageWrapper}>
      <ScrollView>
        {categories.map((category, index) => (
          <CategoryButton key={category.id} category={category} index={index} selectedCategories={selectedCategories} handleCategoryPress={handleCategoryPress} theme={theme} />
        ))}
      </ScrollView>
      <AnimatedFAB icon="chat" label={'Start Chatting'} visible={selectedCategories.length > 0} onPress={handleStartPress} extended={true} />
    </View>
  )
}

const CategoryButton = (props) => {
  const { category, index, selectedCategories, handleCategoryPress, theme } = props;
  return (
    <Pressable key={category.id} onPress={() => handleCategoryPress(category.id)} style={{
      padding: 10, 
      marginHorizontal: 10, 
      marginVertical: 5, 
      borderColor: theme.colors.primary, 
      borderWidth: 1, 
      borderRadius: 10, 
      backgroundColor: selectedCategories.includes(category.id) ? theme.colors.primary : theme.colors.backgroundColor,
      flexDirection: 'row',
    }}>
      <View style={{width: 40, alignItems: 'flex-start', justifyContent: 'center'}}>
        <Icon name={category.icon} size={30} color={selectedCategories.includes(category.id) ? theme.colors.onPrimary : theme.colors.primary} />
      </View>
      <View style={{marginLeft: 5}}>
        <Text color={selectedCategories.includes(category.id) ? theme.colors.onPrimary : theme.colors.primary} size="L" bold>
          {category.label}
        </Text>
        <Text color={selectedCategories.includes(category.id) ? theme.colors.onPrimary : theme.colors.primary}>
          {questions.filter((question) => question.category === category.id).length} Questions
        </Text>
      </View>
    </Pressable>
  )
}
