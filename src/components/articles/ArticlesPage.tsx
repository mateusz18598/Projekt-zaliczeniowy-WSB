import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { FileText, Download, Eye, Quote, ExternalLink, Plus } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

interface ArticlesPageProps {
  onCreateArticle: () => void;
}

export function ArticlesPage({ onCreateArticle }: ArticlesPageProps) {
  const { posts } = useApp();
  const articles = posts.filter(p => p.type === 'article');

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900">ArtykuĹ‚y Naukowe</h1>
          <p className="text-gray-600 mt-1">Publikuj i udostÄ™pniaj swoje badania</p>
        </div>
        <Button onClick={onCreateArticle} className="bg-pink-600 hover:bg-pink-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Nowy artykuĹ‚
        </Button>
      </div>

      {/* Articles List */}
      {articles.length === 0 ? (
        <Card className="bg-white border-pink-200 p-12 text-center">
          <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-gray-900 mb-2">Brak artykuĹ‚Ăłw</h3>
          <p className="text-gray-600 mb-4">Zacznij dzieliÄ‡ siÄ™ swoimi badaniami</p>
          <Button onClick={onCreateArticle} className="bg-pink-600 hover:bg-pink-700 text-white">
            UtwĂłrz pierwszy artykuĹ‚
          </Button>
        </Card>
      ) : (
        <div className="space-y-6">
          {articles.map((article) => (
            <Card key={article.id} className="bg-white border-pink-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                {/* Article Header */}
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-pink-300"
                  />
                  <div className="flex-1">
                    <h2 className="text-2xl text-gray-900 mb-2">{article.content.split('\n')[0]}</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-pink-600">{article.author.name}</span>
                      {article.articleDetails?.coAuthors && article.articleDetails.coAuthors.length > 0 && (
                        <>
                          <span>â€˘</span>
                          <span>{article.articleDetails.coAuthors.join(', ')}</span>
                        </>
                      )}
                      <span>â€˘</span>
                      <span>{article.timeAgo}</span>
                    </div>
                  </div>
                </div>

                {/* Abstract */}
                {article.articleDetails?.abstract && (
                  <div className="mb-4">
                    <h3 className="text-sm text-gray-700 mb-2">Abstrakt:</h3>
                    <p className="text-gray-700">{article.articleDetails.abstract}</p>
                  </div>
                )}

                {/* Keywords */}
                {article.articleDetails?.keywords && article.articleDetails.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.articleDetails.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-pink-100 text-pink-700 text-sm rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}

                {/* Stats */}
                <div className="flex items-center gap-6 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Quote className="w-4 h-4" />
                    <span>{article.articleDetails?.citations || 0} cytowaĹ„</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    <span>{article.articleDetails?.downloads || 0} pobraĹ„</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{article.articleDetails?.views || 0} wyĹ›wietleĹ„</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button className="bg-pink-600 hover:bg-pink-700 text-white">
                    Czytaj peĹ‚ny artykuĹ‚
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Pobierz PDF
                  </Button>
                  {article.articleDetails?.doi && (
                    <Button
                      variant="outline"
                      onClick={() => window.open(`https://doi.org/${article.articleDetails?.doi}`, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      DOI
                    </Button>
                  )}
                </div>

                {/* Image */}
                {article.images && article.images[0] && (
                  <div className="mt-4 rounded-lg overflow-hidden">
                    <img
                      src={article.images[0]}
                      alt="Article illustration"
                      className="w-full max-h-96 object-cover"
                    />
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
