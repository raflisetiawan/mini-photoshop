import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        name: 'HomePage',
      },
    ],
  },
  {
    path: '/all',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/AllImagePage.vue'),
        name: 'AllImagePage',
      },
    ],
  },
  {
    path: '/image',
    component: () => import('layouts/EditorLayout.vue'),
    children: [
      {
        path: 'info',
        component: () => import('pages/ImageInfoPage.vue'),
        name: 'ImageInfoPage',
      },
      {
        path: 'binary',
        component: () => import('pages/BinaryPage.vue'),
        name: 'BinaryPage',
      },
      {
        path: 'grayscale',
        component: () => import('pages/GrayscalePage.vue'),
        name: 'GrayscalePage',
      },
      {
        path: 'brighten',
        component: () => import('pages/BrightnessPage.vue'),
        name: 'BrightnessPage',
      },
      {
        path: 'negative',
        component: () => import('pages/NegativePage.vue'),
        name: 'NegativePage',
      },
      {
        path: 'add-image',
        component: () => import('pages/AddImagePage.vue'),
        name: 'AddImagePage',
      },
      {
        path: 'subtract-image',
        component: () => import('pages/SubtractImagePage.vue'),
        name: 'SubtractImagePage',
      },
      {
        path: 'translate-image',
        component: () => import('pages/TranslateImagePage.vue'),
        name: 'TranslateImagePage',
      },
      {
        path: 'rotate-image',
        component: () => import('pages/RotatePage.vue'),
        name: 'RotatePage',
      },
      {
        path: 'flip-image',
        component: () => import('pages/FlippingPage.vue'),
        name: 'FlippingPage',
      },
      {
        path: 'zoom-image',
        component: () => import('pages/ZoomImagePage.vue'),
        name: 'ZoomImagePage',
      },
      {
        path: 'median',
        component: () => import('pages/MedianPage.vue'),
        name: 'MedianPage',
      },
      {
        path: 'canny',
        component: () => import('pages/CannyPage.vue'),
        name: 'CannyPage',
      },
      {
        path: 'prewit',
        component: () => import('pages/PrewittPage.vue'),
        name: 'PrewittPage',
      },
      {
        path: 'sobel',
        component: () => import('pages/SobelPage.vue'),
        name: 'SobelPage',
      },
      {
        path: 'histogram',
        component: () => import('pages/HistogramPage.vue'),
        name: 'HistogramPage',
      },
      {
        path: 'normalize',
        component: () => import('pages/NormalizePage.vue'),
        name: 'NormalizePage',
      },
      {
        path: 'equalize',
        component: () => import('pages/EqualizePage.vue'),
        name: 'EqualizePage',
      },
      {
        path: 'filter-average',
        component: () => import('pages/FilteringPage.vue'),
        name: 'FilteringPage',
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
