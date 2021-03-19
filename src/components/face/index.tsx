import React, { useCallback, useEffect, useRef, useState } from 'react';
import Video from '../video';
import * as faceApi from 'face-api.js';
import { PropsType } from '@types';
import './index.scss';

interface FaceProps extends PropsType {}

const videoWidth: number = 720;
const videoHeight: number = 360;

export default function Fece(props: FaceProps) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [initial, setInitial] = useState(false);

  const detectFace = useCallback(async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const displaySize = {
      width: videoWidth,
      height: videoHeight,
    };
    canvas.innerHTML = faceApi.createCanvasFromMedia(video);
    faceApi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
      if (initial) {
        setInitial(false);
      }
      const detections = await faceApi
        .detectAllFaces(video, new faceApi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      const resizedDetections = faceApi.resizeResults(detections, displaySize);
      canvas.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
      faceApi.draw.drawDetections(canvas, detections);
      faceApi.draw.drawFaceExpressions(canvas, detections);
      faceApi.draw.drawFaceLandmarks(canvas, detections);
    }, 100);
  }, [videoRef]);

  useEffect(() => {
    const loadModals = async () => {
      setInitial(true);
      const MODEL_URL = process.env.PUBLIC_URL + '/src/common/models';

      await faceApi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceApi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      await faceApi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      await faceApi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceApi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
    };

    loadModals();
  }, []);

  (window as any).f = faceApi;
  (window as any).v = videoRef;

  return (
    <div className={'face-container'}>
      <div className={'face-makeup-state'}>{initial ? 'initializing' : 'ready'}</div>
      <div className={'face-makeup-container'}>
        <Video
          className={'face-video'}
          ref={videoRef}
          width={videoWidth}
          height={videoHeight}
          onPlay={detectFace}
        />
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
