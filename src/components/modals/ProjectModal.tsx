import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useApp } from '../../contexts/AppContext';

interface ProjectModalProps {
  open: boolean;
  onClose: () => void;
  editItem?: any;
}

export function ProjectModal({ open, onClose, editItem }: ProjectModalProps) {
  const { addProject, updateProject } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'active' as 'active' | 'completed' | 'planned',
    team: [] as string[]
  });

  useEffect(() => {
    if (editItem) {
      setFormData(editItem);
    } else {
      setFormData({ name: '', description: '', status: 'active', team: [] });
    }
  }, [editItem, open]);

  const handleSave = () => {
    if (editItem) {
      updateProject(editItem.id, formData);
    } else {
      addProject(formData);
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{editItem ? 'Edytuj projekt' : 'Dodaj projekt'}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div>
            <Label>Nazwa projektu *</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="AI-Powered Medical Diagnosis"
              className="mt-2"
            />
          </div>

          <div>
            <Label>Opis *</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              placeholder="Opisz cel i zakres projektu..."
              className="mt-2"
            />
          </div>

          <div>
            <Label>Status *</Label>
            <Select
              value={formData.status}
              onValueChange={(value: any) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Aktywny</SelectItem>
                <SelectItem value="completed">ZakoĹ„czony</SelectItem>
                <SelectItem value="planned">Planowany</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Anuluj</Button>
          <Button 
            onClick={handleSave} 
            className="bg-pink-600 hover:bg-pink-700 text-white"
            disabled={!formData.name || !formData.description}
          >
            Zapisz
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
