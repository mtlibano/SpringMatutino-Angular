import { Pais } from '../../pais/models/pais';

export interface Pista {
  id: number;
  tamanho: number;
  pais: Pais;
}
