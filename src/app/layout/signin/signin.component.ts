import { Component, OnInit } from '@angular/core';
import { LoopbackService } from './../../shared/service/loopback.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit {

  fmUser: FormGroup;
  users: any;

  constructor(
    private fb: FormBuilder,
    private lb: LoopbackService
  ) { }

  ngOnInit() {
    this.buildForm();
    this.getUsers();
  }

  buildForm() {
    this.fmUser = this.fb.group({
      name:     ['', Validators.required],
      email:    ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role:     ['', Validators.required]
    });
  }

  onSubmit() {
    if (!this.fmUser.valid) {
      return;
    }
    this.lb.Add('users', this.fmUser.value)
    .subscribe(data => {
      console.log('## Add => ', data);
      this.fmUser.reset();
      this.getUsers();
    })
  }

  getUsers() {
    this.lb.getTable('users').subscribe(data => this.users = data);
  }
}
