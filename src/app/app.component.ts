import { Component } from '@angular/core';
import { State } from './models/state';
import { StateServiceService } from './services/state/state-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'payever-angular-trial';
  state: State;

  constructor(public stateService: StateServiceService) {
    this.state = stateService.getState();
  }
}
