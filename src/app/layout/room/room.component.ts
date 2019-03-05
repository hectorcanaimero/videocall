import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { LoopbackService } from 'src/app/shared/service/loopback.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  fmRoom: FormGroup;
  roomsA: any;
  roomsI: any;
  medicos: any;
  clientes: any;
  public headElements = ['Room', 'Link', 'Medico', 'Cliente'];

  constructor(
    private lb: LoopbackService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
    this.getRoomActive();
    this.getRoomInactive()
    this.getCliente();
    this.getMedico();
  }

  buildForm() {
    this.fmRoom = this.fb.group({
      name: ['', Validators.required],
      url: ['', Validators.required],
      medico_id: ['', Validators.required],
      cliente_id: ['', Validators.required]
    });
  }

  getRoomActive() {
    this.lb.getActive('rooms', 0).subscribe(data => this.roomsA = data);
  }

  getRoomInactive() {
    this.lb.getActive('rooms', 1).subscribe(data => this.roomsI = data);
  }

  getMedico() {
    this.lb.getFindBy('usuarios', 'role', 'medico').subscribe(data => this.medicos = data);
  }

  getCliente() {
    this.lb.getFindBy('usuarios', 'role', 'paciente').subscribe(data => this.clientes = data);
  }

  onSubmit() {
    if (!this.fmRoom.valid) {
      return;
    }
    this.lb.Add('rooms', this.fmRoom.value)
    .subscribe(data => {
      this.fmRoom.reset();
      this.getRoom();
      Swal.fire(
        'Blz!',
        'O room foi cadastrado!',
        'success'
      )
    });
  }
}
