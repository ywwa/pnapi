import { type Navlink } from "../types";

export interface NavlinkRequestDTO {
  tag_id: string;
}

export interface NavlinkSortRequestDTO {
  parent_node_id?: string;
  tag_id: string;
  order: number;
}

export interface NavlinkResponseDTO extends Navlink {}
