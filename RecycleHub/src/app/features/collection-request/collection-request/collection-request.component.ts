import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import {WasteType} from '../../../core/models/wastetype.enum';
import {UserRole} from '../../../core/models/user.model';
import {CollectionRequestService} from '../../../core/services/collection-request.service';
import {CollectionRequest} from '../../../core/models/collection-request.model';
import {Status} from '../../../core/models/status.enum';
import {DatePipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-collection-request',
  imports: [
    NgForOf,
    FormsModule,
    NgIf,
    DatePipe
  ],
  templateUrl: './collection-request.component.html',
  standalone: true,
  styleUrl: './collection-request.component.css'
})
export class CollectionRequestComponent implements OnInit{
  requestForm!: FormGroup;
  wasteTypes = Object.values(WasteType);
  // currentUserRole is got from authentication
  currentUserRole: UserRole = UserRole.Particular;
  constructor(private fb: FormBuilder, private requestService: CollectionRequestService) {}

  ngOnInit(): void {
    this.requestForm = this.fb.group({
      wasteTypes: this.fb.array([], Validators.required),
      photos: [null],
      estimatedWeight: [null, [Validators.required, Validators.min(1000), Validators.max(10000)]],
      collectionAddress: ['', Validators.required],
      collectionDate: ['', Validators.required],
      timeSlot: ['', Validators.required],
      additionalNotes: ['']
    });
  }

  get wasteTypesArray(): FormArray {
    return this.requestForm.get('wasteTypes') as FormArray;
  }
  onWasteTypeChange(event: any): void {
    const value = event.target.value;
    if (event.target.checked) {
      this.wasteTypesArray.push(this.fb.control(value));
    }else {
      const index = this.wasteTypesArray.controls.findIndex(ctrl => ctrl.value === value);
      if(index != -1) {
        this.wasteTypesArray.removeAt(index);
      }
    }
  }
  onSubmit(): void {
    if (this.requestForm.invalid) {
      alert('Veuillez remplir correctement le formulaire.');
      return;
    }
    const formValue = this.requestForm.value;
    const newRequest: CollectionRequest = {
      id: '', // Sera généré par le service
      wasteTypes: formValue.wasteTypes,
      photos: formValue.photos,
      estimatedWeight: formValue.estimatedWeight,
      collectionAddress: formValue.collectionAddress,
      collectionDate: new Date(formValue.collectionDate),
      timeSlot: formValue.timeSlot,
      additionalNotes: formValue.additionalNotes,
      status: Status.EnAttente
    };
    this.requestService.createRequest(newRequest, this.currentUserRole).subscribe({
      next: (request) => {
        alert('Demande de collecte créée avec succès!');
        this.requestForm.reset();
      },
      error: (err) => {
        alert(err.message);
      }
    });
  }



}
