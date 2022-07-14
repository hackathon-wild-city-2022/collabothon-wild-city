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
    .loadLayersModel('http://zoo.dwiegodzinydonikad.pl/model.json')
    .catch((e) => {
      console.log('[LOADING ERROR] info:', e);
    });

  return model;
};

const transformImageToTensor = async (uri: string) => {
  //.ts: const transformImageToTensor = async (uri:string):Promise<tf.Tensor>=>{
  //read the image as base64
  console.log("transformImageToTensor", uri);
  const img64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64
  });
  const imgBuffer = tf.util.encodeString(img64, 'base64').buffer;
  const raw = new Uint8Array(imgBuffer);
  let imgTensor = decodeJpeg(raw);
  const scalar = tf.scalar(255);
  //resize the image
  imgTensor = tf.image.resizeNearestNeighbor(imgTensor, [150, 300]);
  //normalize; if a normalization layer is in the model, this step can be skipped
  const tensorScaled = imgTensor.div(scalar);
  //final shape of the rensor
  const img = tf.reshape(tensorScaled, [1, 300, 300, 3]);
  return img;
};

// const makePredictions = async ( batch: any, model: { predict: (arg0: any) => any; }, imagesTensor: any )=>{
const makePredictions = async (
  batch: number,
  model: tf.LayersModel,
  imagesTensor: tf.Tensor<tf.Rank>
): Promise<tf.Tensor<tf.Rank>[]> => {
  //cast output prediction to tensor
  // const predictionsdata= model.predict(imagesTensor)
  const predictionsdata: tf.Tensor = model.predict(imagesTensor, { batchSize: 1 }) as tf.Tensor;
  let pred = predictionsdata.split(batch); //split by batch size
  //return predictions
  return pred;
};

export const getPredictions = async (tensor_image) => {
  const model = (await loadModel()) as tf.LayersModel;
  const imageTensorReshaped = tensor_image.expandDims(0);
  const predictions = await makePredictions(1, model, imageTensorReshaped);
  return predictions;
};
