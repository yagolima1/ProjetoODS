import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { PontoDescarte } from 'src/pontos/ponto.schema';
import type { RegistroDescarte } from 'src/registros/registro.schema';

@Injectable()
export class RelatorioService {
  constructor(
    @InjectModel('PontoDescarte')
    private readonly pontoModel: Model<PontoDescarte>,
    @InjectModel('RegistroDescarte')
    private readonly registroModel: Model<RegistroDescarte>,
  ) {}

  // --- Método Principal ---
  async gerarRelatorio() {
    const [
      totalPontos,
      totalUsuarios,
      localMaisUsado,
      residuoMaisFrequente,
      mediaDiaria,
      crescimento,
    ] = await Promise.all([
      this.getTotalPontos(),
      this.getTotalUsuarios(),
      this.getLocalMaisUsado(),
      this.getResiduoMaisFrequente(),
      this.getMediaDescartes30Dias(),
      this.getPercentualCrescimento(),
    ]);

    return {
      totalPontosDeDescarte: totalPontos,
      totalUsuariosNoSistema: totalUsuarios,
      localComMaiorNumeroDeRegistros: localMaisUsado,
      tipoDeResiduoMaisFrequente: residuoMaisFrequente,
      mediaDescartesPorDiaUltimos30Dias: mediaDiaria,
      percentualCrescimentoUltimoMes: crescimento,
    };
  }

  // --- Funções Auxiliares de Cálculo ---

  async getTotalPontos(): Promise<number> {
    return this.pontoModel.countDocuments();
  }

  async getTotalUsuarios(): Promise<number> {
    // Conta os "nomesDoUsuario" únicos (distintos)
    const usuariosDistintos = await this.registroModel
      .distinct('nomeDoUsuario');
    return usuariosDistintos.length;
  }

  async getLocalMaisUsado(): Promise<string> {
    const resultado = await this.registroModel.aggregate([
      { $group: { _id: '$idDoPontoDeDescarte', count: { $sum: 1 } } }, // Agrupa por ponto e conta
      { $sort: { count: -1 } }, // Ordena do maior para o menor
      { $limit: 1 }, // Pega apenas o primeiro (o maior)
      {
        $lookup: { // Busca na outra coleção ("pontos") para pegar o nome
          from: 'pontodescartes', // O nome da coleção no MongoDB (geralmente plural e minúsculo)
          localField: '_id',
          foreignField: '_id',
          as: 'pontoInfo',
        },
      },
      { $unwind: '$pontoInfo' }, // Desagrupa o array do lookup
    ]);

    if (resultado.length > 0) {
      return resultado[0].pontoInfo.nomeDoLocal;
    }
    return 'Nenhum registro encontrado';
  }

  async getResiduoMaisFrequente(): Promise<string> {
    const resultado = await this.registroModel.aggregate([
      { $group: { _id: '$tipoDeResiduo', count: { $sum: 1 } } }, // Agrupa por tipo e conta
      { $sort: { count: -1 } }, // Ordena do maior para o menor
      { $limit: 1 }, // Pega apenas o primeiro
    ]);

    if (resultado.length > 0) {
      return resultado[0]._id;
    }
    return 'Nenhum registro encontrado';
  }

  async getMediaDescartes30Dias(): Promise<number> {
    const trintaDiasAtras = new Date();
    trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30);

    const total = await this.registroModel.countDocuments({
      data: { $gte: trintaDiasAtras }, // Filtra por data
    });

    return total / 30;
  }

  async getPercentualCrescimento(): Promise<string> {
    // Esta é uma lógica complexa, aqui está uma versão simplificada
    // Contar registros dos últimos 30 dias vs 30 dias anteriores
    const hoje = new Date();
    const data30Dias = new Date(new Date().setDate(hoje.getDate() - 30));
    const data60Dias = new Date(new Date().setDate(hoje.getDate() - 60));

    const totalMesAtual = await this.registroModel.countDocuments({
      data: { $gte: data30Dias },
    });

    const totalMesAnterior = await this.registroModel.countDocuments({
      data: { $gte: data60Dias, $lt: data30Dias },
    });

    if (totalMesAnterior === 0) {
      return 'Não há dados do mês anterior para comparar';
    }

    const crescimento =
      ((totalMesAtual - totalMesAnterior) / totalMesAnterior) * 100;
    return `${crescimento.toFixed(2)}%`;
  }
}