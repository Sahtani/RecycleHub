import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule} from '@angular/forms';
import {CollectionRequest} from '../../../core/models/collection-request.model';
import {CollectionRequestService} from '../../../core/services/collection-request.service';
import {NgForOf} from '@angular/common';
import {WasteType} from '../../../core/models/wastetype.enum';
import {NavbarComponent} from '../../../shared/navbar/navbar.component';
import {SharedButtonComponent} from '../../../shared/shared-button/shared-button.component';

@Component({
  selector: 'app-edit-collection-request',
  templateUrl: './edit-collection-request.component.html',
  styleUrls: ['./edit-collection-request.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NavbarComponent,
    SharedButtonComponent,]
})
export class EditCollectionRequestComponent implements OnInit {
  editForm!: FormGroup;
  requestId!: string;
  requestData!: CollectionRequest;
  wasteTypes = Object.values(WasteType);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private requestService: CollectionRequestService
  ) {}

  ngOnInit(): void {
    this.requestId = this.route.snapshot.paramMap.get('id')!;
    this.requestService.getRequests().subscribe((requests) => {
      const req = requests.find(r => r.id === this.requestId);
      if (req) {
        this.requestData = req;
        this.initializeForm();
      } else {
        alert('Request not found.');
        this.router.navigate(['/requests']);
      }
    });
  }

  initializeForm(): void {
    this.editForm = this.fb.group({
      wasteTypes: this.fb.array(this.requestData.wasteTypes || [], Validators.required),
      photos: [this.requestData.photos || []],
      estimatedWeight: [this.requestData.estimatedWeight, [Validators.required, Validators.min(1000), Validators.max(10000)]],
      collectionAddress: [this.requestData.collectionAddress, Validators.required],
      collectionDate: [this.formatDate(this.requestData.collectionDate), Validators.required],
      timeSlot: [this.requestData.timeSlot, Validators.required],
      additionalNotes: [this.requestData.additionalNotes || '']
    });
  }

  // Helper function to format a date as YYYY-MM-DD (required for date input)
  formatDate(date: Date | string): string {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${d.getFullYear()}-${month}-${day}`;
  }

  get wasteTypesArray(): FormArray {
    return this.editForm.get('wasteTypes') as FormArray;
  }
  onWasteTypeChange(event: any, type: string): void {
    const formArray = this.wasteTypesArray;
    if (event.target.checked) {
      formArray.push(this.fb.control(type));
    } else {
      const index = formArray.controls.findIndex(x => x.value === type);
      if (index !== -1) {
        formArray.removeAt(index);
      }
    }}

  onSubmit(): void {
    if (this.editForm.invalid) {
      alert('Please fill out the form correctly.');
      return;
    }

    const updatedRequest: CollectionRequest = {
      ...this.requestData,
      ...this.editForm.value,
      collectionDate: new Date(this.editForm.value.collectionDate)
    };

    this.requestService.updateRequest(updatedRequest).subscribe({
      next: () => {
        alert('Request updated successfully.');
        this.router.navigate(['/requests']);
      },
      error: (err) => alert('Error updating request: ' + err.message)
    });
  }

  protected readonly FormArray = FormArray;
}
