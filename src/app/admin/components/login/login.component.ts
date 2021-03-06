import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('errorCard') errorCard: ElementRef;
  password: string;
  errorHeight = 0;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  get errorCardActualHeight(): number {
    return this.errorCard.nativeElement.scrollHeight;
  }

  doLogin(): void {
    this.authService.login(this.password)
      .subscribe(status => {
        if (status === 200) this.router.navigate(['/admin']);
        else this.errorHeight = this.errorCardActualHeight;
      });
  }
}
