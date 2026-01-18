import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Camera, MapPin, Link2, Edit, Plus, Trash2, ExternalLink } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { EditProfileModal } from '../modals/EditProfileModal';
import { ExperienceModal } from '../modals/ExperienceModal';
import { EducationModal } from '../modals/EducationModal';
import { PublicationModal } from '../modals/PublicationModal';
import { ProjectModal } from '../modals/ProjectModal';
import { GalleryModal } from '../modals/GalleryModal';
import { ImageLightbox } from '../modals/ImageLightbox';

export function ProfilePage() {
  const { currentUser, deleteExperience, deleteEducation, deletePublication, deleteProject, removeFromGallery } = useApp();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [showPublicationModal, setShowPublicationModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [editingItem, setEditingItem] = useState<any>(null);

  const handleEditExperience = (exp: any) => {
    setEditingItem(exp);
    setShowExperienceModal(true);
  };

  const handleEditEducation = (edu: any) => {
    setEditingItem(edu);
    setShowEducationModal(true);
  };

  const handleEditPublication = (pub: any) => {
    setEditingItem(pub);
    setShowPublicationModal(true);
  };

  const handleEditProject = (proj: any) => {
    setEditingItem(proj);
    setShowProjectModal(true);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setShowLightbox(true);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Profile */}
      <Card className="bg-white border-pink-200 overflow-hidden">
        {/* Cover Image */}
        <div className="relative h-48 md:h-64 bg-gradient-to-r from-pink-400 to-pink-600 group">
          <img
            src={currentUser.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
            <Button
              className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-900 hover:bg-gray-100"
              onClick={() => setShowEditProfile(true)}
            >
              <Camera className="w-4 h-4 mr-2" />
              ZmieĹ„ okĹ‚adkÄ™
            </Button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="relative px-6 pb-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
            {/* Avatar */}
            <div className="relative -mt-16 md:-mt-20">
              <div className="relative group">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white object-cover shadow-lg"
                />
                <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                  <Button
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-900 hover:bg-gray-100"
                    onClick={() => setShowEditProfile(true)}
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 md:mt-0 flex gap-2">
              <Button
                onClick={() => setShowEditProfile(true)}
                className="bg-pink-600 hover:bg-pink-700 text-white rounded-xl"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edytuj profil
              </Button>
            </div>
          </div>

          {/* Name and Title */}
          <div className="mt-4">
            <h1 className="text-3xl text-gray-900">{currentUser.name}</h1>
            <p className="text-lg text-gray-700 mt-1">{currentUser.title}</p>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-600">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {currentUser.location}
              </span>
              <span className="flex items-center gap-1">
                <Link2 className="w-4 h-4" />
                {currentUser.connections.length} poĹ‚Ä…czeĹ„
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* About Section */}
      <Card className="bg-white border-pink-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl text-gray-900">O mnie</h2>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowEditProfile(true)}
            className="text-pink-600 hover:text-pink-700 hover:bg-pink-50"
          >
            <Edit className="w-4 h-4 mr-1" />
            Edytuj
          </Button>
        </div>
        <p className="text-gray-700 whitespace-pre-wrap">{currentUser.bio}</p>
        
        {currentUser.researchInterests && currentUser.researchInterests.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm text-gray-600 mb-2">Zainteresowania badawcze:</h3>
            <div className="flex flex-wrap gap-2">
              {currentUser.researchInterests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Experience Section */}
      <Card className="bg-white border-pink-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl text-gray-900">DoĹ›wiadczenie</h2>
          <Button
            size="sm"
            onClick={() => {
              setEditingItem(null);
              setShowExperienceModal(true);
            }}
            className="bg-pink-600 hover:bg-pink-700 text-white"
          >
            <Plus className="w-4 h-4 mr-1" />
            Dodaj
          </Button>
        </div>

        {currentUser.experience.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Brak dodanego doĹ›wiadczenia</p>
          </div>
        ) : (
          <div className="space-y-6">
            {currentUser.experience.map((exp) => (
              <div key={exp.id} className="flex gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                  <span className="text-pink-600 text-xl">đźŹ˘</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900">{exp.position}</h3>
                  <p className="text-gray-700">{exp.institution}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {exp.startDate} - {exp.current ? 'obecnie' : exp.endDate}
                  </p>
                  <p className="text-gray-600 mt-2">{exp.description}</p>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEditExperience(exp)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      if (confirm('Czy na pewno chcesz usunÄ…Ä‡ to doĹ›wiadczenie?')) {
                        deleteExperience(exp.id);
                      }
                    }}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Education Section */}
      <Card className="bg-white border-pink-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl text-gray-900">WyksztaĹ‚cenie</h2>
          <Button
            size="sm"
            onClick={() => {
              setEditingItem(null);
              setShowEducationModal(true);
            }}
            className="bg-pink-600 hover:bg-pink-700 text-white"
          >
            <Plus className="w-4 h-4 mr-1" />
            Dodaj
          </Button>
        </div>

        {currentUser.education.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Brak dodanego wyksztaĹ‚cenia</p>
          </div>
        ) : (
          <div className="space-y-6">
            {currentUser.education.map((edu) => (
              <div key={edu.id} className="flex gap-4 group">
                <div className="flex-shrink-0 w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                  <span className="text-pink-600 text-xl">đźŽ“</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900">{edu.institution}</h3>
                  <p className="text-gray-700">{edu.degree} â€˘ {edu.field}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {edu.startYear} - {edu.current ? 'obecnie' : edu.endYear}
                  </p>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEditEducation(edu)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      if (confirm('Czy na pewno chcesz usunÄ…Ä‡ to wyksztaĹ‚cenie?')) {
                        deleteEducation(edu.id);
                      }
                    }}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Publications Section */}
      <Card className="bg-white border-pink-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl text-gray-900">Publikacje i ArtykuĹ‚y</h2>
          <Button
            size="sm"
            onClick={() => {
              setEditingItem(null);
              setShowPublicationModal(true);
            }}
            className="bg-pink-600 hover:bg-pink-700 text-white"
          >
            <Plus className="w-4 h-4 mr-1" />
            Dodaj
          </Button>
        </div>

        {currentUser.publications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Brak dodanych publikacji</p>
          </div>
        ) : (
          <div className="space-y-4">
            {currentUser.publications.map((pub) => (
              <div key={pub.id} className="p-4 bg-pink-50 rounded-lg group hover:bg-pink-100 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-gray-900">{pub.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{pub.authors.join(', ')}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {pub.journal} â€˘ {pub.year}
                    </p>
                    {pub.doi && (
                      <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-pink-600 hover:text-pink-700 flex items-center gap-1 mt-1"
                      >
                        DOI: {pub.doi}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <p className="text-xs text-gray-500 mt-2">{pub.citations} cytowaĹ„</p>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEditPublication(pub)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        if (confirm('Czy na pewno chcesz usunÄ…Ä‡ tÄ™ publikacjÄ™?')) {
                          deletePublication(pub.id);
                        }
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Skills Section */}
      <Card className="bg-white border-pink-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl text-gray-900">UmiejÄ™tnoĹ›ci</h2>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowEditProfile(true)}
            className="text-pink-600 hover:text-pink-700 hover:bg-pink-50"
          >
            <Edit className="w-4 h-4 mr-1" />
            Edytuj
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {currentUser.skills.map((skill, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-white border-2 border-pink-200 text-gray-700 rounded-xl hover:border-pink-400 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </Card>

      {/* Projects Section */}
      <Card className="bg-white border-pink-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl text-gray-900">Projekty badawcze</h2>
          <Button
            size="sm"
            onClick={() => {
              setEditingItem(null);
              setShowProjectModal(true);
            }}
            className="bg-pink-600 hover:bg-pink-700 text-white"
          >
            <Plus className="w-4 h-4 mr-1" />
            Dodaj
          </Button>
        </div>

        {currentUser.projects.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Brak dodanych projektĂłw</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentUser.projects.map((project) => (
              <div key={project.id} className="p-4 border-2 border-pink-200 rounded-xl group hover:border-pink-400 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-gray-900">{project.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    project.status === 'active' ? 'bg-green-100 text-green-700' :
                    project.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {project.status === 'active' ? 'Aktywny' : project.status === 'completed' ? 'ZakoĹ„czony' : 'Planowany'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                <p className="text-xs text-gray-500">ZespĂłĹ‚: {project.team.length} osĂłb</p>
                <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEditProject(project)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      if (confirm('Czy na pewno chcesz usunÄ…Ä‡ ten projekt?')) {
                        deleteProject(project.id);
                      }
                    }}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Gallery Section */}
      <Card className="bg-white border-pink-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl text-gray-900">Galeria</h2>
          <Button
            size="sm"
            onClick={() => setShowGalleryModal(true)}
            className="bg-pink-600 hover:bg-pink-700 text-white"
          >
            <Plus className="w-4 h-4 mr-1" />
            Dodaj zdjÄ™cie
          </Button>
        </div>

        {currentUser.gallery.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Brak zdjÄ™Ä‡ w galerii</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {currentUser.gallery.map((image, index) => (
              <div key={index} className="relative group aspect-square">
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg cursor-pointer"
                  onClick={() => openLightbox(index)}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-white hover:text-white hover:bg-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('Czy na pewno chcesz usunÄ…Ä‡ to zdjÄ™cie?')) {
                        removeFromGallery(image);
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Modals */}
      <EditProfileModal open={showEditProfile} onClose={() => setShowEditProfile(false)} />
      <ExperienceModal 
        open={showExperienceModal} 
        onClose={() => {
          setShowExperienceModal(false);
          setEditingItem(null);
        }}
        editItem={editingItem}
      />
      <EducationModal 
        open={showEducationModal} 
        onClose={() => {
          setShowEducationModal(false);
          setEditingItem(null);
        }}
        editItem={editingItem}
      />
      <PublicationModal 
        open={showPublicationModal} 
        onClose={() => {
          setShowPublicationModal(false);
          setEditingItem(null);
        }}
        editItem={editingItem}
      />
      <ProjectModal 
        open={showProjectModal} 
        onClose={() => {
          setShowProjectModal(false);
          setEditingItem(null);
        }}
        editItem={editingItem}
      />
      <GalleryModal open={showGalleryModal} onClose={() => setShowGalleryModal(false)} />
      {showLightbox && (
        <ImageLightbox
          images={currentUser.gallery}
          initialIndex={lightboxIndex}
          onClose={() => setShowLightbox(false)}
        />
      )}
    </div>
  );
}
