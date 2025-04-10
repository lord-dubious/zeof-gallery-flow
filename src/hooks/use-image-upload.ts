
// This is a stub for the image upload functionality
// Since we're converting to a static site, we'll just return placeholders

export const useImageUpload = () => {
  const uploadImage = async (file: File) => {
    console.log('Static site mode: image uploads are disabled');
    // Return a placeholder URL instead of actually uploading
    return {
      url: 'https://images.unsplash.com/photo-1594938328870-9623159c8c99',
      path: '/placeholder-image.jpg',
      id: 'placeholder-id'
    };
  };

  const deleteImage = async (id: string) => {
    console.log(`Static site mode: would delete image with id ${id}`);
    return true;
  };

  return {
    uploadImage,
    deleteImage,
    isUploading: false,
    isDeleting: false
  };
};
