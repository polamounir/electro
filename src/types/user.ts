export interface UserTypes {
  id: number | string;
  name: string;
  email: string;
  role: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  lastLoginAt?: string;
  avatar?: string;
  address?: string;
  phone?: string;
  company?: string;
  orders?: string[];
  cart?: string[];
  wishlist?: string[];
  reviews?: string[];
  payments?: string[];
  products?: string[];
  notifications?: string[];
  tokens?: string[];
  socialAccounts?: string[];
  resetTokens?: string[];
}
