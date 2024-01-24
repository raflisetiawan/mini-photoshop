import * as cv from '@techstark/opencv-js';

interface HistogramData {
  values: number[];
  maxValue: number;
}

export function useHistogram() {
  const calculateHistogram = (image: cv.Mat): HistogramData => {
    const histogram = new cv.Mat();
    const channels = [0];
    const histSize = [256];
    const ranges = [0, 256];

    let grayImage = new cv.Mat();

    // Convert the image to grayscale if it has multiple channels
    if (image.channels() > 1) {
      cv.cvtColor(image, grayImage, cv.ColorConversionCodes.COLOR_RGBA2GRAY);
    } else {
      grayImage = image.clone();
    }

    cv.calcHist(
      [grayImage],
      channels,
      new cv.Mat(),
      histogram,
      histSize,
      ranges
    );

    const values = Array.from(histogram.data32F);
    const maxValue = Math.max(...values);

    // Release the Mats to avoid memory leaks
    grayImage.delete();
    histogram.delete();

    return {
      values,
      maxValue,
    };
  };

  const calculateNormalizedHistogram = (image: cv.Mat): HistogramData => {
    const histogramData = calculateHistogram(image);
    const totalPixels = image.rows * image.cols;

    const normalizedValues = histogramData.values.map(
      (value) => value / totalPixels
    );

    return {
      values: normalizedValues,
      maxValue: Math.max(...normalizedValues),
    };
  };

  const drawHistogram = (
    ctx: CanvasRenderingContext2D,
    data: HistogramData
  ): void => {
    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const barWidth = ctx.canvas.width / data.values.length;

    data.values.forEach((value, index) => {
      const barHeight = (value / data.maxValue) * ctx.canvas.height;

      // Draw histogram bar
      ctx.fillStyle = 'black';
      ctx.fillRect(
        index * barWidth,
        ctx.canvas.height - barHeight,
        barWidth,
        barHeight
      );
    });
  };

  return {
    calculateHistogram,
    calculateNormalizedHistogram,
    drawHistogram,
  };
}
