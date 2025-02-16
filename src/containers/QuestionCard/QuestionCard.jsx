import { useContext } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import Animated, { SlideOutLeft, SlideInLeft } from 'react-native-reanimated';
import { Text, Icon } from '../../components';
import { FavoritesContext, DislikedContext } from "../../contexts";
import useStyles from './QuestionCardStyles';

const QuestionCard = (props) => {
  const { question, index, theme, displayIndex, favorites, disliked, numberOfItems, onSharePress } = props;
  const { onFavoritePress } = useContext(FavoritesContext);
  const { onDislikePress } = useContext(DislikedContext);
  const styles = useStyles(theme);
  const isFavorite = favorites.includes(question.id);
  const heartIcon = isFavorite ? 'heart' : 'heartOutline';
  const isDisliked = disliked.includes(question.id);
  const dislikedIcon = isDisliked ? 'thumbsDown' : 'thumbsDownOutline';

  const zIndex = numberOfItems - index;
  if(Math.abs(displayIndex - index) > 1) {
    return null;
  }
  return (
    displayIndex <= index ? (
      <Animated.View 
        key={question.id}
        style={[styles.card, {zIndex: zIndex}]}
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

export default QuestionCard;
