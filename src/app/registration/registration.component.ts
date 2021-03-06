import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

class Registration {
  constructor(
    public firstName: string = '',
    public lastName: string = '',
    public gender: string = '',
    public dob: NgbDateStruct = null,    
    public department: string = 'Select Department'
  ) {}
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  // It maintains list of Registrations
  registrations: Registration[] = [];
  // It maintains registration Model
  regModel: Registration;
  // It maintains registration form display status. By default it will be false.
  showNew: Boolean = false;
  // It will be either 'Save' or 'Update' based on operation.
  submitType: string = 'Save';
  // It maintains table row index based on selection.
  selectedRow: number;
  // It maintains Array of departments.
  departments: string[] = ['HR', 'Managers', 'Team Lead', 'Consultant'];
  constructor() {
    // Add default registration data.
    this.registrations.push(new Registration('Johan', 'Peter', 'Male', {year: 1980, month: 5, day: 12}, 'Consultant'));
    this.registrations.push(new Registration('Ohamed', 'Tariq', 'Male', {year: 1975, month: 12, day: 3}, 'Manager'));
    this.registrations.push(new Registration('Nirmala', 'Kumari', 'Female', {year: 1970, month: 7, day: 25}, 'Consultant'));
  }

  ngOnInit() {
    this.registrations = this.registrations.sort( ( a, b ) =>  {
      if(a.firstName < b.firstName) { return -1; }
      if(a.firstName > b.firstName) { return 1; }
      return 0;
      }    
    );
  }

  // This method associate to New Button.
  onNew() {
    // Initiate new registration.
    this.regModel = new Registration();
    // Change submitType to 'Save'.
    this.submitType = 'Save';
    // display registration entry section.
    this.showNew = true;
  }

  // This method associate to Save Button.
  onSave() {
    if (this.submitType === 'Save') {
      // Push registration model object into registration list.
      this.registrations.push(this.regModel);
    }
    // Hide registration entry section.
    this.showNew = false;
  }
  // This method associate to Edit Button.
    onEdit(index: number) {
      // Assign selected table row index.
      this.selectedRow = index;
      // Initiate new registration.
      this.regModel = new Registration();
      // Retrieve selected registration from list and assign to model.
      this.regModel = Object.assign({}, this.registrations[this.selectedRow]);
      // Change submitType to Update.
      this.submitType = 'Update';
      // Display registration entry section.
      this.showNew = true;
    }

    // This method associate to Delete Button.
    onDelete(index: number) {
      // Delete the corresponding registration entry from the list.
      this.registrations.splice(index, 1);
    }
  onCancel() {
    // Hide registration entry section.
    this.showNew = false;
  }
  
  // This method associate to Bootstrap dropdown selection change.
  onChangeDepartment(department: string) {
    // Assign corresponding selected department to model.
    this.regModel.department = department;
  }

}
