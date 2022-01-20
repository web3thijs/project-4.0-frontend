import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Organization } from 'src/app/core/models/Organization';
import { OrganizationService } from 'src/app/shared/services/organization.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
  organizations$: Observable<Organization[]> = new Observable<Organization[]>();



  constructor(private organizationService: OrganizationService) { }

  ngOnInit(): void {
    this.organizations$ = this.organizationService.getOrganizations();
  }

}
