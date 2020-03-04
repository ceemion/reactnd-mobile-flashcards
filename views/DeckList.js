import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { getDecks } from '../utils/api';
import { receiveDecks } from '../actions';
import StyledText from '../components/StyledText';

const DeckItem = ({ id, title, cards, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Deck', {id})}>
      <StyledText style={styles.itemTitle}>
        { title }
      </StyledText>

      <StyledText style={styles.itemSubtitle}>
        { cards } {cards === 1 ? 'Card' : 'Cards'}
      </StyledText>
    </TouchableOpacity>
  )
}

const DeckList = ({ navigation, dispatch, decks }) => {
  useEffect(() => {
    getDecks().then(d => dispatch(receiveDecks(d)))
  }, [])

  return (
    <View style={styles.container}>
      { Object.keys(decks).length ? (
        <FlatList
          data={decks}
          renderItem={({item}) => (
            <DeckItem
              id={item.key}
              title={item.title}
              cards={item.cards}
              navigation={navigation}
            />
          )}
        />
      ) : (
        <View>
          <StyledText style={styles.noDecksText}>
            There are no card decks. Tap "New Deck" to get started.
          </StyledText>
        </View>
      ) }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16
  },
  noDecksText: {
    color: 'gray',
    textAlign: 'center',
  },
  item: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 8,
    padding: 20,
  },
  itemTitle: {
    fontSize: 24,
    marginBottom: 10,
  },
  itemSubtitle: {
    color: 'gray',
  },
});

const mapStateToProps = (decks) => {
  const formatDecks = Object.keys(decks).map(key => {
    return {
      key,
      title: decks[key].title,
      cards: decks[key].questions.length
    }
  });

  return {
    decks: formatDecks
  }
}

export default connect(mapStateToProps)(DeckList);
