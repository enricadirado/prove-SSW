import { Libro } from './libro';

export class Archivio {
  archivio: Array<Libro>;
  constructor(archivio: Array<Libro>) {
    this.archivio = archivio;
  }

  //metodi da applicare su archivio
  filtraLibro(){}

  aggiuntaLibro(nuovoLibro: Libro) {
    this.archivio.push(nuovoLibro);
  }

  rimozioneLibro(libroPrestito: Libro) {
    var indice= this.archivio.findIndex((el)=>(el.posizione==libroPrestito.posizione));
    this.archivio.splice(indice, 1);
  }

  prestitoLibro(libroPrestito: Libro, nome:string) {
    var indice= this.archivio.findIndex((el)=>(el.posizione==libroPrestito.posizione));
    let libro: Libro = new Libro(libroPrestito.autore, libroPrestito.titolo, libroPrestito.posizione, nome);
    this.archivio.splice(indice, 1, libro);
  }
}


/*
const archivio = db.filter((el) =>
      (el.titolo + el.autore).toLowerCase().includes(btnInput.value));
*/