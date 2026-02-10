import type { Schema, Struct } from '@strapi/strapi';

export interface FooterChurchInfo extends Struct.ComponentSchema {
  collectionName: 'components_footer_church_infos';
  info: {
    displayName: 'Church Info';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FooterContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_footer_contact_infos';
  info: {
    displayName: 'Contact Info';
  };
  attributes: {
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    phone: Schema.Attribute.Component<'shared.link', false> &
      Schema.Attribute.Required;
    whatsapp: Schema.Attribute.Component<'shared.link', false> &
      Schema.Attribute.Required;
  };
}

export interface FooterLocation extends Struct.ComponentSchema {
  collectionName: 'components_footer_locations';
  info: {
    displayName: 'Location';
  };
  attributes: {
    address: Schema.Attribute.String & Schema.Attribute.Required;
    city: Schema.Attribute.String & Schema.Attribute.Required;
    mapUrl: Schema.Attribute.Component<'shared.link', false>;
    state: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HeroPublicAtention extends Struct.ComponentSchema {
  collectionName: 'components_hero_public_atentions';
  info: {
    displayName: 'Public Atention';
    icon: 'emotionHappy';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Vis\u00EDtanos para tr\u00E1mites de sacramentos, certificados o intenci\u00F3n de misas.'>;
    enlace: Schema.Attribute.Component<'shared.link', false> &
      Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images' | 'videos', true> &
      Schema.Attribute.Required;
    ScheduleRangeItem: Schema.Attribute.Component<
      'schedule.schedule-range-item',
      true
    >;
    Subtitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Despacho parroquial'>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Atenci\u00F3n al p\u00FAblico'>;
  };
}

export interface HeroSlider extends Struct.ComponentSchema {
  collectionName: 'components_hero_sliders';
  info: {
    displayName: 'Slider';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    link: Schema.Attribute.Component<'shared.link', false>;
    Title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface MoreInfoMoreInfo extends Struct.ComponentSchema {
  collectionName: 'components_more_info_more_infos';
  info: {
    displayName: 'More Info';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    linkContact: Schema.Attribute.Component<'shared.link', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface NavigationCtaButton extends Struct.ComponentSchema {
  collectionName: 'components_navigation_cta_buttons';
  info: {
    displayName: 'cta-button';
  };
  attributes: {
    style: Schema.Attribute.Enumeration<['primary', 'secondary', 'outline']>;
    url: Schema.Attribute.Component<'shared.link', false> &
      Schema.Attribute.Required;
  };
}

export interface NavigationLogo extends Struct.ComponentSchema {
  collectionName: 'components_navigation_logos';
  info: {
    displayName: 'Logo';
  };
  attributes: {
    churchName: Schema.Attribute.String & Schema.Attribute.Required;
    icon: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    locationName: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface NavigationMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_navigation_menu_items';
  info: {
    displayName: 'Menu Item';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.Required;
    url: Schema.Attribute.Component<'shared.link', false> &
      Schema.Attribute.Required;
  };
}

export interface PriestPriest extends Struct.ComponentSchema {
  collectionName: 'components_priest_priests';
  info: {
    displayName: 'Priest';
    icon: 'emotionHappy';
  };
  attributes: {
    grade: Schema.Attribute.Enumeration<
      ['Parroco', 'Vicario', 'Seminarista', 'Diacono']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Vicario'>;
    image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Padre XYZ'>;
    serviceInitialDate: Schema.Attribute.Date &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'2026-01-01'>;
  };
}

export interface PriestPriestGroup extends Struct.ComponentSchema {
  collectionName: 'components_priest_priest_groups';
  info: {
    displayName: 'PriestGroup';
    icon: 'apps';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Nuestro dedicado grupo de sacerdotes est\u00E1 aqu\u00ED para guiarte en tu camino espiritual y ofrecer apoyo a nuestra comunidad.'>;
    PriestList: Schema.Attribute.Component<'priest.priest', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Nuestros Sacerdotes'>;
  };
}

export interface SacramentsRequierements extends Struct.ComponentSchema {
  collectionName: 'components_sacraments_requierements';
  info: {
    displayName: 'requierements';
    icon: 'information';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SacramentsSacrament extends Struct.ComponentSchema {
  collectionName: 'components_sacraments_sacraments';
  info: {
    displayName: 'Sacrament';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    iconName: Schema.Attribute.RichText &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 7 4 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9l4-2"/><path d="M14 22v-4a2 2 0 0 0-4 0v4"/><path d="M18 22V5l-6-3-6 3v17"/><path d="M12 7v5"/><path d="M10 9h4"/></svg>'>;
    image: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    requirements: Schema.Attribute.Component<'sacraments.requierements', true>;
  };
}

export interface ScheduleSchedule extends Struct.ComponentSchema {
  collectionName: 'components_schedule_schedules';
  info: {
    displayName: 'Schedule';
    icon: 'calendar';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'\u00DAnete a nuestra celebraci\u00F3n comunitaria'>;
    ScheduleTab: Schema.Attribute.Component<'schedule.schedule-group', true>;
    Title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Horarios de eucaristia'>;
  };
}

export interface ScheduleScheduleGroup extends Struct.ComponentSchema {
  collectionName: 'components_schedule_schedule_groups';
  info: {
    displayName: 'ScheduleGroup';
    icon: 'calendar';
  };
  attributes: {
    Item: Schema.Attribute.Component<'schedule.schedule-item', true>;
    Title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Domingo'>;
  };
}

export interface ScheduleScheduleItem extends Struct.ComponentSchema {
  collectionName: 'components_schedule_schedule_items';
  info: {
    displayName: 'ScheduleItem';
    icon: 'clock';
  };
  attributes: {
    description: Schema.Attribute.String;
    Icon: Schema.Attribute.RichText;
    time: Schema.Attribute.Time;
  };
}

export interface ScheduleScheduleRangeItem extends Struct.ComponentSchema {
  collectionName: 'components_schedule_schedule_range_items';
  info: {
    displayName: 'ScheduleRangeItem';
    icon: 'information';
  };
  attributes: {
    description: Schema.Attribute.String;
    icon: Schema.Attribute.RichText;
    TimeRange: Schema.Attribute.Component<'schedule.time-range', true>;
  };
}

export interface ScheduleTimeRange extends Struct.ComponentSchema {
  collectionName: 'components_schedule_time_ranges';
  info: {
    displayName: 'TimeRange';
    icon: 'clock';
  };
  attributes: {
    TimeEnd: Schema.Attribute.Time;
    TimeStart: Schema.Attribute.Time;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'link';
    icon: 'arrowRight';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    iconSvg: Schema.Attribute.RichText;
    link: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#'>;
    redirectOutside: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'footer.church-info': FooterChurchInfo;
      'footer.contact-info': FooterContactInfo;
      'footer.location': FooterLocation;
      'hero.public-atention': HeroPublicAtention;
      'hero.slider': HeroSlider;
      'more-info.more-info': MoreInfoMoreInfo;
      'navigation.cta-button': NavigationCtaButton;
      'navigation.logo': NavigationLogo;
      'navigation.menu-item': NavigationMenuItem;
      'priest.priest': PriestPriest;
      'priest.priest-group': PriestPriestGroup;
      'sacraments.requierements': SacramentsRequierements;
      'sacraments.sacrament': SacramentsSacrament;
      'schedule.schedule': ScheduleSchedule;
      'schedule.schedule-group': ScheduleScheduleGroup;
      'schedule.schedule-item': ScheduleScheduleItem;
      'schedule.schedule-range-item': ScheduleScheduleRangeItem;
      'schedule.time-range': ScheduleTimeRange;
      'shared.link': SharedLink;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
