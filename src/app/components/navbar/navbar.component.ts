import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title: string;

  constructor(
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.configService.getConfig(ConfigService.keyPortfolioTitle)
      .subscribe(cnf => {
        this.title = cnf.value;
      });
  }
}
