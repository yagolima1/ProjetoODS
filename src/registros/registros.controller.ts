import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { RegistrosService } from './registros.service';
import type { RegistroDescarte } from './registro.schema'; // 1. Use "import type"

@Controller('registros') // Define a URL base: /registros
export class RegistrosController {
  // 2. Injete o Serviço
  constructor(private readonly registrosService: RegistrosService) {}

  // 3. Rota para CRIAR: POST /registros
  @Post()
  async createRegistro(
    @Body() registro: RegistroDescarte,
  ): Promise<RegistroDescarte> {
    return this.registrosService.createRegistro(registro);
  }

  // 4. Rota para CONSULTAR: GET /registros
  @Get()
  async getHistorico(
    // O @Query() pega os parâmetros da URL
    @Query('idDoPontoDeDescarte') pontoId?: string,
    @Query('tipoDeResiduo') tipo?: string,
    @Query('data') data?: Date,
    @Query('nomeDoUsuario') usuario?: string,
  ): Promise<RegistroDescarte[]> {
    // Monta um objeto de filtro apenas com os campos que foram enviados
    const filtros: any = {};
    if (pontoId) filtros.idDoPontoDeDescarte = pontoId;
    if (tipo) filtros.tipoDeResiduo = tipo;
    if (data) filtros.data = data;
    if (usuario) filtros.nomeDoUsuario = usuario;

    return this.registrosService.getHistorico(filtros);
  }
}