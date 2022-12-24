import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { GasService } from '../../services/gas/gas.service';
import { Gas } from '../../models/gas/gas.model';

declare var M: any;


@Component({
  selector: 'app-gas',
  templateUrl: './gas.component.html',
  styleUrls: ['./gas.component.css'],
  providers: [GasService]
})
export class GasComponent implements OnInit {

  constructor(public gasService: GasService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshGasList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.gasService.selectedGas = {
      _id: "",
      name: "",
      octane: 0,
      detail: ""
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.gasService.postGas(form.value).subscribe((res) => {
        this.ngOnInit();
        M.toast({ html: 'Combustible cargado con exito!', classes: 'rounded' });
      });
    } else if ((form.value._id) != "") {
      this.gasService.putGas(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshGasList();
        M.toast({ html: 'Combustible actualizado correctamente!', classes: 'rounded' });
      });
    }
  }

  refreshGasList() {
    this.gasService.getGasList().subscribe((res) => {
      this.gasService.gases = res as Gas[];
    });
  }

  onEdit(gas: Gas) {
    this.gasService.selectedGas = gas;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Estas seguro de que quieres eliminar este combustible?') == true) {
      this.gasService.deleteGas(_id).subscribe((res) => {
        this.refreshGasList();
        this.resetForm(form);
        M.toast({ html: 'Combustible eliminado!', classes: 'rounded' });
      });
    }
  }
}
