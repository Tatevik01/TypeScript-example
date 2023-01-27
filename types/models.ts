export type User = {
  company: null;
  dateJoined: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  groups: [];
  id: number;
  isActive: boolean;
  isGuest: boolean;
  isStaff: boolean;
  isSuperuser: boolean;
  lastLogin: string;
  userPermissions: [];
};

export type Company = {
  id: number;
  name: string;
  slug: string | null;
  appName: string;
  logo: string | null;
  created: string;
  modified: string;
};

export type ArtworkOrdering = 'name' | 'slug' | 'type' | 'active' | 'created';

export type ArtworkType = 'image' | 'video' | '3d';

export type Artwork = {
  id: number;
  name: string;
  slug: string | null;
  triggeredQrcodeOnly: boolean;
  isGuest: boolean;
  pointerImage: string | null;
  qrcodeId: string | null;
  qrcodeImagePng: string;
  qrcodeImageSvg: string;
  media: { contentType: string; id: number; path: string; url: string }[];
  type: ArtworkType;
  companyId: number;
  created: string;
  modified: string;
};
