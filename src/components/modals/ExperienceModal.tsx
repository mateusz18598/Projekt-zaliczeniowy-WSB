import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { useApp } from '../../contexts/AppContext';

interface ExperienceModalProps {
  open: boolean;
  onClose: () => void;
  editItem?: any;
}

export function ExperienceModal({ open, onClose, editItem }: ExperienceModalProps) {
  const { addExperience, updateExperience } = useApp();
  const [formData, setFormData] = useState({
    position: '',
    institution: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  });

  useEffect(() => {
    if (editItem) {
      setFormData(editItem);
    } else {
      setFormData({
        position: '',
        institution: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      });
    }
  }, [editItem, open]);

  const handleSave = () => {
    if (editItem) {
      updateExperience(editItem.id, formData);
    } else {
      addExperience(formData);
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editItem ? 'Edytuj doĹ›wiadczenie' : 'Dodaj doĹ›wiadczenie'}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div>
            <Label>Stanowisko *</Label>
            <Input
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              placeholder="np. Senior Research Scientist"
              className="mt-2"
            />
          </div>

          <div>
            <Label>Instytucja *</Label>
            <Input
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              placeholder="np. MIT Research Lab"
              className="mt-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Data rozpoczÄ™cia *</Label>
              <Input
                type="month"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Data zakoĹ„czenia</Label>
              <Input
                type="month"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="mt-2"
                disabled={formData.current}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="current"
              checked={formData.current}
              onCheckedChange={(checked) => setFormData({ ...formData, current: checked as boolean })}
            />
            <Label htmlFor="current" className="cursor-pointer">
              Obecnie pracujÄ™ w tej instytucji
            </Label>
          </div>

          <div>
            <Label>Opis</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              placeholder="Opisz swoje obowiÄ…zki i osiÄ…gniÄ™cia..."
              className="mt-2"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Anuluj</Button>
          <Button 
            onClick={handleSave} 
            className="bg-pink-600 hover:bg-pink-700 text-white"
            disabled={!formData.position || !formData.institution || !formData.startDate}
          >
            Zapisz
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
