import * as mongoose from 'mongoose';

export const PontoDescarteSchema = new mongoose.Schema({
  nomeDoLocal: { type: String, required: true },
  bairro: { type: String, required: true },
  tipoDeLocal: { type: String, required: true },
  categoriaDosResiduosAceitos: { type: [String], required: true },
  geolocalizacao: { // 
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
  },
});


export interface PontoDescarte extends mongoose.Document {
  id: string;
  nomeDoLocal: string;
  bairro: string;
  tipoDeLocal: string;
  categoriaDosResiduosAceitos: string[];
  geolocalizacao: {
    lat: number;
    lon: number;
  };
}