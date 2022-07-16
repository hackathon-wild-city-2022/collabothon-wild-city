//@ts-nocheck

import * as mobilenet from '@tensorflow-models/mobilenet';
import * as cocossd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';

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
  // model = await mobilenet.load();
  // model = await cocossd.load();
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
    'crocodile',
    'elephant',
    'fish',
    'makak',
    'ostrish',
    'other',
    'pinguin',
    'shark',
    'stingray'
  ];
}
