import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditBlogpostComponent } from '../../../features/blog-post/edit-blogpost/edit-blogpost.component';
import { ImageService } from './image.service';
import { Observable } from 'rxjs';
import { BlogImage } from '../../models/blog-image.model';


@Component({
  selector: 'app-image-selector',
  standalone: true,
  imports: [FormsModule, EditBlogpostComponent, CommonModule],
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.css'
})
export class ImageSelectorComponent implements OnInit {

  private file?: File;
  fileName: string = '';
  title: string = '';
  images$?: Observable<BlogImage[]>;

  //defining the var to clear the form onse submitted
  @ViewChild('form', { static: false }) imageUploadForm?: NgForm;

  constructor(private imageService: ImageService){
  }

  ngOnInit(): void {
    this.getImages();
  }

  onFileUploadChange(event: Event): void{
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }

  uploadImage(): void{
    if(this.file && this.fileName!='' && this.title!=''){
      //Image service to upload the image
      this.imageService.uploadImage(this.file, this.fileName, this.title)
      .subscribe({
        next: (response) => {
          this.imageUploadForm?.resetForm();
          this.getImages();
        }
      });

    }
  }

  selectImage(image: BlogImage): void{
    this.imageService.selectImage(image);
  }

  private getImages(){
    this.images$ = this.imageService.getAllImages();
  }

}
