import { HttpClient } from '@angular/common/http';
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
  searchTerm: string = "";

  constructor(private organizationService: OrganizationService, private router: Router, private httpClient: HttpClient) { }

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

  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm)
    this.organizations$ = this.httpClient.get<any>("https://project-4-0-backend.herokuapp.com/api/organizations?naam=" + this.searchTerm).pipe(
      map(response => response.content)
    );
  }

}
