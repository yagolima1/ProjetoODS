import { Controller, Get } from '@nestjs/common';
import { RelatorioService } from './relatorio.service';

@Controller() // Controller base (não adiciona /relatorio aqui)
export class RelatorioController {
  constructor(private readonly relatorioService: RelatorioService) {}

  @Get('relatorio') // Define a rota exata: GET /relatorio
  async getRelatorio() {
    return this.relatorioService.gerarRelatorio();
  }
}