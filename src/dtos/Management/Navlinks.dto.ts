import { type Navlink } from "../../types";

interface NavlinkDTO extends Navlink {}

export interface NavlinkResponseDTO extends NavlinkDTO {}

export interface NavlinkCreateDTO extends Pick<NavlinkDTO, "tag_id"> {}

export interface NavlinkUpdateDTO
  extends Partial<Pick<NavlinkDTO, "parent_node_id" | "tag_id" | "order">> {}
