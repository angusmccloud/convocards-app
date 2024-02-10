import { useState, useEffect, useContext } from "react";
import { View, Share, TouchableWithoutFeedback } from "react-native";
import { useTheme } from "react-native-paper";
import Animated, { SlideOutLeft, SlideInLeft } from 'react-native-reanimated';
import { Text, Button, Icon } from '../../components';
import { questions } from "../../data";
import { FavoritesContext, DislikedContext, ViewedContext } from "../../contexts";
import useStyles from './QuestionScreenStyles';

export default function QuestionScreen({ navigation, route }) {
  const { categories, viewType = 'all' } = route.params;
  const [allQuestions, setAllQuestions] = useState([]);
  const [displayIndex, setDisplayIndex] = useState(0);
  const { addToViewed, removeFromViewed } = useContext(ViewedContext);
  const { favorites } = useContext(FavoritesContext);
  const { disliked } = useContext(DislikedContext);
  const theme = useTheme();
  const styles = useStyles(theme);

  const onNextQuestionPress = () => {
    addToViewed(allQuestions[displayIndex]);
    setDisplayIndex(displayIndex-1);
  }

  const onPreviousQuestionPress = () => {
    removeFromViewed(allQuestions[displayIndex+1]);
    setDisplayIndex(displayIndex+1);
  }

  const onSharePress = async (question) => {
    console.log('-- Share Press!! --');
    const content = {
      message: question.question,
      // url: item.uri,
      // title: `Convo Cards | ${question.category}`,
    };
    const options = {
      dialogTitle: `Convo Cards`,
      subject: 'I have a question for you!',
    };

    try {
      const result = await Share.share(content, options);
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with', result.activityType);
          // shared with activity type of result.activityType
        } else {
          console.log('shared');
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('dismissed');
        // dismissed
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if(allQuestions.length === 0) {
      if(categories.length > 0) {
        const newQuestions = questions.filter((question) => categories.includes(question.category));
        if(categories.includes('favorites')) {
          // Add all questions who's ID are in the favorites array
          newQuestions.push(...questions.filter((question) => favorites.includes(question.id)));
        }
        if(categories.includes('disliked')) {
          // Add all questions who's ID are in the disliked array
          newQuestions.push(...questions.filter((question) => disliked.includes(question.id)));
        }
        // Then sort randomly
        newQuestions.sort(() => Math.random() - 0.5);
        setAllQuestions(newQuestions);
        setDisplayIndex(newQuestions.length - 1);
      } else {
        setAllQuestions([]);
        setDisplayIndex(-1);
      }
    }
  }, [categories, favorites, disliked]);

  return (
    <View style={styles.pageWrapper}>
      <View style={styles.cardContainer}>
        {allQuestions.map((question, index) =>
          <QuestionCard 
            key={question.id}
            index={index}
            displayIndex={displayIndex}
            question={question}
            theme={theme}
            favorites={favorites}
            disliked={disliked}
            onSharePress={onSharePress}
          />
        )}
        {(allQuestions.length === 0 || displayIndex < 0) && (
          <View style={{alignContent: 'center', justifyContent: 'center', marginTop: 100, marginHorizontal: 20,}}>
            <Text size={'XL'} style={{textAlign: 'center'}}>
              There are no more conversations in this pack. Please go home to select a new topic to talk about.
            </Text>
          </View>
        )}
        <View style={styles.navigationButtonContainer}>
          <Button textSize={'L'} textBold onPress={onPreviousQuestionPress} disabled={allQuestions.length === 0 || displayIndex === (allQuestions.length -1)}>Previous</Button>
          <Button textSize={'L'} textBold onPress={onNextQuestionPress} disabled={allQuestions.length === 0 || displayIndex === -1}>Next</Button>
        </View>
      </View>
    </View>
  )
}

const QuestionCard = (props) => {
  const { question, index, theme, displayIndex, favorites, disliked, onSharePress } = props;
  const { onFavoritePress } = useContext(FavoritesContext);
  const { onDislikePress } = useContext(DislikedContext);
  const styles = useStyles(theme);
  const isFavorite = favorites.includes(question.id);
  const heartIcon = isFavorite ? 'heart' : 'heartOutline';
  const isDisliked = disliked.includes(question.id);
  const dislikedIcon = isDisliked ? 'thumbsDown' : 'thumbsDownOutline';

  return (
    displayIndex >= index ? (
      <Animated.View 
        key={question.id}
        style={[styles.card, {zIndex: index}]}
        entering={SlideInLeft}
        exiting={SlideOutLeft}
      >
        <View style={{marginBottom: 30}}>
          <Text size={'XXL'} color={theme.colors.onBackground} bold style={{textAlign: 'center'}}>{question.question}</Text>
        </View>
        <View style={styles.cardButtonContainer}>
          <TouchableWithoutFeedback onPress={() => onDislikePress(question)}>
            <View>
              <Icon name={dislikedIcon} size={30} color={theme.colors.onBackground} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => onSharePress(question)}>
            <View>
              <Icon name={'share'} size={30} color={theme.colors.onBackground} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => onFavoritePress(question)}>
            <View>
              <Icon name={heartIcon} size={30} color={theme.colors.onBackground} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Animated.View>
    ) : (
      null
    )
  )
}