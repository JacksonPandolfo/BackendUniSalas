/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from "src/types/jwt-payload.interface";
// JwtFromRequestFunction

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        const jwtSecret = process.env.JWT_SECRET
        if (!jwtSecret) {
            throw new Error("JWT_SECRET não definido")
        }
        // const jwtFromRequest: JwtFromRequestFunction = ExtractJwt.fromAuthHeaderAsBearerToken();
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request): string | null => {
                    const cookies = req.cookies as Record<string, string> | undefined
                    const token = cookies?.['jwt']
                    return typeof token === 'string' ? token : null
                },
            ]),
                ignoreExpiration: false,
                secretOrKey: jwtSecret
        })
    }

    validate(payload: JwtPayload): JwtPayload{
        return payload
    }
}