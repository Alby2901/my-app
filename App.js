
import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Alert, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

// import { StatusBar } from 'expo-status-bar';
// import QRCode from 'react-native-qrcode-svg';

export default function App() {

  // const barcodeValueJS = {nome: 'Alberto', numero:'123'};

  // return (
  //   <View style={styles.container}>
  //       <QRCode value={JSON.stringify(barcodeValueJS)}></QRCode>
  //       <Text>Ciao Mondo!</Text>
  //       <Button
  //           style={styles.button}
  //           title="Vai a Pagina 2"
  //           onPress={() =>
  //           navigation.navigate('Pagina2', {name: 'Pagina 2'})
  //           }></Button>
  //       <Button 
  //           style={styles.button}
  //           title="Vai a Pagina 3"
  //           onPress={() =>
  //           navigation.navigate('Pagina3', {name: 'Pagina 3'})
  //           }>
  //       </Button>
  //       <StatusBar style="auto" />
  //   </View>
  //   );

  const [loading, setLoading] = useState(true);
  const [scanData, setScanData]= useState("");
  const [permission, setPermission] = useState(true); 

  useEffect( ()=>{
      requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const {status, granted} = await BarCodeScanner.requestPermissionsAsync();
    //   console.log(`Status: ${status}, granted: ${granted}`)

      if (status ==='granted')
      {
        //   console.log('access granted');
          setPermission(true);
      } else {
          setPermission(false);
      }
      
    } catch (error) {
        // console.log(error);
        setPermission(false);
      
    } finally {
      setLoading(false)
    }

  };

  if(loading)
      return (
          <View style={styles.container}>
              <Text>requesting permision...</Text>
          </View>
      );

  if (scanData) {
    //   Alert.alert('ScanData ok');  
      return (
          <View style={styles.container}>
              <Text>{scanData}</Text>
              <Button title="ScanAgain" onPress={ () => setScanData(undefined)}></Button>
          </View>
      )};

  if (permission) {
    //   Alert.alert('Permission ok');
      return (
                <BarCodeScanner
                style={[styles.container]}
                onBarCodeScanned={({ type, data }) => {
                    try {
                        //   console.log("Tipo dato: " + type);
                        //   console.log("Dato: " + data);
                        //   // let _data = JSON.parse(data);
                        //   let _data = data;
                        setScanData(data);
                    } catch (error) {
                        //   console.error('Unable to parse string: ', error);
                    }
                }}>
                <Text style={styles.text1}>Scan the QR code.</Text>
                </BarCodeScanner>
          );
    } else {
        return <Text style={styles.textError}>Permission rejected.</Text>;
    }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 10,
    marginLeft: 100,
    marginRight: 100,
    marginBottom: 10,
    backgroundColor: 'red',
  },
  text: {
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
    },
    text1: {
      // marginLeft: 20,
      // marginRight: 20,
      backgroundColor: 'red',
      color: 'white',
      textAlign: 'center',
    },
 });
