import { AfterViewInit, Component, ViewChild, ViewContainerRef } from "@angular/core";
import { FormsModule } from '@angular/forms';

import { RHService } from "../../../services/RH/rhservice.service";
import { ICellEditorAngularComp } from "ag-grid-angular";

@Component({
    selector: 'dropdown-cell-editor',
    template: `
    <mat-select  #input  [(ngModel)]="struct.id_struct">
    <mat-option *ngFor="let item of struct" [value]="item.id_struct">{{item.id_struct}}- {{item.direction}}  </mat-option>
   </mat-select>
  `
})
export class DropDownEditorFn implements ICellEditorAngularComp, AfterViewInit {
    private params: any;
    structure: any;
    public value: number;
    private options: any;
    struct: any =
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
        this.Rhservice.listerStructures().subscribe(data => {
            this.struct = data;

        });
        this.params = params;
        this.struct.id_struct = this.params.value;
        console.log(this.struct.id_struct);
        this.struct = params.options;
        console.log(this.struct);

    }

    getValue(): any {

        return this.struct.id_struct;

    }

    ngAfterViewInit() {
        /* window.setTimeout(() => {
             this.input.element.nativeElement.focus();
         })*/
    }

}