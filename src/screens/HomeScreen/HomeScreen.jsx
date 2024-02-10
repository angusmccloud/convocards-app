import { useState, useContext } from "react";
import { View, Pressable, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import { Text, Icon, AnimatedFAB } from '../../components';
import { categories, questions } from "../../data";
import { ViewedContext, FavoritesContext, DislikedContext } from "../../contexts";
import useStyles from './HomeScreenStyles';

export default function HomeScreen({navigation, route}) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { favorites } = useContext(FavoritesContext);
  const { disliked } = useContext(DislikedContext);
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
    navigation.push("Question Screen", {
      categories: selectedCategories,
      viewType: 'all',
    });
  }

  return (
    <View style={styles.pageWrapper}>
      <ScrollView>
        {categories.map((category, index) => (
          <CategoryButton key={category.id} category={category} index={index} selectedCategories={selectedCategories} handleCategoryPress={handleCategoryPress} theme={theme} />
        ))}
        {favorites.length > 0 && (
          <CategoryButton key={'favorites'} category={{id: 'favorites', label: 'Favorites', icon: 'heartOutline'}} selectedCategories={selectedCategories} handleCategoryPress={handleCategoryPress} theme={theme} questionsInCategory={favorites} />
        )}
        {disliked.length > 0 && (
          <CategoryButton key={'disliked'} category={{id: 'disliked', label: 'Disliked', icon: 'thumbsDownOutline'}} selectedCategories={selectedCategories} handleCategoryPress={handleCategoryPress} theme={theme} questionsInCategory={disliked} />
        )}
      </ScrollView>
      <AnimatedFAB icon="chat" label={'Start Chatting'} visible={selectedCategories.length > 0} onPress={handleStartPress} extended={true} />
    </View>
  )
}

const CategoryButton = (props) => {
  const { category, selectedCategories, handleCategoryPress, theme, questionsInCategory } = props;
  const { viewed } = useContext(ViewedContext);
  const categoryQuestions = questions.filter((question) => question.category === category.id);
  const numberOfQuestions = questionsInCategory ? questionsInCategory.length : categoryQuestions.length;
  const numberOfViewedQuestions = questionsInCategory ? 0 : categoryQuestions.filter((question) => viewed.includes(question.id)).length;
  const numberOfUnreadQuestions = questionsInCategory ? questionsInCategory.length : numberOfQuestions - numberOfViewedQuestions;
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
        <Icon name={category.icon} size={30} color={selectedCategories.includes(category.id) ? theme.colors.onPrimary : theme.colors.onBackground} />
      </View>
      <View style={{marginLeft: 5}}>
        <Text color={selectedCategories.includes(category.id) ? theme.colors.onPrimary : theme.colors.onBackground} size="L" bold>
          {category.label}
        </Text>
        <Text color={selectedCategories.includes(category.id) ? theme.colors.onPrimary : theme.colors.onBackground}>
          {numberOfQuestions} Questions {numberOfViewedQuestions > 0 ? `(${numberOfUnreadQuestions} Unread)` : ''}
        </Text>
      </View>
    </Pressable>
  )
}
