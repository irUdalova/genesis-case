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

        hls.on(Hls.Events.MEDIA_ATTACHED, function () {
          console.log('video and hls.js are now bound together !');
        });
        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
          console.log('manifest loaded, found ' + data.levels.length + ' quality level');
        });

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
