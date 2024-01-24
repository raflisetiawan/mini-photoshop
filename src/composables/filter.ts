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

export function useAverageFilter(originalImage: cv.Mat): cv.Mat {
  const filteredImage = new cv.Mat();
  const grayImage = new cv.Mat();

  cv.cvtColor(originalImage, grayImage, cv.COLOR_RGBA2GRAY);
  cv.blur(grayImage, filteredImage, new cv.Size(5, 5));
  grayImage.delete();

  return filteredImage;
}

export function useSimpleThresholding(
  originalImage: cv.Mat,
  thresholdValue: number
): cv.Mat {
  const thresholdedImage = new cv.Mat();
  const grayImage = new cv.Mat();

  // Convert the image to grayscale
  cv.cvtColor(originalImage, grayImage, cv.COLOR_RGBA2GRAY);

  // Apply simple thresholding
  cv.threshold(
    grayImage,
    thresholdedImage,
    thresholdValue,
    255,
    cv.THRESH_BINARY
  );

  // Release the memory used by Mats
  grayImage.delete();

  return thresholdedImage;
}

export function useSobelEdgeDetection(originalImage: cv.Mat): cv.Mat {
  const sobelImage = new cv.Mat();
  const grayImage = new cv.Mat();

  // Convert the image to grayscale
  cv.cvtColor(originalImage, grayImage, cv.COLOR_RGBA2GRAY);

  // Apply Sobel edge detection in the x and y directions
  cv.Sobel(grayImage, sobelImage, cv.CV_8U, 1, 0);
  cv.Sobel(grayImage, sobelImage, cv.CV_8U, 0, 1);

  // Release the memory used by Mats
  grayImage.delete();

  return sobelImage;
}
