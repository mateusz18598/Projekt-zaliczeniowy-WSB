import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { useApp } from '../../contexts/AppContext';

interface EducationModalProps {
  open: boolean;
  onClose: () => void;
  editItem?: any;
}

export function EducationModal({ open, onClose, editItem }: EducationModalProps) {
  const { addEducation, updateEducation } = useApp();
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    field: '',
    startYear: '',
    endYear: '',
    current: false
  });

  useEffect(() => {
    if (editItem) {
      setFormData(editItem);
    } else {
      setFormData({ institution: '', degree: '', field: '', startYear: '', endYear: '', current: false });
    }
  }, [editItem, open]);

  const handleSave = () => {
    if (editItem) {
      updateEducation(editItem.id, formData);
    } else {
      addEducation(formData);
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{editItem ? 'Edytuj wyksztaĹ‚cenie' : 'Dodaj wyksztaĹ‚cenie'}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div>
            <Label>Uczelnia *</Label>
            <Input
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              placeholder="np. Uniwersytet Warszawski"
              className="mt-2"
            />
          </div>

          <div>
            <Label>StopieĹ„ *</Label>
            <Input
              value={formData.degree}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              placeholder="np. Doktor (PhD)"
              className="mt-2"
            />
          </div>

          <div>
            <Label>Kierunek *</Label>
            <Input
              value={formData.field}
              onChange={(e) => setFormData({ ...formData, field: e.target.value })}
              placeholder="np. Informatyka"
              className="mt-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Rok rozpoczÄ™cia *</Label>
              <Input
                type="number"
                value={formData.startYear}
                onChange={(e) => setFormData({ ...formData, startYear: e.target.value })}
                placeholder="2015"
                className="mt-2"
              />
            </div>

            <div>
              <Label>Rok zakoĹ„czenia</Label>
              <Input
                type="number"
                value={formData.endYear}
                onChange={(e) => setFormData({ ...formData, endYear: e.target.value })}
                placeholder="2019"
                className="mt-2"
                disabled={formData.current}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="current-edu"
              checked={formData.current}
              onCheckedChange={(checked) => setFormData({ ...formData, current: checked as boolean })}
            />
            <Label htmlFor="current-edu" className="cursor-pointer">
              Obecnie studiujÄ™
            </Label>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Anuluj</Button>
          <Button 
            onClick={handleSave} 
            className="bg-pink-600 hover:bg-pink-700 text-white"
            disabled={!formData.institution || !formData.degree || !formData.field || !formData.startYear}
          >
            Zapisz
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
