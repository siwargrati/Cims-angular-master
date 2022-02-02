import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpRequest,
  HttpHeaders,
  HttpEvent
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UploadFileService {
  private baseUrl = "http://localhost:8082";

  constructor(private http: HttpClient) { }

  upload(file: File, idMission: number): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append("file", file);

    const req = new HttpRequest(
      "POST",
      "http://localhost:8082/api/upload/" + idMission,
      formData,
      {
        reportProgress: true,
        responseType: "json"
      }
    );

    return this.http.request(req);
  }
  upload2(file2: File, idMission: number): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append("file2", file2);

    const req = new HttpRequest(
      "POST",
      "http://localhost:8082/api/upload2/" + idMission,
      formData,
      {
        reportProgress: true,
        responseType: "json"
      }
    );

    return this.http.request(req);
  }
  getFiles(): Observable<any> {
    return this.http.get("http://localhost:8082/api/files");
  }

  getFiles2(): Observable<any> {
    return this.http.get("http://localhost:8082/api/files2");
  }

  DownloadFile(id_file: number) {
    const headers = new HttpHeaders();
    return this.http.get("http://localhost:8082/api/downloadFile/" + id_file, {
      responseType: "blob"
    });
  }

  DownloadFile2(id_file2: number) {
    const headers = new HttpHeaders();
    return this.http.get("http://localhost:8082/api/downloadFile2/" + id_file2, {
      responseType: "blob"
    });
  }

}
