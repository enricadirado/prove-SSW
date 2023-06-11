import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ArchivioService } from '../archivio.service';
import { Libro } from '../libro';
import { RisultatoComponent } from './risultato/risultato.component';
import { AjaxResponse } from 'rxjs/ajax';
import { Archivio } from '../archivio';

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css'],
  standalone:true,
  imports:[CommonModule, RisultatoComponent]
})
export class RicercaComponent implements OnInit {
  @Input() selezione: string;
  @Output() ricercaLibroEvent = new EventEmitter<string>();
  archivio_filtrato: Archivio;
  constructor(private as: ArchivioService) { }

  ricercaLibro(){
    let input: HTMLInputElement = document.getElementById("res") as HTMLInputElement;
    var el = input.value;
    this.as.getData().subscribe({
      next: (x: AjaxResponse<any>) =>{
        console.log(x.response);
        console.log(JSON.parse(x.response));
        var archivio: Archivio = new Archivio(JSON.parse(x.response));
        console.log(archivio);
        /*var archivio_filtrato: Archivio = archivio.filtraLibro(el);*/
      },
      error: (err) =>
        console.error('Observer got an error: ' + JSON.stringify(err)),
    });
  }
  
  archivio: Archivio;
  ngOnInit() {
  }
}

/*
var input: HTMLInputElement = document.getElementById("nuovo") as HTMLInputElement;
    var newName = input.value;
    this.newCityEvent.emit(newName);
    input.value='';

    const archive: Archivio = new Archivio(JSON.parse(x.response))

     const archivio = db.filter((el) =>
      (el.titolo + el.autore).toLowerCase().includes(btnInput.value));
*/