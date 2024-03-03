import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, Text, Pressable} from 'react-native';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';

// LOVE CARD
const LoveCard = ({username, partnerName, lovePercentage}) => {
  return (
    <View style={Styles.cardContainer}>
      <View style={Styles.card}>
        <View style={Styles.textContainer}>
          <Text style={Styles.names}>
            {username} ❤️‍🔥 {partnerName}
          </Text>
          <Text style={Styles.percentage}>{lovePercentage}%</Text>
        </View>
      </View>
      <Text style={Styles.title}>IshqMeter</Text>
    </View>
  );
};

// MAIN CARD SQUARE BOX
function MainCard() {
  const screenWidth = Dimensions.get('window').width;
  return (
    <>
      <ViewShot ref={cardRef} options={{format: 'jpg', quality: 1.0}}>
        <View
          style={{
            aspectRatio: 1 / 1,
            backgroundColor: '#F875AA',
            width: screenWidth,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <LoveCard username="John" partnerName="Jane" lovePercentage="85" />
        </View>
      </ViewShot>
    </>
  );
}

const ShareCard = () => {
  const cardRef = React.useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const captureCardImage = async () => {
    try {
      if (cardRef.current) {
        const uri = await cardRef.current.capture();
        setCapturedImage(uri);
      } else {
        console.error('Ref is null. Make sure the component is mounted.');
      }
    } catch (error) {
      console.error('Error capturing image:', error);
    }
  };

  const shareCardImage = async () => {
    try {
      await captureCardImage();
      if (capturedImage) {
        const shareOptions = {
          title: 'Share via',
          message: 'Check out this LoveCard',
          url: capturedImage,
          type: 'image/jpeg',
        };

        await Share.open(shareOptions);
      } else {
        console.error('No captured image available for sharing.');
      }
    } catch (error) {
      console.error('Error sharing image:', error);
    }
  };

  useEffect(() => {
    captureCardImage();
  }, []);

  return (
    <View style={Styles.container}>
      {/* <ViewShot ref={cardRef} options={{ format: 'jpg', quality: 1.0 }}> */}
      {/* <MainCard />   */}
      {/* </ViewShot> */}
      <View style={Styles.buttonContainer}>
        <Pressable onPress={shareCardImage} style={Styles.shareButton}>
          <Text style={Styles.shareButtonText}>Share</Text>
        </Pressable>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  shareButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#000'
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    elevation: 5,
    aspectRatio: 16 / 9,
    width: '80%',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 30,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  capturedImage: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 40,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#ffffff',
  },
  names: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
    color: '#000',
    fontWeight: '600',
  },
  percentage: {
    paddingTop: 10,
    fontSize: 36,
    fontWeight: '800',
    color: '#e44',
  },
});

export default ShareCard;
