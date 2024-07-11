import { type Gameserver } from "../../types";

export interface GameserverResponseDTO extends Gameserver {}

export interface GameserverCreateDTO
  extends Pick<Gameserver, "name" | "enabled"> {}

export interface GameserverUpdateDTO extends Partial<GameserverCreateDTO> {}
