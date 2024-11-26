import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import MathViewFallback from 'react-native-math-view/src/fallback';

interface FlashcardProps {
  content: string;
  onFlip: () => void;
  cardColor: string;
  textColor: string;
  borderColor: string;
}

const { width, height } = Dimensions.get('window');

const Flashcard: React.FC<FlashcardProps> = ({ content, onFlip, cardColor, textColor, borderColor }) => {
  const parts = content.split(/(\$\$.*?\$\$|\$.*?\$)/);

  return (
    <TouchableOpacity onPress={onFlip} style={[styles.card, { backgroundColor: cardColor, borderColor: borderColor }]}>
      <View style={styles.contentContainer}>
        {parts.map((part, index) => {
          if (part.startsWith('$$') && part.endsWith('$$')) {
            return (
              <View key={index} style={styles.mathViewContainer}>
                <MathViewFallback
                  math={part.slice(2, -2)}
                  style={[styles.mathView, { color: textColor }]}
                  resizeMode="contain"
                />
              </View>
            );
          } else {
            return <Text key={index} style={[styles.text, { color: textColor }]}>{part}</Text>;
          }
        })}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    padding: 10,
    width: width * 0.85, // Smaller card width
    height: height * 0.5, // Smaller card height
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontFamily: 'System',
    textAlign: 'center',
    marginVertical: 10,
  },
  mathViewContainer: {
    height: 80,
    marginVertical: 10,
    transform: [{ scale: 1.5 }], // Scales up the inline math
    justifyContent: 'center',
    alignItems: 'center',
  },
  mathView: {
    flex: 1,
  },
});

export default Flashcard;
  