import { defineStore } from 'pinia';

export const useDialogStore = defineStore('dialog', {
  state: () => ({
    brightnessDialog: false,
    addImageDialog: false,
    isSubtractImage: false,
    translationDialog: false,
    rotateDialog: false,
    flipDialog: false,
    zoomDialog: false,
    filterMedian: false,
    kernelSize: 3,
    edgeDetectionDialog: false,
    rotateDialogChange: false,
    translateDialogChange: false,
  }),
  actions: {
    toggleBrightnessDialog() {
      this.brightnessDialog = !this.brightnessDialog;
    },
    toggleAddImageDialog(isSubtract: boolean) {
      this.isSubtractImage = false;
      this.addImageDialog = !this.addImageDialog;
      if (isSubtract) this.isSubtractImage = true;
    },
    toggleTranslationDialog() {
      this.translationDialog = !this.translationDialog;
    },
    toggleRotateDialog() {
      this.rotateDialog = !this.rotateDialog;
    },
    toggleFlipDialog() {
      this.flipDialog = !this.flipDialog;
    },
    toggleZoomDialog() {
      this.zoomDialog = !this.zoomDialog;
    },
  },
});
