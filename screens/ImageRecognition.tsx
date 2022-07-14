//@ts-nocheck

import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO, decodeJpeg } from '@tensorflow/tfjs-react-native';
import * as FileSystem from 'expo-file-system';
import { useMemo } from 'react';

class L2 {
  static className = 'L2';

  constructor(config) {
    return tf.regularizers.l1l2(config);
  }
}
tf.serialization.registerClass(L2);

let model = null;

export const loadModel = async () => {
  await tf.ready();
  if (model) {
    return model;
  }
  model = await tf
    .loadLayersModel('http://zoo.dwiegodzinydonikad.pl/model.json')
    .catch((e) => {
      console.log('[LOADING ERROR] info:', e);
    });
  console.log("Model loaded from: http://zoo.dwiegodzinydonikad.pl/model.json ");
  return model;
};

export const getPredictions = async (model, tensor_image) => {
  const imageTensorReshaped = tensor_image.expandDims(0);
  const predictions: tf.Tensor = model.predict(imageTensorReshaped, 1) as tf.Tensor;
  // console.log(await predictions.data());
  return predictions.data();
};

export const getLabels = () => {
  return [
    'anoa',
    'bear',
    'boar',
    'crocodile',
    'duck',
    'elephant',
    'fish',
    'makak',
    'orangutan',
    'ostrish',
    'other',
    'otter',
    'pinguin',
    'shark',
    'stingray',
    'wikunia'
  ];
}
