import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Organization } from 'src/app/core/models/Organization';
import { OrganizationListPaginationDTO } from 'src/app/core/models/OrganizationListPaginationDTO';
import { OrganizationService } from 'src/app/shared/services/organization.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
  organizations$: Observable<OrganizationListPaginationDTO>;
  searchTerm: string = "";
  isPagination: boolean = true;
  isFilter: boolean = false;
  totalPagesPagination: number = 1;
  organizationListPaginationDTO: OrganizationListPaginationDTO = {
    content: [],
    totalPages: 0
  }

  constructor(private organizationService: OrganizationService, private router: Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getOrganizations();
  }

  getOrganizations() {
    this.organizations$ = this.organizationService.getOrganizationsDTO().pipe(
      map(response => response)
    );
  }

  onClick(organizationId: number) {
    this.router.navigate(['/organisaties', organizationId]);
  }

  search(event:any){
    this.isFilter = true;
    this.isPagination = false;
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm)
    this.organizations$ = this.httpClient.get<any>("https://6tmnye3cmp.eu-west-1.awsapprunner.com/api/organizations?naam=" + this.searchTerm).pipe(
      map(response => response)
    );
  }

  onClickMore(){
    this.totalPagesPagination+=1;
    this.organizations$ = this.httpClient.get<any>("https://6tmnye3cmp.eu-west-1.awsapprunner.com/api/organizations?page=" + (this.totalPagesPagination - 1)).pipe(
      map(response => response)
    );
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    console.log("more" + this.totalPagesPagination);
  }

  onClickLess(){
    this.totalPagesPagination-=1;
    this.organizations$ = this.httpClient.get<any>("https://6tmnye3cmp.eu-west-1.awsapprunner.com/api/organizations?page=" + (this.totalPagesPagination - 1)).pipe(
      map(response => response)
    );
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    console.log("less " + this.totalPagesPagination);
  }

  removeFilter() {
    this.organizations$ = this.organizationService.getOrganizationsDTO().pipe(
      map(response => response)
    );
    this.isFilter = false;
    this.isPagination = true;
  }

}
