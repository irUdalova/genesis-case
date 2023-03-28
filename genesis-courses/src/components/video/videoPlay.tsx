import React, { MutableRefObject, useEffect } from 'react';
import Hls from 'hls.js';
import './videoPlay.scss';

type TVideoParams = {
  videoRef: MutableRefObject<HTMLVideoElement>;
  src: string;
  poster: string;
};

export function VideoPlay({ videoRef, src, poster }: TVideoParams) {
  useEffect(() => {
    if (videoRef.current && src) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoRef.current);
      }
    }
  }, [src, videoRef]);

  return (
    <>
      <video className="video" ref={videoRef} src={src} poster={poster} controls>
        {' '}
      </video>
    </>
  );
}
