import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { ImageInfoType } from 'src/models/image';

export const useImageStore = defineStore('image', {
  state: () => ({
    image: undefined as File | undefined,
    imagePath: '',
    imageName: '',
    imageInfo: {} as ImageInfoType,
    binaryImageName: '',
    binaryImagePath: '',
    grayscaleImageName: '',
    grayscaleImagePath: '',
    brightenImageName: '',
    brightenImagePath: '',
    negativeImageName: '',
    negativeImagePath: '',
    addImageName: '',
    addImageName2: '',
    subtractImageName: '',
    translationImageName: '',
    rotateImageName: '',
    flipImageName: '',
    zoomImageName: '',
    isTranslate: false,
    zoomFactor: 0,
    histogramValue: [],
    normalizeHistogramValue: [],
    equalizeHistogramValue: [],
    equalizeImageName: '',
    medianFilterImageName: '',
    allImages: [],
  }),
  actions: {
    async uploadImage(image: File) {
      console.log(image);

      this.image = image;
      const formData = new FormData();
      formData.append('image', image);

      const response = await api.post('image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      this.imagePath = response.data;
      this.imageName = this.getFileName(response.data);
      return this.getFileName(response.data);
    },
    async uploadImage2(image: File) {
      const formData = new FormData();
      formData.append('image', image);

      const response = await api.post('image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      this.addImageName2 = this.getFileName(response.data);
      return this.getFileName(response.data);
    },

    getFileName(pathName: string): string {
      // Split string berdasarkan karakter '\'
      const pathElements = pathName.split('\\');
      // Ambil elemen terakhir dari array yang dihasilkan
      const fileName = pathElements[pathElements.length - 1];

      return fileName;
    },
    async convertToBinary() {
      const response = await api.get(
        `image-processing/convert-binary/${this.imageName}`
      );
      this.binaryImageName = this.getFileName(response.data);
      this.binaryImagePath = response.data;
    },
    async convertToGrayscale() {
      const response = await api.get(
        `image-processing/convert-grayscale/${this.imageName}`
      );
      this.grayscaleImageName = this.getFileName(response.data);
      this.grayscaleImagePath = response.data;
    },

    async adjustBrightness(scalar: number) {
      const response = await api.get(
        `image-processing/brighten-image/${this.imageName}/${scalar}`
      );

      this.brightenImageName = this.getFileName(response.data);
      this.brightenImagePath = response.data;
    },

    async convertToNegative() {
      const response = await api.get(
        `image-processing/convert-negative/${this.imageName}`
      );

      this.negativeImageName = this.getFileName(response.data);
      this.negativeImagePath = response.data;
    },

    async addImages(secondImage: string) {
      const response = await api.get(
        `image-processing/add-images/${this.imageName}/${secondImage}`
      );

      this.addImageName = this.getFileName(response.data);
    },

    async subtractImage(secondImage: string) {
      const response = await api.get(
        `image-processing/subtract-images/${this.imageName}/${secondImage}`
      );
      this.subtractImageName = this.getFileName(response.data);
    },

    async translateImage(x: number, y: number) {
      this.isTranslate = !this.isTranslate;
      const response = await api.get(
        `image-processing/translate-image/${this.imageName}?offsetX=${x}&offsetY=${y}`
      );

      this.translationImageName = this.getFileName(response.data);
    },
    async rotateImage(degrees: number) {
      const response = await api.get(
        `image-processing/rotate-image/${this.imageName}?degrees=${degrees}}`
      );

      this.rotateImageName = this.getFileName(response.data);
    },
    async filterMedian(size: number) {
      const response = await api.get(
        `image-filter/median/${this.imageName}?size=${size}`
      );

      this.medianFilterImageName = this.getFileName(response.data);
    },

    async flipImage(axis: string) {
      const response = await api.get(
        `image-processing/flip-image/${this.imageName}?axis=${axis}`
      );

      this.flipImageName = this.getFileName(response.data);
    },

    async zoomImage(factor: number) {
      const response = await api.get(
        `image-processing/zoom-image/${this.imageName}?factor=${factor}`
      );

      this.zoomImageName = this.getFileName(response.data);
    },

    async getHistogram() {
      const response = await api.get(
        `image-processing/histogram/${this.imageName}`
      );

      this.histogramValue = response.data;
    },
    async getNormalizeHistogram() {
      const response = await api.get(
        `image-processing/normalized-histogram/${this.imageName}`
      );

      this.normalizeHistogramValue = response.data;
    },
    async getEqualizeHistogram() {
      const response = await api.get(
        `image-processing/equalize-histogram/${this.imageName}`
      );

      this.equalizeHistogramValue = response.data.histogram;
      this.equalizeImageName = this.getFileName(response.data.imagePath);
    },
  },
});
