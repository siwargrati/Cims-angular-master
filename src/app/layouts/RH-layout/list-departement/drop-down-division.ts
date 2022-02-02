import { AfterViewInit, Component, ViewChild, ViewContainerRef } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { RHService } from "../../../services/RH/rhservice.service";
import { ICellEditorAngularComp } from "ag-grid-angular";

@Component({
    selector: 'dropdown-cell-editor',
    template: `
    <mat-select  #input  [(ngModel)]="division.id_division">
    <mat-option *ngFor="let item of site" [value]="item.id_division"> {{item.nom_division_fr}}  </mat-option>
   </mat-select>
  `
})
export class DropDownEditorDivision implements ICellEditorAngularComp, AfterViewInit {
    private params: any;
    public value: number;
    private options: any;
    division: any =
        {
            id_division: "",
            nom_division_fr: "",
            nom_division_ar: "",

            /*gouvernorat: {
                id_gouv: ""
            }*/

        }
        ;

    @ViewChild('input', { read: ViewContainerRef }) public input;
    constructor(
        private Rhservice: RHService,
    ) { }

    agInit(params: any): void {
        this.Rhservice.listerDivision().subscribe(data => {
            this.division = data;
            console.log(this.division);
        });
        this.params = params;
        this.division.id_division = this.params.value;
        console.log(this.division.id_division);
        this.division = params.options;
        console.log(this.division);

    }

    getValue(): any {

        return this.division.id_division;

    }

    ngAfterViewInit() {
        /* window.setTimeout(() => {
             this.input.element.nativeElement.focus();
         })*/
    }

}