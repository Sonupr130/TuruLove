import {useState} from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';
import Video from 'react-native-video';

const Explore = () => {

  const [feedback, setFeedback] = useState('');

  const handleFeedbackSubmit = () => {
    // Handle feedback submission logic here
    console.log('Feedback submitted:', feedback);
  };


  return (
    <View style={styles.container}>
      <Video
        source={require('../assets/Meow.mp4')}
        style={styles.video}
        repeat={true}
        paused={false}
        resizeMode="cover"
        controls={false} // Hide video controls
      />
      <Text style={styles.text}>We're actively working on this page right now! 🤡</Text>
      {/* <View style={styles.feedbackContainer}>
        <TextInput
          style={styles.feedbackInput}
          placeholder="Enter your feedback..."
          onChangeText={(text) => setFeedback(text)}
          multiline
        />
        <Button title="Submit Feedback" onPress={handleFeedbackSubmit} />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7EEED',
  },
  video: {
    width: '50%',
    aspectRatio: 1,
  },
  text: {
    marginTop: 10,
    textAlign: 'center',
    color: '#000000',
    fontWeight: '400',
  },
  feedbackContainer: {
    marginTop: 20,
    width: '80%',
  },
  feedbackInput: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default Explore;
