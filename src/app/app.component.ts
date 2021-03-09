import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
@Component({
  selector: 'app-root',
  template: `
    <div *ngIf="loading">Loading...</div>
    <div *ngIf="error">Error :(</div>
    <div *ngIf="paises">
      <div *ngFor="let pais of paises">
        <p>{{ pais.name }}: {{ pais.name }}</p>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'graphql-vass';

  loading = true;
  error: any;
  paises: any[] = [];

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            countries {
              name
              phone
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.paises = result?.data?.countries;
        this.loading = result.loading;
        this.error = result.error;
      });
  }
}
