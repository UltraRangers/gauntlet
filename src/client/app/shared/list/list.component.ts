import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { get } from 'lodash';

export interface ListColumn {
  title: string;
  value: string;
  sortable?: boolean;
}

export interface ListConfig {
  filterBar?: boolean;
  filterBarPlaceholder?: string;
  pagination?: boolean;
  pageSizeOptions?: number[];
  pageSize?: number;
  pageIndex?: number;
}

@Component({
  selector: 'list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss']
})
export class ListComponent implements AfterViewInit, OnChanges, OnInit {

  public displayedColumns: string[];
  public dataSource: MatTableDataSource<any>;

  @Input() public columns: ListColumn[] = [];
  @Input() public config: ListConfig = {};
  @Input() public data: any[] = [];

  @Output() public onClickRow: EventEmitter<any> = new EventEmitter();

  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;

  public constructor() { }

  public ngOnInit() { }

  public ngOnChanges() {
    this.setDataSource();
    this.setConfig();
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public onFilter(data: string) {
    this.dataSource.filter = data.trim().toLowerCase();
  }

  public getItem(object: any, path: string): any {
    return get(object, path);
  }

  private setDataSource() {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.displayedColumns = this.columns.map((column) => column.value);
  }

  private setConfig({
    filterBar = true,
    filterBarPlaceholder = 'Filter',
    pagination = true,
    pageIndex = 0,
    pageSize = 10,
    pageSizeOptions = [5, 10, 20, 50, 100]
  }: ListConfig = {}) {
    this.config = {
      filterBar,
      filterBarPlaceholder,
      pagination,
      pageIndex,
      pageSize,
      pageSizeOptions };
  }
}
