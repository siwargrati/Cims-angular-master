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
var button_renderer_component_1 = require("./button-renderer.component");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rhservice_service_1 = require("../../../services/RH/rhservice.service");
var forms_1 = require("@angular/forms");
var core_2 = require("@angular/material/core");
var material_moment_adapter_1 = require("@angular/material-moment-adapter");

var ListPersonnelsComponent = /** @class */ (function () {
    function ListPersonnelsComponent(http, Rhservice) {
        this.http = http;
        this.Rhservice = Rhservice;
        this.OrdrePersonnel = {
            idOPers: ""
        };
        this.personnel = {
            id_personnel: "",
            nom: "",
            prenom: "",
            sexe: "",
            telephone: "",
            structure: { id_struct: "" },
            grade: { id_grade: "" },
            email: "",
            date_recrutement: "",
            cin: "",
            matricule_CNRPS: "",
            matricule_CNSS: "",
            nom_Ar: "",
            prenom_AR: "",
            poste_Occupe: "",
            date_Promotion: "",
            soldeRepos: "",
            soldeinitial: "",
            date_naissance: "",
            Adresse: "",
            site: { idSite: "" },
            fonction: { id_fonction: "" },
            OrdrePersonnel: {
                idO_Pers: ""
            }
        };
        this.columnDefs = [
            {
                headerName: "Nom",
                field: "nom",
                sortable: true,
                filter: true,
                editable: true,
                maxWidth: 120
            },
            {
                headerName: "Prenom",
                field: "prenom",
                sortable: true,
                filter: true,
                editable: true,
                maxWidth: 120
            },
            {
                headerName: "Sexe",
                field: "sexe",
                sortable: true,
                filter: true,
                editable: true,
                maxWidth: 80
            },
            {
                headerName: "Téléphone",
                field: "telephone",
                sortable: true,
                filter: true,
                editable: true,
                maxWidth: 92
            },
            {
                headerName: "Email",
                field: "email",
                sortable: true,
                filter: true,
                editable: true
            },
            {
                headerName: "Grade",
                field: "grade.nom_grade",
                sortable: true,
                filter: true,
                editable: true,
                maxWidth: 120
            },
            {
                headerName: "Departement",
                field: "structure.direction",
                sortable: true,
                filter: true,
                editable: true,
                maxWidth: 120
            },
            {
                headerName: "Affectation",
                field: "affectation",
                sortable: true,
                filter: true,
                editable: true,
                maxWidth: 160
            },
            {
                headerName: "Date de recrutement",
                field: "date_recrutement",
                sortable: true,
                filter: true,
                editable: true,
                maxWidth: 160
            }
        ];
    }
    this.frameworkComponents = { buttonRenderer: button_renderer_component_1.ButtonRendererComponent };
    ListPersonnelsComponent_1 = ListPersonnelsComponent;
    ListPersonnelsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.addpers = false;
        this.Rhservice.listerPersonnel().subscribe(function (res) {
            console.log(res);
            _this.rowData = res;
        });
        this.Rhservice.listerGrades().subscribe(function (data) {
            _this.grade = data;
            console.dir(data);
        }, function (err) {
            console.log(err);
        });
        this.Rhservice.listerDepartements().subscribe(function (data) {
            _this.structure = data;
            console.dir(data);
        });
    };
    ListPersonnelsComponent.prototype.add = function () {
        var _this = this;
        this.Rhservice.addPersonnel(this.personnel).subscribe(function (res) {
            console.log(res);
            _this.ngOnInit();
        });
        console.dir(this.personnel);
    };
    ListPersonnelsComponent.prototype.getId = function (event) {
        this.id = event.data["id_personnel"];
        console.log(event.data["id_personnel"]);
        console.log(this.id);
    };
    ListPersonnelsComponent.prototype.edit = function (event) {
        this.Rhservice.updatePersonnel(event.data["id_personnel"], event.data).subscribe(function (res) {
            console.log("Personnel modifié");
        });
        //console.log(event.data["idSite"]);
    };
    ListPersonnelsComponent.prototype.delete = function () {
        var _this = this;
        this.Rhservice.deletePersonnel(this.id).subscribe(function (res) {
            console.log("Personnel Supprimé");
            _this.ngOnInit();
        });
    };



    ListPersonnelsComponent.prototype.getOrdreOfPers = function () {
        var _this = this;
        this.RhService.getOrdreOfPers(this.id).subscribe(function (data) {
            _this.OrdrePersonnel = data;
            console.log(_this.OrdrePersonnel);
        });
        this.pdfAffReport(this.OrdrePersonnel["idO_Pers"]);
    };
    ListPersonnelsComponent.prototype.pdfAffReport = function (idPersonnel) {
        this.RhService.pdfAffReport(idPersonnel).subscribe(function (res) {
            var file = new Blob([res], { type: "application/pdf" });
            var fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            console.log("PDF AffectationP");
        });
    };
    AffectationsPartiellesDirecteurComponent.prototype.onBtnClick1 = function (e) {
        this.getOrdreOfAff();
    };





    ListPersonnelsComponent.prototype.displayaddpers = function () {
        this.addpers = true;
    };
    ListPersonnelsComponent.prototype.cancel = function () {
        this.addpers = false;
    };
    var ListPersonnelsComponent_1;
    ListPersonnelsComponent = ListPersonnelsComponent_1 = __decorate([
        core_1.Component({
            selector: "app-list-personnels",
            templateUrl: "./List-PersonnelsRH.component.html",
            styleUrls: ["./List-PersonnelsRH.component.css"],
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    multi: true,
                    useExisting: core_1.forwardRef(function () { return ListPersonnelsComponent_1; })
                }
            ]
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, rhservice_service_1.RHService])
    ], ListPersonnelsComponent);
    return ListPersonnelsComponent;
}());
exports.ListPersonnelsComponent = ListPersonnelsComponent;
//# sourceMappingURL=List-PersonnelsRH.component.js.map