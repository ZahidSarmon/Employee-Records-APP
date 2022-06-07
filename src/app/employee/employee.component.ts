import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
declare var $:any;
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  fmgEmployee:FormGroup|any;
  EmployeeList:any[]=[];
  isSelect:boolean=false;
  isLoad:boolean=true;
  isSave:boolean=false;
  baseUrl="http://localhost:5000/api/Employee/";
  constructor(private fb: FormBuilder,private appComponent: AppComponent,private authService:AuthService) { }

  ngOnInit(): void {
    this.Init();
    this.GetAllData();
  }
  Init() {
    this.fmgEmployee = this.fb.group({
      ID:['',Validators.nullValidator],
      FirstName: ['', Validators.required],
      MiddleName: ['', Validators.required],
      LastName: ['', Validators.required],
    });
  }
  ShowModal()
  {
    this.Init();
    $("#exampleModal").modal('show');
  }
  GetAllData()
  {
    this.isLoad=true;
    this.EmployeeList=[];
    try{
      this.authService.GetAllEmployee().subscribe(data=>{
        console.log("Get All Data::");
        for(let item of data)
        {
          this.EmployeeList.push(item);
        }
        this.isLoad=false;
        console.log(this.EmployeeList);
      },err=>{
        console.log(err);
      });
    }catch(exp){

    }
  }
  Edit(id:string)
  {
    try{
      let data=this.EmployeeList.find(x=>x.id==id);
      if(data!=undefined)
      {
        this.fmgEmployee = this.fb.group({
          ID: [data.id, Validators.nullValidator],
          FirstName: [data.firstName, Validators.required],
          MiddleName: [data.middleName, Validators.required],
          LastName: [data.lastName, Validators.required]
        });
        $("#exampleModal").modal('show');
      }
    }catch(exp){

    }
  }
  Select(id:string)
  {
    try{
      let data=this.EmployeeList.find(x=>x.id==id);
      if(data!=undefined)
      {
        this.fmgEmployee = this.fb.group({
          ID: [data.id, Validators.nullValidator],
          FirstName: [data.firstName, Validators.required],
          MiddleName: [data.middleName, Validators.required],
          LastName: [data.lastName, Validators.required]
        });
        this.isSelect=true;
        $("#exampleModal").modal('show');
      }
    }catch(exp){

    }
  }
  Delete(id:string)
  {
    try{
      if(id!="")
      {
        Swal.fire({
          title: 'Are you sure?',
          text: "Do you want to delete this data?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.authService.DeleteEmployee(id).subscribe(data=>{
              if(data)
              {
                Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )
                this.GetAllData();
              }
            });
          }
        })
      }
    }catch(exp){
      
    }
  }
  AddOrEdit()
  {
    this.isSave=true;
    if(this.fmgEmployee.valid)
    {
      this.authService.SaveOrEditEmployee(Object.assign({},this.fmgEmployee.value)).subscribe(data=>{
        console.log("Data Success::");
        console.log(data);
        if(data)
        {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved or updated',
            showConfirmButton: false,
            timer: 1500
          })
          this.isSave=false;
          $("#exampleModal").modal('hide');
          this.GetAllData();
        }
      },err=>{
        console.log(err);
      });
    }
  }

}
