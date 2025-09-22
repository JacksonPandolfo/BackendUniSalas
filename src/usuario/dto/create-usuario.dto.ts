/* eslint-disable prettier/prettier */
import { Cargo } from "generated/prisma"

export interface CreateUsuarioDto {
    nome: string,
    sobrenome: string,
    dataNascimento: Date,
    cargos: Cargo[];
    email: string,
    senha: string
}
