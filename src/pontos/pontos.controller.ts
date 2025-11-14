import { Controller, Get, Post, Body } from '@nestjs/common';
import { PontosService } from './pontos.service';
import type { PontoDescarte } from './ponto.schema'; // Importa a INTERFACE

@Controller('pontos') // Define a URL base: /pontos
export class PontosController {
  // 1. Injete o Serviço no construtor
  constructor(private readonly pontosService: PontosService) {}

  // 2. Rota para CRIAR: POST /pontos
  @Post()
  async createPonto(@Body() ponto: PontoDescarte): Promise<PontoDescarte> {
    return this.pontosService.createPonto(ponto);
  }

  // 3. Rota para LER: GET /pontos
  @Get()
  async getAllPontos(): Promise<PontoDescarte[]> {
    return this.pontosService.getAllPontos();
  }
}