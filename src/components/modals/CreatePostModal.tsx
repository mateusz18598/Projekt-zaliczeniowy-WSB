import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Image, Video, Briefcase, FileText, Paperclip } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { toast } from 'sonner';

interface CreatePostModalProps {
  open: boolean;
  onClose: () => void;
  editPost?: any;
}

export function CreatePostModal({ open, onClose, editPost }: CreatePostModalProps) {
  const { currentUser, addPost, updatePost } = useApp();
  const [activeTab, setActiveTab] = useState<'post' | 'article' | 'job'>(editPost?.type || 'post');
  const [content, setContent] = useState(editPost?.content || '');
  const [imageUrls, setImageUrls] = useState<string[]>(editPost?.images || []);
  const [imageInput, setImageInput] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState(editPost?.youtubeUrl || '');
  const [pdfUrl, setPdfUrl] = useState(editPost?.pdfUrl || '');

  // Article fields
  const [articleTitle, setArticleTitle] = useState('');
  const [abstract, setAbstract] = useState(editPost?.articleDetails?.abstract || '');
  const [keywords, setKeywords] = useState<string[]>(editPost?.articleDetails?.keywords || []);
  const [keywordInput, setKeywordInput] = useState('');
  const [doi, setDoi] = useState(editPost?.articleDetails?.doi || '');
  const [journal, setJournal] = useState(editPost?.articleDetails?.journal || '');
  const [coAuthors, setCoAuthors] = useState<string[]>(editPost?.articleDetails?.coAuthors || []);
  const [coAuthorInput, setCoAuthorInput] = useState('');

  // Job fields
  const [jobPosition, setJobPosition] = useState(editPost?.jobDetails?.position || '');
  const [jobCompany, setJobCompany] = useState(editPost?.jobDetails?.company || '');
  const [jobLocation, setJobLocation] = useState(editPost?.jobDetails?.location || '');
  const [jobSalary, setJobSalary] = useState(editPost?.jobDetails?.salary || '');
  const [jobType, setJobType] = useState(editPost?.jobDetails?.jobType || 'full-time');
  const [jobField, setJobField] = useState(editPost?.jobDetails?.field || 'ai');
  const [jobLevel, setJobLevel] = useState(editPost?.jobDetails?.level || 'mid');
  const [jobDescription, setJobDescription] = useState(editPost?.jobDetails?.description || '');
  const [jobRequirements, setJobRequirements] = useState(editPost?.jobDetails?.requirements || '');
  const [jobBenefits, setJobBenefits] = useState(editPost?.jobDetails?.benefits || '');

  const handleAddImage = () => {
    if (imageInput.trim()) {
      setImageUrls([...imageUrls, imageInput]);
      setImageInput('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const handleAddKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const handleAddCoAuthor = () => {
    if (coAuthorInput.trim() && !coAuthors.includes(coAuthorInput.trim())) {
      setCoAuthors([...coAuthors, coAuthorInput.trim()]);
      setCoAuthorInput('');
    }
  };

  const handleSubmit = () => {
    if (!content.trim() && activeTab !== 'job') {
      toast.error('Treść nie może być pusta');
      return;
    }

    const postData: any = {
      author: currentUser,
      content: activeTab === 'article' ? `${articleTitle}\n\n${content}` : content,
      images: imageUrls.length > 0 ? imageUrls : undefined,
      youtubeUrl: youtubeUrl || undefined,
      pdfUrl: pdfUrl || undefined,
      likes: editPost?.likes || [],
      comments: editPost?.comments || [],
      shares: editPost?.shares || 0,
      type: activeTab
    };

    if (activeTab === 'article') {
      postData.articleDetails = {
        abstract,
        keywords,
        coAuthors,
        doi: doi || undefined,
        journal: journal || undefined,
        citations: editPost?.articleDetails?.citations || 0,
        downloads: editPost?.articleDetails?.downloads || 0,
        views: editPost?.articleDetails?.views || 0
      };
    }

    if (activeTab === 'job') {
      if (!jobPosition || !jobCompany || !jobLocation) {
        toast.error('Wypełnij wymagane pola oferty pracy');
        return;
      }
      postData.content = jobDescription;
      postData.jobDetails = {
        position: jobPosition,
        company: jobCompany,
        location: jobLocation,
        salary: jobSalary || undefined,
        jobType,
        field: jobField,
        level: jobLevel,
        description: jobDescription,
        requirements: jobRequirements,
        benefits: jobBenefits,
        views: editPost?.jobDetails?.views || 0,
        applications: editPost?.jobDetails?.applications || 0
      };
    }

    if (editPost) {
      updatePost(editPost.id, postData);
      toast.success('Post zaktualizowany');
    } else {
      addPost(postData);
      toast.success('Post opublikowany');
    }

    // Reset form
    setContent('');
    setImageUrls([]);
    setYoutubeUrl('');
    setPdfUrl('');
    setArticleTitle('');
    setAbstract('');
    setKeywords([]);
    setDoi('');
    setJournal('');
    setCoAuthors([]);
    setJobPosition('');
    setJobCompany('');
    setJobLocation('');
    setJobSalary('');
    setJobDescription('');
    setJobRequirements('');
    setJobBenefits('');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editPost ? 'Edytuj post' : 'Utwórz post'}</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="post">Post</TabsTrigger>
            <TabsTrigger value="article">Artykuł naukowy</TabsTrigger>
            <TabsTrigger value="job">Oferta pracy</TabsTrigger>
          </TabsList>

          <TabsContent value="post" className="space-y-4">
            <div>
              <Label>Treść posta</Label>
              <Textarea
                placeholder="Podziel się odkryciem..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Zdjęcia/Galeria</Label>
              <div className="flex gap-2 mt-2">
                <Image className="w-5 h-5 text-blue-500 mt-2" />
                <Input
                  type="url"
                  placeholder="URL zdjęcia"
                  value={imageInput}
                  onChange={(e) => setImageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddImage())}
                />
                <Button type="button" onClick={handleAddImage} variant="outline">Dodaj</Button>
              </div>
              {imageUrls.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {imageUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img src={url} alt={`Preview ${index}`} className="w-full h-24 object-cover rounded" />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100"
                        onClick={() => handleRemoveImage(index)}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <Label>YouTube Video</Label>
              <div className="flex gap-2 mt-2">
                <Video className="w-5 h-5 text-red-500 mt-2" />
                <Input
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label>Załącznik PDF</Label>
              <div className="flex gap-2 mt-2">
                <Paperclip className="w-5 h-5 text-gray-500 mt-2" />
                <Input
                  type="url"
                  placeholder="URL pliku PDF"
                  value={pdfUrl}
                  onChange={(e) => setPdfUrl(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="article" className="space-y-4">
            <div>
              <Label>Tytuł artykułu *</Label>
              <Input
                value={articleTitle}
                onChange={(e) => setArticleTitle(e.target.value)}
                placeholder="Tytuł publikacji naukowej"
                className="mt-2"
              />
            </div>

            <div>
              <Label>Abstrakt *</Label>
              <Textarea
                placeholder="Streszczenie badań..."
                value={abstract}
                onChange={(e) => setAbstract(e.target.value)}
                rows={4}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Pełna treść artykułu</Label>
              <Textarea
                placeholder="Napisz swój artykuł naukowy..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Słowa kluczowe</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="Dodaj słowo kluczowe"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddKeyword())}
                />
                <Button type="button" onClick={handleAddKeyword} variant="outline">Dodaj</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {keywords.map((kw, index) => (
                  <span key={index} className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm flex items-center gap-1">
                    {kw}
                    <button onClick={() => setKeywords(keywords.filter((_, i) => i !== index))} className="hover:text-pink-900">×</button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <Label>Współautorzy</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="Imię i nazwisko"
                  value={coAuthorInput}
                  onChange={(e) => setCoAuthorInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCoAuthor())}
                />
                <Button type="button" onClick={handleAddCoAuthor} variant="outline">Dodaj</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {coAuthors.map((author, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-1">
                    {author}
                    <button onClick={() => setCoAuthors(coAuthors.filter((_, i) => i !== index))} className="hover:text-blue-900">×</button>
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>DOI</Label>
                <Input
                  value={doi}
                  onChange={(e) => setDoi(e.target.value)}
                  placeholder="10.1000/xyz123"
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Czasopismo</Label>
                <Input
                  value={journal}
                  onChange={(e) => setJournal(e.target.value)}
                  placeholder="Nature, Science..."
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label>Zdjęcie ilustrujące</Label>
              <Input
                type="url"
                placeholder="URL zdjęcia"
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label>PDF artykułu</Label>
              <Input
                type="url"
                placeholder="URL pliku PDF"
                value={pdfUrl}
                onChange={(e) => setPdfUrl(e.target.value)}
                className="mt-2"
              />
            </div>
          </TabsContent>

          <TabsContent value="job" className="space-y-4">
            <div>
              <Label>Stanowisko *</Label>
              <Input
                placeholder="np. Senior Research Scientist"
                value={jobPosition}
                onChange={(e) => setJobPosition(e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Firma / Instytucja *</Label>
              <Input
                placeholder="np. MIT Research Lab"
                value={jobCompany}
                onChange={(e) => setJobCompany(e.target.value)}
                className="mt-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Lokalizacja *</Label>
                <Input
                  placeholder="Warszawa, Polska (zdalnie)"
                  value={jobLocation}
                  onChange={(e) => setJobLocation(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Wynagrodzenie</Label>
                <Input
                  placeholder="15 000 - 20 000 PLN"
                  value={jobSalary}
                  onChange={(e) => setJobSalary(e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Typ</Label>
                <Select value={jobType} onValueChange={setJobType}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Pełny etat</SelectItem>
                    <SelectItem value="part-time">Pół etatu</SelectItem>
                    <SelectItem value="internship">Staż</SelectItem>
                    <SelectItem value="grant">Grant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Dziedzina</Label>
                <Select value={jobField} onValueChange={setJobField}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ai">AI/ML</SelectItem>
                    <SelectItem value="biotech">Biotechnologia</SelectItem>
                    <SelectItem value="physics">Fizyka</SelectItem>
                    <SelectItem value="medicine">Medycyna</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Poziom</Label>
                <Select value={jobLevel} onValueChange={setJobLevel}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="junior">Junior</SelectItem>
                    <SelectItem value="mid">Mid</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                    <SelectItem value="lead">Lead</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Opis oferty</Label>
              <Textarea
                placeholder="Opisz stanowisko i obowiązki..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={4}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Wymagania</Label>
              <Textarea
                placeholder="Wymagane umiejętności i doświadczenie..."
                value={jobRequirements}
                onChange={(e) => setJobRequirements(e.target.value)}
                rows={4}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Co oferujemy</Label>
              <Textarea
                placeholder="Benefity i warunki pracy..."
                value={jobBenefits}
                onChange={(e) => setJobBenefits(e.target.value)}
                rows={4}
                className="mt-2"
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Anuluj</Button>
          <Button
            onClick={handleSubmit}
            className="bg-pink-600 hover:bg-pink-700 text-white"
          >
            {editPost ? 'Zapisz zmiany' : 'Opublikuj'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
