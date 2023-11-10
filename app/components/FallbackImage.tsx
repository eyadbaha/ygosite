"use client";
import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

interface FallbackImageProps extends ImageProps {
  fallback: string;
}

export default (props: FallbackImageProps) => {
  const [imageSrc, setImageSrc] = useState(props.src);
  useEffect(() => {
    setImageSrc(props.src);
  }, [props.src]);
  return (
    <>
      <Image
        {...props}
        src={imageSrc}
        loading="lazy"
        onError={() => {
          imageSrc != props.fallback && setImageSrc(props.fallback);
        }}
      />
    </>
  );
};
