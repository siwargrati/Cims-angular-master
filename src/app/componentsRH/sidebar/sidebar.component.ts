import { Component, OnInit } from "@angular/core";

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: "dashboard", title: "Dashboard", icon: "dashboard", class: "" },

  {
    path: "List_AffectationsTotales",
    title: "Les Affectations Totales",
    icon: "content_paste",
    class: ""
  },
  {
    path: "List_AffectationsPartielles",
    title: "Les Affectations Partielles",
    icon: "content_paste",
    class: ""
  },
  {
    path: "List_Personnels",
    title: "Liste des personnels",
    icon: "account_box",
    class: ""
  },
  {
    path: "List_Sites",
    title: "Liste des sites",
    icon: "local_hospital",
    class: ""
  },
  {
    path: "List_Grades",
    title: "Liste des grades",
    icon: "grade",
    class: ""
  },
  {
    path: "List_Structures",
    title: "Liste des structures",
    icon: "apartment",
    class: ""
  },
  {
    path: "List_Fonctions",
    title: "Liste des Fonctions",
    icon: "card_travel",
    class: ""
  },
  {
    path: "Gestion_Conge",
    title: "GestionConge",
    icon: "content_paste",
    class: ""
  },
  {
    path: "Absence",
    title: "Absence",
    icon: "content_paste",
    class: ""
  },
  {
    path: "RecuperationSoldeRepos",
    title: "RecuperationSoldeRepos",
    icon: "content_paste",
    class: ""
  }
];

@Component({
  selector: "app-sidebarRH",
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
