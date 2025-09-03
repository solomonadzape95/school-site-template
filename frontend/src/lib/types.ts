export interface NewsItem {
    id: string;
    title: string;
    content: string;
    slug: string;
    imageUrl?: string;
    tag?: string;
    author?: string;
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
  }

export interface EventItem {
    id: string;
    title: string;
    date: string;
    description: string;
    expectedAttendance?: string;
    location: string;
    slug: string;
    imageUrl?: string;
    createdAt: string;
    updatedAt: string;
  }

export interface ImageInfo {
  id: string;
  title: string;
  imageUrl: string;
  fileSize: number;
  mimeType: string;
  usedAt: string[];
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}