import { StatusBar } from 'expo-status-bar';
import React, {useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import AppleHealthKit, {HealthInputOptions, HealthKitPermissions} from 'react-native-health';
import {useEffect} from 'react';
import {db, auth} from './firebaseConfig';
import {doc, updateDoc, setDoc, addDoc, deleteDoc } from "firebase/firestore";

const permissions: HealthKitPermissions = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.Steps, AppleHealthKit.Constants.Permissions.FlightsClimbed],
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

  return (
    <View style={styles.container}>

      <View style={styles.container}>
        <Value label="Steps" value={steps.toString()} />
        <Value label="Flights Climbed" value={flights.toString()}/>
        <Button 
          //onPress = await addDoc(doc(db, 'collections')) {steps, flights}
          title = "Send To Trainer"
          color = "#FFFFFF"
          />

      </View>

      <View style={{ flexDirection: 'row'}}>
        <View style = {styles.valueContainer}>
          <Text style = {styles.label}>Steps</Text>
          <Text style = {styles.value}>5083</Text>
        </View>


        <View style = {styles.valueContainer}>
          <Text style = {styles.label}>Distance</Text>
          <Text style = {styles.value}>1.65 miles</Text>
        </View>

        
      </View>

      
      <View style = {styles.valueContainer}>
        <Text style = {styles.label}>Flights Climbed</Text>
        <Text style = {styles.value}>10 flights</Text>
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
});
