import React, { useState, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Text, Modal, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Flashcard from '@/components/Flashcard';
import { Colors } from '@/constants/Colors';
import { Questions } from '@/constants/Questions';

const { width, height } = Dimensions.get('window');

type ThemeName = 'olivia' | 'botanical' | 'tiramisu';

export default function Index() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<ThemeName>('tiramisu'); // Default theme

  const themes = {
    olivia: Colors.olivia,
    botanical: Colors.botanical,
    tiramisu: Colors.tiramisu,
  };

  const currentColors = themes[selectedTheme];

  const nextCard = useCallback(() => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % Questions.length);
    setFlipped(false);
  }, []);

  const previousCard = useCallback(() => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + Questions.length) % Questions.length);
    setFlipped(false);
  }, []);

  const randomCard = useCallback(() => {
    setCurrentCardIndex((prevIndex) => {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * Questions.length);
      } while (newIndex === prevIndex);
      return newIndex;
    });
    setFlipped(false);
  }, []);

  const toggleFlip = useCallback(() => {
    setFlipped((prev) => !prev);
  }, []);

  const toggleDropdown = useCallback(() => {
    setDropdownVisible((prev) => !prev);
  }, []);

  const selectTheme = useCallback((theme: ThemeName) => {
    setSelectedTheme(theme);
    toggleDropdown(); // Hide dropdown after selection
  }, [toggleDropdown]);

  return (
    <View style={[styles.container, { backgroundColor: currentColors.background }]}>
      <Flashcard
        content={flipped ? Questions[currentCardIndex].answer : Questions[currentCardIndex].question}
        onFlip={toggleFlip}
        cardColor={currentColors.card}
        textColor={currentColors.accent}
        borderColor={currentColors.border}
      />
      <View style={styles.navigationContainer}>
        <NavButton icon="chevron-left" onPress={previousCard} color={currentColors.accent} />
        <NavButton icon="refresh-cw" onPress={randomCard} color={currentColors.accent} />
        <NavButton icon="chevron-right" onPress={nextCard} color={currentColors.accent} />
      </View>
      <TouchableOpacity style={styles.colorSelector} onPress={toggleDropdown}>
        <MaterialIcons name="palette" size={24} color={currentColors.accent} />
      </TouchableOpacity>
      <Modal transparent={true} visible={dropdownVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.dropdownContainer, { backgroundColor: currentColors.card }]}>
            <FlatList
              data={Object.keys(themes) as ThemeName[]} // Type assertion
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => selectTheme(item)}
                >
                  <Text style={[styles.dropdownText, { color: currentColors.accent }]}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

interface NavButtonProps {
  icon: React.ComponentProps<typeof Feather>['name'];
  onPress: () => void;
  color: string;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, onPress, color }) => (
  <TouchableOpacity onPress={onPress} style={styles.navButton}>
    <Feather name={icon} size={icon === "refresh-cw" ? 30 : 36} color={color} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  navButton: {
    padding: 10,
  },
  colorSelector: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 50,
    padding: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdownContainer: {
    borderRadius: 10,
    padding: 10,
    width: width * 0.6, // Adjust dropdown width as needed
    maxHeight: height * 0.4, // Adjust dropdown height as needed
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownText: {
    fontSize: 18,
  },
});