export interface ImageInfoType {
  bitsPerPixel: number;
  fileSize: number;
  height: number;
  width: number;
}

export interface AllImage {
  type: string;
  data: Iterable<number>;
}

export interface AllImageData {
  file: AllImage;
  name: string;
}

export interface AllImageUrl {
  imageBlob: string;
  name: string;
  imageBuffer: Iterable<number>;
}
