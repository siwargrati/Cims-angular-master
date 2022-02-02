import { Component, OnInit, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RHService } from "../../../services/RH/rhservice.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DropDownEditorFn } from "./drop-down-editor-fn";

@Component({
  selector: "app-list-fonction",
  templateUrl: "./list-fonction.component.html",
  styleUrls: ["./list-fonction.component.css"]
})
export class ListFonctionComponent implements OnInit {
  id: number;
  fonction: object = {
    nom_fonction: "",
    type_fonction: ""
  };
  message: string;
  rowData: any;
  constructor(
    private http: HttpClient,
    private Rhservice: RHService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.Rhservice.listerFonctions().subscribe(res => {
      console.log(res);
      this.rowData = res;
    });

  }
  add() {
    if (this.fonction["nom_fonction"] != "") {
      if (this.fonction["type_fonction"] != "") {
        for (let prop in this.fonction) {
          if (typeof this.fonction[prop] == "string") {
            if (!this.fonction[prop]) return alert(prop + " is Required");
          } else {
            if (this.fonction[prop] == {}) return alert(prop + "is Required");
          }
        }
        this.Rhservice.addFonction(this.fonction).subscribe(res => {
          console.log(res);
          this.ngOnInit();
          this._snackBar.open("fonction ajouté avec succés", "OK", {
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

      } else {
        this._snackBar.open(
          "Veuillez sélectionner le type du fonction",
          "OK",
          {
            duration: 2000,
            panelClass: ["red-snackbar"]
          }
        );
      }
    } else {
      this._snackBar.open("Veuillez insérer le nom du fonction", "OK", {
        duration: 2000,
        panelClass: ["red-snackbar"]
      });
    }
  }

  getId(event) {
    this.id = event.data["id_fonction"];
    console.log(event.data["id_fonction"]);
    console.log(this.id);
  }
  edit(event) {
    if (
      this.Rhservice.updateFonction(event.data["id_fonction"], event.data).subscribe(
        res => {
          console.log("fonction modifié");
          this.ngOnInit();
          this._snackBar.open("fonction modifié avec succés", "OK", {
            duration: 2000
          });
        }, err => {
          this.message = err.error.message;
          this.dialog.open(DialogError, {
            data: this.message
          });
          this.dialog._afterAllClosed.subscribe(res => { this.ngOnInit(); })

        }
      )
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
      this._snackBar.open("Veuillez sélectionner la fonction à supprimer", "OK", {
        duration: 2000,
        panelClass: ["red-snackbar"]
      });
    }
  }
  columnDefs = [
    {
      headerName: "ID",
      valueGetter: "node.rowIndex + 1"
    },
    {
      headerName: "Nom",
      field: "nom_fonction",
      sortable: true,
      filter: true,
      editable: true,
      minWidth: 300
    },
    {
      headerName: "Type",
      field: "type_fonction",
      sortable: true,
      filter: true,
      editable: true,
      minWidth: 300
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
      this.Rhservice.deleteFonction(this.id).subscribe(res => {
        console.log("fonction Supprimé");
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