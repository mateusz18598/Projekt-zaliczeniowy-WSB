import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useApp } from '../../contexts/AppContext';

interface PublicationModalProps {
  open: boolean;
  onClose: () => void;
  editItem?: any;
}

export function PublicationModal({ open, onClose, editItem }: PublicationModalProps) {
  const { addPublication, updatePublication } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    authors: [''],
    journal: '',
    year: '',
    doi: '',
    citations: 0
  });

  useEffect(() => {
    if (editItem) {
      setFormData(editItem);
    } else {
      setFormData({ title: '', authors: [''], journal: '', year: '', doi: '', citations: 0 });
    }
  }, [editItem, open]);

  const handleSave = () => {
    if (editItem) {
      updatePublication(editItem.id, formData);
    } else {
      addPublication(formData);
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editItem ? 'Edytuj publikacjÄ™' : 'Dodaj publikacjÄ™'}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div>
            <Label>TytuĹ‚ *</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="TytuĹ‚ publikacji"
              className="mt-2"
            />
          </div>

          <div>
            <Label>Autorzy (oddzieleni przecinkiem) *</Label>
            <Input
              value={formData.authors.join(', ')}
              onChange={(e) => setFormData({ ...formData, authors: e.target.value.split(',').map(a => a.trim()) })}
              placeholder="Jan Kowalski, Anna Nowak"
              className="mt-2"
            />
          </div>

          <div>
            <Label>Czasopismo/Konferencja *</Label>
            <Input
              value={formData.journal}
              onChange={(e) => setFormData({ ...formData, journal: e.target.value })}
              placeholder="Nature Machine Intelligence"
              className="mt-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Rok *</Label>
              <Input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="2023"
                className="mt-2"
              />
            </div>

            <div>
              <Label>DOI</Label>
              <Input
                value={formData.doi}
                onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
                placeholder="10.1038/s42256-023-00000-0"
                className="mt-2"
              />
            </div>
          </div>

          <div>
            <Label>Liczba cytowan</Label>
            <Input
              type="number"
              value={formData.citations}
              onChange={(e) => setFormData({ ...formData, citations: parseInt(e.target.value) || 0 })}
              className="mt-2"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Anuluj</Button>
          <Button 
            onClick={handleSave} 
            className="bg-pink-600 hover:bg-pink-700 text-white"
            disabled={!formData.title || !formData.journal || !formData.year}
          >
            Zapisz
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
