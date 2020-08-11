import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminav',
  templateUrl: './adminav.component.html',
  styleUrls: ['./adminav.component.scss']
})
export class AdminavComponent implements OnInit {

  constructor(private authSvc: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  async onLogout(){
    try {
      await this.authSvc.logout();
      this.router.navigate(['/admin']);
    } catch (error) {
      console.log(error);
    }
   }

}
