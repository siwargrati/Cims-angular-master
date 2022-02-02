import { Component, OnInit } from "@angular/core";

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "List_Demande",
    title: "Liste des demandes",
    icon: "content_paste",
    class: ""
  },
  {
    path: "List_Personnels",
    title: "Liste des personnels",
    icon: "content_paste",
    class: ""
  }
];

@Component({
  selector: "app-sidebarDemandeur",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
}
