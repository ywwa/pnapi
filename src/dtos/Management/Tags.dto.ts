import { type Tag } from "../../types";

interface TagDTO extends Tag {}

export interface TagResponseDTO extends TagDTO {}

export interface TagCreateDTO
  extends Pick<Tag, "name" | "slug" | "description"> {}

export interface TagUpdateDTO
  extends Partial<TagCreateDTO>,
    Partial<Pick<Tag, "enabled">> {}
