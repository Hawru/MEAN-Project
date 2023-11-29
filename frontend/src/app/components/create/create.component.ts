import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Form, FormsModule } from '@angular/forms';


@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  providers: [ProjectService]
})
export class CreateComponent implements OnInit{
  public title: string;
  public project: Project;
  public status: string;
  public langsSplit: string;
  public formData!: FormData;
  public inputHolder: any;

  constructor(
    private projectService: ProjectService
  ){
    this.title = "Crear proyecto"
    this.project = new Project('', '', '', '', [''], 0, '')
    this.langsSplit = '';
    this.status = "default";
    this.formData = new FormData();
  }
  ngOnInit(): void {

  }

  onSubmit(form: any) {
    this.project.langs = this.langsSplit.split(' ');
    this.projectService.saveProject(this.project).subscribe({
      next: (v) => this.projectService.uploadImage(this.formData, v._id).subscribe({
        next: (v) => console.log(v),
        error: (e) => this.status = "error",
        complete: () => {
          this.status = "success";
          this.formData.delete('img-project');
          form.resetForm()
        } 
      }),
      error: (e) => {
        this.status = "error";
      },
      complete: () => {
        this.status = "success";
      } 
    })
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
