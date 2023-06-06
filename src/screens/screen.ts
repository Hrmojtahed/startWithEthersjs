export enum HomeScreens {
  Home = 'HomeScreen',
  Onboarding = 'Onboarding',
}

export enum GalleryScreens {
  ListView = 'ListView',
  DetailView = 'DetailView',
}

export enum RootScreens {
  Root = 'Root',
  DetailView = 'DetailView',
}

export type AppScreen = HomeScreens | GalleryScreens | RootScreens;
