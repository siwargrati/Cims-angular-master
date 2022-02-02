"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var RH_layout_routing_1 = require("./RH-layout.routing");
var button_1 = require("@angular/material/button");
var input_1 = require("@angular/material/input");
var core_2 = require("@angular/material/core");
var form_field_1 = require("@angular/material/form-field");
var tooltip_1 = require("@angular/material/tooltip");
var select_1 = require("@angular/material/select");
var ag_grid_angular_1 = require("ag-grid-angular");
var list_departement_component_1 = require("./list-departement/list-departement.component");
var list_fonction_component_1 = require("./list-fonction/list-fonction.component");

var dashboard_component_1 = require("../../dashboard/dashboard.component");
var list_grades_component_1 = require("./list-grades/list-grades.component");
var list_sites_component_1 = require("./list-sites/list-sites.component");
var List_PersonnelsRH_component_1 = require("./List-PersonnelsRH/List-PersonnelsRH.component");
var affectations_partiellesRH_component_1 = require("./affectations-partielles/affectations-partiellesRH.component");
var affectations_totales_component_1 = require("./affectations-totales/affectations-totales.component");
var RHLayoutModule = /** @class */ (function () {
    function RHLayoutModule() {
    }
    RHLayoutModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild(RH_layout_routing_1.RHLayoutRoutes),
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                button_1.MatButtonModule,
                core_2.MatRippleModule,
                form_field_1.MatFormFieldModule,
                input_1.MatInputModule,
                select_1.MatSelectModule,
                tooltip_1.MatTooltipModule,
                ag_grid_angular_1.AgGridModule.withComponents([])
            ],
            declarations: [
                affectations_partiellesRH_component_1.affectations_partiellesComponent,
                List_PersonnelsRH_component_1.ListPersonnelsComponent,
                dashboard_component_1.DashboardComponent,
                list_sites_component_1.ListSitesComponent,
                list_grades_component_1.ListGradesComponent,
                list_departement_component_1.ListDepartementComponent,
                list_fonction_component_1.ListFonctionComponent,
                affectations_totales_component_1.AffectationsTotalesComponent
            ]
        })
    ], RHLayoutModule);
    return RHLayoutModule;
}());
exports.RHLayoutModule = RHLayoutModule;
//# sourceMappingURL=RH-layout.module.js.map