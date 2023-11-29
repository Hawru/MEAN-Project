import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
  providers: [ProjectService],
})
export class EditComponent implements OnInit{
  public title: string;
  public project!: Project;
  public status: string;
  public langsSplit: string;
  public formData!: FormData;
  public existProject: string;
  public inputHolder: any;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute
  ){
    this.title = "Editar Proyecto"
    this.project = new Project('', '', '', '', [''], 0, '')
    this.langsSplit = '';
    this.status = "default";
    this.formData = new FormData();
    this.existProject = "Loading";
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id']
      this.getProject(id);
    })
  }

  onSubmit(form: any){
    this.project.langs = this.langsSplit.split(' ');
    this.projectService.updateProject(this.project).subscribe({
      next: (v) => { if(this.formData.has('img-project')) 
        {
          this.projectService.uploadImage(this.formData, v._id).subscribe({
            next: (v) => console.log(v),
            error: (e) => this.status = "error",
            complete: () => {
              this.status = "success";
              this.formData.delete('img-project');
              form.resetForm()
            } 
          })
        } else {
          this.status = "success";
          this.formData.delete('img-project');
          form.resetForm()
        }   
      },
      error: (e) => {
        this.status = "error";
      },
      complete: () => {
        this.status = "success";
      } 
    })
    
  }

  getProject(id: string) {
    try {
      this.projectService.getProject(id).subscribe(
        (res) => {
          if(res) {
            if(!res.message) {
              this.existProject = "Yes"
              this.project = res;
              this.langsSplit = this.project.langs.join(' ');
            } else {
              this.existProject = "No"
            }
          }
        }
      )
    } catch (e) {
      console.log(e);
    }
    
  }

  fileChange(event: any) {
    let fileList: FileList = event.target.files;

    if (fileList.length < 1) {
      return;
    }
    
    let file: File = fileList[0];
    this.formData.set('img-project', file);
    }
}
