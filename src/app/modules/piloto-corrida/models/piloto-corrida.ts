import { Corrida } from '../../corrida/models/corrida';
import { Piloto } from '../../piloto/models/piloto';

export interface PilotoCorrida {
  id: number;
  colocacao: number;
  piloto: Piloto;
  corrida: Corrida;
}
