import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { SpacecraftService } from '../../services/spacecraft/spacecraft.service';
import { TypeService } from '../../services/type/type.service';
import { GasService } from '../../services/gas/gas.service';

import { Spacecraft } from '../../models/spacecraft/spacecraft.model';
import { Type } from '../../models/type/type.model';
import { Gas } from '../../models/gas/gas.model';
import { ThisReceiver } from '@angular/compiler';

declare var M: any;

@Component({
  selector: 'app-spacecraft',
  templateUrl: './spacecraft.component.html',
  styleUrls: ['./spacecraft.component.css'],
  providers: [SpacecraftService]
})
export class SpacecraftComponent implements OnInit {

  constructor(
    public spacecraftService: SpacecraftService,
    public typeService: TypeService,
    public gasService: GasService


  ) { }

  ngOnInit() {
    this.resetForm();
    this.refreshSpacecraftList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.spacecraftService.selectedSpacecraft = {
      _id: "",
      name: "",
      type: "",
      weight: 0,
      push: 0,
      gas: "",
      speed: 0,
      detail: ""
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.spacecraftService.postSpacecraft(form.value).subscribe((res) => {
        this.ngOnInit();
        M.toast({ html: 'Nave cargada con exito!', classes: 'rounded' });
      });
    } else if ((form.value._id) != "") {
      this.spacecraftService.putSpacecraft(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshSpacecraftList();
        M.toast({ html: 'Nave actualizada correctamente!', classes: 'rounded' });
      });
    }
  }

  onSubmitFiltro(busqueda: string) {
    this.spacecraftService.getFilterSpacecraft(busqueda).subscribe((res) => {
      if (res!=null) {
        this.spacecraftService.spacecrafts = [];
        this.spacecraftService.spacecrafts = res as Spacecraft[];
      } else {
        this.ngOnInit();
      }
    });
  }

  loadAll(){
    this.spacecraftService.getSpacecraftList().subscribe((res) => {
      this.spacecraftService.spacecrafts = [];
      this.spacecraftService.spacecrafts = res as Spacecraft[];
    });
  }

  refreshSpacecraftList() {
    this.spacecraftService.getSpacecraftList().subscribe((res) => {
      this.spacecraftService.spacecrafts = res as Spacecraft[];
    });

    this.typeService.getTypeList().subscribe((res) => {
      this.typeService.types = res as Type[];
    });

    this.gasService.getGasList().subscribe((res) => {
      this.gasService.gases = res as Gas[];
    });
  }

  onEdit(spc: Spacecraft) {
    this.spacecraftService.selectedSpacecraft = spc;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Estas seguro de que quieres eliminar la nave?') == true) {
      this.spacecraftService.deleteSpacecraft(_id).subscribe((res) => {
        this.refreshSpacecraftList();
        this.resetForm(form);
        M.toast({ html: 'Nave eliminada!', classes: 'rounded' });
      });
    }
  }

}
