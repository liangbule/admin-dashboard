import { get, post, put, del } from '@/utils/request';
import type { Banner, BannerFormData } from '@/types/banner';

export async function getBanners(): Promise<Banner[]> {
  return get('/api/banners');
}

export async function getBanner(id: string): Promise<Banner> {
  return get(`/api/banners/${id}`);
}

export async function createBanner(data: BannerFormData): Promise<Banner> {
  return post('/api/banners', data);
}

export async function updateBanner(id: string, data: BannerFormData): Promise<Banner> {
  return put(`/api/banners/${id}`, data);
}

export async function deleteBanner(id: string): Promise<void> {
  return del(`/api/banners/${id}`);
} 