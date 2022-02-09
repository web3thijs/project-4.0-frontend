import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Interaction } from 'src/app/core/models/Interaction';
import { InteractionService } from 'src/app/shared/services/interaction.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
  interactions$: Observable<Interaction[]>;

  constructor(private router: Router, private interactionService: InteractionService) { }

  ngOnInit(): void {
    this.getInteractions();
  }

  getInteractions() {
    this.interactions$ = this.interactionService.getInteractions().pipe(
      map(response => response)
    );
  }

  toOrganizationProduct() {
    this.router.navigate(['organisatie/product']);
  }

  toOrganizationOrder() {
    this.router.navigate(['organisatie/bestelling']);
  }

  toOrganizationDonation() {
    this.router.navigate(['organisatie/vrije-gift']);
  }

}
