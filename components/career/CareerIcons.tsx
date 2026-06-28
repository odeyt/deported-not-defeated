// Custom career icons — bold, filled, professional SVG icons
// Replace lucide-react outline icons across the Career & Education section

interface IconProps {
  size?: number;
  className?: string;
}

export function IconBriefcase({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="7" width="20" height="14" rx="2.5" fill="currentColor" opacity="0.15"/>
      <rect x="2" y="7" width="20" height="14" rx="2.5" fill="currentColor" opacity="0.85"/>
      <path d="M8 7V5.5A2.5 2.5 0 0 1 10.5 3h3A2.5 2.5 0 0 1 16 5.5V7" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M2 12.5C7.33 14.17 16.67 14.17 22 12.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="10.5" y="11" width="3" height="3" rx="1" fill="white"/>
    </svg>
  );
}

export function IconGradCap({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3L2 8.5L12 14L22 8.5L12 3Z" fill="currentColor"/>
      <path d="M7 11.5V17C7 17 9 19.5 12 19.5C15 19.5 17 17 17 17V11.5" fill="currentColor" opacity="0.7"/>
      <circle cx="19.5" cy="9" r="1.5" fill="currentColor" opacity="0.9"/>
      <line x1="19.5" y1="10.5" x2="19.5" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M18.5 16 L19.5 18 L20.5 16" fill="currentColor"/>
    </svg>
  );
}

export function IconLaptop({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="18" height="13" rx="2" fill="currentColor" opacity="0.9"/>
      <rect x="5" y="6" width="14" height="9" rx="1" fill="white" opacity="0.85"/>
      <rect x="6" y="7" width="9" height="1.5" rx="0.75" fill="currentColor" opacity="0.4"/>
      <rect x="6" y="10" width="6" height="1.5" rx="0.75" fill="currentColor" opacity="0.3"/>
      <rect x="6" y="12.5" width="4" height="1.5" rx="0.75" fill="currentColor" opacity="0.25"/>
      <path d="M1 19.5H23V19.5C23 20.33 22.33 21 21.5 21H2.5C1.67 21 1 20.33 1 19.5V19.5Z" fill="currentColor" opacity="0.7"/>
      <rect x="9.5" y="17" width="5" height="2.5" rx="0.5" fill="currentColor" opacity="0.5"/>
    </svg>
  );
}

export function IconGlobe({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15"/>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
      <ellipse cx="12" cy="12" rx="4" ry="10" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M4.5 7.5C7 8.5 9.5 9 12 9C14.5 9 17 8.5 19.5 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M4.5 16.5C7 15.5 9.5 15 12 15C14.5 15 17 15.5 19.5 16.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

export function IconTrending({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M3 17L9 11L13 15L21 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 7H21V12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="3" y="18" width="18" height="2" rx="1" fill="currentColor" opacity="0.4"/>
    </svg>
  );
}

export function IconResume({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="2" width="16" height="20" rx="2" fill="currentColor" opacity="0.12"/>
      <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="9" cy="9" r="2.5" fill="currentColor" opacity="0.8"/>
      <path d="M5.5 15.5C5.5 13.57 7.07 12 9 12C10.93 12 12.5 13.57 12.5 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="14" y1="8" x2="19" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="14" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="14" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="6" y1="18" x2="18" y2="18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

export function IconCertificate({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="3" width="20" height="13" rx="2" fill="currentColor" opacity="0.12"/>
      <rect x="2" y="3" width="20" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="9.5" r="3" fill="currentColor" opacity="0.8"/>
      <path d="M9 19L9.5 16H14.5L15 19" fill="currentColor" opacity="0.5"/>
      <line x1="7" y1="19" x2="17" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
      <path d="M6 8H8M16 8H18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      <path d="M6 11H8M16 11H18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

export function IconBook({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M4 3H15C16.1 3 17 3.9 17 5V19C17 20.1 16.1 21 15 21H4C3.45 21 3 20.55 3 20V4C3 3.45 3.45 3 4 3Z" fill="currentColor" opacity="0.85"/>
      <path d="M17 5H20C20.55 5 21 5.45 21 6V20C21 20.55 20.55 21 20 21H15" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="6" y1="8" x2="14" y2="8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="6" y1="11" x2="14" y2="11" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="6" y1="14" x2="11" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M7 21L10 18L13 21" fill="currentColor"/>
    </svg>
  );
}

export function IconWrench({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M14.5 2.5C12 2.5 10 4.5 10 7C10 7.7 10.15 8.35 10.42 8.93L2.5 16.86C2 17.36 2 18.14 2.5 18.64L5.36 21.5C5.86 22 6.64 22 7.14 21.5L15.07 13.58C15.65 13.85 16.3 14 17 14C19.5 14 21.5 12 21.5 9.5C21.5 9.04 21.43 8.59 21.3 8.17L18 11.5L14.5 8L17.83 4.7C17.41 4.57 16.96 4.5 16.5 4.5" fill="currentColor" opacity="0.9"/>
      <circle cx="5.5" cy="18.5" r="1" fill="white"/>
    </svg>
  );
}

export function IconPerson({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="7" r="4" fill="currentColor" opacity="0.9"/>
      <path d="M4 20C4 16.13 7.58 13 12 13C16.42 13 20 16.13 20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function IconStar({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L14.9 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L9.1 8.26L12 2Z" fill="currentColor"/>
    </svg>
  );
}

export function IconTarget({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
      <circle cx="12" cy="12" r="6.5" stroke="currentColor" strokeWidth="1.5" opacity="0.65"/>
      <circle cx="12" cy="12" r="3" fill="currentColor"/>
      <line x1="12" y1="2" x2="12" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <line x1="12" y1="19" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <line x1="2" y1="12" x2="5" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <line x1="19" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

export function IconRocket({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C12 2 7 6 7 13H17C17 6 12 2 12 2Z" fill="currentColor" opacity="0.9"/>
      <rect x="9" y="13" width="6" height="5" fill="currentColor" opacity="0.7"/>
      <path d="M9 18L7 21H17L15 18" fill="currentColor" opacity="0.5"/>
      <circle cx="12" cy="10" r="2" fill="white" opacity="0.85"/>
      <path d="M7 13C5.5 13 4 14.5 4 16V17H7" fill="currentColor" opacity="0.5"/>
      <path d="M17 13C18.5 13 20 14.5 20 16V17H17" fill="currentColor" opacity="0.5"/>
    </svg>
  );
}
