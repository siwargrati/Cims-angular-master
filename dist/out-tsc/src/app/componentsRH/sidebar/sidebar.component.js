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
var core_1 = require("@angular/core");
exports.ROUTES = [
    { path: "dashboard", title: "Dashboard", icon: "dashboard", class: "" },
    {
        path: "List_AffectationsTotales",
        title: "Les Affectations Totales",
        icon: "content_paste",
        class: ""
    },
    {
        path: "List_AffectationsPartielles",
        title: "Les Affectations Partielles",
        icon: "content_paste",
        class: ""
    },
    {
        path: "List_Personnels",
        title: "Liste des personnels",
        icon: "content_paste",
        class: ""
    },
    {
        path: "List_Sites",
        title: "Liste des sites",
        icon: "content_paste",
        class: ""
    },
    {
        path: "List_Grades",
        title: "Liste des grades",
        icon: "content_paste",
        class: ""
    },
    {
        path: "List_Structures",
        title: "Liste des Structures",
        icon: "content_paste",
        class: ""
    },
    {
        path: "List_Fonctions",
        title: "Liste des Fonctions",
        icon: "content_paste",
        class: ""
    }
];
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent() {
    }
    SidebarComponent.prototype.ngOnInit = function () {
        this.menuItems = exports.ROUTES.filter(function (menuItem) { return menuItem; });
    };
    SidebarComponent.prototype.isMobileMenu = function () {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };
    SidebarComponent = __decorate([
        core_1.Component({
            selector: "app-sidebarRH",
            templateUrl: "./sidebar.component.html",
            styleUrls: ["./sidebar.component.css"]
        }),
        __metadata("design:paramtypes", [])
    ], SidebarComponent);
    return SidebarComponent;
}());
exports.SidebarComponent = SidebarComponent;
//# sourceMappingURL=sidebar.component.js.map