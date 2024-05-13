import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  @ViewChild('searchText')
  searchText!: ElementRef;


   @Output()
   onSearchText:EventEmitter<string>= new EventEmitter<string>();

  searchTextOn(){
    this.onSearchText.emit(this.searchText.nativeElement.value);
  }

}
