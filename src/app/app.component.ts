import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import {
  Query,
  LaunchPast,
  Dragon,
  LaunchPad,
  Mission,
} from 'src/types/queries';

type QueryTypes = 'launchesPast' | 'launchpads' | 'missions' | 'dragons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  query = new FormControl('');

  queriesList: QueryTypes[] = [
    'launchesPast',
    'launchpads',
    'missions',
    'dragons',
  ];

  selectedQuery: QueryTypes | null = null;
  data: {
    launchesPast?: LaunchPast[];
    dragon?: Dragon[];
    launchPad?: LaunchPad[];
    mission?: Mission[];
  } | null = null;

  constructor(private apollo: Apollo) {}

  ngOnInit() {}

  executeQuery() {
    if (!this.selectedQuery) return;

    let query =
      this.selectedQuery === 'launchesPast'
        ? launches
        : this.selectedQuery === 'launchpads'
        ? launchPads
        : this.selectedQuery === 'missions'
        ? missions
        : dragons;

    this.data = null;

    this.apollo
      .watchQuery({
        query,
      })
      .valueChanges.subscribe((result) => {
        this.data = {};
        console.log(result);

        if (this.selectedQuery === 'launchesPast') {
          this.data.launchesPast = (
            result as Query<'launchesPast', LaunchPast>
          ).data.launchesPast;
        }

        if (this.selectedQuery === 'launchpads') {
          this.data.launchPad = (
            result as Query<'launchpads', LaunchPad>
          ).data.launchpads;
        }

        if (this.selectedQuery === 'missions') {
          this.data.mission = (
            result as Query<'missions', Mission>
          ).data.missions;
        }

        if (this.selectedQuery === 'dragons') {
          this.data.dragon = (result as Query<'dragons', Dragon>).data.dragons;
        }

        console.log(this.data);
      });
  }
}

const launches = gql`
  {
    launchesPast(limit: 10) {
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      links {
        article_link
        video_link
      }
    }
  }
`;

const launchPads = gql`
  {
    launchpads(limit: 10) {
      attempted_launches
      details
      name
      status
      successful_launches
    }
  }
`;

const missions = gql`
  {
    missions(limit: 10) {
      description
      manufacturers
      name
    }
  }
`;

const dragons = gql`
  {
    dragons(limit: 10) {
      links {
        article_link
        video_link
      }
    }
  }
`;
