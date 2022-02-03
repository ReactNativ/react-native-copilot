import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, Image, View, TouchableOpacity, Switch } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { copilot, walkthroughable, CopilotStep } from 'react-native-copilot';

const WalkthroughableText = walkthroughable(Text);
const WalkthroughableImage = walkthroughable(Image);
const WalkthroughableView = walkthroughable(View);

function App({ start, copilotEvents }) {

  const [secondStepActive, setSecondStepActive] = useState(true);


  useEffect(() => {
    copilotEvents.on('stepChange', handleStepChange);
    start();
  }, []);


  const handleStepChange = (step) => {
    console.log(`Current step is: ${step.name}`);
  }

  return (
    <View style={styles.container}>


      <CopilotStep text="Hey! This is the first step of the tour!" order={1} name="openApp">
        <WalkthroughableView style={styles.titleView}>
          <Text style={styles.title}>
            {'Welcome to the demo of\n"React Native Copilot"'}
          </Text>
        </WalkthroughableView>
      </CopilotStep>

      <View style={styles.middleView}>

        <CopilotStep
          text="Here goes your profile picture!" order={2} name="secondText">
          <WalkthroughableImage
            source={{ uri: 'https://pbs.twimg.com/profile_images/527584017189982208/l3wwN-l-_400x400.jpeg' }}
            style={styles.profilePhoto}
          />
        </CopilotStep>

        <View style={styles.activeSwitchContainer}>
          <Text>Profile photo step activated?</Text>
          <View style={{ flexGrow: 1 }} />
          <Switch
            onValueChange={secondStepActive => setSecondStepActive(secondStepActive)}
            value={secondStepActive}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={() => start()}>
          <Text style={styles.buttonText}>START THE TUTORIAL!</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <CopilotStep text="Here is an item in the corner of the screen." order={3} name="thirdText">
          <WalkthroughableText style={styles.buttonTab}>
            <Ionicons name="home" size={30} color="#888" />
          </WalkthroughableText>
        </CopilotStep>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
  },
  titleView: {
    justifyContent: 'center',
    height: 80,
    backgroundColor: '#aaa',
    marginTop: 20
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  profilePhoto: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginVertical: 20,
  },
  middleView: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2980b9',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonTab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    bottom: 0
  },
  row: {
    // flexDirection: 'row',
    //justifyContent: 'space-between',
    bottom: 0
  },
  tabItem: {
    flex: 1,
    textAlign: 'center',
  },
  activeSwitchContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // marginBottom: 20,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
});


App.propTypes = {
  start: PropTypes.func.isRequired,
  copilotEvents: PropTypes.shape({
    on: PropTypes.func.isRequired,
  }).isRequired,
};

export default copilot({
  verticalOffset: 25,
  animated: true, // Can be true or false
  overlay: 'svg', // Can be either view or svg
})(App);
