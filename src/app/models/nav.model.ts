export interface NavItem {
  mfId: string;
  mfCode: string;
  mfName: string;
  mfType: string;
  disabled?: boolean;
  mfIconPath?: string;
  mfUrlLink?: string;
  iconName?: string;
  children?: NavItem[];
}
