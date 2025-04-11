import request from '@/utils/request';
import { Banner, BannerFormData } from '@/types/banner';

export async function getBanners(tabId?: string): Promise<Banner[]> {
  return request(`/api/banners${tabId ? `?tabId=${tabId}` : ''}`);
}

export async function getBanner(id: string): Promise<Banner> {
  return request(`/api/banners/${id}`);
}

export async function createBanner(data: BannerFormData & { tabId?: string }): Promise<Banner> {
  return request('/api/banners', {
    method: 'POST',
    data,
  });
}

export async function updateBanner(id: string, data: BannerFormData): Promise<Banner> {
  return request(`/api/banners/${id}`, {
    method: 'PUT',
    data,
  });
}

export async function deleteBanner(id: string): Promise<void> {
  return request(`/api/banners/${id}`, {
    method: 'DELETE',
  });
} 