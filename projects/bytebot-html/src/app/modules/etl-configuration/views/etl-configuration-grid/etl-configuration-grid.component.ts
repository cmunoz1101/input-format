import { HttpClient } from "@angular/common/http";
import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { MatPaginator, MatSort } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import {
  NotificationService,
  NotificationType,
  Pagination,
  SortField,
} from "@xdf/commons";
import {
  ColumnTemplate,
  ConfirmationDialogService,
  DynaDataSource,
  extractRSQL,
  FieldFilter,
  GridTemplate,
} from "@xdf/gallery";
import { tap } from "rxjs/operators";
import { EtlGridService } from "../../services/etl-grid.service";
import { DraftTooltipComponent } from "./components/draft-tooltip/draft-tooltip.component";
import { ToolTipDirective } from "./components/draft-tooltip/tooltip-host.directive";

@Component({
  selector: 'byte-etl-configuration-grid',
  templateUrl: './etl-configuration-grid.component.html',
  styleUrls: ['./etl-configuration-grid.component.scss']
})
export class EtlConfigurationGridComponent implements OnInit, OnDestroy, AfterViewInit {
  
  // Controles de la direccion
  sortColumn = "id";
  sortDirection = "asc";
  pagingSize = 5;
  template: GridTemplate;


  @ViewChild(ToolTipDirective, {static: false}) tooltipHost : ToolTipDirective;
  currentElementElement: any;
  private calloutRef: ComponentRef<DraftTooltipComponent>;

  //Controles de la paginación
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  pagination: Pagination;
  dataSource: DynaDataSource;
  currentElement : any;
  columnTemplateArray: ColumnTemplate[];
  displayedColumns: string[] = [
    "id",
    "description",
    "startDate",
    "endDate",
    "status",
    "validation",
    "draftId",
    "actions",
  ];
  filterTags = [];
  filterFields = Array<FieldFilter>();

  // Attributes Destroy

  constructor(
    protected router: Router,
    protected confirmationDialogService: ConfirmationDialogService,
    protected vcRef: ViewContainerRef,
    protected http: HttpClient,
    protected etlGridService: EtlGridService,
    protected notificationService: NotificationService,
    protected translateService: TranslateService,
    protected route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    
  }
  ngOnDestroy(): void {
  }

  ngAfterViewInit(): void {
    if (this.sortDirection == "asc") {
      this.sort.start = "desc";
    } else {
      this.sort.start = "asc";
    }

    this.sort.sortChange.subscribe((res) => {
      if (!this.sort.disabled && this.sort.active) {
        this.pagination.sortFields = new Array();
        const sortField: SortField = new SortField();

        sortField.direction = this.sortDirection = this.sort.direction;
        sortField.field = this.sortColumn = this.sort.active;

        this.pagination.sortFields.push(sortField);
      }
      this.paginator.pageIndex = 0;
      this.dataSource.load(this.pagination);
    });

    this.paginator.page
      .pipe(
        tap(() => {
          this.pagination.currentPage = this.paginator.pageIndex;
          this.pagination.itemsPerPage = this.paginator.pageSize;
          this.dataSource.load(this.pagination);
        })
      )
      .subscribe();
    this.dataSource.load(this.pagination);
  }

  ngOnInit() {
    this.sortColumn = "id";
    this.sortDirection = "asc";
    this.template = new GridTemplate(this.route.snapshot.data["template"]);
    this.dataSource = new DynaDataSource(this.etlGridService)
    this.columnTemplateArray = this.template.columnTemplateArray;
    this.columnTemplateArray.forEach((column) => {
      if (column.filtable) {
        this.filterFields.push(
          new FieldFilter(
            column.title,
            column.name,
            column.queryName,
            column.type,
            column.values
          )
        );
      }
    });

    this.pagination = new Pagination();
    this.pagination.currentPage = 0;
    this.pagination.itemsPerPage = this.pagingSize;

    if (this.sortColumn && this.sortDirection) {
      this.pagination.sortFields = new Array();
      const sortField: SortField = new SortField();
      sortField.direction = this.sortDirection;
      sortField.field = this.sortColumn;
      this.pagination.sortFields.push(sortField);
    }
    this.dataSource.load(this.pagination);

  }

  onFilter(data) {
    this.filterTags = data;
    const filterTags = data.slice();
    this.pagination.currentPage = 0;
    this.pagination.filterExpression = extractRSQL(filterTags);
    this.dataSource.load(this.pagination);
  }

  pageChanged(event) {
    if (event.previousPageIndex > event.pageIndex) {
      // previous button clicked
    } else {
      this.paginator.page
        .pipe(
          tap(() => {
            this.pagination.currentPage = this.paginator.pageIndex + 1;
            this.pagination.itemsPerPage = this.paginator.pageSize;
            this.dataSource.load(this.pagination);
          })
        )
        .subscribe();
      this.dataSource.load(this.pagination);
    }
  }

  isOdd(index: number) {
    return index % 2 === 0;
  }

  edit(item) {
    this.router.navigate(['/etl_configuration/detail/edit/' + item.id]);
  }

  view(item) {
    this.router.navigate(['/etl_configuration/detail/view/' + item.id]);
  }

  create() {
    this.router.navigate(['/etl_configuration/detail/new']);
  }

  formatNum(num) {
    return ("0" + (num)).slice(-2);
  }

  standardDate(date) {
    date = new Date(date);
    let newDate =
       this.formatNum(date.getDate())+
      "/" +
      this.formatNum(date.getMonth()+1) +
      "/" + date.getFullYear()
       + 
      " "
    return newDate;
  }
  /////////////////////////////

  onSkillMouseEnter(event, data) {
    this.currentElement = event.target;
    let recta = {
      top: this.currentElement.getBoundingClientRect().top+25,
      left: this.currentElement.getBoundingClientRect().left / 1.4
    }

    this.showCallout(recta,data);
  }
  @HostListener('click', ['$event'])
  onClick(e) {
    this.hideCallout()
  }

  @HostListener('mouseover', ['$event'])
  onSkillMouseOver(event) {
    let hoverComponent = event.target;
    let inside = false;
    do {
      if (this.calloutRef) {
        if (
          hoverComponent === this.calloutRef.location.nativeElement ||
          hoverComponent === this.currentElement
        ) {
          inside = true;
        }
      }
      hoverComponent = hoverComponent.parentNode;
    } while (hoverComponent);
    if (inside) {
    } else {
      this.hideCallout();
    }
  }

  private createCallout(): ComponentRef<DraftTooltipComponent> {
    const viewContainer = this.tooltipHost.viewContainerRef;
    viewContainer.clear();
    const calloutComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(DraftTooltipComponent);
    const calloutComponentRef = viewContainer.createComponent(calloutComponentFactory)
    return calloutComponentRef;
  }

  showCallout(position, data) {
    this.calloutRef = this.createCallout();

    this.calloutRef.instance.styleTop = (position.top)+'px'
    this.calloutRef.instance.styleLeft = (position.left)+'px'
    this.calloutRef.instance.data = data;
  }
  hideCallout() {
    if (this.calloutRef) {
      this.calloutRef.destroy();
      this.calloutRef = null;
    }
  }  
}
