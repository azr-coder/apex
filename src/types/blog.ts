export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  coverImage: string
  date: string
  readTime: number
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'master'
  featured: boolean
}

export interface Category {
  name: string
  slug: string
  icon: string
  count: number
}
