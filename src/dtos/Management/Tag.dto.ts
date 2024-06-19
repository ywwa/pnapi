import { type Tag } from "../../types";

export interface TagResponseDTO extends Tag {}

export interface TagRequestDTO extends Pick<Tag, "name" | "description"> {
  slug?: string;
}

export interface TagUpdateRequestDTO
  extends Partial<Pick<Tag, "slug" | "name" | "enabled" | "description">> {}
