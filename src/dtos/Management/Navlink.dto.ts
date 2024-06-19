import { type Navlink } from "../../types";

export interface NavlinkResponseDTO extends Navlink {}
export interface NavlinkRequestDTO
  extends Pick<Navlink, "node_id" | "parent_node_id" | "order"> {}
