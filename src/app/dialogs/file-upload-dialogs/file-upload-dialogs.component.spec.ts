import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadDialogsComponent } from './file-upload-dialogs.component';

describe('FileUploadDialogsComponent', () => {
  let component: FileUploadDialogsComponent;
  let fixture: ComponentFixture<FileUploadDialogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileUploadDialogsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileUploadDialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
