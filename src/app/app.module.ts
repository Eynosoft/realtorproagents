import { NgModule } from '@angular/core';

import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import { BrowserModule,Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AdvancedIdxMlsSolutionComponent } from './components/advanced-idx-mls-solution/advanced-idx-mls-solution.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { FreeTrialComponent } from './components/free-trial/free-trial.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ClientLoginComponent } from './components/client-login/client-login.component';
import { NoPageFoundComponent } from './components/no-page-found/no-page-found.component';
import { ClientDashboardComponent } from './components/client-dashboard/client-dashboard.component';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard';
import { SecureInnerPagesGuard } from './secure-inner-pages.guard';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BotDetectCaptchaModule } from 'angular-captcha';
import { ValuesPipe } from './pipes/values.pipe';
import { CreateListingsComponent } from './components/create-listings/create-listings.component';
import { ClientNavbarComponent } from './components/client-navbar/client-navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditListingsComponent } from './components/edit-listings/edit-listings.component';
import { LeadsComponent } from './components/leads/leads.component';
import { ContactTaskSidebarComponent } from './shared/contact-task-sidebar/contact-task-sidebar.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { EditContactsComponent } from './components/edit-contacts/edit-contacts.component';
import { ImportContactsComponent } from './components/import-contacts/import-contacts.component';
import { ContactsDetailsComponent } from './components/contacts-details/contacts-details.component';
import { ManageTagsComponent } from './components/manage-tags/manage-tags.component';
import { AddNewTagComponent } from './components/add-new-tag/add-new-tag.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TasksComponent } from './components/tasks/tasks.component';
import { EditTagComponent } from './components/edit-tag/edit-tag.component';
import { AddNewTaskComponent } from './components/add-new-task/add-new-task.component';
import { MarketingComponent } from './components/marketing/marketing.component';
import { GetStartedComponent } from './components/get-started/get-started.component';
import { LearnMoreComponent } from './components/learn-more/learn-more.component';
import { RoadMapComponent } from './components/road-map/road-map.component';
import { DripEmailMarketingComponent } from './components/drip-email-marketing/drip-email-marketing.component';
import { AddDashboardComponent } from './components/add-dashboard/add-dashboard.component';
import { CreateManagingEmailComponent } from './components/create-managing-email/create-managing-email.component';
import { DripEmailCampaignsEmailComponent } from './components/drip-email-campaigns-email/drip-email-campaigns-email.component';
import { ScheduleCompaignEmilComponent } from './components/schedule-compaign-emil/schedule-compaign-emil.component';
import { DripEmailSettingComponent } from './components/drip-email-setting/drip-email-setting.component';
import { DripEmailMarketingSidebarComponent } from './shared/drip-email-marketing-sidebar/drip-email-marketing-sidebar.component';
import { HelpComponent } from './components/help/help.component';
import { FaqComponent } from './components/faq/faq.component';
import { AddTagFormComponent } from './shared/add-tag-form/add-tag-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SupportSystemDetailedComponent } from './components/support-system-detailed/support-system-detailed.component';
import { SupportSystemComponent } from './components/support-system/support-system.component';
import { VideoTutorialComponent } from './components/video-tutorial/video-tutorial.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { ProfileSidebarComponent } from './shared/profile-sidebar/profile-sidebar.component';
import { EmailSettingsComponent } from './components/email-settings/email-settings.component';
import { MetaTagsComponent } from './components/meta-tags/meta-tags.component';
import { TrackingCodeComponent } from './components/tracking-code/tracking-code.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AddContactsComponent } from './components/add-contacts/add-contacts.component';
import { WeeklyViewComponent } from './components/weekly-view/weekly-view.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { RefferalDashboardComponent } from './components/refferal-dashboard/refferal-dashboard.component';
import { EmailPropertyAlertComponent } from './components/agents/email-property-alert/email-property-alert.component';
import { ThemesComponent } from './components/agents/themes/themes.component';
import { SelectThemePageComponent } from './components/agents/select-theme-page/select-theme-page.component';
import { IdxMembershipComponent } from './components/idx-membership/idx-membership.component';
import { IdxPaymentComponent } from './components/idx-payment/idx-payment.component';
import { IdxPaymentSuccessComponent } from './components/idx-payment-success/idx-payment-success.component';
import { CommingsoonComponent } from './components/commingsoon/commingsoon.component';
//import { NgxCaptchaModule } from 'ngx-captcha';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);
//import { CaptchaEndpointPipe } from './pipes/captcha-endpoint.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AdvancedIdxMlsSolutionComponent,
    PricingComponent,
    FreeTrialComponent,
    ContactUsComponent,
    ClientLoginComponent,
    NoPageFoundComponent,
    ClientDashboardComponent,
    BoardAdminComponent,
    ValuesPipe,
    CreateListingsComponent,
    ClientNavbarComponent,
    EditListingsComponent,
    LeadsComponent,
    ContactTaskSidebarComponent,
    ContactsComponent,
    EditContactsComponent,
    ImportContactsComponent,
    ContactsDetailsComponent,
    ManageTagsComponent,
    AddNewTagComponent,
    TasksComponent,
    EditTagComponent,
    AddNewTaskComponent,
    MarketingComponent,
    GetStartedComponent,
    LearnMoreComponent,
    RoadMapComponent,
    DripEmailMarketingComponent,
    AddDashboardComponent,
    CreateManagingEmailComponent,
    DripEmailCampaignsEmailComponent,
    ScheduleCompaignEmilComponent,
    DripEmailSettingComponent,
    DripEmailMarketingSidebarComponent,
    HelpComponent,
    FaqComponent,
    AddTagFormComponent,
    ProfileComponent,
    SupportSystemDetailedComponent,
    SupportSystemComponent,
    VideoTutorialComponent,
    CalendarComponent,
    ProfileSidebarComponent,
    EmailSettingsComponent,
    MetaTagsComponent,
    TrackingCodeComponent,
    ChangePasswordComponent,
    AddContactsComponent,
    WeeklyViewComponent,
    NewsletterComponent,
    RefferalDashboardComponent,
    EmailPropertyAlertComponent,
    ThemesComponent,
    SelectThemePageComponent,
    IdxMembershipComponent,
    IdxPaymentComponent,
    IdxPaymentSuccessComponent,
    CommingsoonComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    FullCalendarModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger', // set defaults here
    }),
    BotDetectCaptchaModule,
    // BotDetectCaptchaModule.forRoot({
    //   captchaEndpoint: 'http://localhost/realtorproagents/backend/api/botCaptcha/displayBotCaptcha'
    // }),
    NgbModule,
   // NgxCaptchaModule
  ],
  providers: [authInterceptorProviders,{
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi:true
  },
  {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
  AuthService,AuthGuard,SecureInnerPagesGuard,Title],

  bootstrap: [AppComponent]
})
export class AppModule { }
