import {Component, OnInit} from '@angular/core';
import {UntypedFormGroup, UntypedFormBuilder, FormControl, Validators} from '@angular/forms';
import {BrandService} from '../../services/brand.service';
import {ToastrService} from 'ngx-toastr';
import {Brand} from '../../models/brand';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brandUpdateForm: UntypedFormGroup;
  currentBrand: Brand;

  constructor(private formBuilder: UntypedFormBuilder, private brandService: BrandService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.currentBrand = this.getCurrentBrand();
    this.createBrandUpdateForm();
  }

  createBrandUpdateForm() {
    this.brandUpdateForm = this.formBuilder.group(
      {
        id: this.currentBrand.id,
        name: ['', Validators.required]
      }
    );
  }

  update() {
    if (this.brandUpdateForm.valid) {
      let brandModel = Object.assign({}, this.brandUpdateForm.value);
      this.brandService.updateBrand(brandModel).subscribe((response) => {
        this.toastrService.success(response.message, 'Başarılı!');
      }, responseError => {
        this.toastrService.error(responseError.error.message);
      });
    }
  }

  getCurrentBrand() {
    return this.brandService.getCurrentBrand();
  }
}
