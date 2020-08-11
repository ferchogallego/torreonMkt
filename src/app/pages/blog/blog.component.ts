import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  lista: any;
  constructor(private blogSvc: BlogService,
              private router: Router ) { }

  ngOnInit(): void {
    this.blogSvc.cargarPost()
                .subscribe(blg => {
                  this.lista = blg;
                  console.log(this.lista);
                });
  }

  verPost(idPost: string){
    this.router.navigate([`/post/${idPost}`]);
  }

}
