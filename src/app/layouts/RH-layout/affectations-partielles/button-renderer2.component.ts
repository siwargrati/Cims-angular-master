import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams, IAfterGuiAttachedParams } from "ag-grid";
import { UploadFileService } from "../../../services/uploadFile/upload-file.service";

@Component({
  selector: "app-button-renderer2",
  template: `
    <button (click)="download2()" mat-flat-button>
      <i class="material-icons">
        get_app
      </i>
    </button>
  `
})
export class ButtonRenderer2Component implements ICellRendererAngularComp {
  params: any;

  agInit(params): void {
    this.params = params;
    console.log(this.params);
  }

  refresh(params?: any): boolean {
    return true;
  }
  constructor(private fileService: UploadFileService) { }
  download2() {
    console.log(this.params.data.file2.id_file2);
    this.fileService
      .DownloadFile2(this.params.data.file2.id_file2)
      .subscribe(res => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(res);
        a.download = "piece_jointe";
        document.body.appendChild(a);
        a.click();
      });
  }
}
