import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ApiRestService } from './../../services/api-rest.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  posts: any;

  constructor(
    private authService: AuthenticationService,
    public api: ApiRestService,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.getPost();
  }
  
  async getPost() {
    const loading = await this.loadingController.create({
    });

    await loading.present();
    await this.api.get('posts')
      .subscribe(
        res => {
          console.log(res);
          this.posts = res;
          loading.dismiss();
        },
        err => {
          console.log(err);
          loading.dismiss();
        }
      )

  }

  logOut(){
    this.authService.logout();
  }
}
