import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { MapPin, Briefcase, Clock, Bookmark, Search } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface JobsPageProps {
  onCreateJob: () => void;
}

export function JobsPage({ onCreateJob }: JobsPageProps) {
  const { posts, savedPosts, toggleSavePost } = useApp();
  const jobPosts = posts.filter(p => p.type === 'job');

  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [fieldFilter, setFieldFilter] = useState('all');

  const filteredJobs = jobPosts.filter(job => {
    const matchesSearch = searchQuery === '' ||
      job.jobDetails?.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.jobDetails?.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLocation = locationFilter === 'all' ||
      job.jobDetails?.location.toLowerCase().includes(locationFilter.toLowerCase());

    const matchesType = typeFilter === 'all' ||
      job.jobDetails?.jobType === typeFilter;

    const matchesField = fieldFilter === 'all' ||
      job.jobDetails?.field === fieldFilter;

    return matchesSearch && matchesLocation && matchesType && matchesField;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1 space-y-4">
          <Card className="bg-white border-pink-200 p-4 sticky top-20">
            <h3 className="text-lg text-gray-900 mb-4">Filtry</h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Lokalizacja</label>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Wszystkie</SelectItem>
                    <SelectItem value="warsaw">Warszawa</SelectItem>
                    <SelectItem value="remote">Zdalnie</SelectItem>
                    <SelectItem value="usa">USA</SelectItem>
                    <SelectItem value="europe">Europa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-2 block">Typ</label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Wszystkie</SelectItem>
                    <SelectItem value="full-time">Pełny etat</SelectItem>
                    <SelectItem value="part-time">Pół etatu</SelectItem>
                    <SelectItem value="internship">Staż</SelectItem>
                    <SelectItem value="grant">Grant</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-2 block">Dziedzina</label>
                <Select value={fieldFilter} onValueChange={setFieldFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Wszystkie</SelectItem>
                    <SelectItem value="ai">AI/ML</SelectItem>
                    <SelectItem value="biotech">Biotechnologia</SelectItem>
                    <SelectItem value="physics">Fizyka</SelectItem>
                    <SelectItem value="medicine">Medycyna</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={() => {
                  setLocationFilter('all');
                  setTypeFilter('all');
                  setFieldFilter('all');
                  setSearchQuery('');
                }}
                variant="outline"
                className="w-full"
              >
                Wyczyść filtry
              </Button>
            </div>
          </Card>
        </aside>

        {/* Jobs List */}
        <main className="lg:col-span-3 space-y-4">
          {/* Search and Create */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Szukaj stanowiska lub firmy..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={onCreateJob} className="bg-pink-600 hover:bg-pink-700 text-white">
              Dodaj ofertę
            </Button>
          </div>

          {/* Jobs Cards */}
          {filteredJobs.length === 0 ? (
            <Card className="bg-white border-pink-200 p-12 text-center">
              <Briefcase className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-gray-900 mb-2">Brak ofert pracy</h3>
              <p className="text-gray-600">Zmień filtry lub dodaj nową ofertę</p>
            </Card>
          ) : (
            filteredJobs.map((job) => (
              <Card key={job.id} className="bg-white border-pink-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4 flex-1">
                    <div className="w-16 h-16 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-8 h-8 text-pink-600" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl text-gray-900 mb-1">{job.jobDetails?.position}</h3>
                      <p className="text-gray-700 mb-2">{job.jobDetails?.company}</p>

                      <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.jobDetails?.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.jobDetails?.jobType}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {job.timeAgo}
                        </span>
                      </div>

                      {job.jobDetails?.salary && (
                        <p className="text-pink-600 mb-2">{job.jobDetails.salary}</p>
                      )}

                      <p className="text-gray-700 line-clamp-2">{job.content}</p>

                      <div className="flex gap-2 mt-4">
                        <Button className="bg-pink-600 hover:bg-pink-700 text-white">
                          Aplikuj
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => toggleSavePost(job.id)}
                          className={savedPosts.includes(job.id) ? 'border-pink-600 text-pink-600' : ''}
                        >
                          <Bookmark className={`w-4 h-4 ${savedPosts.includes(job.id) ? 'fill-pink-600' : ''}`} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </main>
      </div>
    </div>
  );
}
