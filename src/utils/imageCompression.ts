export const compressImage = async (file: File, maxSizeMB = 1): Promise<File> => {
  // If the file is smaller than maxSizeMB, return it as is
  if (file.size / 1024 / 1024 < maxSizeMB) {
    return file;
  }

  // Create a canvas element to compress the image
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();

  // Create a promise to handle the image loading
  return new Promise((resolve, reject) => {
    img.onload = () => {
      // Calculate new dimensions while maintaining aspect ratio
      let width = img.width;
      let height = img.height;
      const maxDimension = 1920; // Max width or height

      if (width > height && width > maxDimension) {
        height = (height * maxDimension) / width;
        width = maxDimension;
      } else if (height > maxDimension) {
        width = (width * maxDimension) / height;
        height = maxDimension;
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress the image
      ctx?.drawImage(img, 0, 0, width, height);
      
      // Convert to blob with reduced quality
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            reject(new Error('Failed to compress image'));
          }
        },
        'image/jpeg',
        0.7 // Compression quality (0.7 = 70% quality)
      );
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    // Load the image from the file
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};