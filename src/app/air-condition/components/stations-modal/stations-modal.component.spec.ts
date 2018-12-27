import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { StationsModalComponent } from "./stations-modal.component";

describe("StationsModalComponent", () => {
  let component: StationsModalComponent;
  let fixture: ComponentFixture<StationsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StationsModalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
