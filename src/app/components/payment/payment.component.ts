import { Component, OnInit } from '@angular/core';
import { RazorpayService } from '../../services/razorpay.service';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent implements OnInit {
  amount: number = 500;
  user_id!: string | null;
  constructor(
    private razorpayService: RazorpayService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.user_id = this.route.snapshot.paramMap.get('id');
  }
  initiatePayment() {
    let userid = localStorage.getItem('user_id');
    console.log(userid, '.....');
    this.http
      .post('http://localhost:3000/user/razorpay', {
        amount: this.amount,
        userid,
      })
      .subscribe((order: any) => {
        console.log('order');
        const paymentDetails = {
          amount: order.amount, // Amount in paise
          currency: 'INR',
          name: 'Your Company Name',
          description: 'Test Transaction',
          image: 'https://your-logo-url.com',
          order_id: order.id, // Pass the order ID created on the backend
          prefill: {
            name: 'Customer Name',
            email: 'customer@example.com',
            contact: '9999999999',
          },
          notes: {
            address: 'Corporate Office',
          },
        };

        this.razorpayService.payWithRazorpay(paymentDetails);
      });
  }
}
