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
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var token_storage_service_1 = require("../token-storage.service");
var TOKEN_HEADER_KEY = "Authorization";
var AuthInterceptor = /** @class */ (function () {
    function AuthInterceptor(token) {
        this.token = token;
    }
    AuthInterceptor.prototype.intercept = function (req, next) {
        var authReq = req;
        var token = this.token.getToken();
        if (token != null) {
            authReq = req.clone({
                headers: req.headers.set(TOKEN_HEADER_KEY, "Bearer " + token)
            });
        }
        return next.handle(authReq);
    };
    AuthInterceptor = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [token_storage_service_1.TokenStorageService])
    ], AuthInterceptor);
    return AuthInterceptor;
}());
exports.AuthInterceptor = AuthInterceptor;
exports.authInterceptorProviders = [
    { provide: http_1.HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
//# sourceMappingURL=auth.interceptor.js.map