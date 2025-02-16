import { useState, useEffect, useContext } from "react";
import { View, Share, Platform } from "react-native";
import { useTheme } from "react-native-paper";
import { Text, Button } from '../../components';
import { QuestionCard } from '../../containers';
import { questions } from "../../data";
import { FavoritesContext, DislikedContext, ViewedContext } from "../../contexts";
import useStyles from './QuestionScreenStyles';

export default function QuestionScreen({ navigation, route }) {
  const { categories, viewType = 'all' } = route.params;
  const [allQuestions, setAllQuestions] = useState([]);
  const [displayIndex, setDisplayIndex] = useState(0);
  const { addToViewed, removeFromViewed } = useContext(ViewedContext);
  const [questionsLoaded, setQuestionsLoaded] = useState(false);
  const { favorites } = useContext(FavoritesContext);
  const { disliked } = useContext(DislikedContext);
  const theme = useTheme();
  const styles = useStyles(theme);

  const onNextQuestionPress = () => {
    addToViewed(allQuestions[displayIndex]);
    setDisplayIndex(displayIndex+1);
  }

  const onPreviousQuestionPress = () => {
    removeFromViewed(allQuestions[displayIndex+1]);
    setDisplayIndex(displayIndex-1);
  }

  const onSharePress = async (question) => {
    const shareUrl = 'https://connortyrrell.com/convocards';
    const content = {
      message: Platform.OS === 'ios' ? question.question : `${question.question}\n\nSent from the free Convo Card App ${shareUrl}`,
      url: Platform.OS === 'ios' ? shareUrl : undefined,
      title: `Convo Cards | ${question.category}`,
    };
    const options = {
      dialogTitle: `Convo Cards`,
      subject: 'I have a question for you!',
    };

    try {
      const result = await Share.share(content, options);
      /*
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with', result.activityType);
          // shared with activity type of result.activityType
        } else {
          console.log('shared');
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        // console.log('dismissed');
      }
      */
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
        // setDisplayIndex(newQuestions.length - 1);
      } else {
        setAllQuestions([]);
        setDisplayIndex(-1);
      }
      setQuestionsLoaded(true);
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
            numberOfItems={allQuestions.length}
          />
        )}
        {(allQuestions.length === 0 || displayIndex === allQuestions.length && questionsLoaded) && (
          <View style={{alignContent: 'center', justifyContent: 'center', marginTop: 100, marginHorizontal: 20,}}>
            <Text size={'XL'} style={{textAlign: 'center'}}>
              There are no more conversations in this pack. Please go home to select a new topic to talk about.
            </Text>
          </View>
        )}
        <View style={styles.navigationButtonContainer}>
          <Button textSize={'L'} textBold onPress={onPreviousQuestionPress} disabled={allQuestions.length === 0 || displayIndex === 0}>Previous</Button>
          <Button textSize={'L'} textBold onPress={onNextQuestionPress} disabled={allQuestions.length === 0 || displayIndex === (allQuestions.length)}>Next</Button>
        </View>
      </View>
    </View>
  )
}