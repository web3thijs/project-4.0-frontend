import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-organization-view',
  templateUrl: './organization-view.component.html',
  styleUrls: ['./organization-view.component.scss']
})
export class OrganizationViewComponent implements OnInit {
  @Input() productImg: string = "";
  @Input() organizationTitle: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
