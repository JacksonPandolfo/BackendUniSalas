/* eslint-disable prettier/prettier */
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/db/prisma.service';
import * as bcrypt from 'bcrypt'
import { Cargo } from 'generated/prisma';

@Injectable()
export class UsuarioService {
  constructor(private readonly prismaService: PrismaService) {}

  private async hashString(senha: string): Promise<string> {
    try {
      const saltRounds = 10
      return await bcrypt.hash(senha, saltRounds)
    } catch (error: unknown) {
      if(error instanceof Error) {
        throw new Error(`Erro ao gerar hash: ${error.message}`)
      }
      throw new Error("Erro desconhecido ao gerar hash")
    }
  }

  private isPrismaUniqueConstraintError(
    error: unknown,
    field: string
    ): boolean {
  if (typeof error !== 'object' || error === null) return false;

  const e = error as { code?: string; meta?: unknown };
  if (e.code !== 'P2002') return false;

  const meta = e.meta as { target?: string[] } | undefined;
  return meta?.target?.includes(field) ?? false;
}

  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      const senhaHash = await this.hashString(createUsuarioDto.senha)
      return await this.prismaService.usuario.create({
        data: {
          nome: createUsuarioDto.nome,
          sobrenome: createUsuarioDto.sobrenome,
          dataNascimento: createUsuarioDto.dataNascimento,
          cargos: { set: createUsuarioDto.cargos },
          email:  createUsuarioDto.email,
          senha: senhaHash
        }
      }
    );
    } catch (error: unknown) {
      if(this.isPrismaUniqueConstraintError(error, 'email')){
        throw new ConflictException("Este email já está em uso")
      }

      throw error
    }
  }

  async loginUserByEmail(email: string) {
    return this.prismaService.usuario.findUnique({
      where: { email }
    })
  }

  findAll() {
    return this.prismaService.usuario.findMany();
  }

  findOne(id: string) {
    return this.prismaService.usuario.findUnique({
      where: { id }
    });
  }

  findManyByNome(nome: string) {
    return this.prismaService.usuario.findMany({
      where: {
        OR: [
          { nome: { contains: nome, mode: 'insensitive' } },
          { sobrenome: {  contains: nome, mode: 'insensitive' } }

        ]
      }
    })
  }

  findMinistranteByNome(nome: string) {
    return this.prismaService.usuario.findMany({
      where: {
        AND: [
          { cargos: { has: Cargo.MINISTRANTE } },
          {
            OR: [
              { nome: { contains: nome, mode: "insensitive" } },
              { sobrenome: { contains: nome, mode: "insensitive" } }
            ]
          }
        ]
      }
    })
  }

  update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    return this.prismaService.usuario.update({
      where: { id },
      data: updateUsuarioDto
    })
  }

  remove(id: string) {
    return this.prismaService.usuario.delete({
      where: { id }
    })
  }
}
