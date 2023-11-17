import * as cv from '@techstark/opencv-js';

import { ref, Ref } from 'vue';

async function loadImage(imageFile: File | undefined | any): Promise<cv.Mat> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target) {
        const img = new Image();
        img.onload = () => {
          // Create a canvas element and draw the image on it
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          context?.drawImage(img, 0, 0, img.width, img.height);

          // Convert the canvas to a cv.Mat
          const mat = cv.imread(canvas);
          resolve(mat);
        };
        img.src = event.target.result as string;
      } else {
        reject(new Error('Failed to read image file'));
      }
    };
    reader.readAsDataURL(imageFile);
  });
}

function canvasToUrl(mat: cv.Mat): string {
  // Membuat elemen canvas
  const canvas = document.createElement('canvas');
  cv.imshow(canvas, mat);

  // Mengambil URL gambar dari elemen canvas
  const dataUrl = canvas.toDataURL('image/jpeg');

  // Menghapus elemen canvas yang sudah tidak diperlukan
  canvas.remove();

  return dataUrl;
}

interface ImageZoomOptions {
  initialZoom: number;
  minZoom: number;
  maxZoom: number;
}

export function useImageZoom(options: ImageZoomOptions) {
  const zoomFactor: Ref<number> = ref(options.initialZoom);

  const zoomIn = () => {
    if (zoomFactor.value < options.maxZoom) {
      zoomFactor.value += 0.1;
    }
  };

  const zoomOut = () => {
    if (zoomFactor.value > options.minZoom) {
      zoomFactor.value -= 0.1;
    }
  };

  const resetZoom = () => {
    zoomFactor.value = options.initialZoom;
  };

  return {
    zoomFactor,
    zoomIn,
    zoomOut,
    resetZoom,
  };
}

export function applyZoom(
  image: cv.Mat,
  canvasRef: Ref<null | HTMLCanvasElement>,
  imageZoom: any
): void {
  // Pastikan canvasRef ada dan bukan null
  if (canvasRef.value) {
    // Bersihkan canvas
    const ctx = canvasRef.value.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);

      // Hitung dimensi baru berdasarkan faktor zoom
      const newWidth = image.cols * imageZoom.zoomFactor.value;
      const newHeight = image.rows * imageZoom.zoomFactor.value;

      // Gambar gambar yang di-zoom pada canvas
      cv.resize(image, image, new cv.Size(newWidth, newHeight));
      cv.imshow(canvasRef.value, image);
    }
  }
}

export { loadImage, canvasToUrl };
