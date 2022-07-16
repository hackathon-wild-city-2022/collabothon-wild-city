import { useNavigation } from '@react-navigation/native';
import * as tf from '@tensorflow/tfjs';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import { Camera } from 'expo-camera';
import { ExpoWebGLRenderingContext } from 'expo-gl';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Animated, Easing, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AllAnimalsContext, CurrentAnimalContext } from '../App';
import { getLabels, getPredictions, loadModel } from './ImageRecognition';

const textureDims =
  Platform.OS === 'ios'
    ? {
      height: 1920,
      width: 1080
    }
    : {
      height: 1200,
      width: 1600
    };

const TensorCamera = cameraWithTensors(Camera);
let requestAnimationFrameId = 0;
const classLabels = getLabels();

const initialiseTensorflow = async () => {
  await tf.ready();
  tf.getBackend();
};

export default function TabTwoScreen() {
  const cameraRef = useRef(null);
  const { currentAnimal, setCurrentAnimal } = useContext(CurrentAnimalContext);
  const { allAnimals } = useContext(AllAnimalsContext);
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [detections, setDetections] = useState<string[]>([]);
  const [model, setModel] = useState<any>();

  let animalLocked = false;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      await initialiseTensorflow();
      setModel(await loadModel());
    })();
    return () => {
      setModel(null);
      setHasPermission(false);
    }
  }, []);

  const setAnimalContext = useCallback((animalName) => {
    if (animalLocked) return;
    const animal = allAnimals.filter((a) => a.aiName == animalName);
    if (animal.length > 0) {
      setCurrentAnimal(animal[0]);
    } else {
      setCurrentAnimal(null);
    }
  }, [allAnimals]);

  const openPopup = () => {
    if (currentAnimal) {
      animalLocked = true;
      navigation.navigate('PlayQuiz');
    }
  }

  const getPredictionsHandler = async (images: IterableIterator<tf.Tensor3D>, updatePreview: () => void, gl: ExpoWebGLRenderingContext) => {
    await initialiseTensorflow();
    setModel(await loadModel());

    let frameCount = 0;
    let makePredictionsEveryNFrames = 50;
    const loop = async () => {
      const nextImageTensor = images.next().value;

      if (nextImageTensor && model) {
        if (frameCount % makePredictionsEveryNFrames === 0) {
          const predictions = await getPredictions(model, nextImageTensor);

          // const objects = await model.detect(nextImageTensor);
          // console.log(objects);
          // const detected = objects
          //   // .filter(o => o.probability > 0.5)
          //   .sort((a, b) => { return b.score - a.score; })
          //   .filter((a) => {
          //     return classLabels.filter((b) => {
          //       return a.class == b;
          //     }).length > 0
          //   })
          //   .map((object: any) => object.class)
          // setDetections(detected);
          // console.log(detected);

          const merged = classLabels.reduce((obj, key, index) => ({ ...obj, [key]: predictions[index] }), {});
          console.log(merged);

          if (Math.max(...predictions) > 0.9) {
            const maxKey = predictions.indexOf(Math.max(...predictions));
            console.log("maxKey", classLabels[maxKey], Math.max(...predictions));
            if (classLabels[maxKey] != "other" && animalLocked == false) {
              setDetections([classLabels[maxKey]]);
              setAnimalContext(classLabels[maxKey]);
            } else {
              setDetections([]);
            }
          } else {
            setDetections([]);
          }
        }
      }
      tf.dispose([nextImageTensor]);
      frameCount += 1;
      frameCount = frameCount % makePredictionsEveryNFrames;
      if (animalLocked == false) {
        requestAnimationFrameId = requestAnimationFrame(loop);
      }
      // updatePreview();
      // gl.endFrameEXP();
    }
    loop();
  }

  useEffect(() => {
    return () => {
      // cancelAnimationFrame(requestAnimationFrameId);
    };
  }, [requestAnimationFrameId]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <TensorCamera
        ref={cameraRef}
        style={styles.camera}
        onReady={getPredictionsHandler}
        type={Camera.Constants.Type.back}

        resizeHeight={300}
        resizeWidth={152}
        resizeDepth={3}
        autorender={true}
        useCustomShadersToResize={false}
      />
      <TouchableOpacity onPress={openPopup} style={styles.text}>
        <View style={styles.text}>
          {detections.map((detection, index) => (
            <Text style={styles.textRed} key={index}>
              {detection}
            </Text>
          ))}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    flex: 1,
    // backgroundColor: '#fff',
    // color: 'red',
  },
  textRed: {
    color: 'red',
    fontSize: 24,
  },
  camera: {
    flex: 10,
    width: '100%'
  }
});
