import { Tag } from "../types";

export interface TagRequestDTO {
  name: string;
  slug: string;
  description?: string;
}

export interface TagResponseDTO extends Tag {}
