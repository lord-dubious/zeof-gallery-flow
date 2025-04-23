
// This file is maintained only for compatibility with existing imports
// Consider moving these types to src/components/admin/types.ts in the future
import { CategoryFormData, CategoryUpdate, NavigationItemUpdate } from "../types";

export type CategoryMutationFn = (data: CategoryFormData) => void;
export type CategoryUpdateFn = (id: string, data: CategoryUpdate) => void;
export type CategoryDeleteFn = (id: string) => void;

export type ImageMutationFn = (data: any) => void;
export type ImageUpdateFn = (id: string, data: any) => void;
export type ImageDeleteFn = (id: string) => void;

export type NavigationMutationFn = (data: any) => void;
export type NavigationUpdateFn = (id: string, data: NavigationItemUpdate) => void;
export type NavigationDeleteFn = (id: string) => void;
