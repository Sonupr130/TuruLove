import React, { useEffect } from 'react';
import { View, Text, NativeBaseProvider } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigation.navigate('TabNavigation');
    }, 3000);

    // Clear the timeout if the component unmounts before it fires
    return () => clearTimeout(timeoutId);
  }, [navigation]);

  return (
    <NativeBaseProvider>
      <View bgColor='#F21F90' flex={1}>
        <Text fontSize='5xl' fontWeight='semibold' color='#ffffff' marginTop='300px' alignSelf='center' >TuruLove.</Text>
        </View>
        <View bgColor="#F21F90">
        <Text fontSize='sm' fontWeight='medium' color='#ffffff' marginY='110px' alignSelf='center'>Aapke Prem Mein Kitna Hai Pyaar? #PremPariksha</Text>
        </View>
    </NativeBaseProvider>
  );
};

export default Splash;

// flex={1} justifyContent='center' alignItems='center'