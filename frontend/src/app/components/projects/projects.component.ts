import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit{
  public projects!: Project[];
  public url: string;

  // icons
  faPen = faPen;
  faTrash = faTrash;

  constructor(
    private projectService: ProjectService
  ) {
    this.url = Global.url
  }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    try {
      this.projectService.getProjects().subscribe(
        (res) => {
          if(res) {
            this.projects = res;
          }
        }
      )
    } catch (error) {
      
    }
    
  }

  deleteProject(id: string) {
    try {
      this.projectService.deleteProject(id).subscribe(
        (res) => {
          this.getProjects();
        }
      )
    } catch (e) {
      console.log(e);
    }
  }
}
