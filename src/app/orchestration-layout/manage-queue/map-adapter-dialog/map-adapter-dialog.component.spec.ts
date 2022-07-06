import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapAdapterDialogComponent } from './map-adapter-dialog.component';

describe('MapAdapterDialogComponent', () => {
  let component: MapAdapterDialogComponent;
  let fixture: ComponentFixture<MapAdapterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapAdapterDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapAdapterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
