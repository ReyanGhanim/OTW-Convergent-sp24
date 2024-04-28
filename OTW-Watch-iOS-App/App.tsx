import { StatusBar } from 'expo-status-bar';
import React, {useState } from 'react';
import { Button, StyleSheet, Text, View, Alert } from 'react-native';
import AppleHealthKit, {HealthInputOptions, HealthKitPermissions} from 'react-native-health';
import {useEffect} from 'react';
import {db, auth} from './firebaseConfig';
import {doc, updateDoc, setDoc, addDoc, deleteDoc, collection} from "firebase/firestore";

const permissions: HealthKitPermissions = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.Steps, AppleHealthKit.Constants.Permissions.FlightsClimbed
    , AppleHealthKit.Constants.Permissions.SleepAnalysis, AppleHealthKit.Constants.Permissions.HeartRate],
    write: [],
  },
};

const Value = ({ label, value }) => (
  <View style={styles.valueContainer}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);


export default function App() {
  const [hasPermissions, setHasPermission] = useState(false);
  const [steps, setSteps] = useState(0);
  const [flights, setFlights] = useState(0);

  useEffect(() => {
    AppleHealthKit.initHealthKit(permissions, (err) => {
        if (err) {
            console.log("Error getting permissions");
            return;
        }
        setHasPermission(true);
    });
  }, []);

  useEffect(() => {
    if (!hasPermissions) {
      return;
    }

    const options: HealthInputOptions = {
      date: new Date(2023, 4, 15).toISOString(),
      includeManuallyAdded: false,
    };

    AppleHealthKit.getStepCount(options, (err, results) => {
    if (err) {
      console.log("Error getting the steps");
    }
    console.log(results);
    setSteps(results.value);
  });

    AppleHealthKit.getFlightsClimbed(options, (err, results) => {
    if (err) {
      console.log("Error getting the steps");
    }
    console.log(results);
    setFlights(results.value);
  });

  }, [hasPermissions]);
  

  const sendToTrainer = async () => {
    try {
      const healthData = {
        steps: 5083,
        weeklyAverageSteps: 6247,
        flightsClimbed: 10,
        hoursSlept: "7hr 35min",
        activeCaloriesBurned: "199 cal"

        // Add other health data here
      };

      await addDoc(collection(db, 'healthData'), healthData);
      Alert.alert("Data Successfully Sent", "Your health data has been sent to the trainer successfully!");
      console.log("Health data sent to trainer successfully!");
    } catch (error) {
      console.error("Error sending health data to trainer:", error);
    }
  };

  
  return (
    <View style={styles.container}>

      <View style={styles.container}>
        <Value label="Today's Steps" value={5083} />
        <Value label="Weekly Average Steps" value = {6247} />
        <Value label="Flights Climbed" value={"7 flights"}/>
        <Value label="Hours Slept" value={"7hr 35min"}/>
        <Value label="Active Calories Burned" value={"199 cal"}/>
      </View>

      <View style= {styles.btn}>
      <Button 
          onPress = {sendToTrainer}
          title = "Send To Trainer"
          color = "black"
          />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    padding: 12,
  },
  valueContainer: {
    marginRight: 50,
    marginVertical: 10,
  },
  label: {
    color: "white",
    fontSize: 20,
  },
  value: {
    fontSize: 35,
    color: '#AFB3BE',
    fontWeight: '500',
  },
  btn: {
    backgroundColor: "white",
    fontSize: 36,
    marginBottom: 200
  }
});
