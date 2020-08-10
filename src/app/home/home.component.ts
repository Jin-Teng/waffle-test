import { LogService } from './../_services/log.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../_services/user.service';
import { TokenStorageService } from './../_services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private logger: LogService
  ) {
    this.initUserRole();
  }

  ngOnInit() {
    this.logger.log("logger");
  }

  initUserRole(){
    this.userService.getUserProfile().subscribe(
      data => {
        // console.log("home "+ data.data.role);
        if ( data.code === 0 ) {
          this.tokenStorageService.saveUser(data.data.role); //save role in localStorage
        }
      }
    );
  }


}
