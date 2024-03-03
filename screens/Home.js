import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Keyboard} from 'react-native';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import Toast from 'react-native-toast-message';

import {
  View,
  Text,
  NativeBaseProvider,
  Box,
  Button,
  Input,
  Spinner,
  Pressable,
  Image,
  Modal,
} from 'native-base';

import ShareIcon from '../assets/share.png';

const Home = () => {
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [savedNames, setSavedNames] = useState([]);
  const [lovePercentage, setLovePercentage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const viewShotRef = useRef(null);

  const onSharePress = async () => {
    if (viewShotRef.current) {
      try {
        const uri = await viewShotRef.current.capture();
        if (uri) {
          const options = {
            type: 'image/jpeg',
            title: 'Share via',
            message: 'Check out our love card!',
            url: uri,
          };
          await Share.open(options);
        } else {
          console.log('Error capturing image.');
        }
      } catch (error) {
        console.log('Error sharing image:', error);
      }
    }
  };

  // CALCULATE LOVE PERCENTAGE METHOD
  const calculateLovePercentage = async () => {
    Keyboard.dismiss();

    if (!firstName || !secondName) {
      alert('Please fill in both names!! 🤨');
      return;
    }

    setLoading(true);
    setSavedNames([{firstName, secondName}]);

    setFirstName('');
    setSecondName('');

    setTimeout(async () => {
      const calculatedLovePercentage = Math.random() * 100;
      setLovePercentage(calculatedLovePercentage.toFixed(2));
      setLoading(false);

      setShowModal(true);
    }, 1000);
  };

  const onInputChange = (input, text) => {
    if (input === 'first') {
      setFirstName(text);
    } else if (input === 'second') {
      setSecondName(text);
    }
    setIsButtonEnabled(!!text && !!secondName);
  };

  function ShareCard() {
    return (
      // <ViewShot ref={viewShotRef} options={{format: 'jpg', quality: 0.9}}>
      <View style={Styles.modalContent}>
        {savedNames.map(({firstName, secondName}, index) => (
          <Text key={index} style={Styles.savedNamesText}>
            {firstName} ❤️‍🔥 {secondName}
          </Text>
        ))}
        <Text style={Styles.lovePercentageText}>{lovePercentage}%</Text>
        {lovePercentage >= 0 && lovePercentage <= 20 && (
          <Text style={Styles.moyeMoyeText}>Moye Moye 🙂</Text>
        )}
        <Text style={Styles.cardLogo}>TuruLove</Text>
      </View>
      //  {/* </ViewShot> */}
    );
  }

  // const onDownloadPress = async () => {
  //   if (viewShotRef.current) {
  //     try {
  //       const uri = await viewShotRef.current.capture();

  //       if (uri) {
  //         const fileName = 'LoveCard.jpg';
  //         const destinationPath = RNFS.DocumentDirectoryPath + '/' + fileName;

  //         // Copy the image
  //         await RNFS.copyFile(uri, destinationPath);

  //         // Display success toast message with ease-in/ease-out animation
  //         Toast.show({
  //           type: 'success',
  //           text1: 'Image downloaded successfully!',
  //           visibilityTime: 2000,
  //           autoHide: true,
  //           topOffset: 30,
  //           position: 'top',
  //           onHide: () => console.log('Toast hidden'),
  //           onShow: () => console.log('Toast shown'),
  //         });
  //       } else {
  //         console.error('Error capturing image.');
  //       }
  //     } catch (error) {
  //       console.error('Error downloading image:', error);
  //     }
  //   }
  // };

  return (
    <NativeBaseProvider>
      <View style={{flex: 1}} bgColor="#F7EEED">
        <Box flex={1}>
          <Text
            marginTop="20"
            fontWeight="semibold"
            fontSize="5xl"
            marginLeft="5"
            color="#F21F90">
            TuruLove
          </Text>

          <Text fontWeight="normal" fontSize="lg" marginLeft="5">
            Check Your TuruLove! ❤‍🔥
          </Text>

          <Box style={Styles.inpBox} marginTop="16">
            <Text fontWeight="medium">YOUR NAME</Text>
            <Input
              variant="underlined"
              fontWeight="medium"
              placeholder="Enter Your Name"
              value={firstName}
              autoCapitalize="characters"
              onChangeText={text => onInputChange('first', text)}
            />

            <Text style={Styles.inpTxt} fontWeight="medium">
              PARTNER NAME
            </Text>
            <Input
              fontWeight="medium"
              variant="underlined"
              placeholder="Enter your Partner Name"
              value={secondName}
              autoCapitalize="characters"
              onChangeText={text => onInputChange('second', text)}
            />

            <Button
              onPress={calculateLovePercentage}
              style={{
                ...Styles.chkBtn,
                backgroundColor: isButtonEnabled ? '#F21F90' : 'grey',
              }}
              disabled={!isButtonEnabled}>
              Check It !
            </Button>

            <View style={Styles.loaderContainer}>
              {loading && (
                <View>
                  <Spinner accessibilityLabel="Loading posts" color='#e44'/>
                  <Text color="black" fontSize="md">
                    Jara Rukiye! 🤡
                  </Text>
                </View>
              )}
            </View>

            {/* MODAL */}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
              <Modal.Content style={Styles.mainOuterModel}>
                <Modal.Body style={Styles.modelBody}>
                  <ViewShot
                    ref={viewShotRef}
                    options={{format: 'jpg', quality: 1.0}}>
                    <View style={Styles.mainCard}>
                      <ShareCard />
                    </View>
                  </ViewShot>
                </Modal.Body>

                <View style={Styles.iconContainer}>
                  {/* SHARE BUTTON */}
                  <Pressable
                    onPress={onSharePress}
                    style={Styles.downloadIconContainer}>
                    <Image
                      source={ShareIcon}
                      alt="Download Icon"
                      height="30px"
                      width="30px"
                    />
                  </Pressable>

                  {/* DOWNLOAD BUTTON */}
                  {/* <Pressable
                    style={Styles.shareIconContainer}
                    onPress={onDownloadPress}>
                    <Image
                      source={DownloadIcon}
                      alt="Download Icon"
                      height="30px"
                      width="30px"
                    />
                  </Pressable> */}
                </View>
                <Text style={Styles.myTxt}>Share with your Partner! 😉</Text>
              </Modal.Content>
            </Modal>
          </Box>
        </Box>
      </View>
    </NativeBaseProvider>
  );
};

const Styles = StyleSheet.create({
  // MAIN OUTER MODEL
  mainOuterModel: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    // backgroundColor: 'yellow',
    backgroundColor: '#ffffff',
    paddingTop: 0,
    paddingBottom: 20,
    paddingRight: 0,
    paddingLeft: 0,
  },

  modelBody: {
    paddingLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    // backgroundColor: 'green',
    // backgroundColor: '#ffffff',
    marginLeft: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    // marginRight: 300,
  },

  mainCard: {
    height: 250,

    width: 354,
    // width: '100%',

    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    maxWidth: 'auto',
    flex: 1,
    paddingLeft: 10,
    paddingRight: 30,
    paddingTop: 22,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    // backgroundColor: 'pink',
  },

  // INNER MODEL CARD CONTENT
  modalContent: {
    renderToHardwareTextureAndroid: true,
    marginLeft: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 0,
    marginTop: 10,
    marginBottom: 30,
    padding: 20,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: 'auto',
    borderRadius: 10,
    elevation: 15,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },

  myTxt: {
    paddingTop: 25,
    bottom: 10,
    fontWeight: '500',
  },

  cardLogo: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingTop: 30,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#e44',
  },

  // NAMES
  savedNamesText: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },

  // LOVE PERCENTAGE TEXT
  lovePercentageText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    fontSize: 36,
    fontWeight: '800',
    color: '#e44',
    textAlign: 'center',
    paddingTop: 20,
  },

  // ICON CONTAINER
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  inpBox: {
    marginLeft: 20,
    marginRight: 20,
  },
  inpTxt: {
    marginTop: 20,
  },
  chkBtn: {
    marginTop: 40,
    width: '80%',
    alignSelf: 'center',
  },
  loaderContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  // downloadIconContainer: {
  //   marginRight: 20,
  // },
  // shareIconContainer: {
  //   marginLeft: 20,
  // },
  moyeMoyeText: {
    marginTop: 10,
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
  },
});

export default Home;
