import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams, IAfterGuiAttachedParams } from "ag-grid";
import { RHService } from "../../../services/RH/rhservice.service";


@Component({
  selector: "app-button-renderer",
  template: `
    <button (click)="imprimer()" mat-flat-button>
      <i class="material-icons">
        print
      </i>
    </button>
  `
})
export class ButtonRendererComponent implements ICellRendererAngularComp {
  params;
  id: number;
  OrdreAffectationTot: any = {
    idO_Aff_Tot: ""
  };

  agInit(params): void {
    this.params = params;
    this.RHService.getOrdreOfAffTot(this.params.data.idAffectT).subscribe(
      data => {
        this.OrdreAffectationTot = data;
        this.id = this.OrdreAffectationTot.idO_Aff_Tot;

      }
    );
  }

  refresh(params?: any): boolean {
    return true;
  }
  constructor(private RHService: RHService) { }

  imprimer() {
    console.log(this.id);
    this.RHService.pdfAffReportTot(this.id).subscribe(res => {
      var file = new Blob([res], { type: "application/pdf" });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      console.log("PDF AffectationP");
    });
  }
}
