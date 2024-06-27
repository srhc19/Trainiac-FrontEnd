import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { userService } from '../ngrx/userauth/user.services';
import { trainerService } from '../ngrx/trainers/trainer.services';
import { Store } from '@ngrx/store';
import * as userActions from '../ngrx/userauth/user.action';
import { Router } from '@angular/router';
import { GetuserdataService } from './getuserdata.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RazorpayService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private userService: userService,
    private store: Store,
    private router: Router,
    private ngZone: NgZone,
    private GetuserdataService: GetuserdataService
  ) {}

  public payWithRazorpay(paymentDetails: any) {
    const options: any = {
      key: 'rzp_test_bMgPK2HOIcHObe', // Replace with your Razorpay key ID
      amount: paymentDetails.amount, // Amount is in paise
      currency: paymentDetails.currency,
      name: paymentDetails.name,
      description: paymentDetails.description,
      image: paymentDetails.image,
      order_id: paymentDetails.order_id, // Pass the `id` obtained in the response of Step 1
      handler: (response: any) => {
        // Ensure correct context using arrow function
        this.handlePaymentSuccess(response);
        // let user_id = localStorage.getItem('user_id');
        // this.ngZone.run(() => {
        //   this.store.dispatch(userActions.getCurrentTrainer({ user_id }));
        //   this.router.navigate(['/videoCallSelectClient']);
        // });
      },
      prefill: {
        name: paymentDetails.prefill.name,
        email: paymentDetails.prefill.email,
        contact: paymentDetails.prefill.contact,
      },
      notes: {
        address: paymentDetails.notes.address,
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp1 = new Razorpay(options);

    rzp1.on('payment.failed', (response: any) => {
      this.handlePaymentFailure(response);
    });

    rzp1.open();
  }

  private handlePaymentSuccess(response: any) {
    this.http
      .post('http://localhost:3000/user/razorpaySuccess', {
        payment_id: response.razorpay_payment_id,
        order_id: response.razorpay_order_id,
      })
      .subscribe({
        next: () => {
          this.toastr.success('Payment Successful');
          this.updateTrainerPremiumStatus();

          // this.store.dispatch(userActions.getCurrentTrainer({ user_id }));
        },
        error: (error) => {
          this.toastr.error('Error in payment success callback');
        },
      });
  }

  private handlePaymentFailure(response: any) {
    this.http
      .post(`${environment.apiUrl}/user/razorpayFailure`, {
        payment_id: response.razorpay_payment_id,
        order_id: response.razorpay_order_id,
      })
      .subscribe({
        next: () => {
          this.toastr.error('Payment Failed');
        },
        error: (error) => {
          this.toastr.error('Error in payment failure callback');
        },
      });
  }

  private updateTrainerPremiumStatus() {
    console.log('update premiun');
    const user_id = this.GetuserdataService.getUserid();
    this.ngZone.run(() => {
      this.store.dispatch(userActions.getCurrentTrainer({ user_id }));
      this.router.navigate(['/videoCallSelectClient']);
    });
  }
}
