import { AfterViewInit, Component, ViewChild, ViewContainerRef } from "@angular/core";
import { FormsModule } from '@angular/forms';

import { RHService } from "../../../services/RH/rhservice.service";
import { ICellEditorAngularComp } from "ag-grid-angular";

@Component({
    selector: 'dropdown-cell-editor',
    template: `
    <mat-select  #input  [(ngModel)]="dept.id_struct">
    <mat-option *ngFor="let item of dept" [value]="item.id_struct"> {{item.direction}}  </mat-option>
   </mat-select>
  `
})
export class DropDownEditorDept implements ICellEditorAngularComp, AfterViewInit {
    private params: any;
    public value: number;
    private options: any;
    dept: any =
        {
            id_struct: "",
            direction: ""

        }
        ;
    @ViewChild('input', { read: ViewContainerRef }) public input;
    constructor(
        private Rhservice: RHService,
    ) { }

    agInit(params: any): void {
        this.Rhservice.listerDepartements().subscribe(data => {
            this.dept = data;
            console.log(this.dept);
        });
        this.params = params;
        this.dept.id_struct = this.params.value;
        console.log(this.dept.id_struct);
        this.dept = params.options;
        console.log(this.dept);

    }

    getValue(): any {

        return this.dept.id_struct;

    }

    ngAfterViewInit() {
        /* window.setTimeout(() => {
             this.input.element.nativeElement.focus();
         })*/
    }

}