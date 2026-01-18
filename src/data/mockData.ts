export const initialPosts = [
  {
    id: 'post-1',
    author: {
      id: '2',
      name: 'Dr Anna Nowak',
      avatar: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?w=100&h=100&fit=crop',
      coverImage: 'https://images.unsplash.com/photo-1633457896836-f8d6025c85d1?w=400&h=100&fit=crop',
      title: 'Professor of Computer Science',
      bio: 'Badaczka AI i deep learning. Publikacje w Nature i Science.',
      institution: 'MIT',
      connections: ['1', '3'],
      profileViews: 234
    },
    content: `📚 Właśnie opublikowałam nowy artykuł w Nature: "Deep Learning Approaches to Quantum Computing Optimization"

Po 2 latach intensywnych badań, nasz zespół opracował nową metodę optymalizacji algorytmów kwantowych przy użyciu głębokich sieci neuronowych. Wyniki pokazują 34% poprawę efektywności obliczeń kwantowych w praktycznych zastosowaniach.

Dziękuję wszystkim współautorom i recenzentom za wspaniałą współpracę!

#QuantumComputing #DeepLearning #Research #AI #Science`,
    image: 'https://images.unsplash.com/photo-1707944745899-104a4b12d945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    likes: ['1', '3'],
    comments: [],
    shares: 12,
    timeAgo: '3h',
    timestamp: Date.now() - 3 * 60 * 60 * 1000,
    type: 'article' as const
  },
  {
    id: 'post-2',
    author: {
      id: '3',
      name: 'Prof. Piotr Wiśniewski',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop',
      coverImage: 'https://images.unsplash.com/photo-1628017975048-74768e00219e?w=400&h=100&fit=crop',
      title: 'Research Director in Quantum Computing',
      bio: 'Pionier w dziedzinie obliczeń kwantowych. 50+ publikacji.',
      institution: 'Stanford University',
      connections: ['1', '2'],
      profileViews: 567
    },
    content: `🎓 Rekrutacja do naszego zespołu badawczego!

Poszukujemy postdoców do projektu "Quantum Machine Learning Applications in Drug Discovery". 

Projekt finansowany przez NIH, budżet $2M, 3-letni grant.

Wymagania:
✅ PhD w informatyce, fizyce lub dziedzinie pokrewnej
✅ Doświadczenie z quantum computing lub ML
✅ Publikacje w renomowanych czasopismach
✅ Znajomość Python, Qiskit/Cirq

Co oferujemy:
💰 Konkurencyjne wynagrodzenie ($75k-$90k)
🏖️ Elastyczny czas pracy
🌍 Możliwość pracy zdalnej
📚 Budżet na konferencje i szkolenia

Aplikacje przyjmujemy do 31 stycznia. Link w komentarzu!`,
    likes: ['1', '2'],
    comments: [],
    shares: 24,
    timeAgo: '5h',
    timestamp: Date.now() - 5 * 60 * 60 * 1000,
    type: 'job' as const,
    jobDetails: {
      position: 'Postdoctoral Researcher - Quantum ML',
      company: 'Stanford Quantum Computing Lab',
      location: 'Stanford, CA (hybrid)',
      salary: '$75,000 - $90,000'
    }
  },
  {
    id: 'post-3',
    author: {
      id: '4',
      name: 'Dr Maria Kowalczyk',
      avatar: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?w=100&h=100&fit=crop',
      coverImage: 'https://images.unsplash.com/photo-1633457896836-f8d6025c85d1?w=400&h=100&fit=crop',
      title: 'Biomedical Engineer',
      bio: 'Badania nad bioniką i protezami inteligentymi.',
      institution: 'Harvard Medical School',
      connections: [],
      profileViews: 123
    },
    content: `🔬 Fascynujące wyniki z naszego ostatniego eksperymentu!

Testowaliśmy nową generację bionicznych protez z interfejsem mózg-komputer. Pacjenci byli w stanie kontrolować protezy z 98% dokładnością po zaledwie 2 tygodniach treningu.

Technologia opiera się na dekodowaniu sygnałów EEG w czasie rzeczywistym przy użyciu transformerów neuronowych. To może być przełom w rehabilitacji osób po amputacjach.

Pełne wyniki wkrótce w Journal of NeuroEngineering and Rehabilitation.

#Bioengineering #BCI #Prosthetics #Neuroscience #Innovation`,
    image: 'https://images.unsplash.com/photo-1765830403209-a5eceac4c198?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    likes: [],
    comments: [],
    shares: 8,
    timeAgo: '1d',
    timestamp: Date.now() - 24 * 60 * 60 * 1000,
    type: 'article' as const
  },
  {
    id: 'post-4',
    author: {
      id: '2',
      name: 'Dr Anna Nowak',
      avatar: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?w=100&h=100&fit=crop',
      coverImage: 'https://images.unsplash.com/photo-1633457896836-f8d6025c85d1?w=400&h=100&fit=crop',
      title: 'Professor of Computer Science',
      bio: 'Badaczka AI i deep learning. Publikacje w Nature i Science.',
      institution: 'MIT',
      connections: ['1', '3'],
      profileViews: 234
    },
    content: `📊 Ciekawe dane z naszego surveya o zastosowaniu AI w nauce:

• 89% naukowców uważa AI za kluczowy tool w swojej pracy
• 67% używa ML do analizy danych regularnie  
• 45% obawia się etycznych implikacji AI
• 23% planuje integrację quantum computing z AI w ciągu roku

Badanie objęło 2,500 naukowców z 50 krajów. Co myślicie o tych wynikach?

#ArtificialIntelligence #Research #DataScience #Science`,
    likes: ['3'],
    comments: [],
    shares: 5,
    timeAgo: '2d',
    timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
    type: 'post' as const
  }
];
