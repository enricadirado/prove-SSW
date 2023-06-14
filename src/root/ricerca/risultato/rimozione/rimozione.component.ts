import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Libro } from '../../../libro';
import { ArchivioService } from '../../../archivio.service';
import { Archivio } from '../../../archivio';
import { AjaxResponse } from 'rxjs/ajax';

@Component({
  selector: 'app-rimozione',
  templateUrl: './rimozione.component.html',
  styleUrls: ['./rimozione.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class RimozioneComponent implements OnInit {
  @Input() libroTrovato: Libro;
  /*manda verifyResult a risultato */
  @Output() rimuoviDocEvent = new EventEmitter<string>();
  
  archivioFinal: Array<Libro>=[];
  verifyResult: string;
  inputValue: string;

  constructor(private as: ArchivioService) {}
  rimuoviDoc(){
    console.log('rimozione', this.libroTrovato);
    this.as.getData().subscribe({
      next: (x: AjaxResponse<any>) =>{
        let archivioStart: Archivio= new Archivio(JSON.parse(x.response));
        this.archivioFinal = archivioStart.archivio.filter((el) =>
        (el.titolo !== this.libroTrovato.titolo || el.autore !== this.libroTrovato.autore || el.posizione !== this.libroTrovato.posizione || el.nominativo !== this.libroTrovato.nominativo));
        var archivio3= JSON.stringify(this.archivioFinal);

        this.as.setData(archivio3).subscribe({
          next: (x: AjaxResponse<any>) =>{
            console.log(x.response);
            let input: HTMLInputElement = document.getElementById( 'res' ) as HTMLInputElement;
            input.value=" ";
            this.verifyResult="absent";
            /*manda verifyResult a risultato */
            this.rimuoviDocEvent.emit(this.verifyResult);
          },
          error: (err) =>
            console.error('Observer got an error: ' + JSON.stringify(err)),
        });
      },
      error: (err) =>
        console.error('Observer got an error: ' + JSON.stringify(err)),
    });
  }
  ngOnInit() {}
}




