/* eslint-disable @typescript-eslint/no-unsafe-member-access  */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, JwtFromRequestFunction, Strategy } from 'passport-jwt';
import { JwtPayload } from "src/types/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        const jwtSecret = process.env.JWT_SECRET
        if (!jwtSecret) {
            throw new Error("JWT_SECRET não definido")
        }
        const jwtFromRequest: JwtFromRequestFunction = ExtractJwt.fromAuthHeaderAsBearerToken();
        super({
            jwtFromRequest,
            ignoreExpiration: false,
            secretOrKey: jwtSecret
        })
    }

    validate(payload: JwtPayload){
        return { userId: payload.sub, email: payload.email, roles: payload.roles }
    }
}