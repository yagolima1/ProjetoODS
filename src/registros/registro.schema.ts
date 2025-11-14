import * as mongoose from 'mongoose';

export const RegistroDescarteSchema = new mongoose.Schema({
  nomeDoUsuario: { type: String, required: true },
  
  idDoPontoDeDescarte: { type: mongoose.Schema.Types.ObjectId, ref: 'PontoDescarte', required: true },
  tipoDeResiduo: { type: String, required: true },
  data: { type: Date, required: true },
});

export interface RegistroDescarte extends mongoose.Document {
  id: string;
  nomeDoUsuario: string;
  idDoPontoDeDescarte: string; 
  tipoDeResiduo: string;
  data: Date;
}