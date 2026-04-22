import { render, screen } from '@testing-library/react';
import { BreadcrumbPage } from './BreadcrumbPage';
import styles from './breadcrumb-page.module.css';

test('renderiza los hijos', () => {
    render(<BreadcrumbPage>Productos</BreadcrumbPage>);
    expect(screen.getByText('Productos')).toBeInTheDocument();
});

test('tiene aria-current="page"', () => {
    render(<BreadcrumbPage>Productos</BreadcrumbPage>);
    expect(screen.getByText('Productos')).toHaveAttribute('aria-current', 'page');
});

test('aplica la clase page', () => {
    render(<BreadcrumbPage>Productos</BreadcrumbPage>);
    expect(screen.getByText('Productos')).toHaveClass(styles.page);
});
