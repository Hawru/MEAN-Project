import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Project } from "../models/project";
import { Global } from "./global";
import { Observable } from "rxjs";

@Injectable()
export class ProjectService{
    public url: string;

    constructor(
        private http: HttpClient
    ){
        this.url = Global.url;
    }
    saveProject(project: Project): Observable<any> {
        let params = JSON.stringify(project);
        let header = new HttpHeaders().set('content-type', 'application/json');
        
        return this.http.post(this.url+'/save-project', params, {headers: header});
    }
    uploadImage(formData: FormData, id: string): Observable<any> {
        let header = new HttpHeaders();
        header.append('Content-Type', 'multipart/form-data');
        header.append('Accept', 'application/json');

        return this.http.post(this.url+'/upload-image/'+id, formData, {headers: header});
    }

    getProjects(): Observable<any>{
        let header = new HttpHeaders().set('content-type', 'application/json');

        return this.http.get(this.url + '/project', {headers: header});
    }

    getProject(id: string): Observable<any>{
        let header = new HttpHeaders().set('content-type', 'application/json');

        return this.http.get(this.url + '/project/' + id, {headers: header});
    }

    deleteProject(id: string): Observable<any>{
        let header = new HttpHeaders().set('content-type', 'application/json');

        return this.http.delete(this.url + '/delete-project/'+ id, {headers: header});
    }
    
    updateProject(project: Project): Observable<any>{
        let header = new HttpHeaders().set('content-type', 'application/json');

        return this.http.put(this.url + '/update-project/'+ project._id, project, {headers: header});
    }
}
