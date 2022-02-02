import { Component, OnInit, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RHService } from "../../../services/RH/rhservice.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DropDownEditor } from "./drop-down-editor";

@Component({
  selector: "app-list-sites",
  templateUrl: "./list-sites.component.html",
  styleUrls: ["./list-sites.component.css"]
})
export class ListSitesComponent implements OnInit {
  id: number;
  gouvernorat: any;
  site: object = {
    nom_etablissement_fr: "",
    nom_etablissement_ar: "",
    nature_etablissement_fr: "",
    nature_etablissement_ar: "",
    qualite_direction_fr: "",
    qualite_direction_ar: "",
    gouvernorat: { id_gouv: "" }
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
    this.Rhservice.listerSite().subscribe(res => {
      console.log(res);
      this.rowData = res;
      console.log(this.site["gouvernorat"]);
    });
    this.Rhservice.listerGouvernorats().subscribe(data => {
      this.gouvernorat = data;
    });

  }
  add() {
    if (this.site["nom_etablissement_fr"] != "") {
      if (this.site["nom_etablissement_ar"] != "") {
        if (this.site["nature_etablissement_fr"] != "") {
          if (this.site["nature_etablissement_ar"] != "") {
            if (this.site["qualite_direction_fr"] != "") {
              if (this.site["qualite_direction_ar"] != "") {
                if (this.site["gouvernorat"].id_gouv != "") {
        for (let prop in this.site) {
          if (typeof this.site[prop] == "string") {
            if (!this.site[prop]) return alert(prop + " is Required");
          } else {
            if (this.site[prop] == {}) return alert(prop + "is Required");
          }
        }
        this.Rhservice.addSite(this.site).subscribe(res => {
          console.log(res);
          this.ngOnInit();
          this._snackBar.open("Site ajouté avec succés", "OK", {
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
          "Veuillez sélectionner le gouvernorat du site",
          "OK",
          {
            duration: 2000,
            panelClass: ["red-snackbar"]
          }
        );
      }
    } else {
      this._snackBar.open("Veuillez insérer la qualité de direction en ar", "OK", {
        duration: 2000,
        panelClass: ["red-snackbar"]
      });
    }  
  } else {
    this._snackBar.open("Veuillez insérer la qualité de direction en fr", "OK", {
      duration: 2000,
      panelClass: ["red-snackbar"]
    });
  }    
    } else {
      this._snackBar.open("Veuillez insérer la nature d'établissement", "OK", {
        duration: 2000,
        panelClass: ["red-snackbar"]
      });
    }  
    } else {
      this._snackBar.open("Veuillez insérer la nature d'établissement en fr", "OK", {
        duration: 2000,
        panelClass: ["red-snackbar"]
      });
    }  
    } else {
      this._snackBar.open("Veuillez insérer le nom d'établissement en ar", "OK", {
        duration: 2000,
        panelClass: ["red-snackbar"]
      });
    }  
    } else {
      this._snackBar.open("Veuillez insérer le nom établissement en fr", "OK", {
        duration: 2000,
        panelClass: ["red-snackbar"]
      });
    }
  }

  getId(event) {
    this.id = event.data["idSite"];
    console.log(event.data["idSite"]);
    console.log(this.id);
  }
  edit(event) {
    if (
      this.Rhservice.updateSite(event.data["idSite"], event.data).subscribe(
        res => {
          console.log("Site modifié");
          this.ngOnInit();
          this._snackBar.open("Site modifié avec succés", "OK", {
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
      this._snackBar.open("Veuillez sélectionner le site à supprimer", "OK", {
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
      headerName: "Nom étab FR",
      field: "nom_etablissement_fr",
      sortable: true,
      filter: true,
      editable: true,
      minWidth: 50
    },
    {
      headerName: "Nom étab AR",
      field: "nom_etablissement_ar",
      sortable: true,
      filter: true,
      editable: true,
      minWidth: 50
    },
    {
      headerName: "Nature étab FR",
      field: "nature_etablissement_fr",
      sortable: true,
      filter: true,
      editable: true,
      minWidth: 50
    },
    {
      headerName: "Nature étab AR",
      field: "nature_etablissement_ar",
      sortable: true,
      filter: true,
      editable: true,
      minWidth: 50
    },
    {
      headerName: "Qualité direction FR",
      field: "qualite_direction_fr",
      sortable: true,
      filter: true,
      editable: true,
      minWidth: 50
    },
    {
      headerName: "Qualité direction AR",
      field: "qualite_direction_ar",
      sortable: true,
      filter: true,
      editable: true,
      minWidth: 50
    },
    {
      headerName: "Gouvernorat",
      field: "gouvernorat.nomGouvFR",
      valueSetter: function (params) {
        params.data.gouvernorat.id_gouv = params.newValue;
        console.log(params);
        return true;
      },
      sortable: true,
      filter: true,
      editable: true,
      minWidth: 50,
      cellEditorFramework: DropDownEditor,
      cellEditorParams: {
        options: [
        ]


      }
      ,
      valueParser: function (params) {
        return Number(params.newValue);
      }
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
      this.Rhservice.deleteSite(this.id).subscribe(res => {
        console.log("Site Supprimé");
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