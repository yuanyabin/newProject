import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { GaverifyService } from './gaverify.service';

@Component({
  selector: 'app-gverify',
  templateUrl: './gverify.component.html',
  styleUrls: ['./gverify.component.css'],
  providers: [GaverifyService]
})
export class GverifyComponent implements OnInit {

  VerifiCode: string;
  inValidNull = false;
  inValidError = false;
  @ViewChild('gverify') gverifyDiv: ElementRef;
  @ViewChild('myCanvas') myCanvasDev: ElementRef;

  constructor(public getGaverifyService: GaverifyService ) { }

  ngOnInit() {
    // console.log(this.myCanvasDev.nativeElement);
    this.getGaverifyService.getValue(this.gverifyDiv.nativeElement, this.myCanvasDev.nativeElement);
  }

  refreshCode() {
    this.getGaverifyService.refresh();
  }


}
