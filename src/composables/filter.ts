import * as cv from '@techstark/opencv-js';
export function applyMedianFilter(
  inputImage: cv.Mat,
  outputImage: cv.Mat,
  kernelSize: number
): void {
  // Pastikan kernelSize adalah bilangan ganjil
  if (kernelSize % 2 === 0) {
    throw new Error('Kernel size must be an odd number.');
  }

  // Salin inputImage ke outputImage
  inputImage.copyTo(outputImage);

  // Terapkan median filter
  cv.medianBlur(outputImage, outputImage, kernelSize);
}
