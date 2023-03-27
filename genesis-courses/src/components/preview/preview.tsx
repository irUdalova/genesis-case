import React, { useState } from 'react';

type PreviewImageParams = {
  path: string;
  title: string;
  className: string;
};

export function Preview({ path, title, className }: PreviewImageParams) {
  const fallbackUrl = '/assets/img/no-img.webp';
  const [imgUrl, setImgUrl] = useState(path);

  return (
    <img
      className={className}
      src={imgUrl}
      alt={title}
      onError={() => {
        setImgUrl(fallbackUrl);
      }}
    />
  );
}
