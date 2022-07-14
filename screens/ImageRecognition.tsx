//@ts-nocheck

import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO, decodeJpeg } from '@tensorflow/tfjs-react-native';
import * as FileSystem from 'expo-file-system';
import { useMemo } from 'react';

// import modelJSON from "../imageRecognition/model.json"
// import modelWeights from "../imageRecognition/group1-shard1of1.bin"

// import modelJSON from "http://zoo.dwiegodzinydonikad.pl/model.json";

class L2 {
  static className = 'L2';

  constructor(config) {
    return tf.regularizers.l1l2(config);
  }
}
tf.serialization.registerClass(L2);

let model = null;

// const modelJSON = require('../imageRecognition/model.json');
// const modelWeights = require('../imageRecognition/group1-shard1of1.bin');

const loadModel = async () => {
  //.ts: const loadModel = async ():Promise<void|tf.LayersModel>=>{
  // const model = await tf.loadLayersModel(bundleResourceIO(modelJSON, modelWeights)).catch((e) => {
  //   console.log('[LOADING ERROR] info:', e);
  // });
  await tf.ready();
  model = await tf
    .loadGraphModel('http://zoo.dwiegodzinydonikad.pl/model.json')
    .catch((e) => {
      console.log('[LOADING ERROR] info:', e);
    });

  return model;
};

// const makePredictions = async ( batch: any, model: { predict: (arg0: any) => any; }, imagesTensor: any )=>{
const makePredictions = async (
  batch: number,
  model: tf.LayersModel,
  imagesTensor: tf.Tensor<tf.Rank>
): Promise<tf.Tensor<tf.Rank>[]> => {
  const predictionsdata: tf.Tensor = model.predict(imagesTensor, { batchSize: 1 }) as tf.Tensor;
  return predictionsdata.data();
};

export const getPredictions = async (tensor_image) => {
  const model = (await loadModel()) as tf.LayersModel;
  const imageTensorReshaped = tensor_image.expandDims(0);
  const predictions = await makePredictions(1, model, imageTensorReshaped);
  return predictions;
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
    'otter',
    'pinguin',
    'shark',
    'stingray',
    'wikunia'
  ];
}