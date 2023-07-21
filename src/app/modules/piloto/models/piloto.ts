import { Equipe } from '../../equipe/models/equipe';
import { Pais } from '../../pais/models/pais';

export interface Piloto {
  id: number;
  name: string;
  equipe: Equipe;
  pais: Pais;
}
