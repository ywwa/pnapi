import { type Gameserver } from "../../types";

export interface GameserverResponseDTO extends Gameserver {}

export interface GameserverRequestDTO
  extends Pick<Gameserver, "name" | "enabled"> {}

export interface GameserverUpdateRequestDTO
  extends Partial<GameserverRequestDTO> {}
