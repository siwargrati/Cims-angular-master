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
  OrdreAffectationPers: any = {
    idO_Aff_Pers: ""
  };

  agInit(params): void {
    this.params = params;
    this.RHService.getOrdreOfAffPers(this.params.data.id_personnel).subscribe(
      data => {
        this.OrdreAffectationPers = data;
        this.id = this.OrdreAffectationPers.idO_Aff_Pers;

      }
    );
  }

  refresh(params?: any): boolean {
    return true;
  }
  constructor(private RHService: RHService) { }

  imprimer() {
    console.log(this.id);
    this.RHService.pdfAffReportPers(this.id).subscribe(res => {
      var file = new Blob([res], { type: "application/pdf" });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      console.log("PDF AffectationP");
    });
  }
}
