import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import DocumentReference = firebase.firestore.DocumentReference;
import * as firebase from 'firebase';
import { Formulario } from '../model/formulario.model';


@Injectable({
    providedIn: 'root'
})
export class FormService {
    private formulario: Observable<Formulario>;
    private equiposCollection: AngularFirestoreCollection<Formulario>;
    constructor(private angularFirestore: AngularFirestore) {
        this.equiposCollection = this.angularFirestore.collection<Formulario>('Formulario');
    }


    addFormulario(formulario: Formulario): Promise<DocumentReference>{
        return this.equiposCollection.add(formulario);
    }

}