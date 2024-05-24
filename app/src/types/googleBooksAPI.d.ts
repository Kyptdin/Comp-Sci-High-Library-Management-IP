// Represents the main structure of a volume (book) returned by the Google Books API
interface Volume {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  saleInfo?: SaleInfo;
  accessInfo?: AccessInfo;
  searchInfo?: SearchInfo;
}

// Detailed information about a volume
interface VolumeInfo {
  title: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  industryIdentifiers?: IndustryIdentifier[];
  readingModes?: ReadingModes;
  pageCount?: number;
  printType?: string;
  categories?: string[];
  averageRating?: number;
  ratingsCount?: number;
  maturityRating?: string;
  allowAnonLogging?: boolean;
  contentVersion?: string;
  panelizationSummary?: PanelizationSummary;
  imageLinks?: ImageLinks;
  language?: string;
  previewLink?: string;
  infoLink?: string;
  canonicalVolumeLink?: string;
  subtitle?: string;
}

// Represents industry standard identifiers like ISBN
interface IndustryIdentifier {
  type: string;
  identifier: string;
}

// Information about the reading modes available for the volume
interface ReadingModes {
  text: boolean;
  image: boolean;
}

// Summary of panelization for comics
interface PanelizationSummary {
  containsEpubBubbles: boolean;
  containsImageBubbles: boolean;
}

// Links to images for the volume
interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}

// Information about the sale of a volume
interface SaleInfo {
  country: string;
  saleability: string;
  isEbook: boolean;
  listPrice?: Price;
  retailPrice?: Price;
  buyLink?: string;
  offers?: Offer[];
}

// Price information
interface Price {
  amount: number;
  currencyCode: string;
}

// Information about specific offers for the volume
interface Offer {
  finskyOfferType: number;
  listPrice: Price;
  retailPrice: Price;
}

// Information about access to the volume
interface AccessInfo {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
  epub?: FormatAccess;
  pdf?: FormatAccess;
  webReaderLink: string;
  accessViewStatus: string;
  quoteSharingAllowed: boolean;
}

// Access information for specific formats (e.g., EPUB, PDF)
interface FormatAccess {
  isAvailable: boolean;
  acsTokenLink?: string;
}

// Search-related information about a volume
interface SearchInfo {
  textSnippet: string;
}

// Response structure for a list of volumes
export interface VolumeList {
  kind: string;
  totalItems: number;
  items: Volume[];
}
