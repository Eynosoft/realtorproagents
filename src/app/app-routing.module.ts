import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AdvancedIdxMlsSolutionComponent } from './components/advanced-idx-mls-solution/advanced-idx-mls-solution.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { ClientLoginComponent } from './components/client-login/client-login.component';
import { FreeTrialComponent } from './components/free-trial/free-trial.component';
import { NoPageFoundComponent } from './components/no-page-found/no-page-found.component';
import { ClientDashboardComponent } from './components/client-dashboard/client-dashboard.component';
import { CreateListingsComponent } from './components/create-listings/create-listings.component';
import { EditListingsComponent } from './components/edit-listings/edit-listings.component';
import { LeadsComponent } from './components/leads/leads.component';
import { AddContactsComponent } from './components/add-contacts/add-contacts.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ImportContactsComponent } from './components/import-contacts/import-contacts.component';
import { ContactsDetailsComponent } from './components/contacts-details/contacts-details.component';
import { EditContactsComponent } from './components/edit-contacts/edit-contacts.component';
import { ManageTagsComponent } from './components/manage-tags/manage-tags.component';
import { AddNewTagComponent } from './components/add-new-tag/add-new-tag.component';
import { EditTagComponent } from './components/edit-tag/edit-tag.component';
import { AddNewTaskComponent } from './components/add-new-task/add-new-task.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { MarketingComponent } from './components/marketing/marketing.component';
import { LearnMoreComponent } from './components/learn-more/learn-more.component';
import { AddDashboardComponent } from './components/add-dashboard/add-dashboard.component';
import { DripEmailMarketingComponent } from './components/drip-email-marketing/drip-email-marketing.component';
import { CreateManagingEmailComponent } from './components/create-managing-email/create-managing-email.component';
import { DripEmailCampaignsEmailComponent } from './components/drip-email-campaigns-email/drip-email-campaigns-email.component';
import { ScheduleCompaignEmilComponent } from './components/schedule-compaign-emil/schedule-compaign-emil.component';
import { DripEmailSettingComponent } from './components/drip-email-setting/drip-email-setting.component';
import { GetStartedComponent } from './components/get-started/get-started.component';
import { RoadMapComponent } from './components/road-map/road-map.component';
import { HelpComponent } from './components/help/help.component';
import { FaqComponent } from './components/faq/faq.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SupportSystemComponent } from './components/support-system/support-system.component';
import { SupportSystemDetailedComponent } from './components/support-system-detailed/support-system-detailed.component';
import { VideoTutorialComponent } from './components/video-tutorial/video-tutorial.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MetaTagsComponent } from './components/meta-tags/meta-tags.component';
import { EmailSettingsComponent } from './components/email-settings/email-settings.component';
import { TrackingCodeComponent } from './components/tracking-code/tracking-code.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { WeeklyViewComponent } from './components/weekly-view/weekly-view.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { RefferalDashboardComponent } from './components/refferal-dashboard/refferal-dashboard.component';
import { EmailPropertyAlertComponent } from './components/agents/email-property-alert/email-property-alert.component';
import { ThemesComponent } from './components/agents/themes/themes.component';
import { SelectThemePageComponent } from './components/agents/select-theme-page/select-theme-page.component';
import { IdxMembershipComponent } from './components/idx-membership/idx-membership.component';
import { IdxPaymentComponent } from './components/idx-payment/idx-payment.component';
import { IdxPaymentSuccessComponent } from './components/idx-payment-success/idx-payment-success.component';


import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  //{ path:'/', component: HomeComponent},
  { path:'advanced-idx-mls-solution', component: AdvancedIdxMlsSolutionComponent,data:{title:'Advanced Idx Mls Solution'}},
  { path:'contact-us', component: ContactUsComponent ,data:{title:'Contact Us'}},
  { path:'pricing', component: PricingComponent ,data:{title:'Pricing'}},
  { path:'free-trial', component:FreeTrialComponent ,data:{title:'Free trial'}},
  { path:'client-login', component:ClientLoginComponent ,data:{title:'Login'}},
  { path:'client-dashboard', component:ClientDashboardComponent,canActivate: [AuthGuard],data:{title:'Dashboard'} },
  { path:'create-listings', component:CreateListingsComponent,canActivate: [AuthGuard],data:{title:'Listings'} },
  { path:'edit-listings/:id', component:EditListingsComponent,canActivate: [AuthGuard],data:{title:'Edit Listings'} },
  { path:'leads', component:LeadsComponent,canActivate: [AuthGuard],data:{title:'Leads'} },
  { path:'add-contacts', component:AddContactsComponent,canActivate: [AuthGuard],data:{title:'Add Contacts'} },
  { path:'import-contacts', component:ImportContactsComponent,canActivate: [AuthGuard],data:{title:'Import Contacts'} },
  { path:'contacts', component:ContactsComponent,canActivate: [AuthGuard],data:{title:' Contacts'} },
  { path:'contacts-details/:id', component:ContactsDetailsComponent,canActivate: [AuthGuard],data:{title:' Contacts Details'} },
  { path:'edit-contacts/:id', component:EditContactsComponent,canActivate: [AuthGuard],data:{title:' Edit Contacts '} },
  { path:'manage-tags', component:ManageTagsComponent,canActivate: [AuthGuard],data:{title:' Manage Tages '} },
  { path:'add-new-tag', component:AddNewTagComponent,canActivate: [AuthGuard],data:{title:' Add New Tage '} },
  { path:'edit-tag/:id/:id1', component:EditTagComponent,canActivate: [AuthGuard],data:{title:' Edit Tage '} },
  { path:'add-new-task/:id', component:AddNewTaskComponent,canActivate: [AuthGuard],data:{title:' Add New Task '} },
  { path:'add-new-task', component:AddNewTaskComponent,canActivate: [AuthGuard],data:{title:' Add New Task '} },
  { path:'view-tasks', component:TasksComponent,canActivate: [AuthGuard],data:{title:' Tasks '} },
  { path:'marketing', component:MarketingComponent,canActivate: [AuthGuard],data:{title:' Markrting '} },
  { path:'learn-more', component:LearnMoreComponent,canActivate: [AuthGuard],data:{title:' Learn-More '} },
  { path:'add-dashbord', component:AddDashboardComponent,canActivate: [AuthGuard],data:{title:' Add Dashbord '} },
  { path:'drip-email-marketing', component:DripEmailMarketingComponent,canActivate: [AuthGuard],data:{title:' Drip Email Marketing '} },
  { path:'create-managing-email', component:CreateManagingEmailComponent,canActivate: [AuthGuard],data:{title:' Create Managing Email'} },
  { path:'drip-email-campaigns-email', component:DripEmailCampaignsEmailComponent,canActivate: [AuthGuard],data:{title:' Drip Email Campaigns Email'} },
  { path:'schedule-compaign-email', component:ScheduleCompaignEmilComponent,canActivate: [AuthGuard],data:{title:' Schedule Compaign Emil'} },
  { path:'drip-email-setting', component:DripEmailSettingComponent,canActivate: [AuthGuard],data:{title:' Drip Email Setting'} },
  { path:'get-started', component:GetStartedComponent,canActivate: [AuthGuard],data:{title:' Get Started '} },
  { path:'road-map', component:RoadMapComponent,canActivate: [AuthGuard],data:{title:' Road Map '} },
  { path:'help', component:HelpComponent,canActivate: [AuthGuard],data:{title:' Help '} },
  { path:'faq', component:FaqComponent,canActivate: [AuthGuard],data:{title:' Faq '} },
  { path:'profile', component:ProfileComponent,canActivate: [AuthGuard],data:{title:' Profile '} },
  { path:'support-system', component:SupportSystemComponent,canActivate: [AuthGuard],data:{title:' Support System '} },
  { path:'support-system-detailed', component:SupportSystemDetailedComponent,canActivate: [AuthGuard],data:{title:' Support-System-Detailed '} },
  { path:'video-tutorial', component:VideoTutorialComponent,canActivate: [AuthGuard],data:{title:' Video Tutorial '} },
  { path:'calendar', component:CalendarComponent,canActivate: [AuthGuard],data:{title:' Calendar '} },
  { path:'meta-tags', component:MetaTagsComponent,canActivate: [AuthGuard],data:{title:' Meta Tags '} },
  { path:'email-settings', component:EmailSettingsComponent,canActivate: [AuthGuard],data:{title:' Email Settings'} },
  { path:'tracking-code', component:TrackingCodeComponent,canActivate: [AuthGuard],data:{title:' Tracking Code '} },
  { path:'change-password', component:ChangePasswordComponent,canActivate: [AuthGuard],data:{title:'Change Password'} },
  { path:'weekly-view', component:WeeklyViewComponent,canActivate: [AuthGuard],data:{title:'Weekly View'} },
  { path:'newsletter', component:NewsletterComponent,canActivate: [AuthGuard],data:{title:'Newsletter'} },
  { path:'refferal-dashboard', component:RefferalDashboardComponent,canActivate: [AuthGuard],data:{title:'RefferalDashboard'} },
  { path:'email-property-alert', component:EmailPropertyAlertComponent,canActivate: [AuthGuard],data:{title:'EmailProperty Alert'} },
  { path:'themes', component:ThemesComponent,canActivate: [AuthGuard],data:{title:'Themes'} },
  { path:'select-theme-page', component:SelectThemePageComponent,canActivate: [AuthGuard],data:{title:'Select ThemePage'} },
  { path:'idx-membership', component:IdxMembershipComponent,canActivate: [AuthGuard],data:{title:'Idx Membership'} },
  { path:'idx-payment', component:IdxPaymentComponent,canActivate: [AuthGuard],data:{title:'Idx Payment'} },
  { path:'idx-payment-success', component:IdxPaymentSuccessComponent,canActivate: [AuthGuard],data:{title:'Idx Payment success'} },
  { path:'**', component: NoPageFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
