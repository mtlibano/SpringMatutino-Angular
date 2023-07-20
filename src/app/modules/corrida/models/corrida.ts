import { Campeonato } from '../../campeonato/models/campeonato';
import { Pista } from '../../pista/models/pista';

export interface Corrida {
  id: number;
  data: string;
  pista: Pista;
  campeonato: Campeonato;
}
