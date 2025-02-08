import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionRequestListComponent } from './collection-request-list.component';

describe('CollectionRequestListComponent', () => {
  let component: CollectionRequestListComponent;
  let fixture: ComponentFixture<CollectionRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionRequestListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
