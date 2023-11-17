// src/composables/useCannyEdgeDetection.ts
import * as cv from '@techstark/opencv-js';

export function useCannyEdgeDetection(originalImage: cv.Mat): cv.Mat {
  const cannyImage = new cv.Mat();
  const grayImage = new cv.Mat();

  // Convert the image to grayscale
  cv.cvtColor(originalImage, grayImage, cv.COLOR_RGBA2GRAY);

  // Apply GaussianBlur to reduce noise and improve Canny edge detection
  cv.GaussianBlur(grayImage, grayImage, new cv.Size(5, 5), 1.5, 1.5);

  // Apply Canny edge detection
  cv.Canny(grayImage, cannyImage, 50, 150, 3, false);

  // Release the memory used by Mats
  grayImage.delete();

  return cannyImage;
}

export function usePrewittEdgeDetection(originalImage: cv.Mat): cv.Mat {
  const prewittImage = new cv.Mat();
  const grayImage = new cv.Mat();

  // Convert the image to grayscale
  cv.cvtColor(originalImage, grayImage, cv.COLOR_RGBA2GRAY);

  // Apply Prewitt edge detection in the x-direction
  cv.Scharr(grayImage, prewittImage, cv.CV_8U, 1, 0);

  // Release the memory used by Mats
  grayImage.delete();

  return prewittImage;
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
