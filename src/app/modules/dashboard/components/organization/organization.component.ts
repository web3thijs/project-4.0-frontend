import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Interaction } from 'src/app/core/models/Interaction';
import { AuthService } from 'src/app/modules/security/auth.service';
import { InteractionService } from 'src/app/shared/services/interaction.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
  interactions$: Observable<Interaction[]>;
  isLogout: boolean = false;

  constructor(private router: Router, private interactionService: InteractionService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getInteractions();
  }

  getInteractions() {
    this.interactions$ = this.interactionService.getInteractions().pipe(
      map(response => response)
    );
  }

  toOrganizationProduct() {
    this.router.navigate(['organisatie/producten']);
  }

  toOrganizationOrder() {
    this.router.navigate(['organisatie/bestellingen']);
  }

  toOrganizationDonation() {
    this.router.navigate(['organisatie/vrije-giften']);
  }
}
