import {cn} from '@/lib/utils';

/**
 * SECTION
 * 
 * Este componente atua como um container de layout padrão para as seções da aplicação
 * Ele gerencia o espaçamento vertical (padding), a largura máxima do conteúdo e
 * o alinhamento central
 * 
 * @param {{
 *   as?: React.ElementType; // Permite renderizar como uma tag diferente (ex: 'div', 'article'). Padrão: 'section'
 *   children: React.ReactNode; // O conteúdo interno da seção
 *   className?: string; // Classes CSS adicionais para o container externo
 *   padding?: 'small' | 'medium' | 'large' | 'none'; // Define o espaçamento vertical
 *   container?: 'full' | 'medium' | 'large' | 'small'; // Define a largura máxima do conteúdo
 *   [key: string]: any; // Outras props são repassadas para o elemento container
 * }}
 */
export function Section({
  as: Component = 'section',
  children,
  className,
  padding = 'medium',
  container = 'large',
  ...props
}) {
  // Objeto de configuração para os espaçamentos verticais (padding-top e padding-bottom)
  // Utiliza variáveis CSS para garantir responsividade e consistência com o tema
  const paddings = {
    small: 'padding-section-small',
    medium: 'padding-section-medium',
    large: 'padding-section-large',
    none: 'py-0',
  };

  // Objeto de configuração para as larguras máximas do container
  // Define o quão largo o conteúdo pode ficar antes de ser limitado
  const containers = {
    small: 'container-small',
    medium: 'container-medium',
    large: 'container-large',
    full: 'w-full',
  };

  return (
    // WRAPPER
    // - Define a tag HTML (padrão 'section')
    // - Aplica largura total (w-full)
    // - Aplica o padding vertical escolhido
    // - Permite injetar classes adicionais via className
    <Component
      className={cn('w-full', paddings[padding], className)}
      {...props}
    >
      {/*
        CONTENT
        - Aplica padding horizontal global (padding-global)
        - Aplica as classes de container (que já incluem largura, max-width e centralização)
      */}
      <div
        className={cn(
          'padding-global',
          containers[container],
        )}
      >
        {children}
      </div>
    </Component>
  );
}