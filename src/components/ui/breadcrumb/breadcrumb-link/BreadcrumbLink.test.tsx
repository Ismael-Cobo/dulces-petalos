import { render, screen } from '@testing-library/react';
import { BreadcrumbLink } from './BreadcrumbLink';
import styles from './breadcrumb-link.module.css';

test('renderiza el elemento pasado en render', () => {
    render(<BreadcrumbLink render={<a href="/">Inicio</a>} />);
    expect(screen.getByRole('link', { name: 'Inicio' })).toBeInTheDocument();
});

test('aplica la clase link al elemento renderizado', () => {
    render(<BreadcrumbLink render={<a href="/">Inicio</a>} />);
    expect(screen.getByRole('link')).toHaveClass(styles.link);
});

test('combina la clase link con className existente del elemento', () => {
    render(<BreadcrumbLink render={<a href="/" className="custom">Inicio</a>} />);
    const link = screen.getByRole('link');
    expect(link).toHaveClass(styles.link);
    expect(link).toHaveClass('custom');
});
