import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongSterrComponent } from './song-sterr.component';

describe('SongSterrComponent', () => {
  let component: SongSterrComponent;
  let fixture: ComponentFixture<SongSterrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongSterrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongSterrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
