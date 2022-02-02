import { Component, OnInit, Inject } from "@angular/core";
import { RHService } from "../../../services/RH/rhservice.service";
import { HttpClient } from "@angular/common/http";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from "@angular/material/snack-bar";
import { DropDownEditorSite } from "./drop-down-site";
import { ButtonRendererComponent } from "./button-renderer.component";

@Component({
  selector: "app-affectations-totales",
  templateUrl: "./affectations-totales.component.html",
  styleUrls: ["./affectations-totales.component.css"]
})
export class AffectationsTotalesComponent implements OnInit {
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
      { id: 'Direction générale', name: 'Direction générale' },
      { id: 'Département de coordiantion technique et de gestion', name: 'Département de coordiantion technique et de gestion' },
      { id: 'Direction des affaires administratives et financières', name: 'Direction des affaires administratives et financières' },
      { id: 'Direction d"exploitationn , assistance, de réseaux et sécurité', name: 'Direction d"exploitationn , assistance, de réseaux et sécurité' },
      { id: 'Direction d"études et développement informatique', name: 'Direction d"études et développement informatique' },
    ]
  }
  getDivisions() {
    return [
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

  message: string;
  id: number;
  rowDataT: any;
  site: any;
  structure: any;


  gouvselecter: any;
  personnel: any;
  gouvernorat: any[] = [
    {
      id_gouv: "",
      nomGouvFR: ""
    }
  ];

  AffectationTotale: object = {
    idAffectT: "",
    personnel: { id_personnel: "" },
    site: { idSite: "" },
    structure: { id_struct: "", nom_dept: "", direction: "", division: "", service: "" },
    OrdreAffectationTot: {
      idO_Aff_Tot: ""
    }
  };
  selectedLevel;
  selected() {
    alert(this.selectedLevel)
  }
  frameworkComponents: any;
  constructor(
    private http: HttpClient,
    private Rhservice: RHService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { this.frameworkComponents = { buttonRenderer: ButtonRendererComponent }; }
  ngOnInit(): void {
    this.Rhservice.listerAffTot().subscribe(res => {
      console.log(res);
      this.rowDataT = res;
    });

    this.Rhservice.listPersonnelsSansAffecT().subscribe(data => {
      this.personnel = data;
      console.dir(data);
    });
    this.Rhservice.listerGouvernorats().subscribe(data => {
      var x: any = data;
      this.gouvernorat = x;
      console.log(this.gouvernorat[0]);
    });
    this.Rhservice.listerSite().subscribe(data => {
      this.site = data;
      console.dir(data);
    });

  }

  addT() {
    if (this.AffectationTotale["personnel"].id_personnel != "") {
      if (this.AffectationTotale["site"].idSite != "") {

        this.Rhservice.addAffTot(this.AffectationTotale).subscribe(res => {
          console.log(this.AffectationTotale);
          this.ngOnInit();
          this._snackBar.open("Affectation totale ajoutée avec succés", "OK", {
            duration: 2000,
            panelClass: ["green-snackbar"]
          });
        });

      } else {
        this._snackBar.open("Veuillez sélectionner l'affectation ", "OK", {
          duration: 2000,
          panelClass: ["red-snackbar"]
        });
      }
    } else {
      this._snackBar.open("Veuillez sélectionner le personnel", "OK", {
        duration: 2000,
        panelClass: ["red-snackbar"]
      });
    }
  }
  getId(event) {
    this.id = event.data["idAffectT"];
    //console.log(event.data["idAffectT"]);
    //console.log(this.id);
  }
  edit(event) {
    this.Rhservice.updateAffTot(event.data["idAffectT"], event.data).subscribe(
      res => {
        console.log("Affectation modifiée");
        this.ngOnInit();
        this._snackBar.open("Affectation totale modifiée avec succés", "OK", {
          duration: 2000
        });
      }, err => {
        this.message = err.error.message;
        this.dialog.open(DialogError, {
          data: this.message
        });


      }
    );
  }
  delete() {
    if (this.id != null) {
      this.dialog.open(DialogConfirmation, {
        data: this.id
      });
      this.dialog._afterAllClosed.subscribe(res => { this.ngOnInit(); })
    } else {
      this._snackBar.open(
        "Veuillez sélectionner l'affectation à supprimer",
        "OK",
        {
          duration: 2000,
          panelClass: ["red-snackbar"]
        }
      );
    }
  }
  columnDefsT = [
    {
      headerName: "Ordre",
      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        onClick: {}
      },
      maxWidth: 90
    },
    {
      headerName: "Personnel",
      colId: "personnel.nom & personnel.prenom",
      valueGetter: function (params) {
        return params.data.personnel.nom + " " + params.data.personnel.prenom;
      },
      sortable: true,
      filter: true,
      minWidth: 150
    },
    {
      headerName: "Affectation",
      field: "personnel.site.nom_etablissement_fr",
      valueSetter: function (params) {
        params.data.personnel.site.idSite = params.newValue;
        console.log(params);
        return true;
      },
      sortable: true,
      filter: true,
      editable: true,
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
    {
      headerName: "Gouvernorat",
      field: "personnel.site.gouvernorat.nomGouvFR",
      sortable: true,
      filter: true,
      editable: false,
      minWidth: 200
    },
    {
      headerName: "Sexe",
      field: "personnel.sexe",
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
      field: "personnel.telephone",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 130
    },
    {
      headerName: "email",
      field: "personnel.email",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 210
    },
    {
      headerName: "Adresse",
      field: "personnel.adresse",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 210
    },
    {
      headerName: "Cin",
      field: "personnel.cin",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 210
    },
    {
      headerName: "Date recrutement",
      field: "personnel.date_recrutement",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 210
    },
    {
      headerName: "Solde initial",
      field: "personnel.soldeinitial",
      sortable: true,
      filter: true,
      editable: true,
      maxWidth: 210
    },
    {
      headerName: "Grade",
      field: "personnel.grade.nom_grade_fr",
      sortable: true,
      filter: true,
      editable: false,
      maxWidth: 200,
    },
    {
      headerName: "Direction",
      field: "personnel.structure.direction",
      sortable: true,
      filter: true,
      editable: false,
      minWidth: 240
    },
    {
      headerName: "Division",
      field: "personnel.structure.division",
      sortable: true,
      filter: true,
      editable: false,
      minWidth: 240
    },
    {
      headerName: "Service",
      field: "personnel.structure.service",
      sortable: true,
      filter: true,
      editable: false,
      minWidth: 240
    }
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
      this.Rhservice.deleteAffTot(this.id).subscribe(res => {
        console.log("Affectation Supprimée");
        this.dialogRef.close();
      }, err => {
        this.message = err.error.message;


      });
    }
  }
}
////

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