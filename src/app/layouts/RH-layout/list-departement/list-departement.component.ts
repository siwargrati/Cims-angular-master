import { Component, OnInit, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RHService } from "../../../services/RH/rhservice.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormGroup } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { DropDownEditorDivision } from "./drop-down-division";
@Component({
  selector: "app-list-departement",
  templateUrl: "./list-departement.component.html",
  styleUrls: ["./list-departement.component.css"]
})

export class ListDepartementComponent implements OnInit {
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
      { id: '-', direction_id: 'Département de coordiantion technique et de gestion', name: '-' },
      { id: 'unité de fomrmation et marketing ', direction_id: 'Département de coordiantion technique et de gestion', name: 'unité de fomrmation et marketing ' },
      { id: '-', direction_id: 'Direction des affaires administratives et financières', name: '-' },
      { id: 'division des affaires administratives', direction_id: 'Direction des affaires administratives et financières', name: 'division des affaires administratives' },
      { id: 'division des affaires financières', direction_id: 'Direction des affaires administratives et financières', name: 'division des affaires financières' },
      { id: '-', direction_id: 'Direction d"exploitationn , assistance, de réseaux et sécurité', name: '-' },
      { id: 'division d"exploitation et de gestion des sites', direction_id: 'Direction d"exploitationn , assistance, de réseaux et sécurité', name: 'division d"exploitation et de gestion des sites' },
      { id: 'division d"assistance technique et maintenance', direction_id: 'Direction d"exploitationn , assistance, de réseaux et sécurité', name: 'division d"assistance technique et maintenance' },
      { id: 'division de réseaux et sécurité', direction_id: 'Direction d"exploitationn , assistance, de réseaux et sécurité', name: 'division de réseaux et sécurité' },
      { id: '-', direction_id: 'Direction d"études et développement informatique', name: '-' },
      { id: 'divison des études ', direction_id: 'Direction d"études et développement informatique', name: 'divison des études ' },
      { id: 'division de developpement', direction_id: 'Direction d"études et développement informatique', name: 'division de developpement' },
    ]
  }
  getService() {
    return [
      { id: '-', division_id: '-', name: '-' },
      { id: 'Aucune', division_id: 'Aucune', name: 'Aucune' },

      { id: '-', division_id: '-', name: '-' },
      { id: '-', division_id: 'unité de contrôle de gestion', name: '-' },
      { id: '-', division_id: 'unité audit interne ', name: '-' },
      { id: 'service de budget ', division_id: 'unité audit interne ', name: 'service de budget ' },

      { id: '-', division_id: '-', name: '-' },
      { id: '-', division_id: 'unité de fomrmation et marketing ', name: '-' },
      { id: '-', division_id: '-', name: '-' },
      { id: '-', division_id: 'division des affaires administratives', name: '-' },
      { id: 'service des ressources humaines', division_id: 'division des affaires administratives', name: 'service des ressources humaines' },
      { id: 'service des moyens communs ', division_id: 'division des affaires administratives', name: 'service des moyens communs ' },
      { id: '-', division_id: 'division des affaires financières', name: '-' },
      { id: 'service des finances ', division_id: 'division des affaires financières', name: 'service des finances ' },
      { id: 'service de comptabilité', division_id: 'division des affaires financières', name: 'service de comptabilité' },
      { id: 'service des marchéss ', division_id: 'division des affaires financières', name: 'service des marchéss ' },
      { id: '-', division_id: '-', name: '-' },
      { id: '-', division_id: 'division d"exploitation et de gestion des sites', name: '-' },
      { id: 'service d"exploitation', division_id: 'division d"exploitation et de gestion des sites', name: 'service d"exploitation' },
      { id: 'service de gestion des sites', division_id: 'division d"exploitation et de gestion des sites', name: 'service de gestion des sites' },
      { id: '-', division_id: 'division d"assistance technique et maintenance', name: '-' },
      { id: 'service de maintenance ', division_id: 'division d"assistance technique et maintenance', name: 'service de maintenance ' },
      { id: '-', division_id: 'division de réseaux et sécurité', name: '-' },
      { id: 'service de réseaux et sécurité ', division_id: 'division de réseaux et sécurité', name: 'service de réseaux et sécurité ' },
      { id: '-', division_id: '-', name: '-' },
      { id: '-', division_id: 'divison des études ', name: '-' },
      { id: 'service des études', division_id: 'divison des études ', name: 'service des études' },
      { id: 'service d"architecture du S.I', division_id: 'divison des études ', name: 'service d"architecture du S.I' },
      { id: '-', division_id: 'division de developpement', name: '-' },
      { id: 'service developpement du S.I ', division_id: 'division de developpement', name: 'service developpement du S.I ' },
      { id: 'service maintenance et documentation du S.I ', division_id: 'division de developpement', name: 'service maintenance et documentation du S.I ' },

    ]
  }
  selectedValue: string;
  message: string;
  id: number;
  structure: object = {direction: "", division: "", service: "", direction_a: "", division_a: "", service_a: "" }

  rowData: any;
  constructor(
    private http: HttpClient,
    private Rhservice: RHService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.Rhservice.listerDepartements().subscribe(res => {
      console.log(res);
      this.rowData = res;
    });

  }

  add() {
    if (this.structure["nom_dept"] != "") {
      this.Rhservice.AddDepartement(this.structure).subscribe(res => {
        console.log(res);
        this.ngOnInit();
        this._snackBar.open("structure ajouté avec succés", "OK", {
          duration: 2000,
          panelClass: ["green-snackbar"]
        });
      }, err => {
        this.message = err.error.message;
        this.dialog.open(DialogError, {
          data: this.message
        });
        this.dialog._afterAllClosed.subscribe(res => { this.ngOnInit(); })

      });


    }
  }

  getId(event) {
    this.id = event.data["id_struct"];
    console.log(event.data["id_struct"]);
    console.log(this.id);
  }
  edit(event) {
    if (
      this.Rhservice.UpdateDepartement(
        event.data["id_struct"],
        event.data
      ).subscribe(res => {
        console.log(res);
        this._snackBar.open("structure modifié avec succés", "OK", {
          duration: 2000,
          panelClass: ["green-snackbar"]
        });
      }, err => {
        this.message = err.error.message;
        this.dialog.open(DialogError, {
          data: this.message
        });
        this.dialog._afterAllClosed.subscribe(res => { this.ngOnInit(); })

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
      this._snackBar.open(
        "Veuillez sélectionner le structure à supprimer",
        "OK",
        {
          duration: 2000,
          panelClass: ["red-snackbar"]
        }
      );
    }
  }
  columnDefs = [
    {
      headerName: "ID",
      valueGetter: "node.rowIndex + 1"
    },
    {
      headerName: "Direction",
      field: "direction",
      sortable: true,
      filter: true,
      editable: true,
      minWidth: 200
    },
    {
      headerName: "Division",
      field: "division",
      sortable: true,
      filter: true,
      editable: true,
      minWidth: 200
    },
    {
      headerName: "Service",
      field: "service",
      sortable: true,
      filter: true,
      editable: true,
      minWidth: 200
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
    @Inject(MAT_DIALOG_DATA) public id: number
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

  Action() {
    if (this.id != null) {
      this.Rhservice.DeleteDepartement(this.id).subscribe(res => {
        console.log("structure Supprimé");
        this.dialogRef.close();
      }, err => {
        this.message = err.error.message;
      });
    }

  }
}

////
///
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