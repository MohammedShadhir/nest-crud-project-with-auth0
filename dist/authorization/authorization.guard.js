"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationGuard = void 0;
const common_1 = require("@nestjs/common");
const util_1 = require("util");
const express_jwt_1 = require("express-jwt");
const jwks_rsa_1 = require("jwks-rsa");
const core_1 = require("@nestjs/core");
const user_service_1 = require("../user/user.service");
let AuthorizationGuard = class AuthorizationGuard {
    constructor(reflector, userService) {
        this.reflector = reflector;
        this.userService = userService;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();
        const checkJwt = (0, util_1.promisify)((0, express_jwt_1.expressjwt)({
            secret: (0, jwks_rsa_1.expressJwtSecret)({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
            }),
            audience: process.env.AUTH0_AUDIENCE,
            issuer: `https://${process.env.AUTH0_DOMAIN}/`,
            algorithms: ['RS256'],
        }));
        try {
            await checkJwt(req, res);
            const user = req.user;
            const auth0Id = req.auth.sub;
            console.log('REQUEST', req);
            console.log(`Extracted Auth0 ID: ${auth0Id}`);
            const roles = this.reflector.get('roles', context.getHandler());
            if (!roles) {
                return true;
            }
            const hasRole = () => user['https://express-api.com/roles'].some((role) => roles.includes(role));
            if (!hasRole()) {
                throw new common_1.ForbiddenException('You do not have the necessary roles to access this resource.');
            }
            return true;
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException ||
                error instanceof common_1.ForbiddenException) {
                throw error;
            }
            throw new common_1.UnauthorizedException(error);
        }
    }
};
exports.AuthorizationGuard = AuthorizationGuard;
exports.AuthorizationGuard = AuthorizationGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        user_service_1.UserService])
], AuthorizationGuard);
//# sourceMappingURL=authorization.guard.js.map