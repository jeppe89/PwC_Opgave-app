export interface IToken {
    name: string;
    roles: string[];
    sub: number;
    iss: string;
    iat: number;
    exp: number;
    nbf: number;
    jti: string;
}
