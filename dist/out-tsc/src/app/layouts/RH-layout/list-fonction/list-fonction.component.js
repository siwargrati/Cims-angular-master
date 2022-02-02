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
var http_1 = require("@angular/common/http");
var rhservice_service_1 = require("../../../services/RH/rhservice.service");
var ListFonctionComponent = /** @class */ (function () {
    function ListFonctionComponent(http, Rhservice) {
        this.http = http;
        this.Rhservice = Rhservice;
        this.fonction = {
            nom_fonction: "",
            structure: { id_struct: "" }
        };
        this.columnDefs = [
            {
                headerName: "Nom",
                field: "nom_fonction",
                sortable: true,
                filter: true,
                editable: true
            },
            {
                headerName: "Type",
                field: "type_fonction",
                sortable: true,
                filter: true,
                editable: true
            },
            {
                headerName: "Structure",
                field: "structure.direction",
                sortable: true,
                filter: true,
                editable: true
            }

        ];
    }
    ListFonctionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.addFonction = false;
        this.Rhservice.listerFonction().subscribe(function (res) {
            console.log(res);
            _this.rowData = res;
        });
        this.Rhservice.listerStructures().subscribe(function (data) {
            _this.structure = data;
            console.dir(data);
        });
    };
    ListFonctionComponent.prototype.add = function () {
        var _this = this;
        this.Rhservice.addFonction(this.fonction).subscribe(function (res) {
            console.log(res);
            _this.ngOnInit();
        });
        console.log(this.fonction);
    };
    ListFonctionComponent.prototype.getId = function (event) {
        this.id = event.data["id_fonction"];
        console.log(event.data["id_fonction"]);
        console.log(this.id);
    };
    ListFonctionComponent.prototype.edit = function (event) {
        this.Rhservice.updateFonction(event.data["id_fonction"], event.data).subscribe(function (res) {
            console.log("Fonction modifié");
        });
    };
    ListFonctionComponent.prototype.delete = function () {
        var _this = this;
        this.Rhservice.deleteFonction(this.id).subscribe(function (res) {
            console.log("Fonction Supprimé");
            _this.ngOnInit();
        });
    };
    ListFonctionComponent.prototype.displayaddfn = function () {
        this.addfn = true;
    };
    ListFonctionComponent.prototype.cancel = function () {
        this.addfn = false;
    };
    ListFonctionComponent = __decorate([
        core_1.Component({
            selector: "app-list-fonction",
            templateUrl: "./list-fonction.component.html",
            styleUrls: ["./list-fonction.component.css"]
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, rhservice_service_1.RHService])
    ], ListFonctionComponent);
    return ListFonctionComponent;
}());
exports.ListFonctionComponent = ListFonctionComponent;
//# sourceMappingURL=list-fonction.component.js.map