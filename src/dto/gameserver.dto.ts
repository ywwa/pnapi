import { type Gameserver } from "../types";

export interface GameserverRequestDTO {
  enabled: boolean;
  name: string;
}
export interface GameserverResponseDTO extends Gameserver {}
