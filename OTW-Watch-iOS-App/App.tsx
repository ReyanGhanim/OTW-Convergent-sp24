import { StatusBar } from 'expo-status-bar';
import React, {useState } from 'react';
import { Button, StyleSheet, Text, View, Alert, Image, TouchableOpacity } from 'react-native';
import AppleHealthKit, {HealthInputOptions, HealthKitPermissions} from 'react-native-health';
import {useEffect} from 'react';
import {db, auth} from './firebaseConfig';
import {doc, updateDoc, setDoc, addDoc, deleteDoc, collection} from "firebase/firestore";
import fitlyLogo from './fitly_logo.png';
import Icon from 'react-native-vector-icons/FontAwesome';

const permissions: HealthKitPermissions = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.Steps,AppleHealthKit.Constants.Permissions.SleepAnalysis, AppleHealthKit.Constants.Permissions.HeartRate, 
      AppleHealthKit.Constants.Permissions.ActiveEnergyBurned],
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


  }, [hasPermissions]);
  
  useEffect(() => {
    if (!hasPermissions) {
      return;
    }

    const options: HealthInputOptions = {
      date: new Date(2023, 4, 15).toISOString(),
      includeManuallyAdded: false,
    };

    AppleHealthKit.getHeartRateSamples(options, (err, results) => {
    if (err) {
      console.log("Error getting the heart rate");
    }

    
    console.log(results);
  });
}, [hasPermissions]);

useEffect(() => {
  if (!hasPermissions) {
    return;
  }

  const options: HealthInputOptions = {
    date: new Date(2023, 4, 15).toISOString(),
    includeManuallyAdded: false,
  };

  AppleHealthKit.getSleepSamples(options, (err, results) => {
  if (err) {
    console.log("Error getting the sleep samples");
  }

  
  console.log(results);
});
}, [hasPermissions]);

useEffect(() => {
  if (!hasPermissions) {
    return;
  }

  const options: HealthInputOptions = {
    date: new Date(2023, 4, 15).toISOString(),
    includeManuallyAdded: false,
  };

  AppleHealthKit.getActiveEnergyBurned(options, (err, results) => {
  if (err) {
    console.log("Error getting the energy burned");
  }

  
  console.log(results);
});
}, [hasPermissions]);

  const sendToTrainer = async () => {
    try {
      const healthData = {
        steps: 5083,
        weeklyAverageSteps: 5247,
        heartRate: "68 bpm",
        hoursSlept: "7hr 35min",
        activeCaloriesBurned: "199 cal"

      };

      await setDoc(doc(db, 'healthData', 'user_one'), healthData);
      Alert.alert("Data Successfully Sent", "Your health data has been sent to the trainer successfully!");
      console.log("Health data sent to trainer successfully!");
    } catch (error) {
      console.error("Error sending health data to trainer:", error);
    }
  };

  
  return (
    <View style={styles.container}>
      <Image source={fitlyLogo} style={styles.logo}/>

      <View style={styles.container}>
        <Value label="Today's Steps" value={5083} />
        <Value label="Weekly Average Steps" value = {5247} />
        <Value label="Heart Rate" value={"68 bpm"}/>
        <Value label="Hours Slept" value={"7hr 35min"}/>
        <Value label="Active Calories Burned" value={"199 cal"}/>
      </View>

      <View style= {styles.btn}>
      <Button 
          onPress = {sendToTrainer}
          title = "Send To Trainer"
          color = "white"
          />
          
      </View>

      <View style={styles.bottomDashboard}>
      <View style={styles.bottomButton}>
        <Icon name="cog" size={45} color="white" />
          

      </View>
        <View style={styles.bottomButton}>
        <Icon name="home" size={45} color="white" />
        </View>

        <View style={styles.bottomButton}>
        <Icon name="line-chart" size={45} color="white" />
        </View>

        <View style={styles.bottomButton}>
        <Icon name="user" size={45} color="white" />
        </View>
      </View>

      <StatusBar style="auto" />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 12,
  },
  valueContainer: {
    marginRight: 50,
    marginVertical: 10,
  },
  label: {
    color: "black",
    fontSize: 20,
  },
  value: {
    fontSize: 35,
    color: 'black',
    fontWeight: '500',
  },
  btn: {
    backgroundColor: "#088A20",
    fontSize: 36,
    marginBottom: 100,
    marginTop: 80,
    borderRadius: 10,
    fontWeight: 'bold'
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 30,
    marginTop: 30
  },
  bottomDashboard: {
    backgroundColor: "#088A20",
    height: 120,
    width: 410,
    marginLeft: -20,
    marginBottom: -20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

  },
  bottomButton: {
    backgroundColor: '#088A20',
    padding: 0,
    borderRadius: 10,
    paddingHorizontal: 0,


  },
  bottomButtonText: {
    color: 'white',
    fontSize: 26,
    textAlign: 'center',
    marginLeft: -10,
    marginBottom: 10,
    fontWeight: 'bold'
    
  },
});
