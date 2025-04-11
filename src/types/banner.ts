export interface Banner {
  id: string;
  title: string;
  image: string;
  link: string;
  sort: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BannerFormData {
  title: string;
  image: string;
  link: string;
  sort: number;
  status: boolean;
} 