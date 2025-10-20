/* eslint-disable prettier/prettier */
import { Cargo } from "generated/prisma"

export interface CreateUsuarioDto {
    nome: string,
    sobrenome: string,
    dataNascimento: Date,
    telefone: string,
    cargos: Cargo[],
    email: string,
    senha: string
}
