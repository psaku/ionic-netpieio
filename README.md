# ionic-netpieio
Using NetPIE in ionic 3

A sample ionic 3 project for using NetPIE framework <br/>
ตัวอย่างการใช้งาน NetPIE กับ Ionic Version 3 <br/>

<h5>สิ่งที่ต้องดำเนินการ</h5>
<ul>
  <li><strong>index.html</strong></li>
  <p>
    ทำการ include microgear.js ดังนี้ <br/>
    <script src="https://cdn.netpie.io/microgear.js"></script>
  </p>
  <li><strong>home.ts</strong></li>
  <p>
   <code>
     
      import { Component } from '@angular/core';
      import { NavController, AlertController } from 'ionic-angular';
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
        });

        this.microgear.on('connected', () => {
          this.microgear.setAlias(this.ALIAS);
          this.microgear.subscribe('/topic1');

          console.log('Microgear is connected!');

        });

        this.microgear.connect(this.APPID);
      }

      publishMessage() {
        this.microgear.publish(this.topic, this.message);
      }
     }
   
  </code>
  </p>
</ul>
