import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Coaching-Front';
  isLoading = false;
  text: string = '';
  constructor(private httpService: HttpService) {}

  ngOnInit(): void {}

  testAction() {
    this.text = '';
    this.httpService.getHello().subscribe(async (result) => {
      this.isLoading = true;
      await new Promise((f) => setTimeout(f, 3000));
      this.isLoading = false;
      this.text = result;
    });
  }
}
