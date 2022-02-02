import { AfterViewInit, Component, ViewChild, ViewContainerRef } from "@angular/core";
import { FormsModule } from '@angular/forms';

import { RHService } from "../../../services/RH/rhservice.service";
import { ICellEditorAngularComp } from "ag-grid-angular";

@Component({
    selector: 'dropdown-cell-editor',
    template: `
    <mat-select  #input  [(ngModel)]="fonction.id_fonction">
    <mat-option *ngFor="let item of fonction" [value]="item.id_fonction"> {{item.nom_fonction}}  </mat-option>
   </mat-select>
  `
})
export class DropDownEditorFonction implements ICellEditorAngularComp, AfterViewInit {
    private params: any;
    public value: number;
    private options: any;
    fonction: any =
        {
            id_fonction: "",
            nom_fonction: ""

        }
        ;
    @ViewChild('input', { read: ViewContainerRef }) public input;
    constructor(
        private Rhservice: RHService,
    ) { }

    agInit(params: any): void {
        this.Rhservice.listerFonctions().subscribe(data => {
            this.fonction = data;
            console.log(this.fonction);
        });
        this.params = params;
        this.fonction.id_fonction = this.params.value;
        console.log(this.fonction.id_fonction);
        this.fonction = params.options;
        console.log(this.fonction);

    }

    getValue(): any {

        return this.fonction.id_fonction;

    }

    ngAfterViewInit() {
        /* window.setTimeout(() => {
             this.input.element.nativeElement.focus();
         })*/
    }

}