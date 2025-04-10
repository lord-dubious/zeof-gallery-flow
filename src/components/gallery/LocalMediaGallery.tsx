
import React, { useState, useEffect } from 'react';
import { SimpleGallery } from './SimpleGallery';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleHelp, FolderOpen } from 'lucide-react';

interface LocalMediaGalleryProps {
  mediaFolderPath?: string;
  title?: string;
}

export const LocalMediaGallery = ({ 
  mediaFolderPath = '/media', 
  title = 'Photo Gallery' 
}: LocalMediaGalleryProps) => {
  const [images, setImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // In a real app, we would fetch the images from the media folder
  // For this demo, we'll use some demo images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // In a real app, we would fetch the images from the media folder
        // Since this is just a demo, we'll use some placeholder images
        const demoImages = [
          {
            id: '1',
            url: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&auto=format',
            title: 'Working from Home',
            description: 'A cozy workspace setup with modern laptop'
          },
          {
            id: '2',
            url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format',
            title: 'Technology Focus',
            description: 'Gray laptop computer displaying code'
          },
          {
            id: '3',
            url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format',
            title: 'Modern Work',
            description: 'Woman using laptop while working remotely'
          },
          {
            id: '4',
            url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&auto=format',
            title: 'Developer Setup',
            description: 'Gray and black laptop on wooden surface'
          },
          {
            id: '5',
            url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format',
            title: 'Peaceful Nature',
            description: 'Beautiful landscape with water and trees'
          }
        ];
        
        setImages(demoImages);
      } catch (err) {
        console.error('Error loading images:', err);
        setError('Failed to load images');
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [mediaFolderPath]);

  // Display instructions for setting up local media
  const showInstructions = () => {
    return (
      <Card className="mb-6 border-dashed">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CircleHelp className="h-5 w-5 text-blue-500" />
            How to Add Your Own Photos
          </CardTitle>
          <CardDescription>
            Follow these simple steps to add your own images
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2 list-decimal pl-5">
            <li>Create a folder called <code className="bg-gray-100 px-1 py-0.5 rounded">public/media</code> in your project</li>
            <li>Add your images to this folder (.jpg, .png, .webp formats work best)</li>
            <li>The images will automatically appear in this gallery!</li>
          </ol>
          <div className="mt-4 p-3 bg-blue-50 text-blue-800 rounded-md text-sm">
            <p><strong>Tip:</strong> Give your images descriptive filenames like "vacation-beach.jpg" or "family-picnic.jpg"</p>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      
      {showInstructions()}
      
      {error ? (
        <div className="bg-red-50 text-red-800 p-4 rounded-md mb-4">
          <p>{error}</p>
          <Button 
            variant="outline" 
            className="mt-2"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      ) : images.length > 0 ? (
        <SimpleGallery images={images} />
      ) : (
        <div className="bg-amber-50 text-amber-800 p-6 rounded-lg text-center">
          <FolderOpen className="mx-auto h-12 w-12 mb-4 text-amber-500" />
          <h3 className="text-lg font-medium mb-2">No Images Found</h3>
          <p className="mb-4">We couldn't find any images in your media folder.</p>
        </div>
      )}
    </div>
  );
};
