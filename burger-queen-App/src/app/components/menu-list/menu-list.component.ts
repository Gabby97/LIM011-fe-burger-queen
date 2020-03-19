import { Component, OnInit } from "@angular/core";
import { FirestoreService } from "../../services/firestore.service";
import { MenuNameService } from '../../services/menu-name-service.service';

@Component({
  selector: "app-menu-list",
  templateUrl: "./menu-list.component.html",
  styleUrls: ["./menu-list.component.scss"]
})

export class MenuListComponent implements OnInit {
  
  todaydate: any;
  menuString: string;
  menuNameToShow: string;
  public menuItems = [];
  constructor(private db: FirestoreService, private menuNameService: MenuNameService) {

  }

  translateMenuName(menuNameFromButtons){
    if (this.menuString === 'breakfast'){
            this.menuNameToShow = 'DESAYUNO';
          } 
          else if (this.menuString === 'lunch'){
            this.menuNameToShow = 'PLATOS';
          }
          else if (this.menuString === 'sideDishes'){
            this.menuNameToShow = 'ACOMPAÑANTES';
          } 
          else if (this.menuString === 'drinks'){
          this.menuNameToShow = 'bebidas';
          }
        return (this.menuItems = menuNameFromButtons) && (this.menuNameToShow);
      };
// get order and sends it to service
  getCustomerRequest(item){
      const object = item;
      let newObj = {product:item.product, price: item.price, quantity: 1};
      // create new obj with all element + quantity
    return this.menuNameService.changeProduct(newObj);
    };
    
    
    reduceProduct(item){
      const object = item;
      let newObj = {product:item.product, price: item.price, quantity: item.quantity};
      // create new obj with all element + quantity
    return this.menuNameService.reduceProductOrder(newObj);
    };

    //  deleteProduct(item){
    //   const object = item;
    //   let newObj = {product:item.product, price: item.price, quantity: item.quantity};
    //   // create new obj with all element + quantity
    // return this.menuNameService.deleteProductOrder(newObj);
    // };

  ngOnInit() {
     this.todaydate = this.menuNameService.todayDate();
     this.menuNameService.currentString.subscribe(string =>{
      this.menuString = string;
      this.db.getDataByCategory(this.menuString)
    .subscribe((data) => {
      this.translateMenuName(data);
      });
    });
  }
}
