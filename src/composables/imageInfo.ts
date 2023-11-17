const bytesToKilobytes = (imageSize: number): number => {
  // 1 kilobyte = 1024 bytes
  const kilobytes = imageSize / 1024;
  return kilobytes;
};

export { bytesToKilobytes };
