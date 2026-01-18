import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { useApp } from '../../contexts/AppContext';
import { toast } from 'sonner';

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
}

export function EditProfileModal({ open, onClose }: EditProfileModalProps) {
  const { currentUser, updateCurrentUser } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    institution: '',
    location: '',
    avatar: '',
    coverImage: '',
    skills: [] as string[],
    researchInterests: [] as string[]
  });
  const [skillInput, setSkillInput] = useState('');
  const [interestInput, setInterestInput] = useState('');

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name,
        title: currentUser.title,
        bio: currentUser.bio,
        institution: currentUser.institution,
        location: currentUser.location,
        avatar: currentUser.avatar,
        coverImage: currentUser.coverImage,
        skills: currentUser.skills || [],
        researchInterests: currentUser.researchInterests || []
      });
    }
  }, [currentUser, open]);

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, skillInput.trim()] });
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
  };

  const handleAddInterest = () => {
    if (interestInput.trim() && !formData.researchInterests.includes(interestInput.trim())) {
      setFormData({ ...formData, researchInterests: [...formData.researchInterests, interestInput.trim()] });
      setInterestInput('');
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setFormData({ ...formData, researchInterests: formData.researchInterests.filter(i => i !== interest) });
  };

  const handleSave = () => {
    updateCurrentUser(formData);
    toast.success('Profil zaktualizowany');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edytuj profil</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>ImiÄ™ i nazwisko</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <Label>TytuĹ‚ naukowy</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-2"
              />
            </div>
          </div>

          <div>
            <Label>O mnie</Label>
            <Textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
              className="mt-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Instytucja</Label>
              <Input
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <Label>Lokalizacja</Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="mt-2"
              />
            </div>
          </div>

          <div>
            <Label>URL zdjÄ™cia profilowego</Label>
            <Input
              type="url"
              value={formData.avatar}
              onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
              className="mt-2"
            />
          </div>

          <div>
            <Label>URL zdjÄ™cia w tle</Label>
            <Input
              type="url"
              value={formData.coverImage}
              onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              className="mt-2"
            />
          </div>

          <div>
            <Label>UmiejÄ™tnoĹ›ci</Label>
            <div className="flex gap-2 mt-2">
              <Input
                placeholder="Dodaj umiejÄ™tnoĹ›Ä‡"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
              />
              <Button type="button" onClick={handleAddSkill} variant="outline">Dodaj</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm flex items-center gap-1">
                  {skill}
                  <button onClick={() => handleRemoveSkill(skill)} className="hover:text-pink-900">Ă—</button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <Label>Zainteresowania badawcze</Label>
            <div className="flex gap-2 mt-2">
              <Input
                placeholder="Dodaj zainteresowanie"
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddInterest())}
              />
              <Button type="button" onClick={handleAddInterest} variant="outline">Dodaj</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.researchInterests.map((interest, index) => (
                <span key={index} className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm flex items-center gap-1">
                  {interest}
                  <button onClick={() => handleRemoveInterest(interest)} className="hover:text-pink-900">Ă—</button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Anuluj</Button>
          <Button 
            onClick={handleSave} 
            className="bg-pink-600 hover:bg-pink-700 text-white"
          >
            Zapisz
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
