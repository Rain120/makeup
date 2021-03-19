import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import c from 'classnames';
import { message } from 'antd';
import './index.scss';
import { PropsType, WindowNavigator } from '@types';

interface IVProps {
  width?: number;
  height?: number;
}

interface VideoProps extends PropsType, IVProps {
  video?: boolean | IVProps;
  audio?: boolean;
  ref?: any;
  onPlay?: (e?: any) => void;
}

const errorMap = {
  NotAllowedError: '摄像头已被禁用，请在系统设置或者浏览器设置中开启后重试',
  AbortError: '硬件问题，导致无法访问摄像头',
  NotFoundError: '未检测到可用摄像头',
  NotReadableError: '操作系统上某个硬件、浏览器或者网页层面发生错误，导致无法访问摄像头',
  OverConstrainedError: '未检测到可用摄像头',
  SecurityError: '摄像头已被禁用，请在系统设置或者浏览器设置中开启后重试',
  TypeError: '类型错误，未检测到可用摄像头',
};

const videoConfig = { audio: false, video: { width: 720, height: 360 } };

const Video = forwardRef(function Video({ className, ...rest }: VideoProps, ref) {
  const videoRef = useRef(null);

  useImperativeHandle(ref, () => {
    return Object.assign(videoRef.current || {}, {
      start: cb => {
        startVideo();
      },
    });
  });

  const startVideo = useCallback(() => {
    const navigator: WindowNavigator = window.navigator;
    if (!navigator.mediaDevices) {
      navigator.mediaDevices = {};
    }

    if (!navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia = constraints => {
        const getUserMedia =
          navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.oGetUserMedia;

        if (!getUserMedia) {
          return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }

        return new Promise((resolve, reject) => {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      };
    }
    navigator.mediaDevices
      .getUserMedia({ ...videoConfig, ...rest })
      .then(function (stream) {
        const video = videoRef.current;
        if (video) {
          if ('srcObject' in video) {
            video.srcObject = stream;
          }
          video.onloadedmetadata = function (e) {
            video.play();
          };
        }
      })
      .catch(err => {
        if (errorMap[err.name]) {
          message.error(errorMap[err.name]);
        }
        console.log(err.name + ': ' + err.message);
      });
  }, [videoRef]);

  useEffect(() => {
    startVideo();
  }, [startVideo]);

  return (
    <div className={c('video-container', className)}>
      <video ref={videoRef} autoPlay={true} muted={true} {...rest} />
    </div>
  );
});

export default Video;
