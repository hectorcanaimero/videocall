import { Component, OnInit } from '@angular/core';
import { LoopbackService } from './../../shared/service/loopback.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  fmUser: FormGroup;
  users: any;
  public headElements = ['Nome', 'Email', 'Role', 'Ação'];
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
    this.lb.Add('usuarios', this.fmUser.value)
    .subscribe(data => {
      console.log('## Add => ', data);
      Swal.fire(
        'Blz!',
        'O usuário foi cadastrado!',
        'success'
      )
      this.fmUser.reset();
      this.getUsers();
    })
  }

  getUsers() {
    this.lb.getTable('usuarios').subscribe(data => this.users = data);
  }
}
