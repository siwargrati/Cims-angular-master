import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams, IAfterGuiAttachedParams } from "ag-grid";
import { DirecteurService } from "../../../services/Directeur/directeur.service";
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: "app-button-renderer-information",
  template: `
    <button (click)="imprimer()" mat-flat-button>
      <i class="material-icons">
        print
      </i>
    </button>
  `
})
export class ButtonRendererInformationComponent implements ICellRendererAngularComp {
  params;
  OrdreAffectationPAtt: any = {
    idO_AffAtt: ""
  };
  id: number;

  agInit(params): void {
    this.params = params;
    this.DirecteurService.getOrdreOfAffAtt(this.params.data.idAffect).subscribe(
      data => {
        this.OrdreAffectationPAtt = data;
        this.id = this.OrdreAffectationPAtt.idO_AffAtt;
      }
    );
  }

  refresh(params?: any): boolean {
    return true;
  }
  constructor(private DirecteurService: DirecteurService) { }

  imprimer() {
    console.log(this.id);
    this.DirecteurService.pdfAffReportAttInf(this.id).subscribe(res => {
      var file = new Blob([res], { type: "application/pdf" });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      console.log("PDF AffectationP");
    });
  }
}
