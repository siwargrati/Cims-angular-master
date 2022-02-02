import { Component, OnInit, forwardRef, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RHService } from "../../../services/RH/rhservice.service";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MomentUtcDateAdapter } from "../../chef-service-layout/AffectationsPartiellesCS/datePicker";
import { DropDownEditorDept } from "./drop-down-dept";
import { DropDownEditorFonction } from "./drop-down-fonction";

import { DropDownEditorGrade } from "./drop-down-grade";
import { DropDownEditorSite } from "./drop-down-site";
import { UploadFileService } from "../../../services/uploadFile/upload-file.service";
import { ButtonRendererComponent } from "./button-renderer.component";
import { ThrowStmt } from "@angular/compiler";

import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from "@angular/material/core";
import { MAT_MOMENT_DATE_FORMATS } from "@angular/material-moment-adapter";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: "app-list-personnels",
  templateUrl: "./List-PersonnelsRH.component.html",
  styleUrls: ["./List-PersonnelsRH.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ListPersonnelsComponent)
    },
    { provide: MAT_DATE_LOCALE, useValue: "fr-FR" },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter }
  ]
})
export class ListPersonnelsComponent implements OnInit {
  selectedDirection = '';
  selectedDivision = '';
  divisions = [];
  services = [];

  onSelectDirection(direction_id: string) {
    this.selectedDirection = direction_id;
    this.selectedDivision = '';
    this.services = [];
    this.divisions = this.getDivisions().filter((item) => {
      return item.direction_id === String(direction_id)
    });
  }
  onSelectDivision(division_id: string) {
    this.selectedDivision = division_id;
    this.services = this.getService().filter((item) => {
      return item.division_id === String(division_id)
    });
  }
  getDirections() {
    return [
      { id: 'Aucune', name: 'Aucune' },
      { id: 'Direction générale', name: 'Direction générale' },
      { id: 'Département de coordiantion technique et de gestion', name: 'Département de coordiantion technique et de gestion' },
      { id: 'Direction des affaires administratives et financières', name: 'Direction des affaires administratives et financières' },
      { id: 'Direction d"exploitationn , assistance, de réseaux et sécurité', name: 'Direction d"exploitationn , assistance, de réseaux et sécurité' },
      { id: 'Direction d"études et développement informatique', name: 'Direction d"études et développement informatique' },
    ]
  }
  getDivisions() {
    return [
      { id: 'Aucune', direction_id: 'Aucune', name: 'Aucune' },

      { id: '-', direction_id: 'Direction générale', name: '-' },
      { id: 'unité de contrôle de gestion', direction_id: 'Direction générale', name: 'unité de contrôle de gestion' },
      { id: 'unité audit interne ', direction_id: 'Direction générale', name: 'unité audit interne ' },
      { id: '--', direction_id: 'Département de coordiantion technique et de gestion', name: '--' },
      { id: 'unité de fomrmation et marketing ', direction_id: 'Département de coordiantion technique et de gestion', name: 'unité de fomrmation et marketing ' },
      { id: '---', direction_id: 'Direction des affaires administratives et financières', name: '---' },
      { id: 'division des affaires administratives', direction_id: 'Direction des affaires administratives et financières', name: 'division des affaires administratives' },
      { id: 'division des affaires financières', direction_id: 'Direction des affaires administratives et financières', name: 'division des affaires financières' },
      { id: '----', direction_id: 'Direction d"exploitationn , assistance, de réseaux et sécurité', name: '----' },
      { id: 'division d"exploitation et de gestion des sites', direction_id: 'Direction d"exploitationn , assistance, de réseaux et sécurité', name: 'division d"exploitation et de gestion des sites' },
      { id: 'division d"assistance technique et maintenance', direction_id: 'Direction d"exploitationn , assistance, de réseaux et sécurité', name: 'division d"assistance technique et maintenance' },
      { id: 'division de réseaux et sécurité', direction_id: 'Direction d"exploitationn , assistance, de réseaux et sécurité', name: 'division de réseaux et sécurité' },
      { id: '-----', direction_id: 'Direction d"études et développement informatique', name: '-----' },
      { id: 'divison des études ', direction_id: 'Direction d"études et développement informatique', name: 'divison des études ' },
      { id: 'division de developpement', direction_id: 'Direction d"études et développement informatique', name: 'division de developpement' },
    ]
  }
  getService() {
    return [
      { id: 'Aucune', division_id: 'Aucune', name: 'Aucune' },
      { id: 'Aucune ', division_id: 'Aucune ', name: 'Aucune ' },

      { id: '-', division_id: '-', name: '-' },
      { id: '-', division_id: 'unité de contrôle de gestion', name: '-' },
      { id: '-', division_id: 'unité audit interne ', name: '-' },
      { id: 'service de budget ', division_id: 'unité audit interne ', name: 'service de budget ' },



      { id: '-', division_id: '--', name: '-' },
      { id: '-', division_id: 'unité de fomrmation et marketing ', name: '-' },
      { id: '-', division_id: '---', name: '-' },
      { id: '-', division_id: 'division des affaires administratives', name: '-' },
      { id: 'service des ressources humaines', division_id: 'division des affaires administratives', name: 'service des ressources humaines' },
      { id: 'service des moyens communs ', division_id: 'division des affaires administratives', name: 'service des moyens communs ' },
      { id: '-', division_id: 'division des affaires financières', name: '-' },
      { id: 'service des finances ', division_id: 'division des affaires financières', name: 'service des finances ' },
      { id: 'service de comptabilité', division_id: 'division des affaires financières', name: 'service de comptabilité' },
      { id: 'service des marchéss ', division_id: 'division des affaires financières', name: 'service des marchéss ' },
      { id: '-', division_id: '----', name: '-' },
      { id: '-', division_id: 'division d"exploitation et de gestion des sites', name: '-' },
      { id: 'service d"exploitation', division_id: 'division d"exploitation et de gestion des sites', name: 'service d"exploitation' },
      { id: 'service de gestion des sites', division_id: 'division d"exploitation et de gestion des sites', name: 'service de gestion des sites' },
      { id: '-', division_id: 'division d"assistance technique et maintenance', name: '-' },
      { id: 'service de maintenance ', division_id: 'division d"assistance technique et maintenance', name: 'service de maintenance ' },
      { id: '-', division_id: 'division de réseaux et sécurité', name: '-' },
      { id: 'service de réseaux et sécurité ', division_id: 'division de réseaux et sécurité', name: 'service de réseaux et sécurité ' },
      { id: '-', division_id: '-----', name: '-' },
      { id: '-', division_id: 'divison des études ', name: '-' },
      { id: 'service des études', division_id: 'divison des études ', name: 'service des études' },
      { id: 'service d"architecture du S.I', division_id: 'divison des études ', name: 'service d"architecture du S.I' },
      { id: '-', division_id: 'division de developpement', name: '-' },
      { id: 'service developpement du S.I ', division_id: 'division de developpement', name: 'service developpement du S.I ' },
      { id: 'service maintenance et documentation du S.I ', division_id: 'division de developpement', name: 'service maintenance et documentation du S.I ' },

    ]
  }


  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
  message: string;
  id: number;
  grade: any;
  site: any;
  structure: any;
  fonction: any;
  addpers: boolean;
  ordreAffectationPers: any;

  personnel: object = {
    id_personnel: "",
    nom: "",
    prenom: "",
    sexe: "",
    telephone: "",
    structure: { id_struct: "", nom_dept: "", direction: "", division: "", service: "" },
    grade: { id_grade: "", nom_grade_fr: "" },
    email: "",
    date_recrutement: "",
    cin: "",
    matricule_CNRPS: "",
    matricule_CNSS: "",
    nom_Ar: "",
    prenom_AR: "",
    poste_occupe: "",
    date_promotion: "",
    soldeRepos: "",
    soldeExceptionnel: "",
    soldeinitial: "",
    date_naissance: "",
    date_echelle: "",
    date_echellon: "",
    echelle: "",
    echellon: "",
    adresse: "",
    site: { idSite: "" },
    fonction: { id_fonction: "", nom_fonction: "" },
    ordreAffectationPers: { idO_Aff_Pers: "" },

  };

  selectedLevel;
  selected() {
    alert(this.selectedLevel)
  }


  selectedFunction;
  selected1() {
    alert(this.selectedFunction)
  }
  rowData: any;
  frameworkComponents: any;
  frameworkComponentsMissionAcc: any;
  constructor(
    private http: HttpClient,
    private Rhservice: RHService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private fileService: UploadFileService
  ) {
    this.frameworkComponents = {
      buttonOrdre: ButtonRendererComponent
    };


  }


  ngOnInit(): void {
    this.addpers = false;
    this.Rhservice.listerPersonnel().subscribe(res => {
      console.log(res);
      this.rowData = res;
    });
    this.Rhservice.listerGrades().subscribe(
      data => {
        this.grade = data;
        console.dir(data);
      },
      err => {
        console.log(err);
      }
    );

    this.Rhservice.listerDepartements().subscribe(data => {
      this.structure = data;
      console.dir(data);
    });
    this.Rhservice.listerSite().subscribe(data => {
      this.site = data;
      console.dir(data);
    });

    this.Rhservice.listerFonctions().subscribe(data => {
      this.fonction = data;
      console.dir(data);
    });

  }

  add() {
    if (this.personnel["nom"] != "") {
      if (this.personnel["prenom"] != "") {
        if (this.personnel["nom_AR"] != "") {
          if (this.personnel["prenom_AR"] != "") {
            if (this.personnel["sexe"] != "") {
              if (this.personnel["date_naissance"] != "") {
                if (this.personnel["adresse"] != "") {
                  if (this.personnel["telephone"] != "") {
                    if (this.personnel["email"] != "") {
                      if (this.personnel["cin"] != "") {
                        if (this.personnel["date_recrutement"] != "") {
                          if (this.personnel["grade"].id_grade != "") {
                            if (this.personnel["soldeinitial"] != "") {
                              if (this.personnel["site"].idSite != "") {
                                if (this.personnel["structure"].direction != "") {

                                  this.Rhservice.addPersonnel(this.personnel).subscribe(res => {
                                    console.log(res);
                                    this.ngOnInit();
                                    this._snackBar.open("Personnel ajouté avec succés", "OK", {
                                      duration: 2000,
                                      panelClass: ["green-snackbar"]
                                    });
                                  }, err => {
                                    this.message = err.error.message;
                                    this.dialog.open(DialogError, {
                                      data: this.message
                                    });

                                  });

                                } else {
                                  this._snackBar.open(
                                    "Veuillez sélectionner  la structure du personnel ",
                                    "OK",
                                    {
                                      duration: 2000,
                                      panelClass: ["red-snackbar"]
                                    }
                                  );
                                }
                              } else {
                                this._snackBar.open(
                                  "Veuillez sélectionner l'affectation du personnel ",
                                  "OK",
                                  {
                                    duration: 2000,
                                    panelClass: ["red-snackbar"]
                                  }
                                );
                              }
                            } else {
                              this._snackBar.open(
                                "Veuillez insérer le solde initial du personnel ",
                                "OK",
                                {
                                  duration: 2000,
                                  panelClass: ["red-snackbar"]
                                }
                              );
                            }
                          } else {
                            this._snackBar.open(
                              "Veuillez insérer la grade du personnel ",
                              "OK",
                              {
                                duration: 2000,
                                panelClass: ["red-snackbar"]
                              }
                            );
                          }

                        } else {
                          this._snackBar.open("Veuillez insérer la date de recrutement du personnel ", "OK", {
                            duration: 2000,
                            panelClass: ["red-snackbar"]
                          });
                        }
                      } else {
                        this._snackBar.open("Veuillez insérer le Numéro Cin du personnel ", "OK", {
                          duration: 2000,
                          panelClass: ["red-snackbar"]
                        });
                      }
                    } else {
                      this._snackBar.open("Veuillez insérer l'adresse e-mail du personnel ", "OK", {
                        duration: 2000,
                        panelClass: ["red-snackbar"]
                      });
                    }
                  } else {
                    this._snackBar.open("Veuillez insérer le Numéro de téléphone du personnel ", "OK", {
                      duration: 2000,
                      panelClass: ["red-snackbar"]
                    });
                  }
                } else {
                  this._snackBar.open("Veuillez insérer l'adresse personnel  ", "OK", {
                    duration: 2000,
                    panelClass: ["red-snackbar"]
                  });
                }
              } else {
                this._snackBar.open("Veuillez insérer la date de naissance du personnel ", "OK", {
                  duration: 2000,
                  panelClass: ["red-snackbar"]
                });
              }
            } else {
              this._snackBar.open(
                "Veuillez sélectionner le sexe du personnel ",
                "OK",
                {
                  duration: 2000,
                  panelClass: ["red-snackbar"]
                }
              );
            }

          } else {
            this._snackBar.open("Veuillez insérer le prenom du personnel en Ar ", "OK", {
              duration: 2000,
              panelClass: ["red-snackbar"]
            });
          }
        } else {
          this._snackBar.open("Veuillez insérer le nom du personnel en Ar ", "OK", {
            duration: 2000,
            panelClass: ["red-snackbar"]
          });
        }
      } else {
        this._snackBar.open("Veuillez insérer le prenom du personnel en fr ", "OK", {
          duration: 2000,
          panelClass: ["red-snackbar"]
        });
      }
    } else {
      this._snackBar.open("Veuillez insérer le nom du personnel en fr", "OK", {
        duration: 2000,
        panelClass: ["red-snackbar"]
      });
    }
  }

  getId(event) {
    this.id = event.data["id_personnel"];
    console.log(event.data["id_personnel"]);
    console.log(this.id);
  }
  edit(event) {
    if (
      this.Rhservice.updatePersonnel(
        event.data["id_personnel"],
        event.data
      ).subscribe(res => {
        console.log("Personnel modifié");
        this.ngOnInit();
        this._snackBar.open("Personnel modifié avec succés", "OK", {
          duration: 2000
        });
      })
    ) {

    }
  }
  delete() {
    if (this.id != null) {
      this.dialog.open(DialogConfirmation, {
        data: this.id
      });
      this.dialog._afterAllClosed.subscribe(res => { this.ngOnInit(); })
    } else {
      this._snackBar.open("Veuillez sélectionner le personnel à supprimer", "OK", {
        duration: 2000,
        panelClass: ["red-snackbar"]
      });
    }
  }
  displayaddpers() {
    this.addpers = true;
  }
  cancel() {
    this.addpers = false;
  }

  getIdF(event) {
    this.id = event.data["file"].id_file;
  }

  columnDefs = [
    {
      headerName: "Ordre",
      cellRenderer: "buttonOrdre",
      cellRendererParams: {
        onClick: {}
      },
      maxWidth: 90
    },
    {
      headerName: "Nom",
      field: "nom",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 130
    },
    {
      headerName: "Prenom",
      field: "prenom",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 130
    },
    {
      headerName: "Sexe",
      field: "sexe",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 100
    },
    /*{
      headerName: "Date naissance",
      field: "date_naissance",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200
    },*/
    {
      headerName: "Tél",
      field: "telephone",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 130
    },
    {
      headerName: "email",
      field: "email",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 210
    },
    {
      headerName: "Adresse",
      field: "adresse",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 210
    },
    {
      headerName: "Cin",
      field: "cin",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 210
    },
    {
      headerName: "Date recrutement",
      field: "date_recrutement",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 210
    },
    {
      headerName: "Solde initial",
      field: "soldeinitial",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 210
    },
    {
      headerName: "Grade",
      field: "grade.nom_grade_fr",
      valueSetter: function (params) {
        params.data.grade.id_grade = params.newValue;
        console.log(params);
        return true;
      },
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 200,
      cellEditorFramework: DropDownEditorGrade,
      cellEditorParams: {
        options: [
        ]


      }
      ,
      valueParser: function (params) {
        return Number(params.newValue);
      }
    },
    {
      headerName: "Affectation",
      field: "site.nom_etablissement_fr",
      valueSetter: function (params) {
        params.data.site.idSite = params.newValue;
        console.log(params);
        return true;
      },
      sortable: true,
      filter: true,
      editable: false,
      minWidth: 300,
      cellEditorFramework: DropDownEditorSite,
      cellEditorParams: {
        options: [
        ]


      }
      ,
      valueParser: function (params) {
        return Number(params.newValue);
      }
    },
    /* {
       headerName: "Fonction",
       field: "fonction.nom_fonction",
       valueSetter: function (params) {
         params.data.fonction.id_fonction = params.newValue;
         console.log(params);
         return true;
       },
       sortable: true,
       filter: true,
       editable: true,
       maxWidth: 170,
       cellEditorFramework: DropDownEditorFonction,
       cellEditorParams: {
         options: [
         ]
 
       }
       ,
       valueParser: function (params) {
         return Number(params.newValue);
       }
     },
     {
       headerName: "Direction",
       field: "structure.direction",
       sortable: true,
       filter: true,
       editable: false,
       maxWidth: 230,
 
     },
     {
       headerName: "Division",
       field: "structure.division",
       sortable: true,
       filter: true,
       editable: false,
       maxWidth: 230,
 
     },*/
    {
      headerName: "Service",
      field: "structure.service",
      sortable: true,
      filter: true,
      editable: false,
      maxWidth: 230,

    },
    {
      headerName: "Cnss",
      field: "matricule_CNSS",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 210
    },
    {
      headerName: "Cnrps",
      field: "matricule_CNRPS",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 210
    },

    {
      headerName: "Date Promotion",
      field: "date_promotion",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 210
    },
    {
      headerName: "Poste occupé",
      field: "poste_occupe",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 210
    },
    {
      headerName: "Date Echelle",
      field: "date_echelle",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 210
    },
    {
      headerName: "Date Echellon",
      field: "date_echellon",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 210
    },
    {
      headerName: "Echelle",
      field: "echelle",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 210
    },
    {
      headerName: "Echellon",
      field: "echellon",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 210
    },


  ];
}


@Component({
  selector: 'dialog-confirmation',
  templateUrl: 'dialog-confirmation.html',
})
export class DialogConfirmation implements OnInit {
  message: string;
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmation>,
    private http: HttpClient,
    private Rhservice: RHService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public id: number) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }
  Action() {
    if (this.id != null) {
      this.Rhservice.deletePersonnel(this.id).subscribe(res => {
        console.log("Personnel Supprimé");
        this.dialogRef.close();
      }, err => {
        this.message = err.error.message;
      });
    }
  }
}

//////

@Component({
  selector: 'dialog-error',
  templateUrl: 'dialog-error.html',
})
export class DialogError implements OnInit {
  message: string;
  constructor(
    public dialogRef: MatDialogRef<DialogError>,
    private http: HttpClient,
    private Rhservice: RHService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public msg: string) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.message = this.msg;
  }

}