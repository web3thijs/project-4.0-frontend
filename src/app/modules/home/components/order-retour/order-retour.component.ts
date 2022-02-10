import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Organization } from 'src/app/core/models/Organization';
import { OrganizationService } from 'src/app/shared/services/organization.service';

@Component({
  selector: 'app-order-retour',
  templateUrl: './order-retour.component.html',
  styleUrls: ['./order-retour.component.scss']
})
export class OrderRetourComponent implements OnInit {
  organizations$: Observable<Organization[]>;

  constructor(private organizationService: OrganizationService) { }

  ngOnInit(): void {
    this.getOrganizations();
  }

  getOrganizations() {
    this.organizations$ = this.organizationService.getOrganizations().pipe(
      map(response => response.content)
    );
  }

}
