import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCollectionRequestComponent } from './edit-collection-request.component';

describe('EditCollectionRequestComponent', () => {
  let component: EditCollectionRequestComponent;
  let fixture: ComponentFixture<EditCollectionRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCollectionRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCollectionRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
