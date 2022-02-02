import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class RHService {
  constructor(private http: HttpClient) { }

  listerSite() {
    return this.http.get("http://localhost:8082/api/listSites");
  }



  updateSite(idSite: number, site: object) {
    return this.http.put(
      "http://localhost:8082/api/updateSite/" + idSite,
      site
    );
  }
  addSite(site: object) {
    return this.http.post("http://localhost:8082/api/addSite", site);
  }
  deleteSite(idSite: number) {
    return this.http.delete("http://localhost:8082/api/deleteSite/" + idSite);
  }
  getSitesParGouv(id_gouv: number) {
    return this.http.get("http://localhost:8082/api/listSiteG/" + id_gouv);
  }

  //--------------------------------------------------------------------------------------------------------------
  listerGrades() {
    return this.http.get("http://localhost:8082/api/listGrades");
  }
  updateGrade(id_grade: number, grade: object) {
    return this.http.put(
      "http://localhost:8082/api/updateGrade/" + id_grade,
      grade
    );
  }
  addGrade(grade: object) {
    return this.http.post("http://localhost:8082/api/addGrade", grade);
  }
  deleteGrade(id_grade: number) {
    return this.http.delete(
      "http://localhost:8082/api/deleteGrade/" + id_grade
    );
  }
  //---------------------------------------------------------------------------------------

  listerPersonnel() {
    return this.http.get("http://localhost:8082/api/listPersonnels");
  }
  updatePersonnel(id_personnel: number, personnel: object) {
    return this.http.put(
      "http://localhost:8082/api/updatePersonnel/" + id_personnel,
      personnel
    );
  }
  addPersonnel(personnel: object) {
    return this.http.post("http://localhost:8082/api/addPersonnel", personnel);
  }
  deletePersonnel(id_personnel: number) {
    return this.http.delete(
      "http://localhost:8082/api/deletePersonnel/" + id_personnel
    );
  }

  getAffectationP(idAffectT: number) {
    return this.http.get("http://localhost:8082/api/getAffectationP/" + idAffectT);
  }
  addNotif(idMission: number) {
    const headers = new HttpHeaders();
    return this.http.get("http://localhost:8082/api/addNotif/" + idMission, {
      responseType: "blob"
    });
  }
  addNotif2(idMission: number) {
    const headers = new HttpHeaders();
    return this.http.get("http://localhost:8082/api/addNotif2/" + idMission, {
      responseType: "blob"
    });
  }

  getMission(idMission: number) {
    return this.http.get("http://localhost:8082/api/getMission/" + idMission);
  }

  //---------------------------------------------------------------------------
  listerDepartements() {
    return this.http.get("http://localhost:8082/api/listStructures");
  }
  UpdateDepartement(id_struct: number, structure: object) {
    return this.http.put(
      "http://localhost:8082/api/updateStructure/" + id_struct,
      structure
    );
  }
  AddDepartement(structure: object) {
    return this.http.post(
      "http://localhost:8082/api/addStructure",
      structure
    );
  }
  DeleteDepartement(id_struct: number) {
    return this.http.delete(
      "http://localhost:8082/api/deleteStructure/" + id_struct
    );
  }

  //---------------------------------------------------------------------------
  listerFonctions() {
    return this.http.get("http://localhost:8082/api/listFonctions");
  }
  updateFonction(id_fonction: number, fonction: object) {
    return this.http.put(
      "http://localhost:8082/api/updateFonction/" + id_fonction,
      fonction
    );
  }
  addFonction(fonction: object) {
    return this.http.post(
      "http://localhost:8082/api/addFonction",
      fonction
    );
  }
  deleteFonction(id_fonction: number) {
    return this.http.delete(
      "http://localhost:8082/api/deleteFonction/" + id_fonction
    );
  }
  getFonctionsParStruct(id_struct: number) {
    return this.http.get("http://localhost:8082/api/listFonctionS/" + id_struct);
  }
  //------------------------------------------------------------//
  listerDivision() {
    return this.http.get("http://localhost:8082/api/listDivisions");
  }
  getDivisionParStructure(id_struct: number) {
    return this.http.get("http://localhost:8082/api/listDivisionS/" + id_struct);
  }

  //------------------------------------------------------------------------------------------
  listerGouvernorats() {
    return this.http.get("http://localhost:8082/api/listGouvernorats");
  }
  //------------------------------------------------------------------------------------------
  listerStructures() {
    return this.http.get("http://localhost:8082/api/listStructures");
  }

  //-------------------------------------------------------------------------------------------

  listerAffP() {
    return this.http.get(
      "http://localhost:8082/api/listMissionAffectationAccomplie/"
    );
  }
  //-----------------------------------------------------------------------------------------------
  listerAffTot() {
    return this.http.get("http://localhost:8082/api/listAffectation_T");
  }
  addAffTot(AffectationTotale: object) {
    return this.http.post(
      "http://localhost:8082/api/addAffectation_T",
      AffectationTotale
    );
  }
  listPersonnelsSansAffecT() {
    return this.http.get("http://localhost:8082/api/listPersonnelsSansAffecT");
  }
  updateAffTot(idAffectT: number, AffectationTotale: object) {
    return this.http.put(
      "http://localhost:8082/api/updateAffectation_T/" + idAffectT,
      AffectationTotale
    );
  }
  deleteAffTot(idAffectT: number) {
    return this.http.delete(
      "http://localhost:8082/api/deleteAffectation_T/" + idAffectT
    );
  }
  //------------------------------------------------------------------------------------------------
  DashAffpardate(): Observable<any> {
    return this.http.get("http://localhost:8082/api/listerAffpardate");
  }

  getNbrMissionToday() {
    return this.http.get("http://localhost:8082/api/getNbrMissionToday");
  }

  getNbrAffectValidee() {
    return this.http.get("http://localhost:8082/api/getNbrAffectValidee");
  }

  getNbrAffectRefusee() {
    return this.http.get("http://localhost:8082/api/getNbrAffectRefusee");
  }

  getNbrPersonnel() {
    return this.http.get("http://localhost:8082/api/getNbrPersonnel");
  }

  DashAffparGouv(): Observable<any> {
    return this.http.get("http://localhost:8082/api/listerAffparGouv");
  }
  ////////////////////////////////////////////////////////////////////
  //Ordre affectation ---------------------------------------------------------------------------
  getOrdreOfAffPers(id_personnel: number) {
    return this.http.get("http://localhost:8082/api/getOrdreOfAffPers/" + id_personnel);
  }
  pdfAffReportPers(idO_Aff_Pers: number) {
    const headers = new HttpHeaders();
    return this.http.get("http://localhost:8082/api/pdfreportpers/" + idO_Aff_Pers, {
      responseType: "blob"
    });
  }

  getOrdreOfAffTot(idAffectT: number) {
    return this.http.get("http://localhost:8082/api/getOrdreOfAffTot/" + idAffectT);
  }
  pdfAffReportTot(idO_Aff_Tot: number) {
    const headers = new HttpHeaders();
    return this.http.get("http://localhost:8082/api/pdfreporttot/" + idO_Aff_Tot, {
      responseType: "blob"
    });
  }

  getOrdreOfMiss(idMission: number) {
    return this.http.get(
      "http://localhost:8082/api/getOrdreOfMiss/" + idMission
    );
  }
  pdfmissionReport(idO_Miss: number) {
    const headers = new HttpHeaders();
    return this.http.get(
      "http://localhost:8082/api/missionReport/" + idO_Miss,
      {
        responseType: "blob"
      }
    );
  }  /////////////////////////////////////////

  ajouterConge(Conge: object, personnel_id: number) {
    return this.http.post("http://localhost:8082/api/ajouterConge/" + personnel_id, Conge);
  }
  listConge() {
    return this.http.get(
      "http://localhost:8082/api/listconge"
    );
  }
  deleteConge(idConge: number) {
    return this.http.delete(
      "http://localhost:8082/api/deleteConge/" + idConge
    );
  }
  updateConge(id_conge: number, Conge: object) {
    return this.http.put(
      "http://localhost:8082/api/updateConge/" + id_conge,
      Conge
    );
  }
  ///////////////////////////////////////////////////////////////////////
  ajouterAbsence(personnel_id: number, datedejour: Date) {
    return this.http.put("http://localhost:8082/api/ListeAbsence/" + personnel_id + "/" + datedejour, {}
    );

  }
  getListeAbsenceParDate(datedejour: Date) {
    return this.http.get("http://localhost:8082/api/listAbsenceParJour/" + datedejour);
  }
  deletePersonnelFromListeAbsence(personnel_id: number, datedejour: Date) {
    return this.http.put(
      "http://localhost:8082/api/supprimerPersonnelDeLaListe/" + personnel_id + "/" + datedejour, {}
    );
  }
  ajouterAnnulationConge(conge_id: number) {
    return this.http.post("http://localhost:8082/api/ajouterAConge/" + conge_id, {});
  }
  congeparPersonnelenattente(personnel_id: number) {
    return this.http.get("http://localhost:8082/api/congeparpersonnel/" + personnel_id);
  }
  annulationCongeenAttente(personnel_id: number) {
    return this.http.get("http://localhost:8082/api/AnulationCongeenattente/" + personnel_id);
  }
  listAnnulationConge() {
    return this.http.get(
      "http://localhost:8082/api/listannulationconge"
    );
  }
  AccepterAConge(idAConge: number) {
    return this.http.put(
      "http://localhost:8082/api/accepterAnnulationConge/" + idAConge, {}
    );
  }
  RefusererAConge(idAConge: number) {
    return this.http.put(
      "http://localhost:8082/api/refuserAnnulationConge/" + idAConge, {}
    );
  }
  RefusererConge(idConge: number) {
    return this.http.put(
      "http://localhost:8082/api/refuserConge/" + idConge, {}
    );
  }
  AccepterConge(idConge: number) {
    return this.http.put(
      "http://localhost:8082/api/accepterConge/" + idConge, {}
    );
  }

  ajouterRSR(RSR: object, personnel_id: number) {
    return this.http.post("http://localhost:8082/api/addRSR/" + personnel_id, RSR);
  }

  listRSR() {
    return this.http.get(
      "http://localhost:8082/api/listRSR"
    );
  }

  AccepterDemandeRSR(idRSR: number) {
    return this.http.put(
      "http://localhost:8082/api/AccepterDemandeRSR/" + idRSR, {}
    );
  }
  RefuserDemandeRSR(idRSR: number) {
    return this.http.put(
      "http://localhost:8082/api/RefuserDemandeRSR/" + idRSR, {}
    );
  }

}
