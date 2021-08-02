import { Routes, RouterModule } from '@angular/router';

// import { AgencyListComponent } from './components/agency-list/agency-list.component';
// import { AgencyEditComponent } from './components/agency-edit/agency-edit.component';
// import { AgencyDeleteComponent } from './components/agency-delete/agency-delete.component';
// import { AgencyConfigComponent } from './components/agency-config/agency-config.component';
// import { AgencyUploadReportsComponent } from './components/agency-upload-reports/agency-upload-reports.component';
// import { AgencyDownloadReportsComponent } from './components/agency-download-reports/agency-download-reports.component';
import { NgModule } from '@angular/core';



const routes: Routes = [
    // {
    //     path: 'list',
    //     component: AgencyListComponent
    // },
    // {
    //     path: 'edit',
    //     component: AgencyEditComponent
    // },
    // {
    //     path: 'delete',
    //     component: AgencyDeleteComponent
    // },
    // {
    //     path: 'reports/upload',
    //     component: AgencyUploadReportsComponent
    // },
    // {
    //     path: 'reports/download',
    //     component: AgencyDownloadReportsComponent
    // },
    // {
    //     path: 'config/upload-file',
    //     component: AgencyConfigComponent
    // }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }