import { StatusBar } from 'expo-status-bar';
import {useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppleHealthKit, {HealthInputOptions, HealthKitPermissions} from 'react-native-health';
import {useEffect} from 'react';

const permissions: HealthKitPermissions = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.Steps],
    write: [],
  },
};

export default function App() {
  const [hasPermissions, setHasPermission] = useState(false);

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
      date: new Date().toISOString(),
      includeManuallyAdded: false,
    };

    AppleHealthKit.getStepCount(options, (err, results) => {
    if (err) {
      console.log("Error getting the steps");
    }
    console.log(results);
  });
  }, [hasPermissions]);

  return (
    <View style={styles.container}>
      <Text>Reyan Ghanim</Text>

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
