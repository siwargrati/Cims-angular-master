import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DirecteurService } from "../../../../services/Directeur/directeur.service";
@Component({
  selector: "app-aff-prefusees",
  templateUrl: "./aff-prefusees.component.html",
  styleUrls: ["./aff-prefusees.component.css"]
})
export class AffPrefuseesComponent implements OnInit {
  rowDataP: any;
  /*Etat_AffectationP: any[] = [
      {
        id_etat: "",
        nomEtat: "",
        
      }
    ]; */
  AffectationPartielle: object = {
    idAffect: "",
    dateDebut: "",
    datefin: "",
    site: { idSite: "" },
    personnel: { id_personnel: "" },
    jour: "",
    sujet: "Assistance technique",
    etat: { id_etat: "" }
  };

  constructor(
    private http: HttpClient,
    private DirecteurService: DirecteurService
  ) { }

  ngOnInit(): void {
    this.DirecteurService.listerAffPRefusées().subscribe(res => {
      console.log(res);
      this.rowDataP = res;
    });
  }

  columnDefsP = [
    {
      headerName: "ID",
      field: "idAffect",
      sortable: true,
      filter: true,
      maxWidth: 100
    },
    {
      headerName: "personnel",
      colId: "personnel.nom & personnel.prenom",
      valueGetter: function (params) {
        return params.data.personnel.nom + " " + params.data.personnel.prenom;
      },
      sortable: true,
      filter: true
    },

    {
      headerName: "Site",
      field: "site.nom_etablissement_fr",
      sortable: true,
      filter: true,
      maxWidth: 150
    },
    {
      headerName: "Date debut",
      field: "dateDebut",
      sortable: true,
      maxWidth: 140
    },
    {
      headerName: "Date fin",
      field: "datefin",
      sortable: true,
      maxWidth: 130
    },
    {
      headerName: "Jour",
      field: "jour",

      sortable: true,
      filter: true,
      maxWidth: 170
    },
    {
      headerName: "Sujet",
      field: "sujet",
      sortable: true,
      filter: true,
      maxWidth: 170
    },
    {
      headerName: "Etat",
      field: "etat.nom_etat",
      maxWidth: 130,
      sortable: true,
      filter: true,
      cellStyle: { color: "red", fontWeight: 'bold' }
    }
  ];
}
