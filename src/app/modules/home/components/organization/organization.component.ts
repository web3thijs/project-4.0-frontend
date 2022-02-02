import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Organization } from 'src/app/core/models/Organization';
import { OrganizationService } from 'src/app/shared/services/organization.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
  organizations$: Observable<Organization[]>;



  constructor(private organizationService: OrganizationService, private router: Router) { }

  ngOnInit(): void {
    this.getOrganizations();
  }

  getOrganizations() {
    this.organizations$ = this.organizationService.getOrganizations().pipe(
      map(response => response.content)
    );
  }

  onClick(organizationId: number) {
    this.router.navigate(['/organisaties', organizationId]);
  }

}
