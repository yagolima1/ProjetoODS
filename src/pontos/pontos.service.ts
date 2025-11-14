import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PontoDescarte } from './ponto.schema'; // Importa a INTERFACE

@Injectable()
export class PontosService {
  constructor(@InjectModel('PontoDescarte') private readonly pontoModel: Model<PontoDescarte>) {}

  async createPonto(ponto: PontoDescarte): Promise<PontoDescarte> {
    const novoPonto = new this.pontoModel(ponto);
    return await novoPonto.save(); // Salva no banco de dados
  }

  async getAllPontos(): Promise<PontoDescarte[]> {
    return await this.pontoModel.find().exec(); // Busca todos no banco
  }
}