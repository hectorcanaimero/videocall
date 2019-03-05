import { LoopbackService } from './../../service/loopback.service';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'nomes',
  templateUrl: './nomes.component.html',
  styleUrls: ['./nomes.component.scss']
})
export class NomesComponent implements OnInit {

  @Input() id: number;
  @Output() nome = new EventEmitter();

  constructor(private lb: LoopbackService) { }

  ngOnInit() {
    this.getNome(this.id);
  }

  getNome(id: number) {
    this.lb.getFindId('usuarios', id).subscribe(data =>  this.nome = data[0].name);
  }  
}
