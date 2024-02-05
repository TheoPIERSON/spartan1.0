import { Component } from '@angular/core';
import { MasterService } from '../core/services/Master/master.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css'],
})
export class ProductlistComponent {
  constructor(public service: MasterService) {}
}
