import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { VedioCallInputComponent } from '../vedio-call-input/vedio-call-input.component';
import { Store } from '@ngrx/store';
import * as trainerActions from '../../../ngrx/trainers/trainer.action';
import { ActivatedRoute } from '@angular/router';
import { getisTrainer } from '../../../ngrx/trainers/trainer.selectors';
import { GetuserdataService } from '../../../services/getuserdata.service';

// get token
function generateToken(tokenServerUrl: string, userID: string) {
  // Obtain the token interface provided by the App Server
  return fetch(
    `${tokenServerUrl}/access_token?userID=${userID}&expired_ts=7200`,
    {
      method: 'GET',
    }
  ).then((res) => res.json());
}

function randomID(len: any) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url: string = window.location.href
): URLSearchParams {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

@Component({
  selector: 'app-vedio-call',
  standalone: true,
  imports: [VedioCallInputComponent],
  templateUrl: './vedio-call.component.html',
  styleUrl: './vedio-call.component.css',
})
export class VedioCallComponent implements OnInit, OnDestroy {
  @ViewChild('root')
  root!: ElementRef;
  paramValue!: string | null;
  isTrainer!: boolean;
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private GetuserdataService: GetuserdataService
  ) {}

  ngOnInit(): void {
    let trainer_Id = this.GetuserdataService.getUserid();
    if (trainer_Id) {
      this.store.dispatch(trainerActions.checkIfTrainer({ trainer_Id }));
      this.store.select(getisTrainer).subscribe((value) => {
        this.isTrainer = value;
      });
      if (this.isTrainer) {
        this.store.dispatch(
          trainerActions.getCurrentVedioCallId({ trainer_Id })
        );
      }
    }
    const paramMap = this.route.snapshot.paramMap;
    this.paramValue = paramMap.get('id');
    console.log(this.paramValue, 'paramvalue');
  }

  ngAfterViewInit() {
    if (this.paramValue) {
      const roomID = this.paramValue;
      // const userID = randomID(5);
      // const userName = randomID(5);
      const userID = this.GetuserdataService.getUserid();
      const userName = this.GetuserdataService.getName();

      if (userID && userName) {
        // generate token
        generateToken('https://nextjs-token.vercel.app/api', userID).then(
          (res) => {
            const token = ZegoUIKitPrebuilt.generateKitTokenForProduction(
              1484647939,
              res.token,
              roomID,
              userID,
              userName
            );
            // create instance object from token
            const zp = ZegoUIKitPrebuilt.create(token);

            console.log(
              'this.root.nativeElement',
              this.root.nativeElement.clientWidth
            );
            // start the call
            zp.joinRoom({
              container: this.root.nativeElement,
              sharedLinks: [
                {
                  name: 'Personal link',
                  url:
                    window.location.origin +
                    window.location.pathname +
                    '?roomID=' +
                    roomID,
                },
              ],
              scenario: {
                mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
              },
              showLeavingView: true,

              onLeaveRoom: () => this.leave(),
            });
          }
        );
      }
    }
  }
  leave() {
    const trainer_Id = this.GetuserdataService.getUserid();
    if (this.isTrainer && trainer_Id) {
      let randomId = this.paramValue;
      if (randomId) {
        this.store.dispatch(
          trainerActions.updateSession({ randomId, trainer_Id })
        );
      }
    }
  }

  ngOnDestroy(): void {
    console.log('onDestroy works');
    this.leave();
  }
}
