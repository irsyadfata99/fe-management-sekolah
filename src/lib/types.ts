// ============================================================================
// 1. CREATE: src/lib/types.ts
// Type definitions untuk menghilangkan 'any' types
// ============================================================================

export interface Alumni {
  id?: number;
  nama_lengkap: string;
  tahun_lulus: number;
  pekerjaan_sekarang: string;
  deskripsi: string;
  photo_path?: string;
}

export interface Testimoni {
  id?: number;
  nama_lengkap: string;
  status: string;
  deskripsi: string;
  display_order?: number;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  category_name?: string;
  created_at: string;
  updated_at?: string;
}

export interface Stats {
  label: string;
  value: string;
}

export interface Program {
  name: string;
  code: string;
  description: string;
}
