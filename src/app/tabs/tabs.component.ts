import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule, MatTabChangeEvent } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GifService } from '@services/gif.service';
import { Fact } from '@models/fact.model';
import { GifResponse } from '../models/gifresponse.model';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent {
  isLoading: boolean = false;
  catFact: Fact | null = null;
  gifUrl: string = '';
  selectedIndex: number = 0;

  displayedColumns: string[] = ['id', 'query', 'gifUrl', 'fact', 'length', 'timestamp'];
  dataSource = new MatTableDataSource<any>([]);
  totalRecords = 0;
  pageSize = 15;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private gifService: GifService) {}

  ngOnInit() {
    this.getCatFact();
  }

  getCatFact() {
    this.isLoading = true;
    this.gifService.getFact().subscribe((catFact: Fact) => {
      this.catFact = catFact;
      this.getGifUrl();
    });
  }

  getGifUrl() {
    this.isLoading = true;
    const wordsInQuery = (this.catFact?.fact || '').split(' ');
    this.gifService.getGif(
      `${wordsInQuery[0]} ${wordsInQuery[1]} ${wordsInQuery[2]}`,
      this.catFact || { fact: '', length: 0 }
    ).subscribe((gifResponse: GifResponse) => {
      this.gifUrl = gifResponse.url;
      this.isLoading = false;
    });
  }

  onTabChange(event: MatTabChangeEvent) {
    if (event.index === 0) {
      this.getCatFact();
    }
    if (event.index === 1) {
      this.loadHistory();
    }
  }

  loadHistory() {
    this.isLoading = true;
    this.gifService.getHistory(this.pageIndex + 1, this.pageSize).subscribe(response => {
      this.dataSource.data = response.items;
      this.totalRecords = response.totalItems;
      this.isLoading = false;
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadHistory();
  }
}
