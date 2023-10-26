import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
 
import {AppService} from './app.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
//   title = 'form-api';  
//   formdata:any =  [];
//   jsonData: any;
//   editingItem: any;
//   myForm: FormGroup;
//   selectedDataId: number = -1; 
  
//   isEditing = false;
// editingId: number | null = null;

title = 'form-api';
formdata: any = [];
jsonData: any;
myForm: FormGroup;
isEditing = false;
selectedDataId: number = -1;
editingId: number | null = null;
editingData: any;

  isFormEmpty: boolean;

  ngOnInit(): void {
    this.getdata();
    this.dataService.getapi().subscribe((data:any)=>{
      this.formdata = data
    })
  }

  constructor(public formBuilder: FormBuilder, private dataService: AppService) {
    this.myForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

  

  }

  getdata() {
    this.dataService.getapi().subscribe((data: any) => {
      this.formdata = data;
    });
  }

  onSubmit() {
    const formData = this.myForm.value;
    this.dataService.addData(formData).subscribe(()=>{
      this.getdata(); 
    });
    this.myForm.reset()
  } 

delete(id:number){
 this.dataService.deletdata(id).subscribe(()=>{
  this.getdata()
 })
}  

 
// onSubmit() {
//   if (!this.isEditing) {
//     const formData = this.myForm.value;
//     this.dataService.addData(formData).subscribe(() => {
//       this.getdata();
//     });
//     this.myForm.reset();
//   }
// } 

editData(id: number) {
  const selectedData = this.formdata.find((item: { id: number }) => item.id === id);
  this.isEditing = true;
  this.selectedDataId = id; 
  if (selectedData) {
    this.myForm.setValue(selectedData);
  }
}

updateData() {
  const formData = this.myForm.value;
  if (this.selectedDataId === -1) {
    this.dataService.addData(formData).subscribe(() => {
      this.getdata(); 
    });
  } else {
    this.dataService.updateData(this.selectedDataId, formData).subscribe(() => { 
      const index = this.formdata.findIndex((item: { id: number }) => item.id === this.selectedDataId);
      if (index !== -1) {
        this.formdata[index] = { id: this.selectedDataId, ...formData };
      }
      this.isEditing = false;
      this.selectedDataId = -1;
    });
  }
  this.myForm.reset();
}


}
