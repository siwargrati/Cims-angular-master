import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams, IAfterGuiAttachedParams } from "ag-grid";
import { RHService } from "../../../services/RH/rhservice.service";

@Component({
  selector: "app-button-valid",
  template: `
    <button (click)="valider()" mat-flat-button>
      <i class="material-icons">
        done_outline
      </i>
    </button>
  `
})
export class ButtonValidComponent implements ICellRendererAngularComp {
  params: any;
  id: number;
  Mission: any = {
    idMission: ""
  };


  agInit(params): void {
    this.params = params;

    this.Rhservice.getMission(this.params.data.idMission).subscribe(
      data => {
        this.Mission = data;
        this.id = this.Mission.idMission;
      }
    );

    console.log(this.params);
  }

  refresh(params?: any): boolean {
    return true;
  }
  constructor(private Rhservice: RHService) { }
  valider() {
    console.log(this.id);
    this.Rhservice.addNotif(this.id).subscribe(res => {
      console.log("Notification envoyée");

    })
      ;
  }
}