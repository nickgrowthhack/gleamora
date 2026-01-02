import {cn} from '@/lib/utils';

/**
 * TEXT COMPONENT
 * 
 * Componente para renderizar textos tipográficos consistentes com o design system
 * Utiliza as classes utilitárias geradas pelo Tailwind v4 a partir das variáveis definidas em app/tailwind/core.css
 * 
 * @param {{
 *   as?: React.ElementType;
 *   variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
 *   className?: string;
 *   children: React.ReactNode;
 *   [key: string]: any;
 * }} props
 */
export function Text({
  as,
  variant = 'p',
  className,
  children,
  ...props
}) {
  const Component = as || (variant.startsWith('h') ? variant : 'p');

  const styles = {
    h1: 'text-style-h1 font-bold tracking-tight',
    h2: 'text-style-h2 font-semibold tracking-tight',
    h3: 'text-style-h3 font-semibold',
    h4: 'text-style-h4 font-semibold',
    h5: 'text-style-h5 font-medium',
    h6: 'text-style-h6 font-medium',
    p: 'text-p text-pretty',
  };

  const variantStyle = styles[variant] || styles.p;

  return (
    <Component className={cn(variantStyle, className)} {...props}>
      {children}
    </Component>
  );
}