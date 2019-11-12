import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ResultPage } from '../result/result';

declare const Microgear;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  topic: any;
  message: any;
  microgear: any;
  APPID = 'ApplicationID';
  KEY = 'AppKey';
  SECRET = 'SecretKey';
  ALIAS = 'AliasName';

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
    this.initNetPie();
  }

  initNetPie() {
    this.microgear = new Microgear.create({
      key: this.KEY,
      secret: this.SECRET,
      alias: this.ALIAS
    });

    this.microgear.on('message', (topic, msg) => {
      console.log(msg);
      this.processMessage(msg);
    });

    this.microgear.on('connected', () => {
      this.microgear.setAlias(this.ALIAS);
      this.microgear.subscribe('/CustomerAccount1');
      
      console.log('Microgear is connected!');

    });

    this.microgear.connect(this.APPID);
  }

  publishMessage() {

    this.microgear.publish(this.topic, this.message);
    this.alertCtrl.create({
      title: "Send Message",
      subTitle: "Complete",
      buttons: ["OK"]
    }).present();
  }

  processMessage(recvmsg: any) {
    this.navCtrl.push(ResultPage, { message: recvmsg });
  }

}
