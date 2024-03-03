import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LoveCardScreen = ({ firstName, secondName, lovePercentage }) => {
    return (
      <View style={Styles.cardContainer}>
        <View style={Styles.card}>
          <Text style={Styles.title}>IshqMeter</Text>
          <Text style={Styles.names}>{firstName} ❤️‍🔥 {secondName}</Text>
          <Text style={Styles.percentage}>{lovePercentage}%</Text>
        </View>
      </View>
    );
  };

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      cardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
        width: '90%', 
        aspectRatio: 16 / 9, 
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      title: {
        fontSize: 10,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#e44',
      },
      names: {
        fontSize: 16,
        marginBottom: 15,
        textAlign: 'center',
      },
      percentage: {
        marginTop: 2,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#e44',
        textAlign: 'center',
      },
      capturedImage: {
        width: 200,
        height: 200,
        marginTop: 10,
      },
})

export default LoveCardScreen;
