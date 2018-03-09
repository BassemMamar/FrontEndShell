/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}




interface JQuery {
  // mWizard
  mWizard(): JQuery;
  mWizard(options: any): JQuery;

  // mPortlet
  mPortlet(): JQuery;
}


interface JQueryStatic {
  mWizard: any;
  mPortlet: any;
}


