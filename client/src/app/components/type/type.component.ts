import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TypeService } from '../../services/type/type.service';
import { Type } from '../../models/type/type.model';

declare var M: any;

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css'],
  providers: [TypeService]
})
export class TypeComponent implements OnInit {
  constructor(public typeService: TypeService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshTypeList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.typeService.selectedType = {
      _id: "",
      name: "",
      detail: ""
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.typeService.postType(form.value).subscribe((res) => {
        this.ngOnInit();
        M.toast({ html: 'Tipo cargado con exito!', classes: 'rounded' });
      });
    } else if ((form.value._id) != "") {
      this.typeService.putType(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshTypeList();
        M.toast({ html: 'Tipo actualizado correctamente!', classes: 'rounded' });
      });
    }
  }

  refreshTypeList() {
    this.typeService.getTypeList().subscribe((res) => {
      this.typeService.types = res as Type[];
    });
  }

  onEdit(typ: Type) {
    this.typeService.selectedType = typ;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Estas seguro de que quieres eliminar este tipo?') == true) {
      this.typeService.deleteType(_id).subscribe((res) => {
        this.refreshTypeList();
        this.resetForm(form);
        M.toast({ html: 'Tipo eliminada!', classes: 'rounded' });
      });
    }
  }

}
