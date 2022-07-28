import {Box, FaceDetection, FaceLandmarks, Point} from 'face-api.js';

export interface IBox {
  x: number;
  y: number;
  width: number;
  height: number;
}
export interface IFaceDetection {
  score: number;
  box: Box;
}
export interface IFaceLandmarks {
  positions: Point[];
  shift: Point;
}
export type WithFaceDetection<TSource> = {
  detection: FaceDetection;
}
export type WithFaceLandmarks<TSource> = {
  unshiftedLandmarks: FaceLandmarks;
  landmarks: FaceLandmarks;
  alignedRect: FaceDetection;
}
export type WithFaceDescriptor<TSource> = {
  descriptor: Float32Array;
}
export type FaceExpression = 'neutral' | 'happy' | 'sad' | 'angry' | 'fearful' | 'disgusted' | 'surprised'

export type FaceExpressionPrediction = {
  expression: FaceExpression,
  probability: number
}

export type WithFaceExpressions<TSource> = {
  expressions: FaceExpressionPrediction[];
}







