import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
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
