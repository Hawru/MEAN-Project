import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})
export class AboutMeComponent implements OnInit {
  public title: string;
  public subtitle: string;
  public email: string;

  constructor(){
    this.title = "Julian Valencia";
    this.subtitle = "Desarrollador web Full Stack"
    this.email = "julianvalencia02@gmail.com"
  }
  
  ngOnInit(): void {
    
  }
}
