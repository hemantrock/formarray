import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { getLocaleTimeFormat } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
declare var $: any;
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  saveform!: FormGroup;
  token: any;
  user_id: any;
  errors: any;
  submitted:boolean = false;
  type:any;
  btndisabled:boolean=false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private http:HttpClient,
    public router: Router) {
  }
  ngOnInit() {
    this.saveform = this.fb.group({
      gst: ['', [Validators.required]],
      pan: ['', [Validators.required]],
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      pincode: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      ContactPersonDetails: this.fb.array([])
    });
  }

  // get Login Form Controls
  get saveform_controls() { return this.saveform.controls; }

  get persons() {
    return this.saveform.get('ContactPersonDetails') as FormArray;
  }

  addPerson() {
    const person = this.fb.group({
      RowId: [null, Validators.required],
      PersonName: ['', Validators.required],
      PersonMobile: ['', Validators.required],
      PersonEmail: ['', Validators.required],
      Department: ['', Validators.required],
      Designation: ['', Validators.required]
    });

    this.persons.push(person);
  }

  Save() {
    const url = 'http://68.178.166.216/api/API/BillToPartyMaster/SaveData';
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    const data=this.saveform.value;
    const formData = new HttpParams()
    .set('RowId', '0')
    .set('ActionId', '0')
    .set('Code', data.code)
    .set('Name', data.name)
    .set('Address', data.address)
    .set('Country', data.country)
    .set('State', data.state)
    .set('City', data.city)
    .set('Mobile', data.mobile)
    .set('Email', data.email)
    .set('GSTNo', data.gst)
    .set('PANNo', data.pan)
    .set('Pincode', data.pincode)
    .set('Latitude', data.latitude)
    .set('Longitude', data.longitude)
    .set('ContactPersonDetails', JSON.stringify(data.ContactPersonDetails));
    console.log("formdata",formData.toString())
    console.log("formdata1",data.ContactPersonDetails)
    // Send the POST request
    this.http.post(url, formData.toString(), { headers: headers })
      .subscribe((res:any) => {
        if(res){
          this.saveform.reset()
        }
      });
  }
}
