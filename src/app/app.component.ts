import {Component, HostListener} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AppService} from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cars-app';
  priceForms = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    car: ['', Validators.required]
  })

  carsData: any
    //  [{
    //   image: "1.png",
    //   name: "Lamborghini Huracan Spyder",
    //   gear: "автомат",
    //   engine: 5.2,
    //   places: 2019
    // },
    // {
    //   image: "2.png",
    //   name: "Chevrolet Corvette",
    //   gear: "автомат",
    //   engine: 6.2,
    //   places: 2017
    // },
    // {
    //   image: "3.png",
    //   name: "Ferrari California",
    //   gear: "автомат",
    //   engine: 3.9,
    //   places: 2010
    // },
    // {
    //   image: "4.png",
    //   name: "Lamborghini Urus",
    //   gear: "автомат",
    //   engine: 4.0,
    //   places: 2019
    // },
    // {
    //   image: "5.png",
    //   name: "Audi R8",
    //   gear: "автомат",
    //   engine: 5.2,
    //   places: 2018
    // },
    // {
    //   image: "6.png",
    //   name: "Chevrolet Camaro",
    //   gear: "автомат",
    //   engine: 2.0,
    //   places: 2019
    // },
    // {
    //   image: "7.png",
    //   name: "Maserati Quattroporte",
    //   gear: "автомат",
    //   engine: 3.0,
    //   places: 2018
    // },
    // {
    //   image: "8.png",
    //   name: "Dodge Challenger",
    //   gear: "автомат",
    //   engine: 6.4,
    //   places: 2019
    // },
    // {
    //   image: "9.png",
    //   name: "Nissan GT-R",
    //   gear: "автомат",
    //   engine: 3.8,
    //   places: 2019
    // },]
  ;

  constructor(private fb: FormBuilder, private appService: AppService) {
  }

  ngOnInit() {
    this.appService.getData(this.category).subscribe(carsData => this.carsData = carsData)
  }

  goScroll(target: HTMLElement, car?: any) {
    target.scrollIntoView({behavior: "smooth"});
    if (car) {
      this.priceForms.patchValue({car: car.name});
    }
  }

  category: string = 'sport';
  toggleCategory(category: string) {
    this.category = category;
    this.ngOnInit();
  }


  trans: any;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.trans = {transform: 'translate3d(' + ((e.clientX * 0.3) / 8) + 'px,' + ((e.clientY * 0.3) / 8) + 'px,0px)'};
  }

  bgPos: any;

  @HostListener('document:scroll', ['$event'])
  onScroll() {
    this.bgPos = {backgroundPositionX: '0' + (0.3 * window.scrollY) + 'px'};
  }

  onSubmit() {
    if (this.priceForms.valid) {

      this.appService.sendQuery(this.priceForms.value)
        .subscribe(
          {
            next: (response: any) => {
              alert(response.message);
              this.priceForms.reset();
            },
            error: (response) => {
              alert(response.error.message);
            }
          }
        );
      this.priceForms.reset();
    }
  }
}
