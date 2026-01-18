import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useApp } from '../../contexts/AppContext';
import { toast } from 'sonner';

interface GalleryModalProps {
  open: boolean;
  onClose: () => void;
}

export function GalleryModal({ open, onClose }: GalleryModalProps) {
  const { addToGallery } = useApp();
  const [imageUrl, setImageUrl] = useState('');

  const handleAdd = () => {
    if (imageUrl.trim()) {
      addToGallery(imageUrl);
      toast.success('ZdjÄ™cie dodane do galerii');
      setImageUrl('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Dodaj zdjÄ™cie do galerii</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div>
            <Label>URL zdjÄ™cia</Label>
            <Input
              type="url"
              value={imageUrl}
              onChange={(e: any) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="mt-2"
            />
          </div>

          {imageUrl && (
            <div className="aspect-square rounded-lg overflow-hidden border-2 border-pink-200">
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={() => toast.error('Nie moĹĽna zaĹ‚adowaÄ‡ obrazu')}
              />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Anuluj</Button>
          <Button 
            onClick={handleAdd} 
            className="bg-pink-600 hover:bg-pink-700 text-white"
            disabled={!imageUrl.trim()}
          >
            Dodaj
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
