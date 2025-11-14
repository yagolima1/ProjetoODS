import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { RegistroDescarte } from './registro.schema'; // 1. Use "import type"

@Injectable()
export class RegistrosService {
  // 2. Injete o Modelo 'RegistroDescarte'
  constructor(
    @InjectModel('RegistroDescarte')
    private readonly registroModel: Model<RegistroDescarte>,
  ) {}

  // 3. Método para CRIAR um novo Registro de Descarte
  async createRegistro(
    registro: RegistroDescarte,
  ): Promise<RegistroDescarte> {
    const novoRegistro = new this.registroModel(registro);
    return await novoRegistro.save(); // Salva no banco de dados
  }

  // 4. Método para CONSULTAR o histórico com filtros
  async getHistorico(filtros: any): Promise<RegistroDescarte[]> {
    // O objeto "filtros" (ex: { tipoDeResiduo: 'plástico' })
    // será usado para filtrar a busca no banco de dados.
    return await this.registroModel.find(filtros).exec();
  }
}